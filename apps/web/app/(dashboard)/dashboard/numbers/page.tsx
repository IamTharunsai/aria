"use client"
import { useState } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Phone, Copy, Check, X, Plus, Pencil } from "lucide-react"

function Modal({ onClose, children }: { onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)" }}>
      <div className="relative w-full max-w-md rounded-3xl p-8 shadow-2xl" style={{ background: "#fff" }}>
        <button onClick={onClose} className="absolute top-5 right-5 p-1.5 rounded-xl cursor-pointer"
          style={{ color: "#6B7280" }}>
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  )
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  function copy() {
    void navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button onClick={copy} className="p-1.5 rounded-lg cursor-pointer transition-colors"
      style={{ color: copied ? "#16A34A" : "#9CA3AF" }}
      title="Copy">
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  )
}

export default function NumbersPage() {
  const { data: locations = [], refetch } = api.settings.getLocations.useQuery()
  const addPhone = api.settings.addPhoneNumber.useMutation({ onSuccess: () => { void refetch(); setShowAdd(false); setAddForm({ phone: "", locationId: "" }) } })

  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({ phone: "", locationId: "" })
  const [editId, setEditId] = useState<string | null>(null)
  const [editPhone, setEditPhone] = useState("")

  function handleEdit(locId: string, current: string) {
    setEditId(locId)
    setEditPhone(current)
  }

  function handleEditSave() {
    if (!editId) return
    addPhone.mutate({ phone: editPhone, locationId: editId })
    setEditId(null)
  }

  const WEBHOOK_URL = `${process.env.NEXT_PUBLIC_APP_URL ?? "https://your-domain.com"}/api/webhooks/twilio/sms`

  return (
    <>
      <TopBar title="Phone Numbers" subtitle="Manage Twilio numbers connected to ARIA" />
      <main className="flex-1 overflow-auto p-6" style={{ background: "#F7F9FC" }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold" style={{ color: "#0D1117" }}>Current numbers</h2>
          <button onClick={() => setShowAdd(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold text-white cursor-pointer"
            style={{ background: "#1447E6" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#0f38c7" }}
            onMouseLeave={e => { e.currentTarget.style.background = "#1447E6" }}>
            <Plus size={16} /> Add Number
          </button>
        </div>

        {locations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 rounded-3xl"
            style={{ background: "#fff", border: "2px dashed #E5E7EB" }}>
            <Phone size={28} style={{ color: "#D1D5DB" }} className="mb-3" />
            <p className="font-semibold" style={{ color: "#0D1117" }}>No locations found</p>
            <p className="text-sm mt-1" style={{ color: "#9CA3AF" }}>Add a phone number to a location to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {locations.map(loc => {
              const hasNumber = !!loc.phoneNumber
              const isEditing = editId === loc.id
              return (
                <div key={loc.id} className="flex items-center gap-4 p-5 rounded-2xl bg-white"
                  style={{ border: "1px solid #E5E7EB" }}>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(20,71,230,0.08)" }}>
                    <Phone size={18} style={{ color: "#1447E6" }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold" style={{ color: "#0D1117" }}>{loc.name}</p>
                    {isEditing ? (
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          value={editPhone}
                          onChange={e => setEditPhone(e.target.value)}
                          placeholder="+15555550001"
                          className="px-2 py-1 rounded-lg text-sm outline-none"
                          style={{ border: "1px solid #1447E6", color: "#0D1117", width: "180px" }}
                          autoFocus
                        />
                        <button onClick={handleEditSave}
                          className="px-3 py-1 rounded-lg text-xs font-semibold text-white cursor-pointer"
                          style={{ background: "#1447E6" }}>
                          Save
                        </button>
                        <button onClick={() => setEditId(null)}
                          className="px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer"
                          style={{ background: "#F7F9FC", color: "#6B7280", border: "1px solid #E5E7EB" }}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm font-mono mt-0.5" style={{ color: hasNumber ? "#0D1117" : "#9CA3AF" }}>
                        {hasNumber ? loc.phoneNumber : "No number assigned"}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2 py-0.5 rounded-lg text-[11px] font-semibold"
                      style={hasNumber
                        ? { background: "rgba(22,163,74,0.1)", color: "#16A34A" }
                        : { background: "rgba(107,114,128,0.1)", color: "#6B7280" }}>
                      {hasNumber ? "Active" : "Unassigned"}
                    </span>
                    {hasNumber && <CopyButton text={loc.phoneNumber!} />}
                    <button onClick={() => handleEdit(loc.id, loc.phoneNumber ?? "")}
                      className="p-1.5 rounded-lg cursor-pointer"
                      style={{ color: "#9CA3AF" }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#1447E6" }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#9CA3AF" }}
                      title="Edit">
                      <Pencil size={14} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>

      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <h3 className="text-lg font-bold mb-2" style={{ color: "#0D1117" }}>Add Twilio Number</h3>
          <p className="text-sm mb-4" style={{ color: "#6B7280" }}>
            To add a Twilio number, go to your Twilio console and configure the webhook URL below, then paste your number here.
          </p>
          <div className="rounded-xl p-3 mb-4 flex items-center gap-2"
            style={{ background: "#F7F9FC", border: "1px solid #E5E7EB" }}>
            <p className="text-xs font-mono flex-1 truncate" style={{ color: "#0D1117" }}>{WEBHOOK_URL}</p>
            <CopyButton text={WEBHOOK_URL} />
          </div>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "#0D1117" }}>Twilio phone number</label>
              <input
                value={addForm.phone}
                onChange={e => setAddForm(f => ({ ...f, phone: e.target.value }))}
                placeholder="+15555550001"
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                onFocus={e => (e.target.style.borderColor = "#1447E6")}
                onBlur={e => (e.target.style.borderColor = "#E5E7EB")}
              />
            </div>
            <div>
              <label className="text-xs font-semibold block mb-1.5" style={{ color: "#0D1117" }}>Assign to location</label>
              <select
                value={addForm.locationId}
                onChange={e => setAddForm(f => ({ ...f, locationId: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1px solid #E5E7EB", color: addForm.locationId ? "#0D1117" : "#9CA3AF", background: "#fff" }}
                onFocus={e => (e.target.style.borderColor = "#1447E6")}
                onBlur={e => (e.target.style.borderColor = "#E5E7EB")}>
                <option value="">Select a location…</option>
                {locations.map(loc => (
                  <option key={loc.id} value={loc.id}>{loc.name}</option>
                ))}
              </select>
            </div>
            <button
              onClick={() => addPhone.mutate({ phone: addForm.phone, locationId: addForm.locationId })}
              disabled={!addForm.phone || !addForm.locationId || addPhone.isPending}
              className="w-full py-3 rounded-2xl font-semibold text-white text-sm cursor-pointer disabled:opacity-50"
              style={{ background: "#1447E6" }}>
              {addPhone.isPending ? "Saving…" : "Save number"}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}
