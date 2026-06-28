import { router, protectedProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const callsRouter = router({
  list: protectedProcedure
    .input(z.object({
      locationId: z.string().optional(),
      limit: z.number().default(50),
      cursor: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const where = {
        ...(ctx.orgId ? { orgId: ctx.orgId } : {}),
        ...(input.locationId ? { locationId: input.locationId } : {}),
      }
      return ctx.prisma.call.findMany({
        where,
        take: input.limit,
        ...(input.cursor ? { cursor: { id: input.cursor }, skip: 1 } : {}),
        orderBy: { startedAt: "desc" },
        include: { contact: { select: { name: true, phone: true } } },
      })
    }),

  byId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const call = await ctx.prisma.call.findUnique({
        where: { id: input },
        include: { contact: true, location: true },
      })
      if (!call) throw new TRPCError({ code: "NOT_FOUND" })
      return call
    }),

  stats: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.orgId) return { callsToday: 0, resolved: 0, missed: 0, avgDuration: 0 }

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const where = { orgId: ctx.orgId, startedAt: { gte: today } }

    const [total, completed, missed, agg] = await Promise.all([
      ctx.prisma.call.count({ where }),
      ctx.prisma.call.count({ where: { ...where, status: "COMPLETED" } }),
      ctx.prisma.call.count({ where: { ...where, status: "MISSED" } }),
      ctx.prisma.call.aggregate({ where: { ...where, duration: { not: null } }, _avg: { duration: true } }),
    ])

    return {
      callsToday: total,
      resolved: total > 0 ? Math.round((completed / total) * 100) : 0,
      missed,
      avgDuration: Math.round(agg._avg.duration ?? 0),
    }
  }),
})
