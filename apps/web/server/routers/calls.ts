import { router, protectedProcedure } from "../trpc"
import { z } from "zod"

export const callsRouter = router({
  list: protectedProcedure
    .input(z.object({
      locationId: z.string().optional(),
      limit: z.number().default(50),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.call.findMany({
        where: input.locationId ? { locationId: input.locationId } : undefined,
        take: input.limit,
        orderBy: { startedAt: "desc" },
        include: { contact: true },
      })
    }),

  byId: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.call.findUnique({
        where: { id: input },
        include: { contact: true, location: true },
      })
    }),
})
