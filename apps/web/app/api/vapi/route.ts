import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

const SPAM_PHRASES   = /automated message|press 1|irs|social security|loan offer|extended warranty/i
const HANDOFF_PHRASES = /transfer to human|speak to someone|speak with a person|talk to a human|speak to an agent|connect me to/i

function detectLanguage(transcript: string): string | null {
  if (/[ऀ-ॿ]/.test(transcript)) return "hi"
  if (/[ঀ-৿]/.test(transcript)) return "bn"
  if (/[஀-௿]/.test(transcript)) return "ta"
  if (/[ఀ-౿]/.test(transcript)) return "te"
  return null
}

function buildMinimalPrompt(loc: {
  agentName: string | null
  greetingMsg: string | null
  knowledgeItems: { type: string; title: string; content: string }[]
  org: { name: string; businessType: string | null }
}): string {
  const name = loc.agentName ?? "ARIA"
  const biz  = loc.org.name
  const kb   = loc.knowledgeItems
    .slice(0, 20)
    .map(i => i.type === "FAQ" ? `Q: ${i.title}\nA: ${i.content}` : `${i.title}: ${i.content.slice(0, 400)}`)
    .join("\n\n")
  const greeting = loc.greetingMsg ?? `Thank you for calling ${biz}. This is ${name}, your AI assistant. How can I help you today?`

  return `You are ${name}, the AI receptionist for ${biz}.

GREETING: "${greeting}"

RULES:
- Be friendly, concise, and professional
- Ask one question at a time
- Confirm important details by repeating them back
- If you can't answer, offer to take a message

${kb ? `KNOWLEDGE BASE:\n${kb}` : ""}`.trim()
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try { body = await req.json() } catch { return NextResponse.json({ received: true }) }

  const event = body?.message as Record<string, unknown> | undefined
  if (!event?.type) return NextResponse.json({ received: true })

  try {
    const call       = (event.call ?? {}) as Record<string, unknown>
    const metadata   = (call.metadata ?? {}) as Record<string, unknown>
    const orgId      = String(metadata.orgId ?? call.orgId ?? "")
    const locationId = String(metadata.locationId ?? "")

    if (event.type === "call-started" && orgId) {
      // If agent is paused (agentMode=OFF), push a "closed" prompt and let the call end
      if (locationId) {
        const loc = await prisma.location.findUnique({
          where: { id: locationId },
          select: { agentMode: true, agentName: true, vapiAgentId: true },
        })
        if (loc?.agentMode === "OFF" && loc.vapiAgentId) {
          fetch(`https://api.vapi.ai/assistant/${loc.vapiAgentId}`, {
            method: "PATCH",
            headers: { Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`, "Content-Type": "application/json" },
            body: JSON.stringify({
              model: { messages: [{ role: "system", content: `Say exactly: "Thank you for calling. We are not available right now. Please try again later. Goodbye." Then end the call.` }] },
            }),
          }).catch(() => {})
        }
      }

      await prisma.call.upsert({
        where:  { vapiCallId: String(call.id) },
        create: {
          vapiCallId:  String(call.id),
          orgId,
          ...(locationId ? { locationId } : {}),
          direction:   call.type === "outboundPhoneCall" ? "OUTBOUND" : "INBOUND",
          status:      "IN_PROGRESS",
          startedAt:   new Date(),
        },
        update: { status: "IN_PROGRESS", startedAt: new Date() },
      })

      // Refresh system prompt with latest knowledge base
      if (locationId) {
        const loc = await prisma.location.findUnique({
          where:   { id: locationId },
          include: { org: true, knowledgeItems: { take: 20, orderBy: { createdAt: "desc" } } },
        })
        if (loc?.vapiAgentId) {
          const prompt = buildMinimalPrompt(loc)
          fetch(`https://api.vapi.ai/assistant/${loc.vapiAgentId}`, {
            method:  "PATCH",
            headers: { Authorization: `Bearer ${process.env.VAPI_PRIVATE_KEY}`, "Content-Type": "application/json" },
            body:    JSON.stringify({ model: { messages: [{ role: "system", content: prompt }] } }),
          }).catch(() => {})
        }
      }
    }

    if (event.type === "end-of-call-report" && orgId) {
      const artifact    = (event.artifact ?? {}) as Record<string, unknown>
      const durationSec = Math.round((Number(event.durationMs) || 0) / 1000)
      const rawSentiment = String((event.analysis as Record<string, unknown> | undefined)?.structuredData?.sentiment ?? "NEUTRAL").toUpperCase()
      const sentiment = (["POSITIVE","NEGATIVE","NEUTRAL"].includes(rawSentiment) ? rawSentiment : "NEUTRAL") as "POSITIVE"|"NEGATIVE"|"NEUTRAL"
      const summary    = String((event.analysis as Record<string, unknown> | undefined)?.summary ?? "")
      const transcript = String(artifact.transcript ?? "")

      const isSpam         = SPAM_PHRASES.test(summary) || SPAM_PHRASES.test(transcript)
      const detectedLang   = detectLanguage(transcript)
      const needsHandoff   = HANDOFF_PHRASES.test(summary) || HANDOFF_PHRASES.test(transcript)

      let handoffNote = ""
      if (needsHandoff && locationId) {
        const loc = await prisma.location.findUnique({ where: { id: locationId }, select: { humanPhone: true } })
        if (loc?.humanPhone) handoffNote = ` — call back: ${loc.humanPhone}`
      }

      await prisma.call.updateMany({
        where: { vapiCallId: String(call.id) },
        data: {
          status:       "COMPLETED",
          endedAt:      new Date(),
          duration:     durationSec,
          transcript:   transcript || null,
          recordingUrl: String(artifact.recordingUrl ?? "") || null,
          summary:      isSpam ? "SPAM_DETECTED" : (summary ? summary + handoffNote : handoffNote || null),
          sentiment,
          ...(detectedLang    ? { language: detectedLang } : {}),
          ...(needsHandoff    ? { humanHandoff: true } : {}),
        },
      })

      if (detectedLang && (call.customer as Record<string, unknown> | undefined)?.number) {
        await prisma.contact.updateMany({
          where: { phone: String((call.customer as Record<string, unknown>).number), orgId },
          data:  { language: detectedLang },
        })
      }
    }
  } catch (err) {
    console.error("[/api/vapi]", err)
  }

  return NextResponse.json({ received: true })
}
