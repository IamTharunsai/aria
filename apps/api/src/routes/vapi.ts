import { Router } from "express"
import { prisma } from "../lib/prisma"
import { getIo } from "../lib/socket"

const router = Router()

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
          locationId,
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

      await prisma.call.updateMany({
        where: { vapiCallId: call.id },
        data: {
          status: "COMPLETED",
          endedAt: new Date(),
          duration: durationSec,
          transcript: artifact.transcript ?? null,
          recordingUrl: artifact.recordingUrl ?? null,
          summary: event.analysis?.summary ?? null,
          sentiment,
        },
      })
      getIo().to(orgId).emit("call.ended", { vapiCallId: call.id, duration: durationSec, orgId })
    }
  } catch (err) {
    console.error("[vapi webhook]", err)
  }

  res.json({ received: true })
})

export default router
