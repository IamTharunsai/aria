import { TopBar } from "@/components/layout/TopBar"
import { Settings } from "lucide-react"

export default function SettingsPage() {
  return (
    <>
      <TopBar title="Settings" subtitle="Organization, billing, and integration settings" />
      <main className="flex-1 p-6">
        <div
          className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center"
          style={{ border: "1px solid #E5E7EB", minHeight: "320px" }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(107,114,128,0.08)" }}>
            <Settings size={24} style={{ color: "#6B7280" }} strokeWidth={1.8} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>Settings</h3>
          <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
            Organization settings, billing, and API integrations will be configured here.
          </p>
        </div>
      </main>
    </>
  )
}
