import { initTRPC, TRPCError } from "@trpc/server"
import { auth } from "@clerk/nextjs/server"
import { PrismaClient } from "@prisma/client"
import superjson from "superjson"

const prisma = new PrismaClient()

export const createTRPCContext = async () => {
  const { userId, orgId } = await auth()
  return { userId, orgId, prisma }
}

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
})

export const router = t.router
export const publicProcedure = t.procedure
export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.userId) throw new TRPCError({ code: "UNAUTHORIZED" })
  return next({ ctx: { ...ctx, userId: ctx.userId } })
})
