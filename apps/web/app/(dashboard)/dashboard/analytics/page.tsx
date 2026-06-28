import { TopBar } from "@/components/layout/TopBar"
import { BarChart2 } from "lucide-react"

export default function AnalyticsPage() {
  return (
    <>
      <TopBar title="Analytics" subtitle="Call volume, sentiment, and resolution trends" />
      <main className="flex-1 p-6">
        <div
          className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center"
          style={{ border: "1px solid #E5E7EB", minHeight: "320px" }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(20,71,230,0.08)" }}>
            <BarChart2 size={24} style={{ color: "#1447E6" }} strokeWidth={1.8} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>No data yet</h3>
          <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
            Analytics charts will populate as your voice agent handles calls and messages.
          </p>
        </div>
      </main>
    </>
  )
}
