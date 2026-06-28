"use client"
import { useState } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { formatDistanceToNow } from "date-fns"
import { MessageSquare, Phone, Send, Loader2, X } from "lucide-react"

const CHANNEL_COLORS: Record<string, { bg: string; color: string; label: string }> = {
  SMS:       { bg: "rgba(99,102,241,0.08)",  color: "#6366F1", label: "SMS"       },
  WHATSAPP:  { bg: "rgba(22,163,74,0.08)",  color: "#16A34A", label: "WhatsApp"  },
  FACEBOOK:  { bg: "rgba(59,130,246,0.08)", color: "#3B82F6", label: "Facebook"  },
  INSTAGRAM: { bg: "rgba(236,72,153,0.08)", color: "#EC4899", label: "Instagram" },
  LIVE_CHAT: { bg: "rgba(14,165,233,0.08)", color: "#0EA5E9", label: "Live Chat" },
}

export default function InboxPage() {
  const [activeId, setActiveId] = useState<string | null>(null)
  const [reply, setReply] = useState("")

  const { data: convos = [], refetch } = api.inbox.conversations.useQuery(
    { status: "OPEN" },
    { refetchInterval: 10_000 }
  )
  const { data: thread, refetch: refetchThread } = api.inbox.thread.useQuery(
    activeId ?? "",
    { enabled: !!activeId, refetchInterval: 5_000 }
  )
  const send = api.inbox.sendMessage.useMutation({
    onSuccess: () => { setReply(""); refetchThread(); refetch() }
  })
  const close = api.inbox.closeConversation.useMutation({ onSuccess: () => { setActiveId(null); refetch() } })

  const activeConvo = convos.find((c) => c.id === activeId)
  const ch = CHANNEL_COLORS[activeConvo?.channel ?? "SMS"] ?? CHANNEL_COLORS.SMS

  function handleSend() {
    if (!reply.trim() || !activeId) return
    send.mutate({ conversationId: activeId, body: reply.trim() })
  }

  return (
    <>
      <TopBar title="Inbox" subtitle={`${convos.length} open conversations`} />
      <main className="flex-1 flex overflow-hidden" style={{ height: "calc(100vh - 68px)" }}>

        {/* Conversation list */}
        <aside className="w-72 flex-shrink-0 overflow-y-auto"
          style={{ borderRight: "1px solid #E5E7EB", background: "#fff" }}>
          {convos.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare size={24} style={{ color: "#6B7280" }} className="mx-auto mb-2" />
              <p className="text-sm font-medium" style={{ color: "#0D1117" }}>No open conversations</p>
              <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                Inbound SMS and WhatsApp messages will appear here.
              </p>
            </div>
          ) : convos.map((conv) => {
            const c = CHANNEL_COLORS[conv.channel] ?? CHANNEL_COLORS.SMS
            const last = conv.messages[0]
            return (
              <button key={conv.id} onClick={() => setActiveId(conv.id)}
                className="w-full text-left px-4 py-3 transition-colors duration-100 cursor-pointer"
                style={{
                  background: activeId === conv.id ? "#F7F9FC" : "transparent",
                  borderBottom: "1px solid #F0F2F5",
                  borderLeft: activeId === conv.id ? "3px solid #1447E6" : "3px solid transparent",
                }}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-semibold truncate" style={{ color: "#0D1117" }}>
                    {conv.contact?.name ?? conv.contact?.phone ?? "Unknown"}
                  </p>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium"
                    style={{ color: c.color, background: c.bg }}>{c.label}</span>
                </div>
                <p className="text-xs truncate" style={{ color: "#6B7280" }}>
                  {last?.content ?? "No messages yet"}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: "#9CA3AF" }}>
                  {conv.updatedAt ? formatDistanceToNow(new Date(conv.updatedAt), { addSuffix: true }) : ""}
                </p>
              </button>
            )
          })}
        </aside>

        {/* Message thread */}
        <div className="flex-1 flex flex-col">
          {!activeId ? (
            <div className="flex-1 flex flex-col items-center justify-center" style={{ background: "#F7F9FC" }}>
              <MessageSquare size={32} style={{ color: "#E5E7EB" }} className="mb-3" />
              <p className="text-sm" style={{ color: "#6B7280" }}>Select a conversation to view messages</p>
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div className="px-5 py-3 flex items-center gap-3 bg-white"
                style={{ borderBottom: "1px solid #E5E7EB" }}>
                <div>
                  <p className="text-sm font-semibold" style={{ color: "#0D1117" }}>
                    {activeConvo?.contact?.name ?? activeConvo?.contact?.phone}
                  </p>
                  <p className="text-xs" style={{ color: "#6B7280" }}>
                    {activeConvo?.contact?.phone} · {ch.label}
                  </p>
                </div>
                <div className="ml-auto flex gap-2">
                  <button onClick={() => close.mutate(activeId)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium cursor-pointer transition-colors"
                    style={{ border: "1px solid #E5E7EB", color: "#6B7280" }}>
                    <X size={12} /> Close
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-5 space-y-3" style={{ background: "#F7F9FC" }}>
                {thread?.messages.map((msg) => {
                  const isOut = msg.direction === "OUTBOUND"
                  return (
                    <div key={msg.id} className={`flex ${isOut ? "justify-end" : "justify-start"}`}>
                      <div className="max-w-[70%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                        style={{
                          background: isOut ? "#1447E6" : "#fff",
                          color:      isOut ? "#fff" : "#0D1117",
                          border:     isOut ? "none" : "1px solid #E5E7EB",
                          borderBottomRightRadius: isOut ? "4px" : "16px",
                          borderBottomLeftRadius:  isOut ? "16px" : "4px",
                        }}>
                        <p>{msg.content}</p>
                        <p className="text-[10px] mt-1" style={{ color: isOut ? "rgba(255,255,255,0.6)" : "#9CA3AF" }}>
                          {formatDistanceToNow(new Date(msg.sentAt), { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Reply input */}
              <div className="p-4 bg-white" style={{ borderTop: "1px solid #E5E7EB" }}>
                <div className="flex gap-2">
                  <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                    rows={2}
                    placeholder={`Reply via ${ch.label}…`}
                    className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                    style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                    onFocus={(e) => (e.target.style.borderColor = "#1447E6")}
                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                  />
                  <button onClick={handleSend}
                    disabled={!reply.trim() || send.isPending}
                    className="w-10 h-10 rounded-xl flex items-center justify-center self-end text-white transition-all cursor-pointer disabled:opacity-50"
                    style={{ background: "#1447E6" }}>
                    {send.isPending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  </button>
                </div>
                <p className="text-[11px] mt-1.5" style={{ color: "#9CA3AF" }}>Enter to send · Shift+Enter for new line</p>
              </div>
            </>
          )}
        </div>
      </main>
    </>
  )
}
