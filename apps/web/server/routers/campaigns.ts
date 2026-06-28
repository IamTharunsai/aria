import { router, protectedProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const campaignsRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.orgId) return []
    return ctx.prisma.campaign.findMany({
      where: { orgId: ctx.orgId },
      orderBy: { createdAt: "desc" },
    })
  }),

  create: protectedProcedure
    .input(z.object({
      name: z.string().min(1).max(100),
      type: z.enum(["SMS", "VOICE"]),
      script: z.string().min(1),
      targets: z.array(z.string()),
      scheduledAt: z.string().datetime().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.campaign.create({
        data: {
          orgId: ctx.orgId,
          name: input.name,
          type: input.type,
          script: input.script,
          targets: input.targets,
          scheduledAt: input.scheduledAt ? new Date(input.scheduledAt) : null,
          status: "DRAFT" as const,
        },
      })
    }),

  launch: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const campaign = await ctx.prisma.campaign.findUnique({ where: { id: input } })
      if (!campaign || campaign.orgId !== ctx.orgId) throw new TRPCError({ code: "NOT_FOUND" })
      return ctx.prisma.campaign.update({ where: { id: input }, data: { status: "RUNNING" } })
    }),

  pause: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.campaign.update({ where: { id: input }, data: { status: "PAUSED" } })
    }),

  delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.campaign.delete({ where: { id: input } })
    }),
})
