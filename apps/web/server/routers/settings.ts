import { router, protectedProcedure } from "../trpc"
import { z } from "zod"

export const settingsRouter = router({
  getOrg: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.organization.findUnique({
        where: { id: input },
        include: { locations: true, members: true, billing: true },
      })
    }),
})
