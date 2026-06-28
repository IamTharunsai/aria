import { Router } from "express"
import { prisma } from "../lib/prisma"
import { getIo } from "../lib/socket"
import twilio from "twilio"

const router = Router()

// Twilio sends POST here for every inbound SMS
router.post("/sms", async (req, res) => {
  const { From, To, Body, MessageSid } = req.body as {
    From: string; To: string; Body: string; MessageSid: string
  }

  // Look up org by the Twilio number that received this SMS
  // ponytail: for now we look up the first org — multi-location mapping comes in Phase 5
  const org = await prisma.organization.findFirst({ select: { id: true } })

  if (org) {
    try {
      // Upsert contact
      const contact = await prisma.contact.upsert({
        where: { orgId_phone: { orgId: org.id, phone: From } },
        create: { orgId: org.id, phone: From },
        update: {},
      })

      // Find or create open conversation
      let conv = await prisma.conversation.findFirst({
        where: { orgId: org.id, contactId: contact.id, channel: "SMS", status: "OPEN" },
      })
      if (!conv) {
        conv = await prisma.conversation.create({
          data: {
            orgId: org.id,
            contactId: contact.id,
            channel: "SMS",
            status: "OPEN",
          },
        })
      }

      // Create inbound message
      await prisma.message.create({
        data: {
          conversationId: conv.id,
          content: Body,
          direction: "INBOUND",
          channel: "SMS",
          fromNumber: From,
          toNumber: To,
          externalId: MessageSid,
        },
      })

      // Update conversation updatedAt
      await prisma.conversation.update({ where: { id: conv.id }, data: { updatedAt: new Date() } })

      // Emit socket event
      getIo().to(org.id).emit("message.new", {
        conversationId: conv.id,
        contactPhone: From,
        body: Body,
        channel: "SMS",
      })
    } catch (err) {
      console.error("[twilio/sms]", err)
    }
  }

  // Respond with empty TwiML — ARIA replies asynchronously
  res.type("text/xml").send("<Response/>")
})

// Send outbound SMS (called by tRPC sendMessage in Phase 4b)
router.post("/send", async (req, res) => {
  const { to, body, from } = req.body as { to: string; body: string; from: string }
  try {
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_API_KEY_SECRET,
      { accountSid: process.env.TWILIO_ACCOUNT_SID }
    )
    const msg = await client.messages.create({ to, body, from: from ?? process.env.TWILIO_PHONE_NUMBER })
    res.json({ sid: msg.sid })
  } catch (err) {
    console.error("[twilio/send]", err)
    res.status(500).json({ error: "Send failed" })
  }
})

export default router
