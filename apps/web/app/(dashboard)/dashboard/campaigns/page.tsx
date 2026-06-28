"use client"
import { useState, useRef } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Plus, Send, Pause, Trash2, Loader2, X, MessageSquare, Phone, Upload } from "lucide-react"
import { format } from "date-fns"

const STATUS_STYLE: Record<string, { bg: string; color: string; label: string }> = {
  DRAFT:     { bg: "rgba(107,114,128,0.1)", color: "#6B7280", label: "Draft" },
  RUNNING:   { bg: "rgba(22,163,74,0.1)",   color: "#16A34A", label: "Running" },
  PAUSED:    { bg: "rgba(234,179,8,0.1)",   color: "#CA8A04", label: "Paused" },
  COMPLETED: { bg: "rgba(20,71,230,0.1)",   color: "#1447E6", label: "Done" },
  FAILED:    { bg: "rgba(239,68,68,0.1)",   color: "#EF4444", label: "Failed" },
}

interface CampaignStats { sent?: number }

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="relative w-full max-w-lg rounded-3xl p-8 shadow-2xl" style={{ background: "#fff" }}>
        <button onClick={onClose} className="absolute top-5 right-5 p-1.5 rounded-xl cursor-pointer"
          style={{ color: "#6B7280" }}>
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}

type CampaignType = "SMS" | "VOICE"

interface CSVRow { phone: string; name?: string; error?: string }

// ponytail: inline CSV parser, no library
function parseCSV(text: string): CSVRow[] {
  const lines = text.trim().split('\n')
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim())
  const phoneIdx = headers.indexOf('phone')
  const nameIdx = headers.indexOf('name')
  if (phoneIdx === -1) return [{ phone: '', error: 'No phone column found' }]
  return lines.slice(1).map(line => {
    const cols = line.split(',').map(c => c.trim().replace(/^"|"$/g, ''))
    const phone = cols[phoneIdx] ?? ''
    const name = nameIdx >= 0 ? cols[nameIdx] : undefined
    const valid = /^\+?[\d\s\-\(\)]{7,15}$/.test(phone.replace(/\s/g, ''))
    return { phone, name, error: valid ? undefined : `Invalid: ${phone}` }
  })
}

function CSVImport({ onImport }: { onImport: (phones: string) => void }) {
  const [rows, setRows] = useState<CSVRow[]>([])
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function processFile(file: File) {
    const reader = new FileReader()
    reader.onload = e => {
      const parsed = parseCSV(e.target?.result as string)
      setRows(parsed)
      const valid = parsed.filter(r => !r.error).map(r => r.phone)
      if (valid.length > 0) onImport(valid.join(', '))
    }
    reader.readAsText(file)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.name.endsWith('.csv')) processFile(file)
  }

  const errorCount = rows.filter(r => r.error && r.error !== 'No phone column found').length
  const validRows = rows.filter(r => !r.error)
  const preview = validRows.slice(0, 5)
  const more = validRows.length - 5

  return (
    <div>
      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className="flex flex-col items-center justify-center gap-2 rounded-xl cursor-pointer transition-colors"
        style={{
          border: `2px dashed ${dragging ? "#1447E6" : "#E5E7EB"}`,
          padding: "20px",
          background: dragging ? "rgba(20,71,230,0.04)" : "#F7F9FC",
        }}>
        <Upload size={20} style={{ color: "#6B7280" }} />
        <p className="text-sm font-medium" style={{ color: "#0D1117" }}>Drop CSV or click to browse</p>
        <p className="text-xs" style={{ color: "#9CA3AF" }}>Columns: phone (required), name (optional)</p>
        <input ref={fileRef} type="file" accept=".csv" className="hidden"
          onChange={e => { const f = e.target.files?.[0]; if (f) processFile(f) }} />
      </div>

      {rows.length > 0 && (
        <div className="mt-3 space-y-1.5">
          {errorCount > 0 && (
            <p className="text-xs font-medium" style={{ color: "#EF4444" }}>
              {errorCount} invalid row{errorCount !== 1 ? 's' : ''} skipped
            </p>
          )}
          {preview.map((r, i) => (
            <div key={i} className="flex items-center gap-2 text-xs px-2 py-1 rounded-lg"
              style={{ background: "rgba(20,71,230,0.06)", color: "#0D1117" }}>
              <span className="font-mono">{r.phone}</span>
              {r.name && <span style={{ color: "#6B7280" }}>· {r.name}</span>}
            </div>
          ))}
          {more > 0 && (
            <p className="text-xs pl-2" style={{ color: "#6B7280" }}>…and {more} more</p>
          )}
          {validRows.length > 0 && (
            <p className="text-xs font-semibold" style={{ color: "#16A34A" }}>
              {validRows.length} valid number{validRows.length !== 1 ? 's' : ''} imported
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function CampaignsPage() {
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ name: "", type: "SMS" as CampaignType, script: "", targets: "", scheduledAt: "" })

  const { data: campaigns = [], refetch } = api.campaigns.list.useQuery()
  const create = api.campaigns.create.useMutation({
    onSuccess: () => {
      setShowCreate(false)
      void refetch()
      setForm({ name: "", type: "SMS", script: "", targets: "", scheduledAt: "" })
    }
  })
  const launch = api.campaigns.launch.useMutation({ onSuccess: () => void refetch() })
  const pauseM = api.campaigns.pause.useMutation({ onSuccess: () => void refetch() })
  const del    = api.campaigns.delete.useMutation({ onSuccess: () => void refetch() })

  function handleCreate() {
    const targets = form.targets.split(/[\n,]+/).map(t => t.trim()).filter(Boolean)
    create.mutate({ name: form.name, type: form.type, script: form.script, targets, scheduledAt: form.scheduledAt || undefined })
  }

  return (
    <>
      <TopBar title="Campaigns" subtitle="Outbound SMS and voice broadcasts" />
      <main className="flex-1 overflow-auto p-6" style={{ background: "#F7F9FC" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold" style={{ color: "#0D1117" }}>All campaigns</h2>
          <button onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-white cursor-pointer transition-all"
            style={{ background: "#1447E6" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#0f38c7" }}
            onMouseLeave={e => { e.currentTarget.style.background = "#1447E6" }}>
            <Plus size={16} /> New campaign
          </button>
        </div>

        {campaigns.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 rounded-3xl"
            style={{ background: "#fff", border: "2px dashed #E5E7EB" }}>
            <Send size={28} style={{ color: "#D1D5DB" }} className="mb-3" />
            <p className="font-semibold" style={{ color: "#0D1117" }}>No campaigns yet</p>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>Create your first outbound SMS or voice campaign</p>
          </div>
        ) : (
          <div className="space-y-4">
            {campaigns.map(c => {
              const s = STATUS_STYLE[c.status] ?? STATUS_STYLE.DRAFT
              const targets = Array.isArray(c.targets) ? (c.targets as string[]).length : 0
              const stats = c.stats as CampaignStats | null
              return (
                <div key={c.id} className="flex items-center gap-4 p-5 rounded-2xl bg-white"
                  style={{ border: "1px solid #E5E7EB" }}>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center"
                    style={{ background: c.type === "SMS" ? "rgba(20,71,230,0.08)" : "rgba(14,165,233,0.08)" }}>
                    {c.type === "SMS"
                      ? <MessageSquare size={18} style={{ color: "#1447E6" }} />
                      : <Phone size={18} style={{ color: "#0EA5E9" }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <p className="font-semibold truncate" style={{ color: "#0D1117" }}>{c.name}</p>
                      <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold"
                        style={{ background: s.bg, color: s.color }}>{s.label}</span>
                    </div>
                    <p className="text-xs" style={{ color: "#9CA3AF" }}>
                      {targets} recipients · {c.type}
                      {c.scheduledAt ? ` · Scheduled ${format(new Date(c.scheduledAt), "MMM d, h:mm a")}` : ""}
                      {stats?.sent != null ? ` · Sent ${stats.sent}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {c.status === "DRAFT" && (
                      <button onClick={() => launch.mutate(c.id)} disabled={launch.isPending}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                        style={{ background: "rgba(22,163,74,0.1)", color: "#16A34A" }}>
                        {launch.isPending ? <Loader2 size={12} className="animate-spin" /> : <Send size={12} />} Launch
                      </button>
                    )}
                    {c.status === "RUNNING" && (
                      <button onClick={() => pauseM.mutate(c.id)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
                        style={{ background: "rgba(234,179,8,0.1)", color: "#CA8A04" }}>
                        <Pause size={12} /> Pause
                      </button>
                    )}
                    <button onClick={() => { if (confirm("Delete this campaign?")) del.mutate(c.id) }}
                      className="p-1.5 rounded-xl cursor-pointer transition-colors"
                      style={{ color: "#D1D5DB" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#EF4444")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#D1D5DB")}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {showCreate && (
        <Modal onClose={() => setShowCreate(false)}>
          <h3 className="text-lg font-bold mb-5" style={{ color: "#0D1117" }}>New campaign</h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "#0D1117" }}>Name</label>
              <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                placeholder="e.g. Summer promo"
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                onFocus={e => (e.target.style.borderColor = "#1447E6")}
                onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "#0D1117" }}>Type</label>
              <div className="flex gap-2">
                {(["SMS", "VOICE"] as CampaignType[]).map(t => (
                  <button key={t} onClick={() => setForm(f => ({ ...f, type: t }))}
                    className="flex-1 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all"
                    style={{
                      background: form.type === t ? "#1447E6" : "#F7F9FC",
                      color: form.type === t ? "#fff" : "#6B7280",
                      border: `1px solid ${form.type === t ? "#1447E6" : "#E5E7EB"}`,
                    }}>
                    {t === "SMS" ? "📱 SMS" : "📞 Voice"}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "#0D1117" }}>Message / Script</label>
              <textarea value={form.script} onChange={e => setForm(f => ({ ...f, script: e.target.value }))} rows={3}
                placeholder="Hi, we have a special offer just for you..."
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                onFocus={e => (e.target.style.borderColor = "#1447E6")}
                onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold" style={{ color: "#0D1117" }}>
                  Phone numbers (one per line or comma-separated)
                </label>
              </div>
              <textarea value={form.targets} onChange={e => setForm(f => ({ ...f, targets: e.target.value }))} rows={3}
                placeholder="+15555550001, +15555550002..."
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none"
                style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                onFocus={e => (e.target.style.borderColor = "#1447E6")}
                onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
              <div className="mt-2">
                <p className="text-xs font-semibold mb-1.5" style={{ color: "#6B7280" }}>Or import from CSV</p>
                <CSVImport onImport={phones => setForm(f => ({ ...f, targets: phones }))} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "#0D1117" }}>Schedule (optional)</label>
              <input type="datetime-local" value={form.scheduledAt}
                onChange={e => setForm(f => ({ ...f, scheduledAt: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                onFocus={e => (e.target.style.borderColor = "#1447E6")}
                onBlur={e => (e.target.style.borderColor = "#E5E7EB")} />
            </div>
            <button onClick={handleCreate}
              disabled={!form.name || !form.script || !form.targets || create.isPending}
              className="w-full py-3 rounded-2xl font-semibold text-white text-sm cursor-pointer disabled:opacity-50"
              style={{ background: "#1447E6" }}>
              {create.isPending ? "Creating..." : "Create campaign"}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
