import { router } from "../trpc"
import { callsRouter } from "./calls"
import { contactsRouter } from "./contacts"
import { analyticsRouter } from "./analytics"
import { agentRouter } from "./agent"
import { settingsRouter } from "./settings"
import { kbRouter } from "./kb"

export const appRouter = router({
  calls: callsRouter,
  contacts: contactsRouter,
  analytics: analyticsRouter,
  agent: agentRouter,
  settings: settingsRouter,
  kb: kbRouter,
})

export type AppRouter = typeof appRouter
