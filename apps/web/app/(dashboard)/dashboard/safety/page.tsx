"use client"
import { useState, useEffect } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Loader2, Info } from "lucide-react"

// ── Types ─────────────────────────────────────────────────────────────────────
type ProfanityMode = "off" | "warn" | "end_call"
type UnknownCaller = "answer" | "name_first" | "screen"
type Jurisdiction = "us_federal" | "california" | "new_york" | "uk_gdpr" | "india_it" | "none"

interface SafetyState {
  profanity: ProfanityMode
  bargeIn: boolean
  restrictions: {
    medical: boolean
    legal: boolean
    financial: boolean
    political: boolean
    explicit: boolean
  }
  consentNotice: boolean
  smsTranscript: boolean
  jurisdiction: Jurisdiction
  maxDuration: number
  spamDetection: boolean
  unknownCaller: UnknownCaller
}

const DEFAULT: SafetyState = {
  profanity: "end_call",
  bargeIn: true,
  restrictions: { medical: true, legal: true, financial: true, political: false, explicit: true },
  consentNotice: true,
  smsTranscript: false,
  jurisdiction: "us_federal",
  maxDuration: 15,
  spamDetection: true,
  unknownCaller: "answer",
}

// ── Shared primitives ─────────────────────────────────────────────────────────
function SectionCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl p-6 space-y-6" style={{ background: "#fff", border: "1px solid #E5E7EB" }}>
      {children}
    </div>
  )
}

function SectionHeader({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <p className="text-sm font-bold" style={{ color: "#0D1117" }}>{title}</p>
      <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{desc}</p>
    </div>
  )
}

function SaveBtn({ pending, onClick }: { pending: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} disabled={pending}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-white transition-all cursor-pointer disabled:opacity-50"
      style={{ background: "#1447E6" }}>
      {pending && <Loader2 size={12} className="animate-spin" />}
      Save changes
    </button>
  )
}

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button role="switch" aria-checked={on} onClick={() => onChange(!on)}
      style={{
        width: 44, height: 24, borderRadius: 12, border: "none", cursor: "pointer", flexShrink: 0,
        background: on ? "#1447E6" : "#E5E7EB", position: "relative", transition: "background 0.2s",
      }}>
      <span style={{
        position: "absolute", top: 3, left: on ? 23 : 3,
        width: 18, height: 18, borderRadius: "50%", background: "#fff",
        transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SafetyPage() {
  const locationId = "default" // ponytail: multi-location picker in Phase 5

  const { data: safetyData } = api.agent.getSafety.useQuery(locationId)
  const setSafety = api.agent.setSafety.useMutation()

  const [state, setState] = useState<SafetyState>(DEFAULT)

  useEffect(() => {
    if (!safetyData) return
    if (safetyData.safetyJson && typeof safetyData.safetyJson === "object") {
      setState((prev) => ({ ...prev, ...(safetyData.safetyJson as Partial<SafetyState>) }))
    }
    if (safetyData.bargeInEnabled !== undefined) {
      setState((prev) => ({ ...prev, bargeIn: safetyData.bargeInEnabled }))
    }
  }, [safetyData])
  const set = <K extends keyof SafetyState>(k: K, v: SafetyState[K]) =>
    setState((p) => ({ ...p, [k]: v }))

  function save(_section?: string) {
    if (!safetyData?.id) return
    const { bargeIn, ...safetyJson } = state
    setSafety.mutate({
      locationId: safetyData.id,
      safetyJson,
      bargeInEnabled: bargeIn,
    })
  }

  // ── Section 1: Profanity ──────────────────────────────────────────────────
  const PROFANITY_OPTIONS: { value: ProfanityMode; label: string; desc: string; recommended?: boolean }[] = [
    { value: "off",      label: "Disabled",   desc: "AI ignores profanity" },
    { value: "warn",     label: "Warn once",  desc: "AI says 'I need to keep this conversation professional'" },
    { value: "end_call", label: "End call",   desc: "AI politely ends the call after 1 warning", recommended: true },
  ]

  // ── Section 3: Restrictions ───────────────────────────────────────────────
  const RESTRICTIONS: { key: keyof SafetyState["restrictions"]; label: string; desc: string }[] = [
    { key: "medical",   label: "Medical diagnosis / prescriptions",   desc: "ARIA will not diagnose conditions or recommend medications" },
    { key: "legal",     label: "Legal advice (jurisdiction-specific)", desc: "ARIA will not provide legal counsel or interpret laws" },
    { key: "financial", label: "Financial investment advice",          desc: "ARIA will not recommend stocks, funds, or investment strategies" },
    { key: "political", label: "Political opinions",                   desc: "ARIA will remain neutral on political topics and candidates" },
    { key: "explicit",  label: "Explicit content",                     desc: "ARIA will not engage with adult or explicit themes" },
  ]

  // ── Section 4: Jurisdiction ───────────────────────────────────────────────
  const JURISDICTIONS: { value: Jurisdiction; label: string }[] = [
    { value: "us_federal",  label: "US Federal (Two-party)" },
    { value: "california",  label: "California" },
    { value: "new_york",    label: "New York" },
    { value: "uk_gdpr",     label: "UK GDPR" },
    { value: "india_it",    label: "India IT Act" },
    { value: "none",        label: "None / Manual" },
  ]

  // ── Section 5: Unknown caller ─────────────────────────────────────────────
  const UNKNOWN_CALLER: { value: UnknownCaller; label: string }[] = [
    { value: "answer",     label: "Answer normally" },
    { value: "name_first", label: "Ask for name first" },
    { value: "screen",     label: "Screen before connecting" },
  ]

  const pending = setSafety.isPending

  return (
    <>
      <TopBar title="Safety & Content" subtitle="Control AI behavior and call policies" />
      <main className="flex-1 p-6 space-y-6 max-w-2xl" style={{ background: "#F7F9FC" }}>

        {/* ── Section 1: Conversation Safety ─────────────────────────────── */}
        <SectionCard>
          <SectionHeader
            title="Conversation Safety"
            desc="Choose how ARIA responds to profanity and abusive language."
          />
          <div className="space-y-3">
            {PROFANITY_OPTIONS.map((opt) => {
              const active = state.profanity === opt.value
              return (
                <button key={opt.value} onClick={() => set("profanity", opt.value)}
                  className="w-full text-left px-4 py-3 rounded-2xl transition-all cursor-pointer"
                  style={{
                    border: active ? "1.5px solid #1447E6" : "1.5px solid #E5E7EB",
                    background: active ? "rgba(20,71,230,0.04)" : "#fff",
                    borderLeft: active ? "4px solid #1447E6" : "1.5px solid #E5E7EB",
                  }}>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium" style={{ color: "#0D1117" }}>{opt.label}</p>
                    {opt.recommended && (
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                        style={{ background: "#1447E6", color: "#fff" }}>
                        Recommended
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{opt.desc}</p>
                </button>
              )
            })}
          </div>
          <SaveBtn pending={pending} onClick={() => save("profanity")} />
        </SectionCard>

        {/* ── Section 2: Barge-In ─────────────────────────────────────────── */}
        <SectionCard>
          <SectionHeader
            title="Barge-In Settings"
            desc="Control whether callers can interrupt ARIA mid-sentence."
          />
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "#0D1117" }}>
                Allow Barge-In (Voice Interruption Detection)
              </p>
              <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                When enabled, ARIA stops speaking immediately when the caller interrupts.
                Recommended for natural conversations.
              </p>
              <span className="inline-block mt-2 text-xs px-2 py-0.5 rounded-md font-medium"
                style={{
                  background: state.bargeIn ? "rgba(22,163,74,0.1)" : "rgba(107,114,128,0.1)",
                  color: state.bargeIn ? "#16A34A" : "#6B7280",
                }}>
                {state.bargeIn ? "Enabled" : "Disabled"}
              </span>
            </div>
            <Toggle on={state.bargeIn} onChange={(v) => set("bargeIn", v)} />
          </div>
          <SaveBtn pending={pending} onClick={() => save("bargeIn")} />
        </SectionCard>

        {/* ── Section 3: Content Restrictions ─────────────────────────────── */}
        <SectionCard>
          <SectionHeader
            title="Content Restrictions"
            desc="Topics ARIA will refuse to discuss, regardless of caller request."
          />

          {/* Info banner */}
          <div className="flex items-start gap-2.5 px-4 py-3 rounded-2xl"
            style={{ background: "#FEF3C7", border: "1px solid rgba(217,119,6,0.25)" }}>
            <Info size={14} style={{ color: "#D97706", flexShrink: 0, marginTop: 1 }} />
            <p className="text-xs" style={{ color: "#D97706" }}>
              These restrictions are added to ARIA's system prompt automatically.
            </p>
          </div>

          <div className="space-y-3">
            {RESTRICTIONS.map(({ key, label, desc }) => {
              const checked = state.restrictions[key]
              return (
                <label key={key}
                  className="flex items-start gap-3 px-4 py-3 rounded-2xl cursor-pointer transition-all"
                  style={{
                    border: "1px solid #E5E7EB",
                    background: checked ? "rgba(20,71,230,0.03)" : "#fff",
                  }}>
                  {/* Custom checkbox */}
                  <span style={{
                    width: 18, height: 18, borderRadius: 5, flexShrink: 0, marginTop: 1,
                    border: checked ? "none" : "1.5px solid #D1D5DB",
                    background: checked ? "#1447E6" : "#fff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    {checked && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <input type="checkbox" className="sr-only" checked={checked}
                    onChange={(e) => set("restrictions", { ...state.restrictions, [key]: e.target.checked })} />
                  <div>
                    <p className="text-sm font-medium" style={{ color: "#0D1117" }}>{label}</p>
                    <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>{desc}</p>
                  </div>
                </label>
              )
            })}
          </div>
          <SaveBtn pending={pending} onClick={() => save("restrictions")} />
        </SectionCard>

        {/* ── Section 4: Recording Consent ─────────────────────────────────── */}
        <SectionCard>
          <SectionHeader
            title="Recording Consent"
            desc="Control recording disclosures and post-call transcript delivery."
          />

          <div className="space-y-4">
            {/* Consent notice toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#0D1117" }}>Play consent notice before recording</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                  ARIA plays a brief disclosure at the start of each recorded call.
                </p>
              </div>
              <Toggle on={state.consentNotice} onChange={(v) => set("consentNotice", v)} />
            </div>

            {/* SMS transcript toggle */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#0D1117" }}>SMS transcript after call</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                  Send a call summary transcript to the caller's phone number.
                </p>
              </div>
              <Toggle on={state.smsTranscript} onChange={(v) => set("smsTranscript", v)} />
            </div>

            {/* Jurisdiction dropdown */}
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B7280" }}>
                Consent jurisdiction
              </label>
              <select value={state.jurisdiction}
                onChange={(e) => set("jurisdiction", e.target.value as Jurisdiction)}
                className="w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                style={{ border: "1px solid #E5E7EB", color: "#0D1117", background: "#fff", cursor: "pointer" }}>
                {JURISDICTIONS.map((j) => (
                  <option key={j.value} value={j.value}>{j.label}</option>
                ))}
              </select>
            </div>
          </div>

          <SaveBtn pending={pending} onClick={() => save("consent")} />
        </SectionCard>

        {/* ── Section 5: Call Safety Rules ─────────────────────────────────── */}
        <SectionCard>
          <SectionHeader
            title="Call Safety Rules"
            desc="Automated protections for call quality and spam prevention."
          />

          <div className="space-y-5">
            {/* Max duration */}
            <div>
              <label className="text-xs font-medium block mb-1.5" style={{ color: "#6B7280" }}>
                Max call duration (minutes)
              </label>
              <input
                type="number" min={1} max={120} value={state.maxDuration}
                onChange={(e) => set("maxDuration", Number(e.target.value))}
                className="w-32 px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                style={{ border: "1px solid #E5E7EB", color: "#0D1117" }}
                onFocus={(e) => { e.target.style.borderColor = "#1447E6" }}
                onBlur={(e) => { e.target.style.borderColor = "#E5E7EB" }}
              />
              <p className="text-xs mt-1" style={{ color: "#6B7280" }}>
                Calls exceeding this are gracefully ended
              </p>
            </div>

            {/* Spam detection */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "#0D1117" }}>Spam detection</p>
                <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
                  Auto-detect and end robocalls within 60 seconds.
                </p>
              </div>
              <Toggle on={state.spamDetection} onChange={(v) => set("spamDetection", v)} />
            </div>

            {/* Unknown caller action */}
            <div>
              <p className="text-sm font-medium mb-2" style={{ color: "#0D1117" }}>Unknown caller action</p>
              <div className="space-y-2">
                {UNKNOWN_CALLER.map((opt) => {
                  const active = state.unknownCaller === opt.value
                  return (
                    <label key={opt.value}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all"
                      style={{
                        border: active ? "1.5px solid #1447E6" : "1px solid #E5E7EB",
                        background: active ? "rgba(20,71,230,0.04)" : "#fff",
                      }}>
                      {/* Custom radio */}
                      <span style={{
                        width: 16, height: 16, borderRadius: "50%", flexShrink: 0,
                        border: active ? "none" : "1.5px solid #D1D5DB",
                        background: active ? "#1447E6" : "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                      </span>
                      <input type="radio" className="sr-only" name="unknownCaller"
                        checked={active} onChange={() => set("unknownCaller", opt.value)} />
                      <p className="text-sm" style={{ color: "#0D1117" }}>{opt.label}</p>
                    </label>
                  )
                })}
              </div>
            </div>
          </div>

          <SaveBtn pending={pending} onClick={() => save("callRules")} />
        </SectionCard>

      </main>
    </>
  )
}
