"use client"
import { useSocket } from "@/hooks/useSocket"
import { useLiveCall } from "@/store/liveCall"
import { LiveCallBanner } from "@/components/layout/LiveCallBanner"
import { useAuth } from "@clerk/nextjs"

export function DashboardClient({ children }: { children: React.ReactNode }) {
  const { orgId } = useAuth()
  useSocket(orgId)
  const { vapiCallId, fromNumber, clear } = useLiveCall()

  return (
    <>
      <LiveCallBanner callId={vapiCallId ?? undefined} fromNumber={fromNumber ?? undefined} onDismiss={clear} />
      {children}
    </>
  )
}
