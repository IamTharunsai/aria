import Link from "next/link"
import { SignUpButton } from "@clerk/nextjs"
import { Zap, Brain, Shield, Globe, Heart, Users, Mic, ArrowRight } from "lucide-react"

export const metadata = { title: "About — ARIA AI Voice Receptionist", description: "We're building the AI receptionist layer for every business — starting with the phone." }

export default function AboutPage() {
  return (
    <div style={{ background: "#07070F", color: "#F1F5F9", fontFamily: "var(--font-jakarta, system-ui, sans-serif)" }}>
      <style>{`
        .nav-link { color: rgba(241,245,249,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #F1F5F9; }
        .footer-link { color: rgba(241,245,249,0.45); text-decoration: none; font-size: 14px; display: block; margin-bottom: 10px; transition: color 0.2s; }
        .footer-link:hover { color: #F1F5F9; }
        .val-card { background: #0F0F1E; border: 1px solid rgba(99,102,241,0.15); border-radius: 20px; padding: 32px 28px; }
        .val-card:hover { border-color: rgba(99,102,241,0.3); }
        .stat-card { background: rgba(99,102,241,0.06); border: 1px solid rgba(99,102,241,0.15); border-radius: 16px; padding: 28px 24px; text-align: center; }
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
          <SignUpButton>
            <button style={{ background: "#6366F1", color: "#fff", border: "none", borderRadius: 9999, padding: "9px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Get started
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)", padding: "96px 24px 80px", textAlign: "center" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#818CF8", borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            Our story
          </div>
          <h1 style={{ fontSize: "clamp(38px,5vw,62px)", fontWeight: 900, color: "#F1F5F9", margin: "0 0 20px", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            Built because businesses deserve better than voicemail.
          </h1>
          <p style={{ fontSize: 19, color: "#94A3B8", lineHeight: 1.65, margin: 0 }}>
            Every missed call is a missed customer. We built ARIA so that no business ever loses a lead because the phone rang at 11pm, during lunch, or when the team was slammed.
          </p>
        </div>
      </section>

      {/* MISSION */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#6366F1", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>Our mission</div>
              <h2 style={{ fontSize: "clamp(26px,3.5vw,40px)", fontWeight: 800, color: "#F1F5F9", margin: "0 0 20px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
                Give every business an AI that works as hard as they do
              </h2>
              <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, margin: "0 0 16px" }}>
                Small businesses and solo practitioners are the backbone of the economy. They work long hours, wear every hat, and still can&apos;t answer every call. That gap costs them real money every day.
              </p>
              <p style={{ fontSize: 16, color: "#94A3B8", lineHeight: 1.7, margin: 0 }}>
                ARIA closes that gap. A voice AI that knows your business, handles callers professionally, books appointments, and never takes a sick day — at a price any business can afford.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: <Brain size={22} color="#6366F1" />, label: "GPT-4o intelligence", sub: "Natural, context-aware conversations" },
                { icon: <Globe size={22} color="#22D3EE" />, label: "40+ languages", sub: "Serve customers in their native language" },
                { icon: <Shield size={22} color="#10B981" />, label: "HIPAA compliant", sub: "For healthcare and legal industries" },
                { icon: <Mic size={22} color="#818CF8" />, label: "Vapi.ai voice", sub: "Ultra-low latency, human-quality speech" },
              ].map((item, i) => (
                <div key={i} className="stat-card">
                  <div style={{ marginBottom: 12 }}>{item.icon}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F1F5F9", marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: "#64748B", lineHeight: 1.5 }}>{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#0F0F1E", borderTop: "1px solid rgba(99,102,241,0.1)", borderBottom: "1px solid rgba(99,102,241,0.1)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 32, textAlign: "center" }}>
            {[
              { num: "24/7", label: "Always answering", sub: "No breaks, no holidays" },
              { num: "< 5 min", label: "Setup time", sub: "From signup to live" },
              { num: "15+", label: "Industries served", sub: "Healthcare to hospitality" },
              { num: "$0", label: "Missed call cost", sub: "When ARIA is on duty" },
            ].map((s, i) => (
              <div key={i}>
                <div style={{ fontSize: 36, fontWeight: 900, color: "#818CF8", letterSpacing: "-0.03em", marginBottom: 8 }}>{s.num}</div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9", marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 13, color: "#64748B" }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section style={{ padding: "96px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 800, color: "#F1F5F9", margin: "0 0 12px", letterSpacing: "-0.02em" }}>What guides everything we build</h2>
            <p style={{ fontSize: 17, color: "#94A3B8", margin: 0 }}>These aren&apos;t values on a wall. They&apos;re the filter every product decision goes through.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
            {[
              { icon: <Heart size={22} color="#F43F5E" />, title: "Businesses first", body: "Every feature is built for the business owner, not for an investor slide. If it doesn't make your life easier, we don't ship it." },
              { icon: <Shield size={22} color="#10B981" />, title: "Trust is non-negotiable", body: "Your call data belongs to you. We don't train on your calls, we don't sell your data, and we'll never upsell privacy as a feature." },
              { icon: <Zap size={22} color="#F59E0B" />, title: "Speed over perfection", body: "A working AI receptionist today beats a perfect one next quarter. We ship fast, learn from real usage, and iterate relentlessly." },
              { icon: <Users size={22} color="#6366F1" />, title: "Accessible to everyone", body: "Enterprise voice AI costs $5,000+/mo. We priced ARIA to be within reach of any business — from solo practitioners to agencies." },
            ].map((v, i) => (
              <div key={i} className="val-card">
                <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#F1F5F9", margin: "0 0 10px" }}>{v.title}</h3>
                <p style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.65, margin: 0 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK — transparency */}
      <section style={{ background: "#0F0F1E", borderTop: "1px solid rgba(99,102,241,0.1)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, color: "#F1F5F9", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Built on best-in-class infrastructure</h2>
          <p style={{ fontSize: 16, color: "#94A3B8", margin: "0 0 44px" }}>We don&apos;t build what others have already perfected. We assemble the best and make it work together.</p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {["Vapi.ai — voice infrastructure", "OpenAI GPT-4o — language model", "Whisper v3 — speech recognition", "Twilio — telephony & SMS", "Supabase — database", "Clerk — auth", "Vercel — deployment"].map(item => (
              <div key={item} style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 100, padding: "8px 18px", fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#6366F1 0%,#4F46E5 50%,#4338CA 100%)", padding: "88px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 520, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.03em" }}>Join us in building the future of business communication.</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", margin: "0 0 36px" }}>Start free — no credit card required.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <SignUpButton>
              <button style={{ background: "#fff", color: "#4338CA", fontWeight: 700, border: "none", borderRadius: 9999, padding: "14px 36px", fontSize: 15, cursor: "pointer" }}>
                Get started free
              </button>
            </SignUpButton>
            <Link href="/contact" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontWeight: 600, border: "1px solid rgba(255,255,255,0.3)", borderRadius: 9999, padding: "14px 36px", fontSize: 15, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
              Contact us <ArrowRight size={15} />
            </Link>
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
            {[["Home","/"],["Features","/features"],["How it works","/how-it-works"],["Pricing","/pricing"],["Industries","/industries"],["Contact","/contact"]].map(([l,h]) => (
              <Link key={l} href={h} className="footer-link" style={{ display: "inline", marginBottom: 0 }}>{l}</Link>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "rgba(241,245,249,0.25)" }}>© 2026 ARIA, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
