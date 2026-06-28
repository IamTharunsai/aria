import { router, protectedProcedure } from "../trpc"
import { z } from "zod"

export const analyticsRouter = router({
  summary: protectedProcedure
    .input(z.object({
      period: z.enum(["day", "week", "month"]).default("week"),
    }))
    .query(async ({ ctx, input }) => {
      if (!ctx.orgId) return { total: 0, answered: 0, missed: 0, avgDuration: 0, answerRate: 0, byDay: [] }

      const now = new Date()
      const from = new Date(now)
      if (input.period === "day")   from.setDate(from.getDate() - 1)
      else if (input.period === "week")  from.setDate(from.getDate() - 7)
      else from.setMonth(from.getMonth() - 1)

      const calls = await ctx.prisma.call.findMany({
        where: { orgId: ctx.orgId, startedAt: { gte: from } },
        select: { status: true, sentiment: true, duration: true, direction: true, startedAt: true },
      })

      const total    = calls.length
      const answered = calls.filter((c) => c.status === "COMPLETED").length
      const missed   = calls.filter((c) => c.status === "MISSED").length
      const avgDuration = total > 0
        ? Math.round(calls.reduce((s, c) => s + (c.duration ?? 0), 0) / total)
        : 0

      // Group by day for chart
      const dayMap: Record<string, { calls: number; answered: number }> = {}
      for (const c of calls) {
        const day = c.startedAt.toISOString().slice(0, 10)
        if (!dayMap[day]) dayMap[day] = { calls: 0, answered: 0 }
        dayMap[day].calls++
        if (c.status === "COMPLETED") dayMap[day].answered++
      }
      const byDay = Object.entries(dayMap)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([date, v]) => ({ date, ...v }))

      // Sentiment breakdown
      const sentimentMap: Record<string, number> = { POSITIVE: 0, NEUTRAL: 0, NEGATIVE: 0 }
      for (const c of calls) {
        if (c.sentiment) sentimentMap[c.sentiment] = (sentimentMap[c.sentiment] ?? 0) + 1
      }
      const sentiment = Object.entries(sentimentMap).map(([name, value]) => ({ name, value }))

      return {
        total, answered, missed, avgDuration,
        answerRate: total > 0 ? Math.round((answered / total) * 100) : 0,
        byDay,
        sentiment,
        inbound:  calls.filter((c) => c.direction === "INBOUND").length,
        outbound: calls.filter((c) => c.direction === "OUTBOUND").length,
      }
    }),
})
