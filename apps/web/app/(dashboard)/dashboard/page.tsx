"use client"

import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Phone, TrendingUp, PhoneMissed, Clock, PhoneIncoming } from "lucide-react"

const pulseKeyframes = `
@keyframes ariaPulse {
  0%   { opacity: 1; }
  50%  { opacity: 0.3; }
  100% { opacity: 1; }
}
@keyframes ariaFade {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}
`

const DEMO_CALLS = [
  { type: "answered", label: "Appointment booking inquiry", time: "2 min ago", duration: "3m 24s" },
  { type: "answered", label: "Menu & hours question",       time: "18 min ago", duration: "1m 12s" },
  { type: "missed",   label: "from +1 (555) 234-5678",     time: "1h ago",     duration: null },
]

export default function DashboardPage() {
  const { data: stats } = api.calls.stats.useQuery(undefined, { refetchInterval: 30_000 })

  const callsToday   = stats?.callsToday  ?? 0
  const resolved     = stats?.resolved    ?? 0
  const missed       = stats?.missed      ?? 0
  const avgDuration  = stats?.avgDuration ?? 0
  const avgFormatted = avgDuration ? `${Math.floor(avgDuration / 60)}m ${avgDuration % 60}s` : "—"

  const cards = [
    {
      label: "Calls Today",
      value: callsToday,
      icon: Phone,
      color: "#1447E6",
      bg: "rgba(20,71,230,0.10)",
      trend: "+12% vs yesterday",
      trendUp: true,
    },
    {
      label: "Answer Rate",
      value: `${resolved}%`,
      icon: TrendingUp,
      color: "#16A34A",
      bg: "rgba(22,163,74,0.10)",
      trend: "+3% vs yesterday",
      trendUp: true,
    },
    {
      label: "Missed",
      value: missed,
      icon: PhoneMissed,
      color: "#EF4444",
      bg: "rgba(239,68,68,0.10)",
      trend: "-1 vs yesterday",
      trendUp: false,
    },
    {
      label: "Avg Duration",
      value: avgFormatted,
      icon: Clock,
      color: "#6B7280",
      bg: "rgba(107,114,128,0.10)",
      trend: "2m 48s avg",
      trendUp: null,
    },
  ]

  return (
    <>
      <style>{pulseKeyframes}</style>
      <TopBar title="Dashboard" subtitle="Live overview of your voice receptionist" />

      <main
        className="flex-1 p-6 space-y-5"
        style={{ animation: "ariaFade 0.4s ease-out" }}
      >
        {/* Status Banner */}
        <div
          className="flex items-center justify-between px-5 py-3 rounded-2xl"
          style={{
            background: "linear-gradient(135deg, #0C1A32 0%, #0a1628 100%)",
            border: "1px solid rgba(14,165,233,0.18)",
            boxShadow: "0 2px 16px rgba(20,71,230,0.10)",
            animation: "ariaFade 0.4s ease-out 0.05s both",
          }}
        >
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{
                background: "#16A34A",
                boxShadow: "0 0 6px #16A34A",
                animation: "ariaPulse 2s ease-in-out infinite",
              }}
            />
            <span className="text-sm font-semibold" style={{ color: "#F7F9FC", letterSpacing: "0.01em" }}>
              ARIA is LIVE&nbsp;&mdash;&nbsp;Your AI receptionist is answering calls
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold tabular-nums" style={{ color: "#0EA5E9" }}>
              {callsToday}
            </span>
            <span className="text-sm" style={{ color: "#6B7280" }}>calls handled today</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div
          className="grid grid-cols-4 gap-4"
          style={{ animation: "ariaFade 0.4s ease-out 0.10s both" }}
        >
          {cards.map(({ label, value, icon: Icon, color, bg, trend, trendUp }) => (
            <div
              key={label}
              className="rounded-3xl p-5 bg-white flex flex-col gap-3 group"
              style={{
                border: "1px solid #E5E7EB",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                borderRadius: "24px",
                transition: "all 0.2s ease-out",
                cursor: "default",
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = "translateY(-2px)"
                el.style.boxShadow = "0 8px 24px rgba(20,71,230,0.12)"
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLDivElement
                el.style.transform = "translateY(0)"
                el.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"
              }}
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 12,
                  background: bg,
                }}
              >
                <Icon size={18} style={{ color }} strokeWidth={2} />
              </div>
              <div>
                <p
                  className="tabular-nums"
                  style={{ fontSize: 32, fontWeight: 800, color: "#0D1117", lineHeight: 1.1 }}
                >
                  {value}
                </p>
                <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>{label}</p>
              </div>
              <p
                className="text-xs font-medium"
                style={{
                  color: trendUp === true ? "#16A34A" : trendUp === false ? "#EF4444" : "#6B7280",
                }}
              >
                {trend}
              </p>
            </div>
          ))}
        </div>

        {/* Two-column grid: 70 / 30 */}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "1fr 0.43fr",
            animation: "ariaFade 0.4s ease-out 0.15s both",
          }}
        >
          {/* Left: Live Activity */}
          <div
            className="rounded-3xl bg-white p-6"
            style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <div className="flex items-center gap-2 mb-5">
              <span
                className="inline-block w-2 h-2 rounded-full"
                style={{
                  background: "#16A34A",
                  boxShadow: "0 0 4px #16A34A",
                  animation: "ariaPulse 2s ease-in-out infinite",
                }}
              />
              <h2 className="text-sm font-bold" style={{ color: "#0D1117" }}>Live Activity</h2>
            </div>

            {callsToday === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div
                  className="flex items-center justify-center mb-4"
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(20,71,230,0.10), rgba(14,165,233,0.10))",
                  }}
                >
                  <PhoneIncoming size={28} style={{ color: "#1447E6" }} strokeWidth={1.6} />
                </div>
                <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>No calls yet today</h3>
                <p className="text-sm mb-5 max-w-xs" style={{ color: "#6B7280" }}>
                  Connect your Twilio number to start receiving calls
                </p>
                <a
                  href="/dashboard/agent"
                  className="text-sm font-semibold px-4 py-2 rounded-xl"
                  style={{
                    background: "#1447E6",
                    color: "#fff",
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Configure Agent →
                </a>
              </div>
            ) : (
              <div>
                {DEMO_CALLS.map((call, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3"
                    style={{
                      borderBottom: i < DEMO_CALLS.length - 1 ? "1px solid #E5E7EB" : "none",
                    }}
                  >
                    <div
                      className="flex items-center justify-center flex-shrink-0"
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        background: call.type === "answered"
                          ? "rgba(22,163,74,0.10)"
                          : "rgba(239,68,68,0.10)",
                      }}
                    >
                      {call.type === "answered"
                        ? <Phone size={14} style={{ color: "#16A34A" }} strokeWidth={2} />
                        : <PhoneMissed size={14} style={{ color: "#EF4444" }} strokeWidth={2} />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate" style={{ color: "#0D1117" }}>
                        {call.type === "answered" ? "Incoming call answered" : "Missed call"}
                      </p>
                      <p className="text-xs mt-0.5 truncate" style={{ color: "#6B7280" }}>
                        {call.label}{call.duration ? ` — ${call.duration}` : ""}
                      </p>
                    </div>
                    <span className="text-xs flex-shrink-0" style={{ color: "#6B7280" }}>{call.time}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: AI Health Panel */}
          <div
            className="rounded-3xl bg-white p-6 flex flex-col"
            style={{ border: "1px solid #E5E7EB", boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}
          >
            <h2 className="text-sm font-bold mb-4" style={{ color: "#0D1117" }}>System Status</h2>

            <div className="flex-1">
              {[
                { label: "Voice Agent",    dot: "#16A34A", status: callsToday > 0 ? "Active" : "Not configured" },
                { label: "SMS Inbox",      dot: "#16A34A", status: "Active" },
                { label: "Knowledge Base", dot: "#0EA5E9", status: "Ready" },
                { label: "Business Hours", dot: "#F59E0B", status: "Configure recommended", href: "/dashboard/agent" },
              ].map(({ label, dot, status, href }, i, arr) => (
                <div
                  key={label}
                  className="flex items-center justify-between py-2"
                  style={{ borderBottom: i < arr.length - 1 ? "1px solid #E5E7EB" : "none" }}
                >
                  <span className="text-xs font-medium" style={{ color: "#6B7280" }}>{label}</span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: dot }}
                    />
                    {href ? (
                      <a href={href} className="text-xs font-medium" style={{ color: dot, textDecoration: "none" }}>
                        {status}
                      </a>
                    ) : (
                      <span className="text-xs font-medium" style={{ color: dot }}>{status}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4" style={{ borderTop: "1px solid #E5E7EB" }}>
              <p className="text-xs font-semibold mb-3" style={{ color: "#6B7280", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                Quick Actions
              </p>
              <div className="flex gap-2">
                {[
                  { label: "View Calls", href: "/dashboard/calls" },
                  { label: "Invite Team", href: "/dashboard/settings" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="flex-1 text-center text-xs font-semibold px-3 py-2 rounded-xl"
                    style={{
                      background: "#F7F9FC",
                      border: "1px solid #E5E7EB",
                      color: "#0D1117",
                      textDecoration: "none",
                      transition: "background 0.15s",
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom: Business Insights */}
        <div
          className="rounded-3xl p-8 flex items-center justify-between gap-8"
          style={{
            background: "#0C1A32",
            border: "1px solid rgba(14,165,233,0.15)",
            boxShadow: "0 4px 24px rgba(6,14,30,0.18)",
            animation: "ariaFade 0.4s ease-out 0.20s both",
          }}
        >
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-bold mb-1" style={{ color: "#F7F9FC" }}>
              ARIA learns your business
            </h2>
            <p className="text-sm" style={{ color: "#6B7280", maxWidth: 380 }}>
              Every call makes your AI smarter. Train with your FAQs, menus, or documents.
            </p>
          </div>

          <div className="flex gap-4 flex-shrink-0">
            {[
              { label: "Training items", value: "0" },
              { label: "Languages",      value: "22" },
              { label: "Uptime",         value: "99.9%" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="text-center px-4 py-3 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  minWidth: 80,
                }}
              >
                <p className="text-xl font-extrabold tabular-nums" style={{ color: "#F7F9FC" }}>{value}</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{label}</p>
              </div>
            ))}
          </div>

          <a
            href="/dashboard/agent"
            className="flex-shrink-0 text-sm font-semibold px-5 py-2.5 rounded-xl"
            style={{
              background: "#1447E6",
              color: "#fff",
              textDecoration: "none",
              transition: "background 0.15s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#1a54f5" }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#1447E6" }}
          >
            Add to Knowledge Base →
          </a>
        </div>
      </main>
    </>
  )
}
