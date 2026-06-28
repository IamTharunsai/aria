"use client"
import { useState } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { useOrganization } from "@clerk/nextjs"
import {
  Mic2, FileText, Globe, MessageSquare, Plus, Trash2, Upload, Loader2, ChevronDown, ChevronUp,
} from "lucide-react"

const KB_ICONS: Record<string, React.ReactNode> = {
  FAQ:      <MessageSquare size={14} />,
  DOCUMENT: <FileText size={14} />,
  WEBPAGE:  <Globe size={14} />,
  CUSTOM:   <FileText size={14} />,
}

const TYPE_COLORS: Record<string, string> = {
  FAQ:      "#1447E6",
  DOCUMENT: "#7C3AED",
  WEBPAGE:  "#0EA5E9",
  CUSTOM:   "#6B7280",
}

type Tab = "agent" | "kb"
type AddMode = "faq" | "url" | "upload" | null

export default function AgentPage() {
  const { organization } = useOrganization()
  const locationId = "default" // Phase 5 will add multi-location picker

  const [tab, setTab] = useState<Tab>("kb")
  const [addMode, setAddMode] = useState<AddMode>(null)
  const [expanded, setExpanded] = useState<string | null>(null)

  // KB data
  const { data: items = [], refetch } = api.kb.list.useQuery({ locationId })
  const createKb = api.kb.create.useMutation({ onSuccess: () => { refetch(); setAddMode(null) } })
  const deleteKb = api.kb.delete.useMutation({ onSuccess: () => refetch() })

  // Agent config
  const { data: loc } = api.agent.getLocation.useQuery(locationId)
  const updateAgent = api.agent.updateLocation.useMutation()

  // Form state
  const [faqQ, setFaqQ] = useState("")
  const [faqA, setFaqA] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [urlLoading, setUrlLoading] = useState(false)
  const [agentName, setAgentName] = useState(loc?.agentName ?? "")
  const [greeting, setGreeting] = useState(loc?.greetingMsg ?? "")

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
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput }),
      })
      const { title, content } = await res.json()
      createKb.mutate({ locationId, type: "WEBPAGE", title, content, sourceUrl: urlInput })
      setUrlInput("")
    } finally {
      setUrlLoading(false)
    }
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

  function handleSaveAgent() {
    updateAgent.mutate({ id: locationId, agentName, greetingMsg: greeting })
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "kb",    label: "Knowledge Base" },
    { id: "agent", label: "Voice Agent"    },
  ]

  return (
    <>
      <TopBar title="Voice Agent" subtitle="Configure ARIA's knowledge and personality" />
      <main className="flex-1 p-6">

        {/* Tab bar */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit"
          style={{ background: "#F0F2F5" }}>
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer"
              style={{
                background: tab === t.id ? "#fff" : "transparent",
                color:      tab === t.id ? "#0D1117" : "#6B7280",
                boxShadow:  tab === t.id ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
              }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* ── Knowledge Base tab ── */}
        {tab === "kb" && (
          <div className="space-y-4 max-w-3xl">

            {/* Add buttons */}
            <div className="flex gap-2">
              {([
                { mode: "faq"    as AddMode, label: "Add FAQ",      icon: <MessageSquare size={14} /> },
                { mode: "url"    as AddMode, label: "Add Webpage",   icon: <Globe size={14} /> },
                { mode: "upload" as AddMode, label: "Upload Doc",    icon: <Upload size={14} /> },
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

            {/* FAQ form */}
            {addMode === "faq" && (
              <div className="rounded-2xl bg-white p-4 space-y-3"
                style={{ border: "1px solid #E5E7EB" }}>
                <input value={faqQ} onChange={(e) => setFaqQ(e.target.value)}
                  placeholder="Question — e.g. What are your opening hours?"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                  onFocus={(e) => (e.target.style.borderColor = "#1447E6")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")} />
                <textarea value={faqA} onChange={(e) => setFaqA(e.target.value)}
                  rows={3} placeholder="Answer — ARIA will say this verbatim"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                  onFocus={(e) => (e.target.style.borderColor = "#1447E6")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")} />
                <button onClick={handleAddFaq} disabled={!faqQ || !faqA || createKb.isPending}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all cursor-pointer disabled:opacity-50"
                  style={{ background: "#1447E6" }}>
                  {createKb.isPending ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                  Save FAQ
                </button>
              </div>
            )}

            {/* URL form */}
            {addMode === "url" && (
              <div className="rounded-2xl bg-white p-4 flex gap-2"
                style={{ border: "1px solid #E5E7EB" }}>
                <input value={urlInput} onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://yourwebsite.com/about"
                  className="flex-1 px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                  onFocus={(e) => (e.target.style.borderColor = "#1447E6")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")} />
                <button onClick={handleScrapeUrl} disabled={!urlInput || urlLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all cursor-pointer disabled:opacity-50"
                  style={{ background: "#1447E6" }}>
                  {urlLoading ? <Loader2 size={14} className="animate-spin" /> : <Globe size={14} />}
                  Scrape
                </button>
              </div>
            )}

            {/* File upload */}
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

            {/* KB item list */}
            <div className="space-y-2">
              {items.length === 0 ? (
                <div className="rounded-2xl bg-white p-8 text-center"
                  style={{ border: "1px solid #E5E7EB" }}>
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
                    {expanded === item.id ? <ChevronUp size={14} style={{ color: "#6B7280" }} /> : <ChevronDown size={14} style={{ color: "#6B7280" }} />}
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

        {/* ── Voice Agent tab ── */}
        {tab === "agent" && (
          <div className="max-w-xl space-y-4">
            <div className="rounded-2xl bg-white p-5 space-y-4"
              style={{ border: "1px solid #E5E7EB" }}>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B7280" }}>
                  Agent Name
                </label>
                <input value={agentName} onChange={(e) => setAgentName(e.target.value)}
                  placeholder="e.g. Aria, Luna, Alex"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                  style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                  onFocus={(e) => (e.target.style.borderColor = "#1447E6")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")} />
              </div>
              <div>
                <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B7280" }}>
                  Greeting Message
                </label>
                <textarea value={greeting} onChange={(e) => setGreeting(e.target.value)}
                  rows={3} placeholder="Hi! Thanks for calling [Business Name]. How can I help you today?"
                  className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                  style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                  onFocus={(e) => (e.target.style.borderColor = "#1447E6")}
                  onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")} />
              </div>
              <button onClick={handleSaveAgent} disabled={updateAgent.isPending}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium text-white transition-all cursor-pointer disabled:opacity-50"
                style={{ background: "#1447E6" }}>
                {updateAgent.isPending ? <Loader2 size={14} className="animate-spin" /> : <Mic2 size={14} />}
                Save Changes
              </button>
            </div>

            <div className="rounded-2xl p-4" style={{ background: "rgba(20,71,230,0.05)", border: "1px solid rgba(20,71,230,0.15)" }}>
              <p className="text-xs font-medium mb-1" style={{ color: "#1447E6" }}>Next step</p>
              <p className="text-sm" style={{ color: "#0D1117" }}>
                After saving, go to Vapi dashboard → create an assistant → set the webhook URL to your API endpoint.
              </p>
            </div>
          </div>
        )}
      </main>
    </>
  )
}
