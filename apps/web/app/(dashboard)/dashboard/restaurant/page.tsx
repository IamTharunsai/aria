"use client"
import { useState } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Plus, Trash2, UtensilsCrossed, Calendar, ChevronDown, ChevronUp, Loader2 } from "lucide-react"

type Tab = "menu" | "bookings" | "hours"

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

function TabBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
      style={{
        background: active ? "#1447E6" : "transparent",
        color: active ? "#fff" : "#6B7280",
      }}>
      {label}
    </button>
  )
}

export default function RestaurantPage() {
  const [tab, setTab] = useState<Tab>("menu")
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [form, setForm] = useState({ title: "", content: "", sourceUrl: "" })

  const { data: menuItems = [], refetch } = api.kb.list.useQuery({})
  const createItem = api.kb.create.useMutation({
    onSuccess: () => { setAdding(false); void refetch(); setForm({ title: "", content: "", sourceUrl: "" }) }
  })
  const deleteItem = api.kb.delete.useMutation({ onSuccess: () => void refetch() })

  const menuEntries = menuItems.filter(i => i.type === "FAQ" || i.type === "DOCUMENT")

  function handleAddItem() {
    createItem.mutate({ type: "FAQ", title: form.title, content: form.content, sourceUrl: form.sourceUrl || undefined })
  }

  return (
    <>
      <TopBar title="Restaurant Mode" subtitle="Menu, bookings, and business hours" />
      <main className="flex-1 overflow-auto p-6" style={{ background: "#F7F9FC" }}>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-2xl mb-6 w-fit"
          style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
          <TabBtn label="🍽 Menu" active={tab === "menu"} onClick={() => setTab("menu")} />
          <TabBtn label="📅 Bookings" active={tab === "bookings"} onClick={() => setTab("bookings")} />
          <TabBtn label="🕐 Hours" active={tab === "hours"} onClick={() => setTab("hours")} />
        </div>

        {/* ── Menu tab ── */}
        {tab === "menu" && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold" style={{ color: "#0D1117" }}>
                Menu items ({menuEntries.length})
              </h2>
              <button onClick={() => setAdding(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-semibold text-white cursor-pointer"
                style={{ background: "#1447E6" }}>
                <Plus size={15} /> Add item
              </button>
            </div>

            {adding && (
              <div className="mb-4 p-5 rounded-2xl bg-white" style={{ border: "1px solid #1447E630" }}>
                <h3 className="text-sm font-semibold mb-4" style={{ color: "#0D1117" }}>New menu item</h3>
                <div className="grid gap-3">
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                    placeholder="Item name (e.g. Margherita Pizza - $14)"
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                    style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                    onFocus={e => (e.target.style.borderColor = "#1447E6")}
                    onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
                  <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={2}
                    placeholder="Description, allergens, price, options..."
                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                    style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                    onFocus={e => (e.target.style.borderColor = "#1447E6")}
                    onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
                  <div className="flex gap-2">
                    <button onClick={handleAddItem} disabled={!form.title || !form.content || createItem.isPending}
                      className="px-4 py-2 rounded-xl text-sm font-semibold text-white cursor-pointer disabled:opacity-50"
                      style={{ background: "#1447E6" }}>
                      {createItem.isPending ? <Loader2 size={14} className="animate-spin inline" /> : "Save"}
                    </button>
                    <button onClick={() => setAdding(false)} className="px-4 py-2 rounded-xl text-sm cursor-pointer"
                      style={{ color: "#6B7280", border: "1px solid #E5E7EB" }}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {menuEntries.length === 0 && !adding ? (
              <div className="flex flex-col items-center justify-center h-52 rounded-3xl"
                style={{ background: "#fff", border: "2px dashed #E5E7EB" }}>
                <UtensilsCrossed size={28} style={{ color: "#D1D5DB" }} className="mb-3" />
                <p className="font-semibold" style={{ color: "#0D1117" }}>No menu items yet</p>
                <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>
                  Add items so ARIA can answer &ldquo;What&rsquo;s on the menu?&rdquo; questions
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {menuEntries.map(item => (
                  <div key={item.id} className="rounded-2xl bg-white overflow-hidden"
                    style={{ border: "1px solid #E5E7EB" }}>
                    <div className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-sm"
                        style={{ background: "rgba(20,71,230,0.08)" }}>
                        🍽
                      </div>
                      <p className="flex-1 text-sm font-semibold" style={{ color: "#0D1117" }}>{item.title}</p>
                      <div className="flex items-center gap-2">
                        <button onClick={e => { e.stopPropagation(); if (confirm("Delete?")) deleteItem.mutate(item.id) }}
                          className="p-1.5 rounded-lg cursor-pointer" style={{ color: "#D1D5DB" }}
                          onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
                          onMouseLeave={e => (e.currentTarget.style.color = "#D1D5DB")}>
                          <Trash2 size={14} />
                        </button>
                        {expandedId === item.id ? <ChevronUp size={14} style={{ color: "#9CA3AF" }} /> : <ChevronDown size={14} style={{ color: "#9CA3AF" }} />}
                      </div>
                    </div>
                    {expandedId === item.id && (
                      <div className="px-4 pb-4 pt-0">
                        <p className="text-sm leading-relaxed" style={{ color: "#6B7280", borderTop: "1px solid #F0F2F5", paddingTop: 12 }}>
                          {item.content}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Bookings tab ── */}
        {tab === "bookings" && (
          <div>
            <div className="mb-4 p-4 rounded-2xl" style={{ background: "rgba(20,71,230,0.06)", border: "1px solid rgba(20,71,230,0.15)" }}>
              <p className="text-sm font-semibold mb-1" style={{ color: "#1447E6" }}>How ARIA handles bookings</p>
              <p className="text-sm leading-relaxed" style={{ color: "#374151" }}>
                ARIA automatically books reservations via voice and SMS. Bookings are captured as call summaries
                and stored in your Calls log with appointment data. Connect a calendar (Google Calendar integration
                coming soon) to sync automatically.
              </p>
            </div>

            {/* Recent bookings from calls */}
            <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid #E5E7EB" }}>
              <div className="flex items-center gap-2 mb-4">
                <Calendar size={18} style={{ color: "#1447E6" }} />
                <p className="text-sm font-semibold" style={{ color: "#0D1117" }}>Recent appointment intents</p>
              </div>
              <p className="text-sm" style={{ color: "#9CA3AF" }}>
                When ARIA detects a booking request in a call, it appears here automatically.
                No calls with appointment data yet.
              </p>
            </div>
          </div>
        )}

        {/* ── Hours tab ── */}
        {tab === "hours" && (
          <div className="rounded-2xl bg-white p-6" style={{ border: "1px solid #E5E7EB" }}>
            <p className="text-sm font-semibold mb-5" style={{ color: "#0D1117" }}>Business hours</p>
            <div className="space-y-3">
              {DAYS.map(day => (
                <div key={day} className="flex items-center gap-4">
                  <p className="w-28 text-sm font-medium" style={{ color: "#374151" }}>{day}</p>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={day !== "Sunday"} />
                    <div className="w-10 h-5 rounded-full peer peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:rounded-full after:w-4 after:h-4 after:transition-all"
                      style={{ background: "#D1D5DB" }}
                      onMouseEnter={() => {}} />
                  </label>
                  <input type="time" defaultValue="09:00"
                    className="px-2 py-1.5 rounded-lg text-xs outline-none"
                    style={{ border: "1px solid #E5E7EB", color: "#0D1117" }} />
                  <span className="text-xs" style={{ color: "#9CA3AF" }}>to</span>
                  <input type="time" defaultValue="21:00"
                    className="px-2 py-1.5 rounded-lg text-xs outline-none"
                    style={{ border: "1px solid #E5E7EB", color: "#0D1117" }} />
                </div>
              ))}
            </div>
            <p className="text-xs mt-5" style={{ color: "#9CA3AF" }}>
              Hours are used by ARIA to answer &ldquo;Are you open?&rdquo; questions and route after-hours calls.
              Save will update your location settings.
            </p>
            <button className="mt-4 px-5 py-2.5 rounded-2xl text-sm font-semibold text-white cursor-pointer"
              style={{ background: "#1447E6" }}>
              Save hours
            </button>
          </div>
        )}
      </main>
    </>
  )
}
