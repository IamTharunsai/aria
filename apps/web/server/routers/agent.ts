import { router, protectedProcedure } from "../trpc"
import { z } from "zod"

export const agentRouter = router({
  getLocation: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      return ctx.prisma.location.findUnique({ where: { id: input } })
    }),

  updateLocation: protectedProcedure
    .input(z.object({
      id: z.string(),
      agentName: z.string().optional(),
      agentMode: z.enum(["OFF", "ASSIST", "AUTOPILOT"]).optional(),
      greetingMsg: z.string().optional(),
      afterHoursMsg: z.string().optional(),
      humanPhone: z.string().optional(),
      languages: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input
      return ctx.prisma.location.update({ where: { id }, data })
    }),
})
