import { TRPCError } from "@trpc/server"
import { router, protectedProcedure } from "../trpc"
import { z } from "zod"

export const agentRouter = router({
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

  getConfig: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!ctx.orgId) return null
      const where = input
        ? { id: input, orgId: ctx.orgId }
        : { orgId: ctx.orgId }
      return ctx.prisma.location.findFirst({
        where,
        select: {
          id: true, name: true, phoneNumber: true, agentName: true, agentVoiceId: true,
          agentMode: true, greetingMsg: true, afterHoursMsg: true, humanPhone: true,
          languages: true, hoursJson: true, systemPrompt: true, vapiAgentId: true,
          timezone: true,
        }
      })
    }),

  setLanguages: protectedProcedure
    .input(z.object({ locationId: z.string(), languages: z.array(z.string()).min(1) }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.location.update({
        where: { id: input.locationId, orgId: ctx.orgId },
        data: { languages: input.languages }
      })
    }),

  setHours: protectedProcedure
    .input(z.object({
      locationId: z.string(),
      hoursJson: z.record(z.object({
        open: z.boolean(),
        from: z.string(),
        to: z.string()
      }))
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.location.update({
        where: { id: input.locationId, orgId: ctx.orgId },
        data: { hoursJson: input.hoursJson }
      })
    }),

  setHumanPhone: protectedProcedure
    .input(z.object({ locationId: z.string(), humanPhone: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.location.update({
        where: { id: input.locationId, orgId: ctx.orgId },
        data: { humanPhone: input.humanPhone }
      })
    }),

  getSafety: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      if (!ctx.orgId) return null
      const where = input ? { id: input, orgId: ctx.orgId } : { orgId: ctx.orgId }
      return ctx.prisma.location.findFirst({
        where,
        select: { id: true, safetyJson: true, bargeInEnabled: true }
      })
    }),

  setSafety: protectedProcedure
    .input(z.object({
      locationId: z.string(),
      safetyJson: z.any(),
      bargeInEnabled: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.location.update({
        where: { id: input.locationId, orgId: ctx.orgId },
        data: {
          safetyJson: input.safetyJson,
          ...(input.bargeInEnabled !== undefined ? { bargeInEnabled: input.bargeInEnabled } : {})
        }
      })
    }),
})
