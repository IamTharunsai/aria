import { router, protectedProcedure } from "../trpc"
import { z } from "zod"

export const analyticsRouter = router({
  summary: protectedProcedure
    .input(z.object({
      locationId: z.string(),
      period: z.enum(["day", "week", "month"]).default("day"),
    }))
    .query(async ({ ctx, input }) => {
      const now = new Date()
      const from = new Date(now)
      if (input.period === "day") from.setDate(from.getDate() - 1)
      else if (input.period === "week") from.setDate(from.getDate() - 7)
      else from.setMonth(from.getMonth() - 1)

      const calls = await ctx.prisma.call.findMany({
        where: { locationId: input.locationId, startedAt: { gte: from } },
        select: { status: true, sentiment: true, durationSeconds: true, direction: true },
      })

      const total = calls.length
      const answered = calls.filter((c) => c.status === "COMPLETED").length
      const missed = calls.filter((c) => c.status === "MISSED").length
      const avgDuration =
        total > 0
          ? Math.round(calls.reduce((s, c) => s + (c.durationSeconds ?? 0), 0) / total)
          : 0

      return {
        total,
        answered,
        missed,
        avgDuration,
        answerRate: total > 0 ? Math.round((answered / total) * 100) : 0,
      }
    }),
})
