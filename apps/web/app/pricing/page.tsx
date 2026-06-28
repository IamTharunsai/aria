import Link from "next/link"
import { SignUpButton } from "@clerk/nextjs"
import { Zap, Check, X, ArrowRight, Shield } from "lucide-react"

export const metadata = { title: "Pricing — ARIA AI Voice Receptionist", description: "Simple, transparent pricing. Start free, scale as you grow." }

const plans = [
  {
    name: "Starter",
    price: 97,
    desc: "Perfect for solo practices and small businesses",
    highlight: false,
    features: [
      "1 AI voice agent",
      "Up to 500 minutes/month",
      "1 phone number",
      "Basic call logging",
      "Email summaries",
      "Knowledge base (up to 50 entries)",
      "Business hours configuration",
      "Email support",
    ],
    missing: ["Multi-location", "CRM integrations", "Custom voice", "Analytics dashboard"],
  },
  {
    name: "Pro",
    price: 197,
    desc: "Built for growing businesses that need more power",
    highlight: true,
    features: [
      "3 AI voice agents",
      "Up to 2,000 minutes/month",
      "3 phone numbers",
      "Full call logging + recordings",
      "SMS follow-ups",
      "Knowledge base (up to 500 entries)",
      "Advanced business hours + holidays",
      "HIPAA compliance mode",
      "Sentiment analysis",
      "Analytics dashboard",
      "Priority support",
    ],
    missing: ["Unlimited locations", "White-label"],
  },
  {
    name: "Agency",
    price: 497,
    desc: "For agencies managing multiple client accounts",
    highlight: false,
    features: [
      "Unlimited AI voice agents",
      "Unlimited minutes",
      "Unlimited phone numbers",
      "Multi-location management",
      "White-label ready",
      "Full knowledge base",
      "All Pro features included",
      "Custom voice cloning",
      "API access",
      "Dedicated account manager",
      "SLA guarantee",
      "24/7 priority support",
    ],
    missing: [],
  },
]

const faqs = [
  { q: "Is there a free trial?", a: "Yes — you can start for free and explore ARIA before adding a payment method. We don't charge until you activate a phone number." },
  { q: "Can I change plans anytime?", a: "Absolutely. Upgrade or downgrade at any point. Changes take effect at the start of your next billing cycle." },
  { q: "What counts as a 'minute'?", a: "A minute is 60 seconds of active call time between your AI agent and a caller. Hold time and ring time do not count." },
  { q: "Do you offer HIPAA compliance?", a: "Yes — HIPAA mode is available on Pro and Agency plans. It activates PHI-safe prompts, disables unnecessary data logging, and adds compliant handling instructions." },
  { q: "What happens if I exceed my minutes?", a: "We notify you at 80% usage. You can upgrade or purchase a minutes top-up. We never cut off calls mid-conversation." },
  { q: "Is setup difficult?", a: "Most businesses are live in under 15 minutes. You configure your agent, connect a phone number, and ARIA handles the rest." },
]

export default function PricingPage() {
  return (
    <div style={{ background: "#07070F", color: "#F1F5F9", fontFamily: "var(--font-jakarta, system-ui, sans-serif)" }}>
      <style>{`
        .nav-link { color: rgba(241,245,249,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #F1F5F9; }
        .footer-link { color: rgba(241,245,249,0.45); text-decoration: none; font-size: 14px; display: block; margin-bottom: 10px; transition: color 0.2s; }
        .footer-link:hover { color: #F1F5F9; }
        .plan-card { border-radius: 20px; padding: 32px; transition: transform 0.2s, box-shadow 0.2s; }
        .plan-card:hover { transform: translateY(-4px); }
        .faq-item { border-bottom: 1px solid rgba(99,102,241,0.1); padding: 24px 0; }
        .faq-item:first-child { border-top: 1px solid rgba(99,102,241,0.1); }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(7,7,15,0.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(99,102,241,0.12)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#818CF8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, color: "#F1F5F9" }}>ARIA</span>
          </Link>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <Link href="/features" className="nav-link">Features</Link>
            <Link href="/how-it-works" className="nav-link">How it works</Link>
            <Link href="/pricing" style={{ color: "#818CF8", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Pricing</Link>
            <Link href="/industries" className="nav-link">Industries</Link>
            <Link href="/sign-in" className="nav-link">Sign in</Link>
            <SignUpButton mode="modal">
              <button style={{ background: "linear-gradient(135deg,#6366F1,#818CF8)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Get started free
              </button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "80px 24px 60px", textAlign: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
          <Shield size={13} color="#818CF8" />
          <span style={{ fontSize: 12, fontWeight: 600, color: "#818CF8" }}>No hidden fees · Cancel anytime</span>
        </div>
        <h1 style={{ fontSize: "clamp(36px,5vw,56px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 20 }}>
          Simple pricing.<br />
          <span style={{ background: "linear-gradient(135deg,#6366F1,#22D3EE)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Serious results.
          </span>
        </h1>
        <p style={{ fontSize: 18, color: "#94A3B8", lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
          Three plans built for different business sizes. Every plan includes the core AI receptionist — no upsells on essential features.
        </p>
      </section>

      {/* PLANS */}
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 80px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {plans.map((plan) => (
          <div key={plan.name} className="plan-card" style={{
            background: plan.highlight ? "rgba(99,102,241,0.08)" : "#0F0F1E",
            border: plan.highlight ? "1.5px solid rgba(99,102,241,0.5)" : "1px solid rgba(99,102,241,0.15)",
            boxShadow: plan.highlight ? "0 0 48px rgba(99,102,241,0.18), inset 0 1px 0 rgba(255,255,255,0.05)" : "none",
            position: "relative",
          }}>
            {plan.highlight && (
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#6366F1,#22D3EE)", borderRadius: 100, padding: "4px 16px", fontSize: 11, fontWeight: 700, color: "#fff", whiteSpace: "nowrap" }}>
                MOST POPULAR
              </div>
            )}
            <div style={{ marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#818CF8", letterSpacing: "0.08em" }}>{plan.name.toUpperCase()}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
              <span style={{ fontSize: 48, fontWeight: 800, color: "#F1F5F9", letterSpacing: "-0.02em" }}>${plan.price}</span>
              <span style={{ fontSize: 16, color: "#64748B" }}>/mo</span>
            </div>
            <p style={{ fontSize: 14, color: "#94A3B8", marginBottom: 28, lineHeight: 1.6 }}>{plan.desc}</p>
            <SignUpButton mode="modal">
              <button style={{
                width: "100%", padding: "13px", borderRadius: 12, fontWeight: 700, fontSize: 15, cursor: "pointer", marginBottom: 28, border: "none",
                background: plan.highlight ? "linear-gradient(135deg,#6366F1,#818CF8)" : "rgba(99,102,241,0.12)",
                color: plan.highlight ? "#fff" : "#818CF8",
                transition: "opacity 0.2s",
              }}>
                Get started free
              </button>
            </SignUpButton>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {plan.features.map((f) => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <Check size={15} color="#10B981" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#CBD5E1" }}>{f}</span>
                </div>
              ))}
              {plan.missing.map((f) => (
                <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", opacity: 0.4 }}>
                  <X size={15} color="#64748B" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "#64748B" }}>{f}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* TRUST STRIP */}
      <section style={{ borderTop: "1px solid rgba(99,102,241,0.1)", borderBottom: "1px solid rgba(99,102,241,0.1)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32, textAlign: "center" }}>
          {[
            { num: "< 15 min", label: "Average setup time" },
            { num: "99.9%", label: "Uptime SLA (Agency)" },
            { num: "24/7", label: "AI always answering" },
            { num: "HIPAA", label: "Compliant mode available" },
          ].map((s) => (
            <div key={s.num}>
              <div style={{ fontSize: 28, fontWeight: 800, color: "#818CF8", marginBottom: 4 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "#64748B" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "80px 24px" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, textAlign: "center", marginBottom: 48, letterSpacing: "-0.02em" }}>Frequently asked questions</h2>
        {faqs.map((faq) => (
          <div key={faq.q} className="faq-item">
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, color: "#F1F5F9" }}>{faq.q}</h3>
            <p style={{ fontSize: 15, color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(34,211,238,0.05))", borderTop: "1px solid rgba(99,102,241,0.15)", padding: "80px 24px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(28px,4vw,42px)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.02em" }}>Ready to stop missing calls?</h2>
        <p style={{ fontSize: 17, color: "#94A3B8", marginBottom: 36, maxWidth: 480, margin: "0 auto 36px" }}>
          Start free. No credit card required. Your AI receptionist can be live in under 15 minutes.
        </p>
        <SignUpButton mode="modal">
          <button style={{ background: "linear-gradient(135deg,#6366F1,#818CF8)", color: "#fff", border: "none", borderRadius: 14, padding: "16px 36px", fontSize: 16, fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
            Start for free <ArrowRight size={18} />
          </button>
        </SignUpButton>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(99,102,241,0.1)", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366F1,#818CF8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={15} color="#fff" fill="#fff" />
              </div>
              <span style={{ fontWeight: 700, color: "#F1F5F9" }}>ARIA</span>
            </div>
            <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7, maxWidth: 220 }}>AI voice receptionist for modern businesses.</p>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", marginBottom: 16 }}>PRODUCT</div>
            {[["Features", "/features"], ["How it works", "/how-it-works"], ["Pricing", "/pricing"], ["Industries", "/industries"]].map(([l, h]) => (
              <Link key={l} href={h} className="footer-link">{l}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", marginBottom: 16 }}>COMPANY</div>
            {[["About", "/about"], ["Contact", "/contact"]].map(([l, h]) => (
              <Link key={l} href={h} className="footer-link">{l}</Link>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#64748B", letterSpacing: "0.08em", marginBottom: 16 }}>ACCOUNT</div>
            {[["Sign in", "/sign-in"], ["Sign up", "/sign-up"]].map(([l, h]) => (
              <Link key={l} href={h} className="footer-link">{l}</Link>
            ))}
          </div>
        </div>
        <div style={{ maxWidth: 1200, margin: "32px auto 0", paddingTop: 24, borderTop: "1px solid rgba(99,102,241,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#475569" }}>© 2026 ARIA AI. All rights reserved.</span>
          <span style={{ fontSize: 13, color: "#475569" }}>Powered by Vapi.ai · Built with ❤️</span>
        </div>
      </footer>
    </div>
  )
}
