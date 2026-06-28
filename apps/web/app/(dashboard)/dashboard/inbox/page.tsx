import { TopBar } from "@/components/layout/TopBar"
import { MessageSquare } from "lucide-react"

export default function InboxPage() {
  return (
    <>
      <TopBar title="Inbox" subtitle="SMS, WhatsApp, and live chat conversations" />
      <main className="flex-1 p-6">
        <div
          className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center"
          style={{ border: "1px solid #E5E7EB", minHeight: "320px" }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(14,165,233,0.08)" }}>
            <MessageSquare size={24} style={{ color: "#0EA5E9" }} strokeWidth={1.8} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>No messages yet</h3>
          <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
            Incoming SMS and WhatsApp messages will appear here.
          </p>
        </div>
      </main>
    </>
  )
}
