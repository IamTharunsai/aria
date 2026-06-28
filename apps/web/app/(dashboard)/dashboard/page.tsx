"use client"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Phone, TrendingUp, MessageSquare, Clock } from "lucide-react"

export default function DashboardPage() {
  const { data: stats } = api.calls.stats.useQuery(undefined, { refetchInterval: 30_000 })

  const cards = [
    { label: "Calls Today",  value: stats?.callsToday ?? 0,                                                           icon: Phone,        color: "#1447E6", bg: "rgba(20,71,230,0.08)"  },
    { label: "Resolved",     value: `${stats?.resolved ?? 0}%`,                                                       icon: TrendingUp,   color: "#16A34A", bg: "rgba(22,163,74,0.08)"  },
    { label: "Missed",       value: stats?.missed ?? 0,                                                                icon: MessageSquare, color: "#EF4444", bg: "rgba(239,68,68,0.08)" },
    { label: "Avg Duration", value: stats?.avgDuration ? `${Math.floor(stats.avgDuration/60)}m ${stats.avgDuration%60}s` : "—", icon: Clock, color: "#6B7280", bg: "rgba(107,114,128,0.08)" },
  ]

  return (
    <>
      <TopBar title="Dashboard" subtitle="Live overview of your voice receptionist" />
      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-4 gap-4">
          {cards.map(({ label, value, icon: Icon, color, bg }) => (
            <div key={label} className="rounded-2xl p-5 bg-white"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon size={18} style={{ color }} strokeWidth={2} />
                </div>
              </div>
              <p className="text-2xl font-bold tracking-tight" style={{ color: "#0D1117" }}>{value}</p>
              <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center"
          style={{ border: "1px solid #E5E7EB", minHeight: "260px" }}>
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(20,71,230,0.08)" }}>
            <Phone size={24} style={{ color: "#1447E6" }} strokeWidth={1.8} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>
            {(stats?.callsToday ?? 0) === 0 ? "No calls today yet" : `${stats?.callsToday} calls handled`}
          </h3>
          <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
            Connect a Vapi assistant to your Twilio number to start receiving calls.
          </p>
        </div>
      </main>
    </>
  )
}
