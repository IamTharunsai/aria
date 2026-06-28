import { router, protectedProcedure } from "../trpc"
import { z } from "zod"

export const contactsRouter = router({
  list: protectedProcedure
    .input(z.object({
      orgId: z.string(),
      search: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      return ctx.prisma.contact.findMany({
        where: {
          orgId: input.orgId,
          ...(input.search ? {
            OR: [
              { name: { contains: input.search, mode: "insensitive" } },
              { phone: { contains: input.search } },
            ],
          } : {}),
        },
        orderBy: { createdAt: "desc" },
        take: 100,
      })
    }),
})
