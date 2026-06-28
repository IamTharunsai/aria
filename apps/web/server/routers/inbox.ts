import { router, protectedProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const inboxRouter = router({
  conversations: protectedProcedure
    .input(z.object({ status: z.enum(["OPEN", "CLOSED", "PENDING"]).optional() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.orgId) return []
      return ctx.prisma.conversation.findMany({
        where: { orgId: ctx.orgId, ...(input.status ? { status: input.status } : {}) },
        orderBy: { updatedAt: "desc" },
        take: 50,
        include: {
          contact: { select: { id: true, name: true, phone: true } },
          messages: { orderBy: { sentAt: "desc" }, take: 1 },
        },
      })
    }),

  thread: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const conv = await ctx.prisma.conversation.findUnique({
        where: { id: input },
        include: {
          contact: true,
          messages: { orderBy: { sentAt: "asc" } },
        },
      })
      if (!conv) throw new TRPCError({ code: "NOT_FOUND" })
      return conv
    }),

  sendMessage: protectedProcedure
    .input(z.object({
      conversationId: z.string(),
      body: z.string().min(1).max(1600),
    }))
    .mutation(async ({ ctx, input }) => {
      const conv = await ctx.prisma.conversation.findUnique({
        where: { id: input.conversationId },
        include: { contact: true },
      })
      if (!conv) throw new TRPCError({ code: "NOT_FOUND" })

      const message = await ctx.prisma.message.create({
        data: {
          conversationId: conv.id,
          content: input.body,
          direction: "OUTBOUND",
          channel: conv.channel,
          fromNumber: process.env.TWILIO_PHONE_NUMBER ?? "",
          toNumber: conv.contact?.phone ?? "",
        },
      })

      await ctx.prisma.conversation.update({ where: { id: conv.id }, data: { updatedAt: new Date() } })

      // ponytail: Twilio send wired in Phase 4b via API /webhooks/twilio/send
      return message
    }),

  closeConversation: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.conversation.update({ where: { id: input }, data: { status: "CLOSED" } })
    }),
})
