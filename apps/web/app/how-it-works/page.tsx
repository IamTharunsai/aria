import Link from "next/link"
import { SignUpButton } from "@clerk/nextjs"
import { Zap, ArrowRight, Phone, BookOpen, Settings, Play, Check } from "lucide-react"

export const metadata = { title: "How it works — ARIA AI Voice Receptionist", description: "From signup to your first answered call in under 10 minutes. Step-by-step setup guide." }

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      icon: <Zap size={28} color="#6366F1" />,
      title: "Create your account",
      time: "2 minutes",
      body: "Sign up and choose your business type. ARIA pre-configures itself for your industry — a dental clinic gets different defaults than a law firm. No blank-slate setup.",
      details: [
        "Choose from 15 industry presets",
        "ARIA loads relevant FAQ templates for your industry",
        "Default greeting and hold message pre-filled",
        "Language defaults based on your region",
      ],
      mockup: (
        <div style={{ background: "#0F0F1E", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 16 }}>Select your industry</div>
          {["Healthcare", "Restaurant", "Legal", "Real Estate"].map((ind, i) => (
            <div key={ind} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderRadius: 10, background: i === 0 ? "rgba(99,102,241,0.15)" : "transparent", border: i === 0 ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(99,102,241,0.08)", marginBottom: 8 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: i === 0 ? "#6366F1" : "#94A3B8" }} />
              <span style={{ fontSize: 14, color: i === 0 ? "#F1F5F9" : "#94A3B8", fontWeight: i === 0 ? 600 : 400 }}>{ind}</span>
              {i === 0 && <span style={{ marginLeft: "auto", fontSize: 11, color: "#6366F1", fontWeight: 700 }}>Selected</span>}
            </div>
          ))}
          <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10 }}>
            <div style={{ fontSize: 12, color: "#10B981", fontWeight: 600 }}>ARIA pre-configured for Healthcare</div>
            <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 4 }}>HIPAA mode · Appointment intake · Insurance FAQ template loaded</div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      icon: <Phone size={28} color="#22D3EE" />,
      title: "Connect your phone number",
      time: "2 minutes",
      body: "Link your existing Twilio number or buy a new one for ~$1/month. ARIA gives you the webhook URL to paste into Twilio. Two fields. Takes two minutes.",
      details: [
        "Keep your existing phone number",
        "Or purchase a new local number ($1/month via Twilio)",
        "Copy your unique ARIA webhook URL",
        "Paste into Twilio's Voice webhook field",
      ],
      mockup: (
        <div style={{ background: "#0F0F1E", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 16 }}>Your ARIA webhook URL</div>
          <div style={{ background: "rgba(7,7,15,0.8)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 10, padding: "12px 16px", fontFamily: "monospace", fontSize: 12, color: "#22D3EE", marginBottom: 16, wordBreak: "break-all" }}>
            https://api.aria.ai/webhook/v1/twilio/abc123xyz
          </div>
          <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 20 }}>Paste this URL into your Twilio phone number settings under "A call comes in"</div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: 13, color: "#10B981", fontWeight: 600 }}>+1 (512) 555-0182 connected</span>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      icon: <BookOpen size={28} color="#818CF8" />,
      title: "Train with your content",
      time: "5 minutes",
      body: "Tell ARIA about your business. Paste your FAQ, share your website URL (ARIA scrapes it automatically), or upload documents like menus, service lists, or intake forms.",
      details: [
        "Add FAQs manually (question + answer pairs)",
        "Paste your website URL — ARIA scrapes it automatically",
        "Upload documents (PDF, DOCX, plain text)",
        "Preview how ARIA will respond before going live",
      ],
      mockup: (
        <div style={{ background: "#0F0F1E", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 16 }}>Knowledge base</div>
          {[
            { q: "What are your hours?", a: "Mon–Fri 8am–6pm, Sat 9am–2pm" },
            { q: "Do you accept walk-ins?", a: "Yes, for non-urgent visits" },
            { q: "What insurance do you accept?", a: "Blue Cross, Aetna, Cigna..." },
          ].map((item, i) => (
            <div key={i} style={{ background: "rgba(99,102,241,0.06)", border: "1px solid rgba(99,102,241,0.12)", borderRadius: 10, padding: "12px 14px", marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#818CF8", marginBottom: 4 }}>Q: {item.q}</div>
              <div style={{ fontSize: 12, color: "#94A3B8" }}>A: {item.a}</div>
            </div>
          ))}
          <div style={{ marginTop: 12, padding: "8px 14px", background: "rgba(34,211,238,0.06)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: 10, fontSize: 12, color: "#22D3EE" }}>
            + 3 more from your website scan
          </div>
        </div>
      ),
    },
    {
      number: "04",
      icon: <Settings size={28} color="#10B981" />,
      title: "Configure your agent",
      time: "3 minutes",
      body: "Set your business hours, choose who gets called when a human is needed, pick your languages, and write your greeting. ARIA uses sensible defaults — change only what matters.",
      details: [
        "Set business hours per day (ARIA auto-switches to after-hours mode)",
        "Set your human handoff number",
        "Choose default language + auto-detect (recommended)",
        "Write or customize your greeting message",
      ],
      mockup: (
        <div style={{ background: "#0F0F1E", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", marginBottom: 16 }}>Agent settings</div>
          {[
            { label: "Business hours", value: "Mon–Fri 9am–5pm" },
            { label: "Handoff number", value: "+1 (512) 555-0100" },
            { label: "Language", value: "Auto-detect (recommended)" },
          ].map((setting, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: i < 2 ? "1px solid rgba(99,102,241,0.1)" : "none" }}>
              <span style={{ fontSize: 13, color: "#94A3B8" }}>{setting.label}</span>
              <span style={{ fontSize: 13, color: "#F1F5F9", fontWeight: 600 }}>{setting.value}</span>
            </div>
          ))}
          <div style={{ marginTop: 16 }}>
            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 8 }}>Greeting message</div>
            <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 10, padding: "10px 12px", fontSize: 12, color: "#F1F5F9", fontStyle: "italic" }}>
              "Hi, thanks for calling Maria's Dental. This is ARIA, your AI assistant. How can I help you today?"
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "05",
      icon: <Play size={28} color="#F43F5E" />,
      title: "Go live",
      time: "Instant",
      body: "Call your own number. ARIA picks up. Listen to the first call transcript appear in your dashboard in real time. From here, ARIA handles every call automatically.",
      details: [
        "Call your number to test the experience",
        "Watch the live call log in your dashboard",
        "Review transcript, sentiment, and action taken",
        "ARIA is now live for all incoming calls",
      ],
      mockup: (
        <div style={{ background: "#0F0F1E", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 20, padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
            <span style={{ fontSize: 13, fontWeight: 700, color: "#10B981" }}>ARIA LIVE</span>
          </div>
          {[
            { time: "Just now", action: "Call answered", detail: "+1 (512) 555-0199", color: "#10B981" },
            { time: "0:08", action: "FAQ answered", detail: "Hours question", color: "#6366F1" },
            { time: "0:43", action: "Appointment booked", detail: "Tuesday 2pm confirmed", color: "#22D3EE" },
          ].map((event, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(99,102,241,0.08)" : "none" }}>
              <span style={{ fontSize: 11, color: "#94A3B8", width: 40, flexShrink: 0 }}>{event.time}</span>
              <div>
                <div style={{ fontSize: 13, color: event.color, fontWeight: 600 }}>{event.action}</div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>{event.detail}</div>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const faqs = [
    {
      q: "Do callers know they're talking to AI?",
      a: "Yes. ARIA announces itself as an AI assistant. We believe transparency builds trust — and callers appreciate that someone (or something) actually picked up.",
    },
    {
      q: "What if ARIA can't answer a question?",
      a: "It captures the caller's details, logs the unanswered question, and flags the call for follow-up in your dashboard. Nothing falls through the cracks.",
    },
    {
      q: "Does it work with my existing phone number?",
      a: "Yes. You keep your number. We route it through ARIA via a simple Twilio webhook. Your customers dial the same number they always have.",
    },
    {
      q: "What happens outside business hours?",
      a: "ARIA answers with your custom after-hours message, captures details for every caller, and escalates true emergencies to your on-call number.",
    },
    {
      q: "Can I listen to call recordings?",
      a: "Yes. Every call transcript and recording appears in your dashboard within seconds of the call ending. Filter by date, sentiment, or outcome.",
    },
  ]

  return (
    <div style={{ background: "#07070F", color: "#F1F5F9", fontFamily: "var(--font-jakarta, system-ui, sans-serif)" }}>
      <style>{`
        .nav-link { color: rgba(241,245,249,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #F1F5F9; }
        .footer-link { color: rgba(241,245,249,0.45); text-decoration: none; font-size: 14px; margin-bottom: 0; transition: color 0.2s; }
        .footer-link:hover { color: #F1F5F9; }
        .faq-item { background: #0F0F1E; border: 1px solid rgba(99,102,241,0.15); border-radius: 16px; padding: 24px 28px; margin-bottom: 12px; }
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
            <Link href="/how-it-works" style={{ color: "#F1F5F9", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>How it works</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/industries" className="nav-link">Industries</Link>
          </div>
          <SignUpButton>
            <button style={{ background: "#6366F1", color: "#fff", border: "none", borderRadius: 9999, padding: "9px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Get early access
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), #07070F`, padding: "96px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#818CF8", borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            Setup Guide
          </div>
          <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, color: "#F1F5F9", margin: "0 0 20px", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            From signup to your first answered call in under 10 minutes.
          </h1>
          <p style={{ fontSize: 19, color: "#94A3B8", lineHeight: 1.6, margin: "0 0 40px" }}>
            No developers needed. No complex configuration. Just your phone number and 10 minutes.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            {[{ v: "5 steps", l: "to go live" }, { v: "<10 min", l: "total setup time" }, { v: "$0", l: "setup fee" }].map((stat, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#F1F5F9" }}>{stat.v}</div>
                <div style={{ fontSize: 13, color: "#94A3B8" }}>{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STEPS */}
      <section style={{ padding: "80px 24px 112px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {steps.map((step, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", marginBottom: i < steps.length - 1 ? 96 : 0 }}>
              {/* Text side (alternates) */}
              {i % 2 === 0 ? (
                <>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <div style={{ fontSize: 48, fontWeight: 900, color: "rgba(99,102,241,0.15)", lineHeight: 1, letterSpacing: "-0.04em" }}>{step.number}</div>
                      <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: "4px 12px", fontSize: 12, color: "#818CF8", fontWeight: 600 }}>
                        {step.time}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{step.icon}</div>
                      <h2 style={{ fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 800, color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em" }}>{step.title}</h2>
                    </div>
                    <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 24px" }}>{step.body}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {step.details.map((d, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#F1F5F9" }}>
                          <Check size={14} color="#6366F1" />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>{step.mockup}</div>
                </>
              ) : (
                <>
                  <div>{step.mockup}</div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                      <div style={{ fontSize: 48, fontWeight: 900, color: "rgba(99,102,241,0.15)", lineHeight: 1, letterSpacing: "-0.04em" }}>{step.number}</div>
                      <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: "4px 12px", fontSize: 12, color: "#818CF8", fontWeight: 600 }}>
                        {step.time}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>{step.icon}</div>
                      <h2 style={{ fontSize: "clamp(22px,2.5vw,30px)", fontWeight: 800, color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em" }}>{step.title}</h2>
                    </div>
                    <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 24px" }}>{step.body}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {step.details.map((d, j) => (
                        <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#F1F5F9" }}>
                          <Check size={14} color="#6366F1" />
                          {d}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "#FAFAFA", padding: "112px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,3.5vw,40px)", fontWeight: 800, color: "#0F172A", margin: "0 0 48px", letterSpacing: "-0.03em", textAlign: "center" }}>Frequently asked questions</h2>
          {faqs.map((faq, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 28px", marginBottom: 12 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: "#0F172A", marginBottom: 10 }}>{faq.q}</div>
              <div style={{ fontSize: 15, color: "#64748B", lineHeight: 1.7 }}>{faq.a}</div>
            </div>
          ))}
          <div style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/contact" style={{ color: "#6366F1", textDecoration: "none", fontSize: 15, fontWeight: 600, display: "inline-flex", alignItems: "center", gap: 8 }}>
              More questions? Contact us <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%)", padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.03em" }}>Ready to go live?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", margin: "0 0 36px" }}>Your first call is 10 minutes away. No credit card needed.</p>
          <SignUpButton>
            <button style={{ background: "#fff", color: "#4338CA", fontWeight: 700, border: "none", borderRadius: 9999, padding: "16px 40px", fontSize: 16, cursor: "pointer" }}>
              Create your free account →
            </button>
          </SignUpButton>
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
            {[["Features","/features"],["Pricing","/pricing"],["Industries","/industries"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
              <Link key={l} href={h} className="footer-link">{l}</Link>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "rgba(241,245,249,0.25)" }}>© 2026 ARIA, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
