import { router, protectedProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const contactsRouter = router({
  list: protectedProcedure
    .input(z.object({
      search: z.string().optional(),
      limit: z.number().default(100),
    }))
    .query(async ({ ctx, input }) => {
      if (!ctx.orgId) return []
      return ctx.prisma.contact.findMany({
        where: {
          orgId: ctx.orgId,
          ...(input.search ? {
            OR: [
              { name: { contains: input.search, mode: "insensitive" } },
              { phone: { contains: input.search } },
              { email: { contains: input.search, mode: "insensitive" } },
            ],
          } : {}),
        },
        orderBy: { createdAt: "desc" },
        take: input.limit,
        include: { _count: { select: { calls: true, conversations: true } } },
      })
    }),

  get: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      const contact = await ctx.prisma.contact.findUnique({
        where: { id: input },
        include: {
          calls: { orderBy: { startedAt: "desc" }, take: 10 },
          conversations: { orderBy: { updatedAt: "desc" }, take: 5, include: { messages: { take: 1, orderBy: { sentAt: "desc" } } } },
        },
      })
      if (!contact || contact.orgId !== ctx.orgId) throw new TRPCError({ code: "NOT_FOUND" })
      return contact
    }),

  upsert: protectedProcedure
    .input(z.object({
      phone: z.string().min(7),
      name: z.string().optional(),
      email: z.string().email().optional(),
      tags: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.contact.upsert({
        where: { orgId_phone: { orgId: ctx.orgId, phone: input.phone } },
        create: { orgId: ctx.orgId, phone: input.phone, name: input.name, email: input.email, tags: input.tags ?? [] },
        update: { name: input.name, email: input.email, tags: input.tags },
      })
    }),
})
