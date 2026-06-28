import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

const isPublicRoute = createRouteMatcher([
  "/",
  "/features(.*)",
  "/how-it-works(.*)",
  "/integrations(.*)",
  "/pricing(.*)",
  "/about(.*)",
  "/contact(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks/(.*)",
])

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { userId, redirectToSignIn } = await auth()
    if (!userId) return redirectToSignIn()
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
