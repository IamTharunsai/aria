import Link from "next/link"
import { SignUpButton } from "@clerk/nextjs"
import {
  Zap, Stethoscope, UtensilsCrossed, Scale, Scissors, ShoppingBag,
  Hotel, Car, Wrench, TrendingUp, Truck, GraduationCap, Building2,
  Heart, Dumbbell, Phone, Check,
} from "lucide-react"

export const metadata = { title: "Industries — ARIA AI Voice Receptionist", description: "ARIA serves 15+ industries. See how AI voice receptionists transform customer experience in your sector." }

const INDUSTRIES = [
  {
    icon: <Stethoscope size={26} color="#EC4899" />, name: "Healthcare", color: "#EC4899", bg: "rgba(236,72,153,0.08)", brd: "rgba(236,72,153,0.2)",
    tagline: "Never miss a patient call again",
    flows: ["Book and confirm appointments", "Insurance pre-verification questions", "HIPAA-compliant intake", "After-hours urgent triage to on-call staff", "Prescription refill requests"],
    hipaa: true,
  },
  {
    icon: <Scale size={26} color="#8B5CF6" />, name: "Legal", color: "#8B5CF6", bg: "rgba(139,92,246,0.08)", brd: "rgba(139,92,246,0.2)",
    tagline: "Capture every lead, day or night",
    flows: ["Initial client intake and case screening", "Conflict-of-interest pre-check", "Appointment scheduling with attorneys", "Retainer and fee inquiry handling", "Multilingual intake for diverse clients"],
    hipaa: false,
  },
  {
    icon: <UtensilsCrossed size={26} color="#F59E0B" />, name: "Restaurant", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", brd: "rgba(245,158,11,0.2)",
    tagline: "Full tables, zero voicemails",
    flows: ["Reservation booking and confirmation", "Menu questions and allergy inquiries", "Hours, location, and directions", "Catering and large-party inquiries", "Waitlist management during peak hours"],
    hipaa: false,
  },
  {
    icon: <Scissors size={26} color="#22D3EE" />, name: "Salon & Spa", color: "#22D3EE", bg: "rgba(34,211,238,0.08)", brd: "rgba(34,211,238,0.2)",
    tagline: "Your front desk, fully automated",
    flows: ["Service menu and pricing questions", "Appointment booking with specific stylists", "Cancellation and rescheduling", "Product recommendation Q&A", "Gift card and package inquiries"],
    hipaa: false,
  },
  {
    icon: <Building2 size={26} color="#6366F1" />, name: "Real Estate", color: "#6366F1", bg: "rgba(99,102,241,0.08)", brd: "rgba(99,102,241,0.2)",
    tagline: "Qualify leads while you're showing homes",
    flows: ["Property inquiry and availability", "Showing scheduling", "Buyer and seller pre-qualification", "Open house information", "Agent follow-up coordination"],
    hipaa: false,
  },
  {
    icon: <Stethoscope size={26} color="#10B981" />, name: "Dental", color: "#10B981", bg: "rgba(16,185,129,0.08)", brd: "rgba(16,185,129,0.2)",
    tagline: "Fill your schedule automatically",
    flows: ["New patient appointment booking", "Insurance verification questions", "Emergency pain triage to on-call dentist", "Post-treatment care guidance", "Recall and hygiene appointment reminders"],
    hipaa: true,
  },
  {
    icon: <Heart size={26} color="#F43F5E" />, name: "Veterinary", color: "#F43F5E", bg: "rgba(244,63,94,0.08)", brd: "rgba(244,63,94,0.2)",
    tagline: "Every pet owner deserves an answer",
    flows: ["Appointment scheduling by pet type", "Emergency triage and after-hours guidance", "Vaccine and prescription questions", "Boarding and grooming inquiries", "New patient registration"],
    hipaa: false,
  },
  {
    icon: <Car size={26} color="#94A3B8" />, name: "Auto Services", color: "#94A3B8", bg: "rgba(148,163,184,0.08)", brd: "rgba(148,163,184,0.2)",
    tagline: "Book repairs without lifting a phone",
    flows: ["Service appointment scheduling", "Estimate requests and pricing guidance", "Vehicle status updates", "Warranty and recall questions", "Parts availability inquiries"],
    hipaa: false,
  },
  {
    icon: <Dumbbell size={26} color="#EAB308" />, name: "Fitness & Gym", color: "#EAB308", bg: "rgba(234,179,8,0.08)", brd: "rgba(234,179,8,0.2)",
    tagline: "Convert every inquiry into a membership",
    flows: ["Class schedule and availability", "Membership tier and pricing questions", "Trial class booking", "Personal trainer scheduling", "Facility hours and amenity questions"],
    hipaa: false,
  },
  {
    icon: <ShoppingBag size={26} color="#818CF8" />, name: "Retail", color: "#818CF8", bg: "rgba(129,140,248,0.08)", brd: "rgba(129,140,248,0.2)",
    tagline: "Handle product questions 24/7",
    flows: ["Product availability and pricing", "Store hours and location", "Order status updates", "Return and exchange policy", "Gift card and promotion inquiries"],
    hipaa: false,
  },
  {
    icon: <Hotel size={26} color="#06B6D4" />, name: "Hotel & Hospitality", color: "#06B6D4", bg: "rgba(6,182,212,0.08)", brd: "rgba(6,182,212,0.2)",
    tagline: "Concierge-quality service at any hour",
    flows: ["Room availability and booking", "Amenity and facility questions", "Early check-in / late checkout requests", "Local recommendation and transportation", "Group and event inquiry routing"],
    hipaa: false,
  },
  {
    icon: <Wrench size={26} color="#FB923C" />, name: "Home Services", color: "#FB923C", bg: "rgba(251,146,60,0.08)", brd: "rgba(251,146,60,0.2)",
    tagline: "Never miss an emergency service call",
    flows: ["Service request intake and scheduling", "Pricing and estimate questions", "Emergency call triage and dispatch", "Service area verification", "Technician arrival window updates"],
    hipaa: false,
  },
  {
    icon: <TrendingUp size={26} color="#A78BFA" />, name: "Financial Services", color: "#A78BFA", bg: "rgba(167,139,250,0.08)", brd: "rgba(167,139,250,0.2)",
    tagline: "Professional intake without the wait",
    flows: ["Appointment booking with advisors", "Service tier and fee questions", "Document checklist guidance", "Referral and new client onboarding", "Compliance-aware call routing"],
    hipaa: false,
  },
  {
    icon: <GraduationCap size={26} color="#34D399" />, name: "Education", color: "#34D399", bg: "rgba(52,211,153,0.08)", brd: "rgba(52,211,153,0.2)",
    tagline: "Answer every parent and student inquiry",
    flows: ["Enrollment and admissions information", "Class schedule and availability", "Tuition and payment questions", "Teacher contact and meeting scheduling", "After-school program inquiries"],
    hipaa: false,
  },
  {
    icon: <Truck size={26} color="#F97316" />, name: "Logistics & Delivery", color: "#F97316", bg: "rgba(249,115,22,0.08)", brd: "rgba(249,115,22,0.2)",
    tagline: "Status updates and dispatch on autopilot",
    flows: ["Shipment status and tracking", "Pickup and delivery scheduling", "Claims and damage inquiry routing", "Rate and quote requests", "Driver coordination and dispatch"],
    hipaa: false,
  },
]

export default function IndustriesPage() {
  return (
    <div style={{ background: "#07070F", color: "#F1F5F9", fontFamily: "var(--font-jakarta, system-ui, sans-serif)" }}>
      <style>{`
        .nav-link { color: rgba(241,245,249,0.6); text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-link:hover { color: #F1F5F9; }
        .footer-link { color: rgba(241,245,249,0.45); text-decoration: none; font-size: 14px; display: block; margin-bottom: 10px; transition: color 0.2s; }
        .footer-link:hover { color: #F1F5F9; }
        .ind-card { background: #0F0F1E; border: 1px solid rgba(99,102,241,0.12); border-radius: 20px; padding: 28px; transition: border-color 0.2s, transform 0.2s; }
        .ind-card:hover { transform: translateY(-3px); }
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
            <Link href="/industries" style={{ color: "#F1F5F9", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Industries</Link>
          </div>
          <SignUpButton>
            <button style={{ background: "#6366F1", color: "#fff", border: "none", borderRadius: 9999, padding: "9px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Get started
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)", padding: "88px 24px 72px", textAlign: "center" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#818CF8", borderRadius: 100, padding: "6px 18px", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            15 industries · one AI receptionist
          </div>
          <h1 style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 900, color: "#F1F5F9", margin: "0 0 20px", letterSpacing: "-0.04em", lineHeight: 1.05 }}>
            ARIA knows your industry before you say a word
          </h1>
          <p style={{ fontSize: 19, color: "#94A3B8", lineHeight: 1.6, margin: 0 }}>
            Each ARIA configuration is tuned to your industry&apos;s terminology, workflows, and compliance requirements. Not a generic chatbot — a specialist.
          </p>
        </div>
      </section>

      {/* INDUSTRIES GRID */}
      <section style={{ padding: "16px 24px 96px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 24 }}>
          {INDUSTRIES.map(ind => (
            <div key={ind.name} className="ind-card" style={{ borderColor: ind.brd }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 15, background: ind.bg, border: `1px solid ${ind.brd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  {ind.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: "#F1F5F9", margin: 0 }}>{ind.name}</h3>
                    {ind.hipaa && (
                      <span style={{ fontSize: 10, fontWeight: 700, color: "#10B981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: 100, padding: "2px 8px" }}>HIPAA</span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>{ind.tagline}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {ind.flows.map(flow => (
                  <div key={flow} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", background: ind.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                      <Check size={10} color={ind.color} strokeWidth={3} />
                    </div>
                    <span style={{ fontSize: 13, color: "#94A3B8", lineHeight: 1.4 }}>{flow}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* UNIVERSAL FEATURES BANNER */}
      <section style={{ background: "#0F0F1E", borderTop: "1px solid rgba(99,102,241,0.1)", borderBottom: "1px solid rgba(99,102,241,0.1)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 800, color: "#F1F5F9", margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            Every industry gets the same core AI
          </h2>
          <p style={{ fontSize: 17, color: "#94A3B8", margin: "0 0 44px" }}>
            The industry configuration changes the personality and workflows. The engine is the same.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
            {["24/7 availability","40+ languages","Real-time SMS follow-up","Appointment booking","Sentiment analysis","Human handoff","HIPAA mode","Custom greetings","Knowledge base Q&A","Call recordings","Analytics dashboard"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 100, padding: "8px 16px", fontSize: 13, color: "#94A3B8" }}>
                <Phone size={12} color="#6366F1" />
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "linear-gradient(135deg,#6366F1 0%,#4F46E5 50%,#4338CA 100%)", padding: "88px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 540, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(26px,4vw,42px)", fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.03em" }}>Don&apos;t see your industry?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.8)", margin: "0 0 36px" }}>ARIA is flexible enough to handle any business that takes phone calls. Contact us and we&apos;ll build a custom configuration for you.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <SignUpButton>
              <button style={{ background: "#fff", color: "#4338CA", fontWeight: 700, border: "none", borderRadius: 9999, padding: "14px 36px", fontSize: 15, cursor: "pointer" }}>
                Get started free
              </button>
            </SignUpButton>
            <Link href="/contact" style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 9999, padding: "14px 36px", fontSize: 15, fontWeight: 600, textDecoration: "none" }}>
              Contact us
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
            {[["Home","/"],["Features","/features"],["How it works","/how-it-works"],["Pricing","/pricing"],["About","/about"],["Contact","/contact"]].map(([l,h]) => (
              <Link key={l} href={h} className="footer-link" style={{ display: "inline", marginBottom: 0 }}>{l}</Link>
            ))}
          </div>
          <span style={{ fontSize: 13, color: "rgba(241,245,249,0.25)" }}>© 2026 ARIA, Inc.</span>
        </div>
      </footer>
    </div>
  )
}
