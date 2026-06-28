"use client"
import { useState, useEffect } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { useOrganization } from "@clerk/nextjs"
import {
  Mic2, FileText, Globe, MessageSquare, Plus, Trash2, Upload, Loader2,
  ChevronDown, ChevronUp, Phone, Clock, Languages, User,
} from "lucide-react"

// ── Knowledge Base helpers ───────────────────────────────────────────────────
const KB_ICONS: Record<string, React.ReactNode> = {
  FAQ:      <MessageSquare size={14} />,
  DOCUMENT: <FileText size={14} />,
  WEBPAGE:  <Globe size={14} />,
  CUSTOM:   <FileText size={14} />,
}
const TYPE_COLORS: Record<string, string> = {
  FAQ: "#1447E6", DOCUMENT: "#7C3AED", WEBPAGE: "#0EA5E9", CUSTOM: "#6B7280",
}

// ── Language data ────────────────────────────────────────────────────────────
const INDIA_LANGS: [string, string][] = [
  ["hi","Hindi"],["bn","Bengali"],["te","Telugu"],["mr","Marathi"],["ta","Tamil"],
  ["ur","Urdu"],["gu","Gujarati"],["kn","Kannada"],["ml","Malayalam"],["pa","Punjabi"],
  ["or","Odia"],["as","Assamese"],["mai","Maithili"],["sa","Sanskrit"],["kok","Konkani"],
  ["ne","Nepali"],["si","Sinhala"],["sd","Sindhi"],["bho","Bhojpuri"],["raj","Rajasthani"],
  ["awa","Awadhi"],["mag","Magahi"],
]
const US_LANGS: [string, string][] = [
  ["en","English"],["es","Spanish"],["zh","Chinese (Mandarin)"],["tl","Tagalog"],
  ["vi","Vietnamese"],["ar","Arabic"],["fr","French"],["ko","Korean"],["ru","Russian"],
  ["ht","Haitian Creole"],["de","German"],["hi","Hindi"],["pt","Portuguese"],["it","Italian"],
]

// ── Hours data ───────────────────────────────────────────────────────────────
const DAYS = ["monday","tuesday","wednesday","thursday","friday","saturday","sunday"] as const
type Day = typeof DAYS[number]
type DayHours = { open: boolean; from: string; to: string }
type HoursJson = Record<string, DayHours>

const DEFAULT_HOURS: HoursJson = Object.fromEntries(
  DAYS.map((d) => [d, { open: d !== "sunday", from: "09:00", to: "21:00" }])
)

// ── Shared input style helpers ────────────────────────────────────────────────
const inputBase: React.CSSProperties = { border: "1px solid #E5E7EB", color: "#0D1117" }
function focusBlue(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = "#1447E6"
}
function blurGray(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = "#E5E7EB"
}

// ── TabBtn (same pill pattern used throughout the dashboard) ─────────────────
function TabBtn({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer"
      style={{
        background: active ? "#fff" : "transparent",
        color:      active ? "#0D1117" : "#6B7280",
        boxShadow:  active ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
      }}>
      {children}
    </button>
  )
}

// ── Save button ───────────────────────────────────────────────────────────────
function SaveBtn({ pending, onClick, label = "Save Changes" }: { pending: boolean; onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick} disabled={pending}
      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all cursor-pointer disabled:opacity-50"
      style={{ background: "#1447E6" }}>
      {pending ? <Loader2 size={14} className="animate-spin" /> : null}
      {label}
    </button>
  )
}

// ────────────────────────────────────────────────────────────────────────────
type MainTab = "kb" | "identity" | "languages" | "hours" | "handoff"
type AddMode = "faq" | "url" | "upload" | null

export default function AgentPage() {
  const locationId = "default" // ponytail: multi-location picker comes in Phase 5

  const [tab, setTab] = useState<MainTab>("kb")
  const [addMode, setAddMode] = useState<AddMode>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  // ── Data ──────────────────────────────────────────────────────────────────
  const { data: items = [], refetch } = api.kb.list.useQuery({ locationId })
  const createKb = api.kb.create.useMutation({ onSuccess: () => { refetch(); setAddMode(null) } })
  const deleteKb = api.kb.delete.useMutation({ onSuccess: () => refetch() })

  const { data: config } = api.agent.getConfig.useQuery(locationId)
  const updateAgent  = api.agent.updateLocation.useMutation()
  const setLanguages = api.agent.setLanguages.useMutation()
  const setHours     = api.agent.setHours.useMutation()
  const saveHumanPhoneMut = api.agent.setHumanPhone.useMutation()
  const setSafety = api.agent.setSafety.useMutation()

  // ── Barge-in state ────────────────────────────────────────────────────────
  const { data: safetyData } = api.agent.getSafety.useQuery(locationId)
  const [bargeIn, setBargeIn] = useState(true)
  useEffect(() => {
    if (safetyData?.bargeInEnabled !== undefined) setBargeIn(safetyData.bargeInEnabled)
  }, [safetyData])

  // ── Identity form state ───────────────────────────────────────────────────
  const [agentName, setAgentName] = useState("")
  const [greeting,  setGreeting]  = useState("")
  useEffect(() => {
    if (config) {
      setAgentName(config.agentName ?? "")
      setGreeting(config.greetingMsg ?? "")
    }
  }, [config])

  // ── KB form state ─────────────────────────────────────────────────────────
  const [faqQ, setFaqQ] = useState("")
  const [faqA, setFaqA] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [urlLoading, setUrlLoading] = useState(false)

  // ── Languages state ───────────────────────────────────────────────────────
  const [langs, setLangs] = useState<Set<string>>(new Set(["en"]))
  useEffect(() => {
    if (config?.languages?.length) setLangs(new Set(config.languages as string[]))
    else setLangs(new Set(["en"]))
  }, [config])

  // ── Hours state ───────────────────────────────────────────────────────────
  const [hours, setHoursState] = useState<HoursJson>(DEFAULT_HOURS)
  const [sameEveryDay, setSameEveryDay] = useState(false)
  useEffect(() => {
    if (config?.hoursJson) {
      // Prisma returns JsonValue; cast safely
      setHoursState(config.hoursJson as HoursJson)
    }
  }, [config])

  // ── Handoff state ─────────────────────────────────────────────────────────
  const [humanPhone, setHumanPhone] = useState("")
  useEffect(() => { if (config?.humanPhone) setHumanPhone(config.humanPhone) }, [config])

  // ── Handlers ─────────────────────────────────────────────────────────────
  async function handleAddFaq() {
    if (!faqQ || !faqA) return
    createKb.mutate({ locationId, type: "FAQ", title: faqQ, content: faqA })
    setFaqQ(""); setFaqA("")
  }

  async function handleScrapeUrl() {
    if (!urlInput) return
    setUrlLoading(true)
    try {
      const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
      const res = await fetch(`${API}/api/kb/scrape`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput }),
      })
      const { title, content } = await res.json()
      createKb.mutate({ locationId, type: "WEBPAGE", title, content, sourceUrl: urlInput })
      setUrlInput("")
    } finally { setUrlLoading(false) }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const form = new FormData()
    form.append("file", file)
    const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000"
    const res = await fetch(`${API}/api/kb/extract`, { method: "POST", body: form })
    const { title, content } = await res.json()
    createKb.mutate({ locationId, type: "DOCUMENT", title, content })
    e.target.value = ""
  }

  function handleSaveIdentity() {
    updateAgent.mutate({ id: locationId, agentName, greetingMsg: greeting })
  }

  function toggleLang(code: string) {
    if (code === "en") return // always on
    const next = new Set(langs)
    if (next.has(code)) next.delete(code)
    else next.add(code)
    setLangs(next)
    setLanguages.mutate({ locationId, languages: Array.from(next) })
  }

  function updateDay(day: Day, field: keyof DayHours, value: string | boolean) {
    if (sameEveryDay) {
      // Apply to all days
      setHoursState((prev) =>
        Object.fromEntries(DAYS.map((d) => [d, { ...prev[d], [field]: value }]))
      )
    } else {
      setHoursState((prev) => ({ ...prev, [day]: { ...prev[day], [field]: value } }))
    }
  }

  function handleSaveHours() {
    setHours.mutate({ locationId, hoursJson: hours })
  }

  function handleSaveHandoff() {
    saveHumanPhoneMut.mutate({ locationId, humanPhone })
  }

  // ── Tab definitions ───────────────────────────────────────────────────────
  const TABS: { id: MainTab; label: string }[] = [
    { id: "kb",        label: "Knowledge Base" },
    { id: "identity",  label: "Identity"       },
    { id: "languages", label: "Languages"      },
    { id: "hours",     label: "Hours"          },
    { id: "handoff",   label: "Handoff"        },
  ]

  return (
    <>
      <TopBar title="Voice Agent" subtitle="Configure ARIA's knowledge and personality" />
      <main className="flex-1 p-6">

        {/* Tab bar */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: "#F0F2F5" }}>
          {TABS.map((t) => (
            <TabBtn key={t.id} active={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
            </TabBtn>
          ))}
        </div>

        {/* ── Knowledge Base ── */}
        {tab === "kb" && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex gap-2">
              {([
                { mode: "faq"    as AddMode, label: "Add FAQ",    icon: <MessageSquare size={14} /> },
                { mode: "url"    as AddMode, label: "Add Webpage", icon: <Globe size={14} /> },
                { mode: "upload" as AddMode, label: "Upload Doc",  icon: <Upload size={14} /> },
              ]).map(({ mode, label, icon }) => (
                <button key={mode}
                  onClick={() => setAddMode(addMode === mode ? null : mode)}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer"
                  style={{
                    background: addMode === mode ? "#1447E6" : "#fff",
                    color:      addMode === mode ? "#fff" : "#0D1117",
                    border:     `1px solid ${addMode === mode ? "#1447E6" : "#E5E7EB"}`,
                  }}>
                  {icon}{label}
                </button>
              ))}
            </div>

            {addMode === "faq" && (
              <div className="rounded-2xl bg-white p-4 space-y-3" style={{ border: "1px solid #E5E7EB" }}>
                <input value={faqQ} onChange={(e) => setFaqQ(e.target.value)}
                  placeholder="Question — e.g. What are your opening hours?"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={inputBase} onFocus={focusBlue} onBlur={blurGray} />
                <textarea value={faqA} onChange={(e) => setFaqA(e.target.value)}
                  rows={3} placeholder="Answer — ARIA will say this verbatim"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                  style={inputBase} onFocus={focusBlue} onBlur={blurGray} />
                <button onClick={handleAddFaq} disabled={!faqQ || !faqA || createKb.isPending}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all cursor-pointer disabled:opacity-50"
                  style={{ background: "#1447E6" }}>
                  {createKb.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Save FAQ
                </button>
              </div>
            )}

            {addMode === "url" && (
              <div className="rounded-2xl bg-white p-4 flex gap-2" style={{ border: "1px solid #E5E7EB" }}>
                <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://yourwebsite.com/about"
                  className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={inputBase} onFocus={focusBlue} onBlur={blurGray} />
                <button onClick={handleScrapeUrl} disabled={!urlInput || urlLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all cursor-pointer disabled:opacity-50"
                  style={{ background: "#1447E6" }}>
                  {urlLoading ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
                  Scrape
                </button>
              </div>
            )}

            {addMode === "upload" && (
              <label className="rounded-2xl bg-white p-6 flex flex-col items-center justify-center cursor-pointer transition-all"
                style={{ border: "2px dashed #E5E7EB" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#1447E6")}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#E5E7EB")}>
                <Upload size={24} style={{ color: "#6B7280" }} className="mb-2" />
                <p className="text-sm font-medium" style={{ color: "#0D1117" }}>Drop PDF or TXT here</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>Max 10 MB</p>
                <input type="file" accept=".pdf,.txt" className="hidden" onChange={handleFileUpload} />
              </label>
            )}

            <div className="space-y-2">
              {items.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center" style={{ border: "1px solid #E5E7EB" }}>
                  <Mic2 size={24} style={{ color: "#6B7280" }} className="mx-auto mb-2" />
                  <p className="text-sm font-medium" style={{ color: "#0D1117" }}>No knowledge items yet</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                    Add FAQs, webpages, or documents so ARIA can answer customer questions.
                  </p>
                </div>
              ) : items.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white overflow-hidden transition-all"
                  style={{ border: "1px solid #E5E7EB" }}>
                  <div className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                    onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-lg text-xs font-medium"
                      style={{ color: TYPE_COLORS[item.type], background: `${TYPE_COLORS[item.type]}15` }}>
                      {KB_ICONS[item.type]}{item.type}
                    </span>
                    <p className="flex-1 text-sm font-medium truncate" style={{ color: "#0D1117" }}>{item.title}</p>
                    <button onClick={(e) => { e.stopPropagation(); deleteKb.mutate(item.id) }}
                      className="p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                      style={{ color: "#6B7280" }}>
                      <Trash2 size={14} />
                    </button>
                    {expanded === item.id
                      ? <ChevronUp size={14} style={{ color: "#6B7280" }} />
                      : <ChevronDown size={14} style={{ color: "#6B7280" }} />}
                  </div>
                  {expanded === item.id && (
                    <div className="px-4 pb-4 pt-0">
                      <p className="text-sm whitespace-pre-wrap leading-relaxed"
                        style={{ color: "#6B7280", borderTop: "1px solid #E5E7EB", paddingTop: "12px" }}>
                        {item.content.slice(0, 500)}{item.content.length > 500 ? "…" : ""}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Identity ── */}
        {tab === "identity" && (
          <div className="max-w-xl space-y-4">
            <div className="rounded-2xl bg-white p-5 space-y-4" style={{ border: "1px solid #E5E7EB" }}>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B7280" }}>
                  Agent Name
                </label>
                <input value={agentName} onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g. Aria, Luna, Alex"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={inputBase} onFocus={focusBlue} onBlur={blurGray} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B7280" }}>
                  Greeting Message
                </label>
                <textarea value={greeting} onChange={(e) => setGreeting(e.target.value)}
                  rows={3} placeholder="Hi! Thanks for calling [Business Name]. How can I help you today?"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                  style={inputBase} onFocus={focusBlue} onBlur={blurGray} />
              </div>
              <SaveBtn pending={updateAgent.isPending} onClick={handleSaveIdentity} />
            </div>

            {/* Barge-in toggle */}
            <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid #E5E7EB" }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: "#0D1117" }}>Barge-in (Voice Interruption)</p>
                  <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                    ARIA stops speaking immediately when the caller interrupts.
                  </p>
                </div>
                <button
                  role="switch"
                  aria-checked={bargeIn}
                  onClick={() => {
                    const next = !bargeIn
                    setBargeIn(next)
                    setSafety.mutate({ locationId, safetyJson: safetyData?.safetyJson ?? {}, bargeInEnabled: next })
                  }}
                  style={{
                    width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer",
                    background: bargeIn ? "#1447E6" : "#E5E7EB", position: "relative", transition: "background 0.2s",
                  }}>
                  <span style={{
                    position: "absolute", top: 3, left: bargeIn ? 23 : 3,
                    width: 18, height: 18, borderRadius: "50%", background: "#fff",
                    transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                  }} />
                </button>
              </div>
            </div>

            <div className="rounded-2xl p-4"
              style={{ background: "rgba(20,71,230,0.05)", border: "1px solid rgba(20,71,230,0.15)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#1447E6" }}>Next step</p>
              <p className="text-sm" style={{ color: "#0D1117" }}>
                After saving, go to Vapi dashboard to create an assistant and set the webhook URL to your API endpoint.
              </p>
            </div>
          </div>
        )}

        {/* ── Languages ── */}
        {tab === "languages" && (
          <div className="max-w-3xl space-y-4">
            <p className="text-sm" style={{ color: "#6B7280" }}>
              Select languages ARIA should understand and respond in. English is always enabled.
              Changes auto-save on toggle.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {/* India */}
              <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid #E5E7EB" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Languages size={16} style={{ color: "#1447E6" }} />
                  <p className="text-sm font-semibold" style={{ color: "#0D1117" }}>India</p>
                  <span className="text-xs px-1.5 py-0.5 rounded-md ml-auto"
                    style={{ background: "#F0F2F5", color: "#6B7280" }}>
                    {INDIA_LANGS.filter(([c]) => langs.has(c)).length} / {INDIA_LANGS.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {INDIA_LANGS.map(([code, label]) => {
                    const checked = langs.has(code)
                    const locked = code === "en"
                    return (
                      <label key={code}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors"
                        style={{ background: checked ? "rgba(20,71,230,0.04)" : "transparent" }}
                        onMouseEnter={(e) => { if (!checked) e.currentTarget.style.background = "#F7F9FC" }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = checked ? "rgba(20,71,230,0.04)" : "transparent" }}>
                        <input type="checkbox" checked={checked} disabled={locked}
                          onChange={() => toggleLang(code)}
                          className="rounded cursor-pointer"
                          style={{ accentColor: "#1447E6" }} />
                        <span className="text-sm" style={{ color: "#0D1117" }}>{label}</span>
                        <span className="text-xs ml-auto" style={{ color: "#6B7280" }}>{code}</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {/* USA */}
              <div className="rounded-2xl bg-white p-5" style={{ border: "1px solid #E5E7EB" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Languages size={16} style={{ color: "#0EA5E9" }} />
                  <p className="text-sm font-semibold" style={{ color: "#0D1117" }}>USA</p>
                  <span className="text-xs px-1.5 py-0.5 rounded-md ml-auto"
                    style={{ background: "#F0F2F5", color: "#6B7280" }}>
                    {US_LANGS.filter(([c]) => langs.has(c)).length} / {US_LANGS.length}
                  </span>
                </div>
                <div className="space-y-1">
                  {US_LANGS.map(([code, label]) => {
                    const checked = langs.has(code)
                    const locked = code === "en"
                    return (
                      <label key={`us-${code}`}
                        className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg cursor-pointer transition-colors"
                        style={{ background: checked ? "rgba(14,165,233,0.06)" : "transparent" }}
                        onMouseEnter={(e) => { if (!checked) e.currentTarget.style.background = "#F7F9FC" }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = checked ? "rgba(14,165,233,0.06)" : "transparent" }}>
                        <input type="checkbox" checked={checked} disabled={locked}
                          onChange={() => toggleLang(code)}
                          className="rounded cursor-pointer"
                          style={{ accentColor: "#0EA5E9" }} />
                        <span className="text-sm" style={{ color: "#0D1117" }}>{label}</span>
                        <span className="text-xs ml-auto" style={{ color: "#6B7280" }}>{code}</span>
                      </label>
                    )
                  })}
                </div>
              </div>
            </div>

            {setLanguages.isPending && (
              <div className="flex items-center gap-2 text-xs" style={{ color: "#6B7280" }}>
                <Loader2 size={12} className="animate-spin" /> Saving...
              </div>
            )}
            {setLanguages.isSuccess && (
              <p className="text-xs" style={{ color: "#16A34A" }}>Languages saved.</p>
            )}
          </div>
        )}

        {/* ── Hours ── */}
        {tab === "hours" && (
          <div className="max-w-xl space-y-4">
            {/* Same every day toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input type="checkbox" checked={sameEveryDay}
                onChange={(e) => setSameEveryDay(e.target.checked)}
                style={{ accentColor: "#1447E6" }} />
              <span className="text-sm font-medium" style={{ color: "#0D1117" }}>Same hours every day</span>
            </label>

            <div className="rounded-2xl bg-white overflow-hidden" style={{ border: "1px solid #E5E7EB" }}>
              {DAYS.map((day, i) => {
                const h = hours[day] ?? { open: true, from: "09:00", to: "21:00" }
                return (
                  <div key={day}
                    className="flex items-center gap-3 px-4 py-3"
                    style={{ borderBottom: i < DAYS.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                    {/* Day label */}
                    <p className="text-sm font-medium w-24 capitalize" style={{ color: "#0D1117" }}>{day}</p>

                    {/* Open/Closed toggle */}
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input type="checkbox" checked={h.open}
                        onChange={(e) => updateDay(day, "open", e.target.checked)}
                        style={{ accentColor: "#1447E6" }} />
                      <span className="text-xs" style={{ color: h.open ? "#16A34A" : "#6B7280" }}>
                        {h.open ? "Open" : "Closed"}
                      </span>
                    </label>

                    {/* Time pickers */}
                    {h.open && (
                      <>
                        <input type="time" value={h.from}
                          onChange={(e) => updateDay(day, "from", e.target.value)}
                          className="px-2 py-1 rounded-lg text-sm outline-none"
                          style={{ border: "1px solid #E5E7EB", color: "#0D1117" }} />
                        <span className="text-xs" style={{ color: "#6B7280" }}>to</span>
                        <input type="time" value={h.to}
                          onChange={(e) => updateDay(day, "to", e.target.value)}
                          className="px-2 py-1 rounded-lg text-sm outline-none"
                          style={{ border: "1px solid #E5E7EB", color: "#0D1117" }} />
                      </>
                    )}
                  </div>
                )
              })}
            </div>

            <SaveBtn pending={setHours.isPending} onClick={handleSaveHours} label="Save Hours" />

            {/* After-hours preview */}
            {config?.afterHoursMsg && (
              <div className="rounded-2xl p-4"
                style={{ background: "rgba(20,71,230,0.04)", border: "1px solid rgba(20,71,230,0.12)" }}>
                <div className="flex items-center gap-2 mb-2">
                  <Clock size={14} style={{ color: "#1447E6" }} />
                  <p className="text-xs font-medium" style={{ color: "#1447E6" }}>After-hours message preview</p>
                </div>
                <p className="text-sm italic" style={{ color: "#0D1117" }}>
                  "{config.afterHoursMsg}"
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Handoff ── */}
        {tab === "handoff" && (
          <div className="max-w-xl space-y-4">
            <div className="rounded-2xl bg-white p-5 space-y-4" style={{ border: "1px solid #E5E7EB" }}>
              <div>
                <label className="text-xs font-medium block mb-1" style={{ color: "#6B7280" }}>
                  Backup phone for human handoff
                </label>
                <p className="text-xs mb-2" style={{ color: "#6B7280" }}>
                  When a caller requests a human, ARIA says "Let me connect you" and initiates a transfer to this number.
                </p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2"
                      style={{ color: "#6B7280" }} />
                    <input value={humanPhone} onChange={(e) => setHumanPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-8 pr-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                      style={inputBase} onFocus={focusBlue} onBlur={blurGray} />
                  </div>
                  <SaveBtn pending={saveHumanPhoneMut.isPending} onClick={handleSaveHandoff} label="Save" />
                </div>
              </div>
            </div>

            {/* Trigger phrases preview */}
            <div className="rounded-2xl p-4" style={{ background: "#F7F9FC", border: "1px solid #E5E7EB" }}>
              <div className="flex items-center gap-2 mb-3">
                <User size={14} style={{ color: "#1447E6" }} />
                <p className="text-xs font-semibold" style={{ color: "#0D1117" }}>Handoff trigger phrases</p>
              </div>
              <p className="text-xs mb-2" style={{ color: "#6B7280" }}>
                ARIA transfers the call when a caller says phrases like:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "transfer to human",
                  "speak to a person",
                  "connect me to",
                  "talk to someone",
                  "real person please",
                  "human agent",
                  "speak to a representative",
                  "get me a human",
                ].map((phrase) => (
                  <span key={phrase}
                    className="px-2 py-0.5 rounded-lg text-xs"
                    style={{ background: "#fff", border: "1px solid #E5E7EB", color: "#0D1117" }}>
                    "{phrase}"
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

      </main>
    </>
  )
}
