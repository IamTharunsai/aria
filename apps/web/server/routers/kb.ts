import { router, protectedProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const kbRouter = router({
  list: protectedProcedure
    .input(z.object({ locationId: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      if (!ctx.orgId) return []
      return ctx.prisma.knowledgeItem.findMany({
        where: {
          orgId: ctx.orgId,
          ...(input.locationId ? { locationId: input.locationId } : {}),
        },
        orderBy: { createdAt: "desc" },
        select: { id: true, type: true, title: true, content: true, sourceUrl: true, createdAt: true },
      })
    }),

  create: protectedProcedure
    .input(z.object({
      locationId: z.string().optional(),
      type: z.enum(["FAQ", "DOCUMENT", "WEBPAGE", "CUSTOM"]),
      title: z.string().min(1),
      content: z.string().min(1),
      sourceUrl: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.knowledgeItem.create({
        data: { ...input, orgId: ctx.orgId },
      })
    }),

  update: protectedProcedure
    .input(z.object({
      id: z.string(),
      title: z.string().min(1).optional(),
      content: z.string().min(1).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.prisma.knowledgeItem.update({ where: { id }, data })
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.knowledgeItem.delete({ where: { id: input } })
    }),
})
