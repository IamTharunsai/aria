import { router, protectedProcedure } from "../trpc"
import { z } from "zod"
import { TRPCError } from "@trpc/server"

export const settingsRouter = router({
  getOrg: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.orgId) return null
    return ctx.prisma.organization.findUnique({
      where: { id: ctx.orgId },
      select: { id: true, name: true, businessType: true, hipaaMode: true, plan: true },
    })
  }),

  billing: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.orgId) return null
    return ctx.prisma.billing.findUnique({ where: { orgId: ctx.orgId } })
  }),

  getLocations: protectedProcedure.query(async ({ ctx }) => {
    if (!ctx.orgId) return []
    return ctx.prisma.location.findMany({
      where: { orgId: ctx.orgId },
      select: { id: true, name: true, phoneNumber: true, vapiAgentId: true },
    })
  }),

  addPhoneNumber: protectedProcedure
    .input(z.object({ phone: z.string().min(7), locationId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.location.update({
        where: { id: input.locationId, orgId: ctx.orgId },
        data: { phoneNumber: input.phone },
      })
    }),

  setBusinessType: protectedProcedure
    .input(
      z.enum([
        "HEALTHCARE",
        "RESTAURANT",
        "SALON",
        "LEGAL",
        "REAL_ESTATE",
        "EDUCATION",
        "RETAIL",
        "HOSPITALITY",
        "AUTOMOTIVE",
        "HOME_SERVICES",
        "FINANCE",
        "STARTUP",
        "GOVERNMENT",
        "RELIGIOUS",
        "TRANSPORT",
      ])
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.organization.update({
        where: { id: ctx.orgId },
        data: { businessType: input },
      })
    }),

  setHipaaMode: protectedProcedure
    .input(z.boolean())
    .mutation(async ({ ctx, input }) => {
      if (!ctx.orgId) throw new TRPCError({ code: "UNAUTHORIZED" })
      return ctx.prisma.organization.update({
        where: { id: ctx.orgId },
        data: { hipaaMode: input },
      })
    }),
})
