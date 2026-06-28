import { TopBar } from "@/components/layout/TopBar"
import { Users } from "lucide-react"

export default function ContactsPage() {
  return (
    <>
      <TopBar title="Contacts" subtitle="Customer contact book with call history" />
      <main className="flex-1 p-6">
        <div
          className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center"
          style={{ border: "1px solid #E5E7EB", minHeight: "320px" }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(22,163,74,0.08)" }}>
            <Users size={24} style={{ color: "#16A34A" }} strokeWidth={1.8} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>No contacts yet</h3>
          <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
            Contacts are created automatically when customers call or message your business.
          </p>
        </div>
      </main>
    </>
  )
}
