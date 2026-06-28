"use client"
import { useState } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts"

type Period = "day" | "week" | "month"
const PERIOD_LABELS: Record<Period, string> = { day: "Today", week: "Last 7 days", month: "Last 30 days" }

function StatCard({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent?: string }) {
  return (
    <div className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
      <p className="text-xs font-medium mb-2" style={{ color: "#6B7280" }}>{label}</p>
      <p className="text-3xl font-black" style={{ color: accent ?? "#0D1117" }}>{value}</p>
      {sub && <p className="text-xs mt-1" style={{ color: "#9CA3AF" }}>{sub}</p>}
    </div>
  )
}

const SENT_COLORS: Record<string, string> = { POSITIVE: "#10B981", NEUTRAL: "#6366F1", NEGATIVE: "#F43F5E" }

function ChartTip({ active, payload, label }: { active?: boolean; payload?: Array<{color:string;name:string;value:number}>; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="px-4 py-3 rounded-2xl shadow-xl" style={{ background: "#0C1A32", border: "1px solid rgba(255,255,255,0.08)" }}>
      <p className="text-xs font-semibold mb-2" style={{ color: "#94A3B8" }}>{label}</p>
      {payload.map((p, i) => (
        <div key={i} className="flex items-center gap-2 text-xs">
          <div className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span style={{ color: "#CBD5E1" }}>{p.name}: <strong style={{ color: "#fff" }}>{p.value}</strong></span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<Period>("week")
  const { data, isLoading } = api.analytics.summary.useQuery({ period }, { refetchInterval: 60_000 })
  const fmt = (s: number) => `${Math.floor(s / 60)}m ${s % 60}s`

  return (
    <>
      <TopBar title="Analytics" subtitle="Performance insights across all channels" />
      <main className="flex-1 overflow-auto p-6" style={{ background: "#F7F9FC" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold" style={{ color: "#0D1117" }}>Overview</h2>
          <div className="flex rounded-xl overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
            {(["day","week","month"] as Period[]).map(p => (
              <button key={p} onClick={() => setPeriod(p)} className="px-4 py-2 text-sm font-medium transition-colors cursor-pointer"
                style={{ background: period===p ? "#6366F1" : "#fff", color: period===p ? "#fff" : "#6B7280" }}>
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
        </div>
        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-8 h-8 rounded-full border-2 animate-spin" style={{ borderColor: "#6366F1", borderTopColor: "transparent" }} />
          </div>
        ) : !data ? null : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
              <StatCard label="Total calls" value={data.total} />
              <StatCard label="Answered" value={data.answered} accent="#10B981" sub={`${data.answerRate}% rate`} />
              <StatCard label="Missed" value={data.missed} accent="#F43F5E" />
              <StatCard label="Avg duration" value={fmt(data.avgDuration)} />
              <StatCard label="In / Out" value={`${data.inbound} / ${data.outbound}`} />
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 rounded-2xl p-5 bg-white" style={{ border: "1px solid #E5E7EB" }}>
                <p className="text-sm font-semibold mb-4" style={{ color: "#0D1117" }}>Call volume over time</p>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={data.byDay} margin={{ top:4, right:4, left:-20, bottom:0 }}>
                    <defs>
                      <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366F1" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.12} />
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" />
                    <XAxis dataKey="date" tick={{ fontSize:11, fill:"#9CA3AF" }} tickLine={false} axisLine={false} />
                    <YAxis tick={{ fontSize:11, fill:"#9CA3AF" }} tickLine={false} axisLine={false} />
                    <Tooltip content={<ChartTip />} />
                    <Area type="monotone" dataKey="calls" name="Total" stroke="#6366F1" strokeWidth={2} fill="url(#g1)" dot={false} />
                    <Area type="monotone" dataKey="answered" name="Answered" stroke="#10B981" strokeWidth={2} fill="url(#g2)" dot={false} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="rounded-2xl p-5 bg-white" style={{ border: "1px solid #E5E7EB" }}>
                <p className="text-sm font-semibold mb-4" style={{ color: "#0D1117" }}>Sentiment</p>
                {(data.sentiment ?? []).every(s => s.value === 0) ? (
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-sm" style={{ color: "#9CA3AF" }}>No calls yet</p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={data.sentiment ?? []} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value" paddingAngle={3} strokeWidth={0}>
                        {(data.sentiment ?? []).map((s, i) => <Cell key={i} fill={SENT_COLORS[s.name] ?? "#6B7280"} />)}
                      </Pie>
                      <Tooltip />
                      <Legend formatter={(v: string) => v.charAt(0)+v.slice(1).toLowerCase()} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
            <div className="mt-6 rounded-2xl p-5 bg-white" style={{ border: "1px solid #E5E7EB" }}>
              <p className="text-sm font-semibold mb-4" style={{ color: "#0D1117" }}>Answered vs Missed per day</p>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={data.byDay} margin={{ top:4, right:4, left:-20, bottom:0 }} barGap={2}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#F0F2F5" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize:11, fill:"#9CA3AF" }} tickLine={false} axisLine={false} />
                  <YAxis tick={{ fontSize:11, fill:"#9CA3AF" }} tickLine={false} axisLine={false} />
                  <Tooltip content={<ChartTip />} />
                  <Bar dataKey="answered" name="Answered" fill="#10B981" radius={[4,4,0,0]} />
                  <Bar dataKey="calls" name="Total" fill="#6366F1" radius={[4,4,0,0]} opacity={0.3} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </main>
    </>
  )
}
