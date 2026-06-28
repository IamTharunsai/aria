"use client"

import { useState } from "react"
import Link from "next/link"
import { Zap, Mail, MessageSquare, Clock, CheckCircle2 } from "lucide-react"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", business: "", message: "" })
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    // ponytail: fire-and-forget mailto fallback — real backend email endpoint to be wired when Resend is added
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  return (
    <div style={{ background: "#07070F", color: "#F1F5F9", fontFamily: "var(--font-jakarta, system-ui, sans-serif)" }}>
      <style>{`
        .nav-link { color: rgba(241,245,249,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #F1F5F9; }
        .footer-link { color: rgba(241,245,249,0.45); text-decoration: none; font-size: 14px; display: block; margin-bottom: 10px; transition: color 0.2s; }
        .footer-link:hover { color: #F1F5F9; }
        .field { width: 100%; background: #0F0F1E; border: 1px solid rgba(99,102,241,0.2); border-radius: 12px; padding: 13px 16px; font-size: 15px; color: #F1F5F9; outline: none; transition: border-color 0.2s; box-sizing: border-box; font-family: inherit; }
        .field:focus { border-color: rgba(99,102,241,0.6); }
        .field::placeholder { color: #475569; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(7,7,15,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(99,102,241,0.12)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#818CF8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "#F1F5F9" }}>ARIA</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 36 }}>
            <Link href="/features" className="nav-link">Features</Link>
            <Link href="/how-it-works" className="nav-link">How it works</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/industries" className="nav-link">Industries</Link>
          </div>
          <Link href="/sign-in" style={{ background: "#6366F1", color: "#fff", borderRadius: 9999, padding: "9px 22px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
            Sign in
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)", padding: "88px 24px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#818CF8", borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            Get in touch
          </div>
          <h1 style={{ fontSize: "clamp(34px,5vw,54px)", fontWeight: 900, color: "#F1F5F9", margin: "0 0 16px", letterSpacing: "-0.04em", lineHeight: 1.1 }}>
            Let&apos;s talk about your business
          </h1>
          <p style={{ fontSize: 18, color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
            Have a question, want a demo, or need custom pricing for your agency? We respond within 24 hours.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section style={{ padding: "0 24px 96px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "start" }}>

          {/* LEFT — Info */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: "#F1F5F9", margin: "0 0 32px", letterSpacing: "-0.01em" }}>Contact information</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {[
                { icon: <Mail size={20} color="#6366F1" />, label: "Email us", value: "hello@aria.ai", sub: "We respond within 24 hours" },
                { icon: <MessageSquare size={20} color="#22D3EE" />, label: "Sales & demos", value: "sales@aria.ai", sub: "Pricing, custom plans, agency inquiries" },
                { icon: <Clock size={20} color="#10B981" />, label: "Support hours", value: "Mon–Fri, 9am–6pm EST", sub: "Emergency support available on Agency plan" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 13, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#F1F5F9", marginBottom: 4 }}>{item.value}</div>
                    <div style={{ fontSize: 13, color: "#64748B" }}>{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 48, background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 16, padding: "24px 22px" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#818CF8", marginBottom: 8 }}>Want to see it live?</div>
              <p style={{ fontSize: 14, color: "#94A3B8", margin: "0 0 16px", lineHeight: 1.6 }}>
                Book a 15-minute demo and we&apos;ll show you ARIA handling a real call for your industry.
              </p>
              <Link href="/sign-up" style={{ display: "inline-block", background: "#6366F1", color: "#fff", borderRadius: 100, padding: "10px 22px", fontSize: 14, fontWeight: 600, textDecoration: "none" }}>
                Book a demo
              </Link>
            </div>
          </div>

          {/* RIGHT — Form */}
          <div style={{ background: "#0F0F1E", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 24, padding: "40px 36px" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                  <CheckCircle2 size={32} color="#10B981" />
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#F1F5F9", margin: "0 0 10px" }}>Message sent!</h3>
                <p style={{ fontSize: 15, color: "#94A3B8", margin: 0 }}>We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#F1F5F9", margin: "0 0 4px" }}>Send us a message</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Your name</label>
                    <input className="field" type="text" placeholder="Jane Smith" required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Work email</label>
                    <input className="field" type="email" placeholder="jane@company.com" required value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>Business type</label>
                  <select className="field" value={form.business} onChange={e => setForm(f => ({ ...f, business: e.target.value }))}>
                    <option value="">Select your industry</option>
                    {["Healthcare","Legal","Restaurant","Salon & Spa","Real Estate","Dental","Veterinary","Auto Services","Fitness","Retail","Hotel & Hospitality","Agency / Reseller","Other"].map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 8 }}>How can we help?</label>
                  <textarea
                    className="field"
                    placeholder="Tell us about your business and what you're looking for..."
                    required
                    rows={5}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    style={{ resize: "vertical", minHeight: 120 }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  style={{ background: loading ? "rgba(99,102,241,0.5)" : "#6366F1", color: "#fff", border: "none", borderRadius: 100, padding: "14px 0", fontSize: 15, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}
                >
                  {loading ? "Sending…" : "Send message"}
                </button>
                <p style={{ fontSize: 12, color: "#475569", textAlign: "center", margin: 0 }}>
                  We respond within 24 hours. Your info is never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#07070F", borderTop: "1px solid rgba(99,102,241,0.1)", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32, alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366F1,#818CF8)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={14} color="#fff" fill="#fff" /></div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "#F1F5F9" }}>ARIA</span>
          </Link>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["Home","/"],["Features","/features"],["Pricing","/pricing"],["About","/about"],["Industries","/industries"]].map(([l,h]) => (
              <Link key={l} href={h} className="footer-link" style={{ display: "inline", marginBottom: 0 }}>{l}</Link>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "rgba(241,245,249,0.25)" }}>© 2026 ARIA, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
