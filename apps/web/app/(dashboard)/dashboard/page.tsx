import { TopBar } from "@/components/layout/TopBar"
import { Phone, MessageSquare, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Calls Today",
    value: "0",
    change: "+0%",
    icon: Phone,
    color: "#1447E6",
    bg: "rgba(20,71,230,0.08)",
  },
  {
    label: "Active Conversations",
    value: "0",
    change: "+0%",
    icon: MessageSquare,
    color: "#0EA5E9",
    bg: "rgba(14,165,233,0.08)",
  },
  {
    label: "Contacts",
    value: "0",
    change: "+0%",
    icon: Users,
    color: "#16A34A",
    bg: "rgba(22,163,74,0.08)",
  },
  {
    label: "Calls Resolved",
    value: "0%",
    change: "+0%",
    icon: TrendingUp,
    color: "#6B7280",
    bg: "rgba(107,114,128,0.08)",
  },
]

export default function DashboardPage() {
  return (
    <>
      <TopBar title="Dashboard" subtitle="Welcome back — here's what's happening" />

      <main className="flex-1 p-6 space-y-6">
        {/* Stats grid */}
        <div className="grid grid-cols-4 gap-4">
          {stats.map(({ label, value, change, icon: Icon, color, bg }) => (
            <div
              key={label}
              className="rounded-2xl p-5 bg-white"
              style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: bg }}
                >
                  <Icon size={18} style={{ color }} strokeWidth={2} />
                </div>
                <span className="text-xs font-medium" style={{ color: "#16A34A" }}>
                  {change}
                </span>
              </div>
              <p className="text-2xl font-bold tracking-tight" style={{ color: "#0D1117" }}>
                {value}
              </p>
              <p className="text-sm mt-0.5" style={{ color: "#6B7280" }}>
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Empty state activity */}
        <div
          className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center"
          style={{
            border: "1px solid #E5E7EB",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            minHeight: "260px",
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(20,71,230,0.08)" }}
          >
            <Phone size={24} style={{ color: "#1447E6" }} strokeWidth={1.8} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>
            No calls yet
          </h3>
          <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
            Connect a phone number to your voice agent and calls will appear here in real time.
          </p>
        </div>
      </main>
    </>
  )
}
