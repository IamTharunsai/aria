import Link from "next/link"
import { SignUpButton } from "@clerk/nextjs"
import {
  Zap, Check, Globe, Calendar, Shield, Users, Mic, Brain,
  MessageSquare, Clock, Phone, AlertTriangle, Building2, BarChart3, ArrowRight,
} from "lucide-react"

export const metadata = { title: "Features — ARIA AI Voice Receptionist", description: "Every feature your AI receptionist needs to handle calls, book appointments, and grow your business." }

export default function FeaturesPage() {
  return (
    <div style={{ background: "#07070F", color: "#F1F5F9", fontFamily: "var(--font-jakarta, system-ui, sans-serif)" }}>
      <style>{`
        .feat-row { border-bottom: 1px solid rgba(99,102,241,0.1); padding: 20px 0; display: flex; align-items: flex-start; gap: 16px; }
        .feat-row:last-child { border-bottom: none; }
        .tag { display: inline-block; background: rgba(99,102,241,0.12); border: 1px solid rgba(99,102,241,0.25); color: #818CF8; border-radius: 100px; padding: 4px 14px; font-size: 12px; font-weight: 600; }
        .nav-link { color: rgba(241,245,249,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #F1F5F9; }
        .footer-link { color: rgba(241,245,249,0.45); text-decoration: none; font-size: 14px; display: block; margin-bottom: 10px; transition: color 0.2s; }
        .footer-link:hover { color: #F1F5F9; }
        .spec-card { background: #0F0F1E; border: 1px solid rgba(99,102,241,0.15); border-radius: 16px; padding: 20px 24px; }
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
            <Link href="/features" style={{ color: "#F1F5F9", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Features</Link>
            <Link href="/how-it-works" className="nav-link">How it works</Link>
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
      <section style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.15) 0%, transparent 70%), #07070F`, padding: "96px 24px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#818CF8", borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            Full Feature Reference
          </div>
          <h1 style={{ fontSize: "clamp(40px,5vw,64px)", fontWeight: 900, color: "#F1F5F9", margin: "0 0 20px", letterSpacing: "-0.04em", lineHeight: 1.0 }}>
            Everything your AI receptionist can do
          </h1>
          <p style={{ fontSize: 20, color: "#94A3B8", lineHeight: 1.6, margin: "0 0 40px" }}>
            Built for real businesses, not enterprise RFPs. Every feature ships on day one.
          </p>
          <SignUpButton>
            <button style={{ background: "#6366F1", color: "#fff", border: "none", borderRadius: 9999, padding: "14px 32px", fontSize: 16, fontWeight: 600, cursor: "pointer" }}>
              Start for free
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* FEATURE GRID */}
      <section style={{ padding: "80px 24px 112px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>

          {/* Voice Intelligence */}
          <div id="voice-intelligence" style={{ marginBottom: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(99,102,241,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mic size={22} color="#6366F1" />
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em" }}>Voice Intelligence</h2>
                <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Powered by GPT-4 + OpenAI Whisper</p>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(99,102,241,0.15)", margin: "24px 0 0" }} />
            {[
              { icon: <Brain size={18} color="#6366F1" />, title: "Natural speech recognition", body: "Understands intent, context, and nuance. Not keyword matching — actual comprehension. Handles accents, mumbling, and background noise gracefully." },
              { icon: <Mic size={18} color="#6366F1" />, title: "Accent & dialect understanding", body: "Trained on diverse speech patterns across regions. Indian English, Southern US, Caribbean, Australian — ARIA handles them all without confusion." },
              { icon: <AlertTriangle size={18} color="#F59E0B" />, title: "Real-time barge-in detection", body: "When a caller interrupts mid-sentence, ARIA stops immediately and listens. No talking over customers. The experience feels genuinely conversational." },
              { icon: <BarChart3 size={18} color="#22D3EE" />, title: "Sentiment analysis after each call", body: "Every call is scored for caller satisfaction, urgency, and frustration. Know which customers need follow-up before they churn." },
            ].map((f, i) => (
              <div key={i} className="feat-row">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6 }}>{f.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Languages */}
          <div id="languages" style={{ marginBottom: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(34,211,238,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Globe size={22} color="#22D3EE" />
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em" }}>Languages</h2>
                <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>36 languages. Auto-detected. No configuration needed.</p>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(99,102,241,0.15)", margin: "24px 0 32px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#22D3EE", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>22 Indian Languages</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Hindi","Bengali","Telugu","Marathi","Tamil","Urdu","Gujarati","Kannada","Malayalam","Punjabi","Odia","Assamese","Maithili","Sanskrit","Konkani","Nepali","Sinhala","Sindhi","Bhojpuri","Rajasthani","Awadhi","Magahi"].map(lang => (
                    <div key={lang} style={{ background: "rgba(34,211,238,0.07)", border: "1px solid rgba(34,211,238,0.18)", borderRadius: 100, padding: "4px 12px", fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{lang}</div>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#818CF8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>14 US Languages</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["English","Spanish","Chinese","Tagalog","Vietnamese","Arabic","French","Korean","Russian","Haitian Creole","German","Hindi","Portuguese","Italian"].map(lang => (
                    <div key={lang} style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.18)", borderRadius: 100, padding: "4px 12px", fontSize: 13, color: "#94A3B8", fontWeight: 500 }}>{lang}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Business Automation */}
          <div id="automation" style={{ marginBottom: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(16,185,129,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Calendar size={22} color="#10B981" />
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em" }}>Business Automation</h2>
                <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Revenue-generating workflows that run without you</p>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(99,102,241,0.15)", margin: "24px 0 0" }} />
            {[
              { icon: <Calendar size={18} color="#10B981" />, title: "Appointment booking & confirmation", body: "ARIA collects all the details, books the slot, and sends an SMS confirmation to the caller. Works with your existing calendar system." },
              { icon: <MessageSquare size={18} color="#10B981" />, title: "FAQ answering from knowledge base", body: "Upload your FAQ document, menu, or policy page. ARIA reads it and answers questions accurately. Update it anytime from your dashboard." },
              { icon: <Clock size={18} color="#10B981" />, title: "Business hours awareness", body: "ARIA knows your hours. After-hours calls get a custom message, urgencies get escalated, non-urgent requests get captured for next-day follow-up." },
              { icon: <Users size={18} color="#10B981" />, title: "Lead capture and scoring", body: "Every caller's name, number, reason for calling, and sentiment score is logged. High-value leads are flagged for immediate callback." },
            ].map((f, i) => (
              <div key={i} className="feat-row">
                <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(16,185,129,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>{f.icon}</div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6 }}>{f.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Safety & Compliance */}
          <div id="safety" style={{ marginBottom: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(244,63,94,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Shield size={22} color="#F43F5E" />
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em" }}>Safety & Compliance</h2>
                <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Protect your business and your callers</p>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(99,102,241,0.15)", margin: "24px 0 0" }} />
            {[
              { title: "HIPAA mode for healthcare", body: "Enable HIPAA mode to ensure patient information is handled with appropriate protections. Required disclosures are made automatically at the start of each healthcare call." },
              { title: "Profanity filter (warn / end call)", body: "First offense: ARIA warns the caller professionally. Second offense: call ends gracefully. You configure the threshold. Zero tolerance is an option." },
              { title: "Content restrictions", body: "ARIA won't provide medical diagnoses, legal advice, or financial guidance. It redirects appropriately and logs the request for your team's follow-up." },
              { title: "Spam & robocall detection", body: "Machine-generated calls are identified within the first 10 seconds and terminated. Your minutes aren't wasted on bots." },
              { title: "Call recording consent prompts", body: "Jurisdiction-aware consent prompts play at the start of recorded calls. Two-party consent states are handled automatically." },
            ].map((f, i) => (
              <div key={i} className="feat-row">
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#F43F5E", flexShrink: 0, marginTop: 8 }} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6 }}>{f.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Human Handoff */}
          <div id="handoff" style={{ marginBottom: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Phone size={22} color="#6366F1" />
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em" }}>Human Handoff</h2>
                <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Seamless transfers when ARIA reaches its limit</p>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(99,102,241,0.15)", margin: "24px 0 0" }} />
            {[
              { title: "Warm call transfer", body: "ARIA stays on the line and briefs your team member with caller name, reason for calling, and urgency before handing off. No repeating themselves." },
              { title: "Cold transfer fallback", body: "If no team member picks up, ARIA takes a message, offers a callback time, and logs everything in your dashboard with the caller's preferred contact window." },
              { title: "Escalation triggers", body: "Configure keywords that trigger immediate escalation: 'emergency', 'lawyer', 'cancel my account', and any custom phrases specific to your business." },
            ].map((f, i) => (
              <div key={i} className="feat-row">
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#6366F1", flexShrink: 0, marginTop: 8 }} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6 }}>{f.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Multi-location */}
          <div id="multi-location" style={{ marginBottom: 80 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: "rgba(99,102,241,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Building2 size={22} color="#818CF8" />
              </div>
              <div>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: "#F1F5F9", margin: 0, letterSpacing: "-0.02em" }}>Multi-location</h2>
                <p style={{ fontSize: 14, color: "#94A3B8", margin: 0 }}>Agency plan — manage all locations from one dashboard</p>
              </div>
            </div>
            <div style={{ height: 1, background: "rgba(99,102,241,0.15)", margin: "24px 0 0" }} />
            {[
              { title: "Unlimited locations", body: "Add as many locations as you manage. Each gets its own phone number, agent configuration, and knowledge base." },
              { title: "Per-location agent configuration", body: "Each location's ARIA agent can have different hours, different greetings, different FAQs, and different handoff numbers." },
              { title: "Centralized analytics", body: "See call volume, sentiment trends, and booking rates across all locations in a single view. Export to CSV for your reports." },
              { title: "White-label dashboard", body: "Your clients see your branding, not ARIA's. Perfect for agencies reselling AI receptionist services." },
            ].map((f, i) => (
              <div key={i} className="feat-row">
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#818CF8", flexShrink: 0, marginTop: 8 }} />
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", marginBottom: 6 }}>{f.title}</div>
                  <div style={{ fontSize: 14, color: "#94A3B8", lineHeight: 1.6 }}>{f.body}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Technical specs */}
          <div id="technical-specs">
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#F1F5F9", margin: "0 0 8px", letterSpacing: "-0.02em" }}>Technical Specifications</h2>
            <div style={{ height: 1, background: "rgba(99,102,241,0.15)", margin: "24px 0 32px" }} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
              {[
                { label: "Call pickup latency", value: "<99ms", sub: "from ring to answer" },
                { label: "Speech model", value: "Whisper v3", sub: "OpenAI" },
                { label: "Language model", value: "GPT-4o", sub: "OpenAI" },
                { label: "Voice infrastructure", value: "Vapi.ai", sub: "WebRTC + WebSocket" },
                { label: "SMS provider", value: "Twilio", sub: "A2P 10DLC registered" },
                { label: "Uptime SLA", value: "99.9%", sub: "Agency plan" },
                { label: "Data retention", value: "90 days", sub: "recordings + transcripts" },
                { label: "API", value: "REST + Webhooks", sub: "Agency plan" },
              ].map((spec, i) => (
                <div key={i} className="spec-card">
                  <div style={{ fontSize: 11, color: "#94A3B8", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>{spec.label}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#F1F5F9", marginBottom: 4 }}>{spec.value}</div>
                  <div style={{ fontSize: 12, color: "#94A3B8" }}>{spec.sub}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #4338CA 100%)", padding: "96px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.03em" }}>Ready to put all this to work?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", margin: "0 0 36px" }}>Set up in 5 minutes. No credit card needed.</p>
          <SignUpButton>
            <button style={{ background: "#fff", color: "#4338CA", fontWeight: 700, border: "none", borderRadius: 9999, padding: "16px 40px", fontSize: 16, cursor: "pointer" }}>
              Start for free →
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#07070F", borderTop: "1px solid rgba(99,102,241,0.1)", padding: "48px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: "linear-gradient(135deg,#6366F1,#818CF8)", display: "flex", alignItems: "center", justifyContent: "center" }}><Zap size={14} color="#fff" fill="#fff" /></div>
            <span style={{ fontWeight: 800, fontSize: 15, color: "#F1F5F9" }}>ARIA</span>
          </Link>
          <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
            {[["Home","/"],["How it works","/how-it-works"],["Pricing","/pricing"],["Industries","/industries"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
              <Link key={l} href={h} className="footer-link" style={{ marginBottom: 0 }}>{l}</Link>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "rgba(241,245,249,0.25)" }}>© 2026 ARIA, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
