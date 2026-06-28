import { Router } from "express"
import { prisma } from "../lib/prisma"
import { getIo } from "../lib/socket"

const router = Router()

// ponytail: regex literals compiled once at module load
const SPAM_PHRASES = /automated message|press 1|irs|social security|loan offer|extended warranty/i
const HANDOFF_PHRASES = /transfer to human|speak to someone|speak with a person|talk to a human|speak to an agent|connect me to/i

/** Returns a BCP-47 language code from transcript Unicode block heuristics, or null. */
function detectLanguage(transcript: string): string | null {
  if (/[ऀ-ॿ]/.test(transcript)) return "hi" // Devanagari → Hindi
  if (/[ঀ-৿]/.test(transcript)) return "bn" // Bengali
  if (/[஀-௿]/.test(transcript)) return "ta" // Tamil
  if (/[ఀ-౿]/.test(transcript)) return "te" // Telugu
  return null
}

router.post("/", async (req, res) => {
  const event = req.body?.message
  if (!event?.type) return res.json({ received: true })

  try {
    const call = event.call ?? {}
    const orgId: string = call.metadata?.orgId ?? call.orgId ?? ""
    const locationId: string = call.metadata?.locationId ?? ""

    if (event.type === "call-started" && orgId) {
      await prisma.call.upsert({
        where: { vapiCallId: call.id },
        create: {
          vapiCallId: call.id,
          orgId,
          ...(locationId ? { locationId } : {}),
          direction: call.type === "outboundPhoneCall" ? "OUTBOUND" : "INBOUND",
          status: "IN_PROGRESS",
          startedAt: new Date(),
        },
        update: { status: "IN_PROGRESS", startedAt: new Date() },
      })
      getIo().to(orgId).emit("call.started", {
        vapiCallId: call.id,
        fromNumber: call.customer?.number ?? "",
        orgId,
      })
    }

    if (event.type === "end-of-call-report" && orgId) {
      const artifact = event.artifact ?? {}
      const durationSec = Math.round((event.durationMs ?? 0) / 1000)
      const rawSentiment: string = event.analysis?.structuredData?.sentiment ?? "NEUTRAL"
      const sentiment = (["POSITIVE", "NEGATIVE", "NEUTRAL"].includes(rawSentiment.toUpperCase())
        ? rawSentiment.toUpperCase()
        : "NEUTRAL") as "POSITIVE" | "NEUTRAL" | "NEGATIVE"

      const summary: string = event.analysis?.summary ?? ""
      const transcript: string = artifact.transcript ?? ""

      // --- Feature 1: spam detection ---
      const isSpam = SPAM_PHRASES.test(summary) || SPAM_PHRASES.test(transcript)

      // --- Feature 2: language detection ---
      const detectedLanguage: string | null =
        call.language ?? detectLanguage(transcript)

      // --- Feature 3: human handoff detection ---
      const needsHandoff = HANDOFF_PHRASES.test(summary) || HANDOFF_PHRASES.test(transcript)

      let handoffNote = ""
      if (needsHandoff && locationId) {
        const loc = await prisma.location.findUnique({
          where: { id: locationId },
          select: { humanPhone: true },
        })
        if (loc?.humanPhone) {
          handoffNote = ` — call back: ${loc.humanPhone}`
        }
      }

      await prisma.call.updateMany({
        where: { vapiCallId: call.id },
        data: {
          status: "COMPLETED",
          endedAt: new Date(),
          duration: durationSec,
          transcript: transcript || null,
          recordingUrl: artifact.recordingUrl ?? null,
          summary: isSpam
            ? "SPAM_DETECTED"
            : summary
              ? summary + handoffNote
              : handoffNote || null,
          sentiment,
          ...(isSpam ? { metadata: { spamFlag: true } } : {}),
          ...(detectedLanguage ? { language: detectedLanguage } : {}),
          ...(needsHandoff ? { humanHandoff: true } : {}),
        },
      })

      // Update Contact language if we identified one and have a phone number
      if (detectedLanguage && call.customer?.number) {
        await prisma.contact.updateMany({
          where: { phone: call.customer.number, orgId },
          data: { language: detectedLanguage },
        })
      }

      getIo().to(orgId).emit("call.ended", { vapiCallId: call.id, duration: durationSec, orgId })
    }
  } catch (err) {
    console.error("[vapi webhook]", err)
  }

  res.json({ received: true })
})

export default router
