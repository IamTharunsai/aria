"use client"

import { useState, useEffect } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Settings, ShieldCheck, FileText, Building2, MapPin, Phone, Moon, Sun, CreditCard, AlertTriangle, Check } from "lucide-react"

function Toggle({ on, onChange, disabled }: { on: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button onClick={onChange} disabled={disabled} role="switch" aria-checked={on}
      style={{ width: 44, height: 24, borderRadius: 12, border: "none", cursor: disabled ? "not-allowed" : "pointer", flexShrink: 0, position: "relative", transition: "background 0.2s", background: on ? "#6366F1" : "#D1D5DB", opacity: disabled ? 0.5 : 1 }}>
      <span style={{ position: "absolute", top: 2, left: on ? 22 : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.2)", transition: "left 0.2s" }} />
    </button>
  )
}

function Section({ title, subtitle, icon, children }: { title: string; subtitle: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, overflow: "hidden" }}>
      <div style={{ padding: "20px 24px", borderBottom: "1px solid #F1F5F9", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 38, height: 38, borderRadius: 11, background: "rgba(99,102,241,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: "#0D1117" }}>{title}</div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 1 }}>{subtitle}</div>
        </div>
      </div>
      <div style={{ padding: "20px 24px" }}>{children}</div>
    </div>
  )
}

function Row({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 24, padding: "12px 0", borderBottom: "1px solid #F8FAFC" }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, color: "#0D1117", marginBottom: 2 }}>{label}</div>
        {sub && <div style={{ fontSize: 12, color: "#94A3B8", lineHeight: 1.5 }}>{sub}</div>}
      </div>
      <div style={{ flexShrink: 0, display: "flex", alignItems: "center" }}>{children}</div>
    </div>
  )
}

const BIZ_TYPES = ["HEALTHCARE","RESTAURANT","SALON","LEGAL","REAL_ESTATE","EDUCATION","RETAIL","HOSPITALITY","AUTOMOTIVE","HOME_SERVICES","FINANCE","STARTUP","GOVERNMENT","RELIGIOUS","TRANSPORT"] as const
const BIZ_LABELS: Record<string, string> = {
  HEALTHCARE:"Healthcare",RESTAURANT:"Restaurant",SALON:"Salon & Spa",LEGAL:"Legal",REAL_ESTATE:"Real Estate",
  EDUCATION:"Education",RETAIL:"Retail",HOSPITALITY:"Hotel & Hospitality",AUTOMOTIVE:"Auto Services",
  HOME_SERVICES:"Home Services",FINANCE:"Financial Services",STARTUP:"Startup / Tech",GOVERNMENT:"Government",
  RELIGIOUS:"Religious Org",TRANSPORT:"Logistics & Transport",
}

export default function SettingsPage() {
  const { data: org, isLoading } = api.settings.getOrg.useQuery()
  const { data: locations } = api.settings.getLocations.useQuery()
  const { data: billing } = api.settings.billing.useQuery()
  const setHipaa = api.settings.setHipaaMode.useMutation()
  const setBizType = api.settings.setBusinessType.useMutation()

  const [hipaaOn, setHipaaOn] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [bizType, setBizTypeLocal] = useState("")
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (org) {
      setHipaaOn(org.hipaaMode ?? false)
      setBizTypeLocal(org.businessType ?? "")
    }
  }, [org])

  useEffect(() => {
    const stored = localStorage.getItem("aria-dark")
    if (stored === "1") { setDarkMode(true); document.documentElement.classList.add("dark") }
  }, [])

  function toggleDark() {
    const next = !darkMode
    setDarkMode(next)
    if (next) { document.documentElement.classList.add("dark"); localStorage.setItem("aria-dark","1") }
    else { document.documentElement.classList.remove("dark"); localStorage.setItem("aria-dark","0") }
  }

  function toggleHipaa() {
    const next = !hipaaOn
    setHipaaOn(next)
    setHipaa.mutate(next, { onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000) } })
  }

  function saveBizType(val: string) {
    setBizTypeLocal(val)
    setBizType.mutate(val as typeof BIZ_TYPES[number], { onSuccess: () => { setSaved(true); setTimeout(() => setSaved(false), 2000) } })
  }

  const PLAN_MAP: Record<string, { label: string; minutes: number; price: number }> = {
    STARTER: { label: "Starter", minutes: 500, price: 97 },
    PRO:     { label: "Pro",     minutes: 2000, price: 197 },
    AGENCY:  { label: "Agency",  minutes: 10000, price: 497 },
  }
  const plan = PLAN_MAP[org?.plan ?? "STARTER"] ?? PLAN_MAP.STARTER

  return (
    <>
      <TopBar title="Settings" subtitle="Organization, compliance, and account configuration" />
      <main style={{ flex: 1, padding: 24, display: "flex", flexDirection: "column", gap: 20, maxWidth: 800 }}>

        {saved && (
          <div style={{ background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "12px 18px", display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#065F46" }}>
            <Check size={15} color="#10B981" /> Settings saved
          </div>
        )}

        {/* ORGANIZATION */}
        <Section title="Organization" subtitle="Business profile and type" icon={<Building2 size={18} color="#6366F1" />}>
          <Row label="Organization name" sub="Your business display name">
            <span style={{ fontSize: 14, fontWeight: 600, color: "#6366F1" }}>{isLoading ? "…" : org?.name ?? "—"}</span>
          </Row>
          <Row label="Current plan" sub={`${plan.minutes.toLocaleString()} minutes/month`}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{plan.label}</span>
              <span style={{ fontSize: 13, color: "#94A3B8" }}>${plan.price}/mo</span>
            </div>
          </Row>
          <Row label="Business type" sub="Controls how ARIA talks to your callers">
            <select
              value={bizType}
              onChange={e => saveBizType(e.target.value)}
              style={{ background: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: 10, padding: "8px 12px", fontSize: 14, color: "#0D1117", outline: "none" }}
            >
              <option value="">Select type</option>
              {BIZ_TYPES.map(t => <option key={t} value={t}>{BIZ_LABELS[t]}</option>)}
            </select>
          </Row>
        </Section>

        {/* APPEARANCE */}
        <Section title="Appearance" subtitle="Display preferences for this browser" icon={<Sun size={18} color="#F59E0B" />}>
          <Row label="Dark mode" sub="Toggle dark background across the dashboard">
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              {darkMode ? <Moon size={14} color="#818CF8" /> : <Sun size={14} color="#F59E0B" />}
              <Toggle on={darkMode} onChange={toggleDark} />
            </div>
          </Row>
        </Section>

        {/* LOCATIONS */}
        <Section title="Phone numbers & locations" subtitle="Manage where ARIA answers calls" icon={<MapPin size={18} color="#22D3EE" />}>
          {!locations || locations.length === 0 ? (
            <div style={{ padding: "24px 0", textAlign: "center", color: "#94A3B8", fontSize: 13 }}>
              No locations configured. Set one up in the Numbers page.
            </div>
          ) : locations.map(loc => (
            <Row key={loc.id} label={loc.name} sub={loc.phoneNumber ?? "No number assigned"}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                {loc.phoneNumber && <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 13, color: "#6366F1" }}><Phone size={12} />{loc.phoneNumber}</span>}
                {loc.vapiAgentId && <span style={{ fontSize: 11, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: "#10B981", borderRadius: 100, padding: "3px 10px", fontWeight: 600 }}>AI Live</span>}
              </div>
            </Row>
          ))}
        </Section>

        {/* COMPLIANCE */}
        <Section title="Compliance & privacy" subtitle="HIPAA and data handling settings" icon={<ShieldCheck size={18} color="#10B981" />}>
          <Row label="HIPAA mode" sub="Disables call recording and activates PHI-safe prompts">
            <Toggle on={hipaaOn} onChange={toggleHipaa} disabled={setHipaa.isPending} />
          </Row>
          {hipaaOn && (
            <div style={{ marginTop: 12, background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10, fontSize: 13, color: "#065F46" }}>
              <ShieldCheck size={15} color="#10B981" style={{ flexShrink: 0, marginTop: 1 }} />
              <span>HIPAA active — recordings disabled, transcripts encrypted, consent prompts on.</span>
            </div>
          )}
          <div style={{ marginTop: 12, background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10, fontSize: 13, color: "#92400E" }}>
            <FileText size={15} color="#D97706" style={{ flexShrink: 0, marginTop: 1 }} />
            <span><strong>BAA required</strong> before handling protected health information. Contact us at hello@aria.ai to obtain your BAA.</span>
          </div>
        </Section>

        {/* BILLING */}
        <Section title="Billing" subtitle="Plan and usage" icon={<CreditCard size={18} color="#6366F1" />}>
          <Row label="Current plan" sub={`Renews on ${billing?.renewsAt ? new Date(billing.renewsAt).toLocaleDateString() : "—"}`}>
            <span style={{ background: "rgba(99,102,241,0.1)", color: "#6366F1", borderRadius: 100, padding: "4px 12px", fontSize: 12, fontWeight: 700 }}>{plan.label} · ${plan.price}/mo</span>
          </Row>
          <Row label="Minutes used this period" sub={`${plan.minutes.toLocaleString()} included per month`}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 120, height: 6, background: "#F1F5F9", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ height: "100%", borderRadius: 3, background: "linear-gradient(90deg,#6366F1,#22D3EE)", width: `${Math.min(100, ((billing?.minutesUsed ?? 0) / (billing?.minutesLimit ?? plan.minutes)) * 100)}%` }} />
              </div>
              <span style={{ fontSize: 13, color: "#6B7280" }}>{billing?.minutesUsed ?? 0} / {billing?.minutesLimit ?? plan.minutes}</span>
            </div>
          </Row>
          {!billing?.stripeCustomerId && (
            <div style={{ marginTop: 12, background: "rgba(244,63,94,0.04)", border: "1px solid rgba(244,63,94,0.15)", borderRadius: 12, padding: "12px 16px", display: "flex", gap: 10, fontSize: 13, color: "#9F1239" }}>
              <AlertTriangle size={15} color="#F43F5E" style={{ flexShrink: 0, marginTop: 1 }} />
              <span>No payment method on file. Add one to stay active after your trial period.</span>
            </div>
          )}
        </Section>

        {/* DANGER ZONE */}
        <Section title="Danger zone" subtitle="Irreversible account actions" icon={<AlertTriangle size={18} color="#F43F5E" />}>
          <Row label="Delete organization" sub="Permanently deletes all data, locations, contacts, and call history.">
            <button style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)", color: "#F43F5E", borderRadius: 10, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
              onClick={() => alert("Contact hello@aria.ai to delete your account.")}>
              Delete account
            </button>
          </Row>
        </Section>

      </main>
    </>
  )
}
