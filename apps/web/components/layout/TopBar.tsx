"use client"

import { UserButton } from "@clerk/nextjs"
import { Bell, Pause, Play, Loader2 } from "lucide-react"
import { api } from "@/lib/trpc"
import { useState } from "react"

interface TopBarProps {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  const { data: config, refetch } = api.agent.getConfig.useQuery(undefined)
  const setPaused = api.agent.setPaused.useMutation({ onSuccess: () => refetch() })
  const [toggling, setToggling] = useState(false)

  const isPaused = config?.agentMode === "OFF"
  const locationId = config?.id ?? "default"

  async function handleToggle() {
    setToggling(true)
    await setPaused.mutateAsync({ locationId, paused: !isPaused })
    setToggling(false)
  }

  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6"
      style={{
        height: 64,
        background: "rgba(10,12,22,0.88)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Left: title */}
      <div>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 12, color: "rgba(136,146,164,0.65)", marginTop: 2, margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>

        {/* ── ARIA Pause/Resume toggle ── */}
        <button
          onClick={handleToggle}
          disabled={toggling || !config}
          title={isPaused ? "ARIA is paused — click to resume" : "ARIA is live — click to pause"}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            borderRadius: 10, padding: "7px 14px",
            cursor: toggling || !config ? "default" : "pointer",
            transition: "all .18s",
            border: "1px solid",
            fontSize: 13, fontWeight: 600,
            opacity: toggling ? 0.7 : 1,
            background: isPaused ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)",
            borderColor: isPaused ? "rgba(239,68,68,0.3)" : "rgba(16,185,129,0.3)",
            color: isPaused ? "#F87171" : "#34D399",
          }}
          onMouseEnter={e => {
            if (!toggling && config) {
              e.currentTarget.style.background = isPaused ? "rgba(239,68,68,0.15)" : "rgba(16,185,129,0.15)"
            }
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = isPaused ? "rgba(239,68,68,0.08)" : "rgba(16,185,129,0.08)"
          }}
        >
          {toggling
            ? <Loader2 size={13} style={{ animation: "spin 1s linear infinite" }} />
            : isPaused
            ? <Play  size={13} fill="currentColor" />
            : <Pause size={13} fill="currentColor" />
          }
          {toggling ? "Saving…" : isPaused ? "Resume ARIA" : "ARIA Live"}
        </button>

        {/* Notifications */}
        <button
          style={{
            width: 36, height: 36, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer", transition: "all .15s",
            color: "rgba(136,146,164,0.6)", position: "relative",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)"
            e.currentTarget.style.color = "#F1F5F9"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)"
            e.currentTarget.style.color = "rgba(136,146,164,0.6)"
          }}
          aria-label="Notifications"
        >
          <Bell size={15} strokeWidth={1.8} />
          <span style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, borderRadius: "50%", background: "#00D471", border: "1.5px solid rgba(10,12,22,1)" }} />
        </button>

        {/* User */}
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", paddingLeft: 10 }}>
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-xl" } }} />
        </div>
      </div>

      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </header>
  )
}
