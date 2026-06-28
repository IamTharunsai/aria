import { TopBar } from "@/components/layout/TopBar"
import { Mic2 } from "lucide-react"

export default function AgentPage() {
  return (
    <>
      <TopBar title="Voice Agent" subtitle="Configure ARIA's personality, knowledge, and behavior" />
      <main className="flex-1 p-6">
        <div
          className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center"
          style={{ border: "1px solid #E5E7EB", minHeight: "320px" }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "linear-gradient(135deg, rgba(20,71,230,0.1) 0%, rgba(14,165,233,0.1) 100%)" }}>
            <Mic2 size={24} style={{ color: "#1447E6" }} strokeWidth={1.8} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>Voice agent not configured</h3>
          <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
            Set up your AI receptionist's name, voice, and business knowledge to get started.
          </p>
        </div>
      </main>
    </>
  )
}
