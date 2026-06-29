"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import VoiceDemo from "@/components/VoiceDemo"
import { ArrowRight, Check, Star, Zap, Phone, PhoneCall, BarChart3, MessageSquare } from "lucide-react"

// ── Design tokens — light professional theme ────────────────────
const BG   = "#FFFFFF"
const SF   = "#F8FAFC"
const TX   = "#0F172A"
const MT   = "#64748B"
const PR   = "#2563EB"
const PRL  = "#3B82F6"
const AC   = "#0EA5E9"
const BD   = "#E2E8F0"
const GR   = "#10B981"
const AM   = "#F59E0B"

// ── Inline dashboard mockup (light-adapted) ─────────────────────
function Mockup() {
  return (
    <div style={{
      background: "#FFFFFF",
      borderRadius: 20,
      overflow: "hidden",
      border: "1px solid #E2E8F0",
      boxShadow: "0 32px 80px rgba(15,23,42,0.15), 0 0 0 1px rgba(37,99,235,0.08)",
      fontFamily: "system-ui,sans-serif",
      userSelect: "none",
    }}>
      {/* browser chrome */}
      <div style={{ background: "#F1F5F9", height: 38, display: "flex", alignItems: "center", padding: "0 16px", gap: 8, borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57","#FFBD2E","#28C840"].map(c=>(
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, height: 22, background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 6, maxWidth: 240, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 10, color: "#94A3B8" }}>aria.app/dashboard</span>
        </div>
      </div>
      {/* layout */}
      <div style={{ display: "flex", height: 370 }}>
        {/* sidebar */}
        <div style={{ width: 52, background: "#F8FAFC", borderRight: "1px solid #E2E8F0", padding: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${PR},${AC})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
            <Zap size={13} color="#fff" fill="#fff" />
          </div>
          {[true,false,false,false].map((a,i)=>(
            <div key={i} style={{ width: 34, height: 34, borderRadius: 8, background: a ? `rgba(37,99,235,0.1)` : "transparent", border: a ? `1px solid rgba(37,99,235,0.2)` : "1px solid transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: a ? PR : "#CBD5E1" }} />
            </div>
          ))}
        </div>
        {/* main */}
        <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", gap: 12, background: "#F8FAFC", overflow: "hidden" }}>
          {/* top row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: TX }}>Dashboard</div>
              <div style={{ fontSize: 10, color: MT, marginTop: 1 }}>Live overview</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)", borderRadius: 100, padding: "4px 10px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: GR, boxShadow: `0 0 6px ${GR}` }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: GR }}>3 CALLS LIVE</span>
            </div>
          </div>
          {/* stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {[
              { l:"Calls Today", v:"47", c:PR },
              { l:"Bookings",    v:"12", c:GR },
              { l:"Revenue",     v:"$2.4k", c:AC },
            ].map(s=>(
              <div key={s.l} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, padding: "10px 12px", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 9, color: MT, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{s.l}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.c, letterSpacing: "-0.04em" }}>{s.v}</div>
              </div>
            ))}
          </div>
          {/* live call */}
          <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: GR, boxShadow: `0 0 8px ${GR}`, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: GR, marginBottom: 1, textTransform: "uppercase", letterSpacing: "0.06em" }}>ARIA Answering</div>
              <div style={{ fontSize: 11, color: MT }}>Maria's Dental Clinic · 0:47</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {[4,8,13,9,15,11,5,9].map((h,i)=>(
                <div key={i} style={{ width: 2.5, height: h, background: `linear-gradient(to top,${PR},${AC})`, borderRadius: 2 }} />
              ))}
            </div>
          </div>
          {/* calls list */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 10, overflow: "hidden", flex: 1, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ padding: "8px 12px", borderBottom: "1px solid #F1F5F9", background: "#F8FAFC" }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: MT, textTransform: "uppercase", letterSpacing: "0.08em" }}>Recent Calls</span>
            </div>
            {[
              { n:"Sunrise Dental",  t:"2m ago",  tag:"Booked",  tc:GR,  tb:"rgba(16,185,129,0.08)"  },
              { n:"Lakewood Spa",    t:"8m ago",  tag:"FAQ",     tc:PR,  tb:"rgba(37,99,235,0.08)"   },
              { n:"QuickFix Auto",   t:"14m ago", tag:"Transfer",tc:AM,  tb:"rgba(245,158,11,0.08)"  },
            ].map((c,i)=>(
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderBottom: i<2 ? "1px solid #F1F5F9" : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#F8FAFC", border: "1px solid #E2E8F0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PhoneCall size={11} color={MT} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: TX, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.n}</div>
                  <div style={{ fontSize: 9, color: MT, marginTop: 1 }}>{c.t}</div>
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: c.tc, background: c.tb, padding: "3px 8px", borderRadius: 100 }}>{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Page ─────────────────────────────────────────────────────────
export default function MarketingPage() {
  const heroRef = useRef<HTMLElement>(null)
  const [rot,   setRot]   = useState({ x: 14, y: -7 })
  const [mouse, setMouse] = useState({ x: 0,  y: 0  })

  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height * 0.6)))
      setRot({ x: 14 - p * 14, y: -7 + p * 7 })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      setMouse({
        x: (e.clientY - window.innerHeight / 2) / window.innerHeight,
        y: (e.clientX - window.innerWidth  / 2) / window.innerWidth,
      })
    }
    window.addEventListener("mousemove", onMouse, { passive: true })
    return () => window.removeEventListener("mousemove", onMouse)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("rv") }),
      { threshold: 0.08 }
    )
    document.querySelectorAll(".sr").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const rotX = rot.x + mouse.x * 3
  const rotY = rot.y + mouse.y * 5

  return (
    <div style={{ background: BG, color: TX, fontFamily: "var(--font-jakarta,system-ui,-apple-system,sans-serif)", overflowX: "hidden" }}>
      <style>{`
        .sr{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1)}
        .sr.rv{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.10s}.d2{transition-delay:.20s}.d3{transition-delay:.30s}
        .d4{transition-delay:.40s}.d5{transition-delay:.50s}
        @keyframes hup{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .h0{animation:hup .75s cubic-bezier(.16,1,.3,1) .00s both}
        .h1{animation:hup .75s cubic-bezier(.16,1,.3,1) .10s both}
        .h2{animation:hup .75s cubic-bezier(.16,1,.3,1) .22s both}
        .h3{animation:hup .75s cubic-bezier(.16,1,.3,1) .34s both}
        .h4{animation:hup .75s cubic-bezier(.16,1,.3,1) .46s both}
        @keyframes ldot{0%,100%{opacity:1}50%{opacity:.3}}
        .ldot{animation:ldot 1.8s ease-in-out infinite}
        @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}
        .ping{animation:ping 2s cubic-bezier(0,0,.2,1) infinite}
        @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .mq{animation:mq 28s linear infinite;display:flex;width:max-content}
        .mq:hover{animation-play-state:paused}
        .gc{transition:transform .28s cubic-bezier(.16,1,.3,1),box-shadow .28s,border-color .28s}
        .gc:hover{transform:translateY(-4px)!important;box-shadow:0 20px 56px rgba(15,23,42,0.12)!important;border-color:#CBD5E1!important}
        .btn-p{transition:transform .15s,box-shadow .15s;cursor:pointer;border:none}
        .btn-p:hover{transform:translateY(-1px);box-shadow:0 12px 36px rgba(37,99,235,.35)}
        .btn-g{transition:background .18s;cursor:pointer}
        .btn-g:hover{background:#F1F5F9!important}
        @media(prefers-reduced-motion:reduce){*,.ldot,.ping,.mq{animation:none!important;transition:none!important}.sr{opacity:1!important;transform:none!important}}
      `}</style>

      {/* ══ NAV ══ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${PR},${AC})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(37,99,235,.28)" }}>
              <Zap size={15} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: TX, letterSpacing: "-0.025em" }}>ARIA</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["Features","/features"],["How it works","/how-it-works"],["Pricing","/pricing"],["Industries","/industries"]].map(([l,h])=>(
              <Link key={l} href={h} style={{ color: MT, textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color .15s" }}
                onMouseEnter={e=>{e.currentTarget.style.color=TX}} onMouseLeave={e=>{e.currentTarget.style.color=MT}}>
                {l}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SignInButton>
              <button className="btn-g" style={{ background: "none", border: "none", color: MT, fontSize: 14, fontWeight: 500, padding: "7px 14px", borderRadius: 8 }}>
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="btn-p" style={{ background: PR, color: "#fff", borderRadius: 9999, padding: "9px 22px", fontSize: 14, fontWeight: 600 }}>
                Start free
              </button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* ══ HERO ══ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        padding: "96px 24px 72px", position: "relative", overflow: "hidden",
        background: `radial-gradient(ellipse 80% 50% at 50% -5%,rgba(37,99,235,.07) 0%,transparent 65%),radial-gradient(ellipse 40% 30% at 85% 55%,rgba(14,165,233,.05) 0%,transparent 55%),${BG}`,
      }}>
        {/* subtle dot grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(#E2E8F0 1px,transparent 1px)`, backgroundSize: "28px 28px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 0%,black 10%,transparent 70%)", pointerEvents: "none", opacity: 0.6 }} />

        <div style={{ maxWidth: 840, width: "100%", textAlign: "center", position: "relative", zIndex: 2 }}>
          {/* live badge */}
          <div className="h0" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.22)", borderRadius: 9999, padding: "6px 16px", marginBottom: 32 }}>
            <div style={{ position: "relative", width: 8, height: 8 }}>
              <div className="ping" style={{ position: "absolute", inset: 0, borderRadius: "50%", background: GR, opacity: .6 }} />
              <div className="ldot" style={{ width: 8, height: 8, borderRadius: "50%", background: GR, position: "relative" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: GR, letterSpacing: "0.04em", textTransform: "uppercase" }}>Live · Answering calls right now</span>
          </div>

          {/* headline */}
          <h1 className="h1" style={{ fontSize: "clamp(48px,7.5vw,88px)", fontWeight: 900, lineHeight: .94, letterSpacing: "-0.04em", color: TX, margin: "0 0 24px" }}>
            Your best receptionist<br />
            <span style={{ background: `linear-gradient(135deg,${PR} 0%,${AC} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>never takes a day off.</span>
          </h1>

          {/* subheadline */}
          <p className="h2" style={{ fontSize: "clamp(17px,2.2vw,21px)", color: MT, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.6 }}>
            ARIA answers every call in under 2 seconds, books every appointment, and speaks 36 languages — 24 hours a day, for less than a part-time receptionist.
          </p>

          {/* CTAs */}
          <div className="h3" style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 18 }}>
            <SignUpButton>
              <button className="btn-p" style={{ background: PR, color: "#fff", borderRadius: 9999, padding: "15px 34px", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                Start free — no credit card <ArrowRight size={16} />
              </button>
            </SignUpButton>
            <Link href="/how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: MT, textDecoration: "none", fontSize: 15, fontWeight: 500 }}
              onMouseEnter={e=>{e.currentTarget.style.color=TX}} onMouseLeave={e=>{e.currentTarget.style.color=MT}}>
              See how it works <ArrowRight size={14} />
            </Link>
          </div>

          {/* trust micro-copy */}
          <div className="h4" style={{ fontSize: 13, color: "#94A3B8", display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 80 }}>
            {["14-day free trial","Setup in 5 minutes","36 languages","Cancel anytime"].map((t,i)=>(
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i>0&&<span style={{ color:"#CBD5E1" }}>·</span>}
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* 3-D product mockup */}
        <div className="h4" style={{ maxWidth: 740, width: "100%", position: "relative", zIndex: 2 }}>
          {/* subtle glow under mockup */}
          <div style={{ position: "absolute", bottom: -60, left: "50%", transform: "translateX(-50%)", width: 600, height: 180, background: `radial-gradient(ellipse,rgba(37,99,235,.12) 0%,transparent 70%)`, filter: "blur(20px)", pointerEvents: "none" }} />
          <div style={{
            transform: `perspective(1100px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: "transform 0.07s linear",
            willChange: "transform",
            transformOrigin: "center center",
          }}>
            <Mockup />
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ══ */}
      <section style={{ background: SF, borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0", padding: "56px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: BD, borderRadius: 20, overflow: "hidden", border: "1px solid #E2E8F0" }}>
          {[
            { num: "94%",  label: "of calls answered in under 2 seconds" },
            { num: "3.2×", label: "more bookings compared to voicemail" },
            { num: "24/7", label: "always on — no holidays, no sick days" },
          ].map((s,i)=>(
            <div key={i} className="sr" style={{ background: BG, padding: "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "clamp(40px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.05em", background: `linear-gradient(135deg,${PR},${AC})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 10 }}>{s.num}</div>
              <div style={{ fontSize: 14, color: MT, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══ TRUSTED BY ══ */}
      <section style={{ background: BG, borderBottom: "1px solid #E2E8F0", padding: "20px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32, padding: "0 40px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#CBD5E1", whiteSpace: "nowrap", letterSpacing: "0.09em", textTransform: "uppercase", flexShrink: 0 }}>Trusted by</span>
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(90deg,${BG},transparent)`, zIndex: 1 }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(-90deg,${BG},transparent)`, zIndex: 1 }} />
            <div className="mq">
              {[...Array(2)].flatMap((_,r)=>
                ["Dental Plus","GreenLeaf Bistro","Elite Legal","Sunrise Salon","QuickFix Auto","Summit Fitness","City Realty","PetCare Vets","TechRepair Hub","Lakewood Spa"].map((n,i)=>(
                  <span key={`${r}${i}`} style={{ fontSize: 14, fontWeight: 700, color: "#CBD5E1", whiteSpace: "nowrap", padding: "0 32px", letterSpacing: "0.02em" }}>{n}</span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PAIN SECTION ══ */}
      <section style={{ background: SF, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-block", background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "#EF4444", borderRadius: 9999, padding: "5px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 }}>The cost of missed calls</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: TX, margin: "0 0 16px", letterSpacing: "-0.035em", lineHeight: 1.1 }}>
              Every unanswered call is revenue<br />walking to your competitor.
            </h2>
            <p style={{ fontSize: 17, color: MT, maxWidth: 520, margin: "0 auto" }}>The math is brutal. Most businesses don't realize how much they're losing until they see the numbers.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { num:"67%",    label:"of callers who reach voicemail never call back",           color:"#EF4444", bg:"#FEF2F2", border:"#FECACA" },
              { num:"$2,400", label:"average annual revenue lost per missed call in your market",color:AM,        bg:"#FFFBEB", border:"#FDE68A" },
              { num:"3.2×",   label:"more bookings when a real voice answers within 3 rings",   color:GR,        bg:"#ECFDF5", border:"#A7F3D0" },
            ].map((s,i)=>(
              <div key={i} className={`sr d${i+1} gc`} style={{ background: BG, borderRadius: 22, padding: "36px 32px", border: "1px solid #E2E8F0", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: "clamp(44px,5vw,64px)", fontWeight: 900, color: s.color, letterSpacing: "-0.04em", lineHeight: 1, marginBottom: 16 }}>{s.num}</div>
                <p style={{ fontSize: 16, color: TX, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="sr" style={{ textAlign: "center", marginTop: 56 }}>
            <p style={{ fontSize: 18, color: TX, fontWeight: 700, margin: "0 0 24px" }}>ARIA ends this permanently. Starting at $97/month.</p>
            <SignUpButton>
              <button className="btn-p" style={{ background: PR, color: "#fff", borderRadius: 9999, padding: "14px 32px", fontSize: 15, fontWeight: 700, border: "none", cursor: "pointer" }}>
                Stop losing revenue →
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* ══ FEATURES BENTO ══ */}
      <section style={{ background: BG, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ display: "inline-block", background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)", color: PR, borderRadius: 9999, padding: "5px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 }}>What ARIA does</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: TX, margin: "0 0 14px", letterSpacing: "-0.04em" }}>
              Built for the calls that<br />actually matter.
            </h2>
            <p style={{ fontSize: 17, color: MT, maxWidth: 480, margin: "0 auto" }}>Not a chatbot. Not a phone menu. A real AI receptionist that sounds human and handles your business.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16 }}>
            {/* ① Languages — 4 col */}
            <div className="sr gc" style={{ gridColumn: "span 4", background: SF, border: "1px solid #E2E8F0", borderRadius: 22, padding: "32px 36px", position: "relative", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle,rgba(14,165,233,.07) 0%,transparent 65%)`, pointerEvents: "none" }} />
              <div style={{ display: "inline-block", background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", color: AC, borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>36 Languages</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: TX, margin: "0 0 10px", letterSpacing: "-0.025em" }}>Speaks your customer's language — automatically.</h3>
              <p style={{ fontSize: 14, color: MT, lineHeight: 1.6, margin: "0 0 22px", maxWidth: 480 }}>Detects language at the start of every call. No transfers, no awkward moments. Full US + 22 Indian regional languages out of the box.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["🇺🇸 English","🇪🇸 Spanish","🇮🇳 Hindi","🇮🇳 Telugu","🇮🇳 Tamil","🇨🇳 Chinese","🇵🇭 Tagalog","🇻🇳 Vietnamese","🇰🇷 Korean","🇫🇷 French"].map(l=>(
                  <div key={l} style={{ background: BG, border: "1px solid #E2E8F0", borderRadius: 9999, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: TX }}>{l}</div>
                ))}
                <div style={{ background: "rgba(14,165,233,0.08)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: 9999, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: AC }}>+26 more</div>
              </div>
            </div>

            {/* ② 24/7 — 2 col */}
            <div className="sr d1 gc" style={{ gridColumn: "span 2", background: SF, border: "1px solid #E2E8F0", borderRadius: 22, padding: "32px 28px", position: "relative", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: `radial-gradient(circle,rgba(37,99,235,.07) 0%,transparent 65%)`, pointerEvents: "none" }} />
              <div style={{ fontSize: 58, fontWeight: 900, color: PR, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 8 }}>24/7</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: TX, marginBottom: 10 }}>Never misses a call</div>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 20px" }}>No sick days. No holidays. No breaks. ARIA is always on, always professional.</p>
              {[{l:"Answer rate",v:"99.8%",c:GR},{l:"Response time",v:"< 2 s",c:PR},{l:"Uptime SLA",v:"99.9%",c:AM}].map(s=>(
                <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: BG, borderRadius: 9, border: "1px solid #E2E8F0", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: MT }}>{s.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.c }}>{s.v}</span>
                </div>
              ))}
            </div>

            {/* ③ Booking — 2 col */}
            <div className="sr d2 gc" style={{ gridColumn: "span 2", background: SF, border: "1px solid #E2E8F0", borderRadius: 22, padding: "28px", position: "relative", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "inline-block", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", color: GR, borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>Booking Engine</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 8px" }}>Fills your calendar while you sleep</h3>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 16px" }}>Checks availability, captures details, confirms with the caller, and sends an SMS — in under 30 seconds.</p>
              <div style={{ background: "rgba(16,185,129,0.06)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <Check size={15} color={GR} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: GR }}>Booked · Thu Nov 14 · 2:00 PM</div>
                  <div style={{ fontSize: 11, color: MT, marginTop: 2 }}>Dr. Anjali Chen · SMS sent ✓</div>
                </div>
              </div>
            </div>

            {/* ④ Handoff — 2 col */}
            <div className="sr d3 gc" style={{ gridColumn: "span 2", background: SF, border: "1px solid #E2E8F0", borderRadius: 22, padding: "28px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "inline-block", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.18)", color: PR, borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>Human Handoff</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 8px" }}>Knows exactly when to involve you</h3>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 18px" }}>When a caller needs a human, ARIA collects context and bridges the call — so the handoff is seamless.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                {[
                  { step: "'Let me speak to someone' detected", done: true  },
                  { step: "Name and reason captured by ARIA",  done: true  },
                  { step: "Call bridged · your team connected", active: true },
                ].map((s,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.active ? GR : s.done ? PR : "#CBD5E1", flexShrink: 0, marginTop: 5 }} />
                    <span style={{ fontSize: 12, color: s.active ? TX : MT, lineHeight: 1.5, fontWeight: s.active ? 600 : 400 }}>{s.step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ⑤ Spam — 2 col */}
            <div className="sr d4 gc" style={{ gridColumn: "span 2", background: SF, border: "1px solid #E2E8F0", borderRadius: 22, padding: "28px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "inline-block", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)", color: "#EF4444", borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>Spam Guard</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 8px" }}>Stops spam before it wastes your time</h3>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 16px" }}>Detects robocalls and abusive callers in seconds. Ends the call gracefully — you never even know it happened.</p>
              {[{l:"Spam blocked today",v:"23",c:"#EF4444"},{l:"Robocalls rejected",v:"11",c:"#EF4444"},{l:"Real calls answered",v:"94",c:GR}].map(s=>(
                <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: BG, borderRadius: 9, border: "1px solid #E2E8F0", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: MT }}>{s.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.c }}>{s.v}</span>
                </div>
              ))}
            </div>

            {/* ⑥ Analytics — 2 col */}
            <div className="sr d5 gc" style={{ gridColumn: "span 2", background: SF, border: "1px solid #E2E8F0", borderRadius: 22, padding: "28px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "inline-block", background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.2)", color: AM, borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 14 }}>Analytics</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 8px" }}>See exactly what's working</h3>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 16px" }}>Every call scored for sentiment and outcome. Know which customers need follow-up before they churn.</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
                {[40,62,52,78,68,90,72].map((h,i)=>(
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i===5 ? `linear-gradient(180deg,${PR},${AC})` : "#E2E8F0", borderRadius: "3px 3px 0 0" }} />
                ))}
              </div>
            </div>
          </div>
          <div className="sr" style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/features" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: PR, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
              View all features <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section style={{ background: SF, padding: "96px 24px", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ display: "inline-block", background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)", color: PR, borderRadius: 9999, padding: "5px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 20 }}>Setup</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: TX, margin: "0 0 14px", letterSpacing: "-0.04em" }}>Up and running in 5 minutes.</h2>
            <p style={{ fontSize: 17, color: MT, maxWidth: 440, margin: "0 auto" }}>No IT department. No hardware. No training week. Just three steps.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, position: "relative" }}>
            <div style={{ position: "absolute", top: 34, left: "17%", right: "17%", height: 1, background: `linear-gradient(90deg,rgba(37,99,235,.05),rgba(37,99,235,.35) 50%,rgba(37,99,235,.05))`, pointerEvents: "none" }} />
            {[
              { n:"01", icon:<Phone size={20} color={PR} />, title:"Connect your number",   body:"Forward your existing business number to ARIA — or get a new one. Done in 60 seconds.",  tint:"rgba(37,99,235,0.07)",  b:"rgba(37,99,235,0.2)"   },
              { n:"02", icon:<MessageSquare size={20} color={AC} />, title:"Teach your business", body:"Paste your FAQ, upload your menu, add your hours. ARIA learns everything in under 3 minutes.", tint:"rgba(14,165,233,0.07)", b:"rgba(14,165,233,0.2)"  },
              { n:"03", icon:<BarChart3 size={20} color={GR} />, title:"Watch revenue grow",  body:"Every call answered. Every booking captured. Watch it happen live in your dashboard.",         tint:"rgba(16,185,129,0.07)", b:"rgba(16,185,129,0.2)"  },
            ].map((s,i)=>(
              <div key={i} className={`sr d${i+1} gc`} style={{ background: BG, border: "1px solid #E2E8F0", borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <div style={{ fontSize: 72, fontWeight: 900, color: "rgba(15,23,42,0.03)", lineHeight: 1, position: "absolute", top: 12, right: 18, letterSpacing: "-0.06em", userSelect: "none" }}>{s.n}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.tint, border: `1px solid ${s.b}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: MT, lineHeight: 1.65, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section style={{ background: BG, padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: TX, margin: "0 0 12px", letterSpacing: "-0.04em" }}>Businesses that no longer lose revenue to voicemail.</h2>
            <p style={{ fontSize: 17, color: MT, margin: 0 }}>Real results from real customers.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { quote:"We answer every call now. Literally every one. Revenue is up 23% this quarter and we haven't hired anyone new.", roi:"+23% revenue", name:"Maria C.", role:"Restaurant Owner, TX" },
              { quote:"Legal intake used to take 3 staff hours a day. ARIA does it automatically. Every lead is captured, no exceptions.", roi:"3 hrs/day saved", name:"James T.", role:"Managing Partner, NY" },
              { quote:"12 locations, one subscription. The ROI is insane. I've tried everything else at this price — nothing compares.", roi:"12× scale", name:"Priya S.", role:"Agency Owner, CA" },
            ].map((t,i)=>(
              <div key={i} className={`sr d${i+1} gc`} style={{ background: SF, border: "1px solid #E2E8F0", borderRadius: 24, padding: "36px 32px", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 16 }}>
                  {[0,1,2,3,4].map(s=><Star key={s} size={14} color={AM} fill={AM} />)}
                </div>
                <div style={{ display: "inline-block", background: "rgba(37,99,235,0.07)", border: "1px solid rgba(37,99,235,0.18)", color: PR, borderRadius: 9999, padding: "4px 14px", fontSize: 12, fontWeight: 700, marginBottom: 16 }}>
                  {t.roi}
                </div>
                <p style={{ fontSize: 17, fontWeight: 600, color: TX, lineHeight: 1.5, margin: "0 0 24px" }}>&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TX }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: MT, marginTop: 3 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ══ */}
      <section style={{ background: SF, padding: "96px 24px", borderTop: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: TX, margin: "0 0 12px", letterSpacing: "-0.04em" }}>Less than one lost booking a month.</h2>
            <p style={{ fontSize: 17, color: MT, margin: 0 }}>That's how quickly ARIA pays for itself.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { name:"Starter", price:"$97",  sub:"1 location · perfect for solo practices", features:["500 minutes/month","1 AI receptionist","SMS booking confirmation","Knowledge base","14-day free trial"], cta:"Start free",   featured:false },
              { name:"Pro",     price:"$197", sub:"Growing teams · most popular",             features:["2,000 minutes/month","3 AI receptionists","Omnichannel inbox","Priority support","Advanced analytics"], cta:"Start Pro free",  featured:true  },
              { name:"Agency",  price:"$497", sub:"Multi-location & agencies",                features:["10,000 minutes/month","White-label dashboard","Full API access","Dedicated account manager","Custom integrations"], cta:"Talk to us", featured:false },
            ].map((p,i)=>(
              <div key={i} className={`sr d${i+1}`} style={{
                background: p.featured ? PR : BG,
                border: p.featured ? `1px solid ${PR}` : "1px solid #E2E8F0",
                borderRadius: 24, padding: "32px 28px", position: "relative",
                boxShadow: p.featured ? "0 20px 60px rgba(37,99,235,.2)" : "0 2px 16px rgba(0,0,0,0.04)",
                transition: "transform .3s, box-shadow .3s",
              }}>
                {p.featured && (
                  <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${PR},${AC})`, color: "#fff", borderRadius: 9999, padding: "4px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: 11, fontWeight: 700, color: p.featured ? "rgba(255,255,255,0.6)" : MT, marginBottom: 10, letterSpacing: "0.09em", textTransform: "uppercase" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: p.featured ? "#fff" : TX, letterSpacing: "-0.05em", lineHeight: 1 }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: p.featured ? "rgba(255,255,255,0.6)" : MT, fontWeight: 500 }}>/mo</span>
                </div>
                <div style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,0.6)" : MT, marginBottom: 24 }}>{p.sub}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {p.features.map((f,j)=>(
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: p.featured ? "rgba(255,255,255,0.85)" : TX }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.featured ? "rgba(255,255,255,0.15)" : "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={11} color={p.featured ? "#fff" : PR} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <SignUpButton>
                  <button className="btn-p" style={{ width: "100%", padding: "13px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", background: p.featured ? "#fff" : "transparent", color: p.featured ? PR : PR, border: p.featured ? "none" : "1.5px solid #E2E8F0", transition: "all .2s" }}>
                    {p.cta}
                  </button>
                </SignUpButton>
              </div>
            ))}
          </div>
          <div className="sr" style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/pricing" style={{ color: MT, textDecoration: "none", fontSize: 14, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Compare all plans, annual discounts & FAQ <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section style={{ background: PR, padding: "112px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(255,255,255,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 className="sr" style={{ fontSize: "clamp(34px,5vw,64px)", fontWeight: 900, color: "#fff", margin: "0 0 20px", letterSpacing: "-0.04em", lineHeight: 1.0 }}>
            Your phone is ringing.<br />ARIA will answer it.
          </h2>
          <p className="sr d1" style={{ fontSize: 19, color: "rgba(255,255,255,0.75)", margin: "0 0 48px", lineHeight: 1.6 }}>
            Start free today. No credit card, no hardware, no IT team. Be live in 5 minutes.
          </p>
          <div className="sr d2" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <SignUpButton>
              <button style={{ background: "#fff", color: PR, fontWeight: 800, borderRadius: 9999, padding: "18px 52px", fontSize: 18, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 32px rgba(0,0,0,.15)", transition: "transform .15s, box-shadow .15s" }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 16px 48px rgba(0,0,0,.2)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,.15)"}}>
                Start for free <ArrowRight size={18} />
              </button>
            </SignUpButton>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>No credit card required · Cancel anytime · Setup in 5 minutes</span>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: TX, padding: "64px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr", gap: 56, marginBottom: 48 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${PR},${AC})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={14} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, color: "#fff" }}>ARIA</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.7, maxWidth: 260, margin: "0 0 20px" }}>
                The AI receptionist that answers every call, captures every booking, and grows your business — 24/7.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: GR }} />
                All systems operational
              </div>
            </div>
            {([
              { title:"Product", links:[["Dashboard","/dashboard"],["Features","/features"],["Pricing","/pricing"],["How it works","/how-it-works"]] },
              { title:"Company", links:[["About","/about"],["Industries","/industries"],["Contact","/contact"],["Blog","#"]] },
              { title:"Legal",   links:[["Privacy","#"],["Terms","#"],["Security","#"]] },
            ] as {title:string;links:[string,string][]}[]).map(col=>(
              <div key={col.title}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18 }}>{col.title}</div>
                {col.links.map(([l,h])=>(
                  <Link key={l} href={h} style={{ color: "rgba(255,255,255,0.35)", textDecoration: "none", fontSize: 14, display: "block", marginBottom: 10, transition: "color .15s" }}
                    onMouseEnter={e=>{e.currentTarget.style.color="#fff"}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(255,255,255,0.35)"}}>
                    {l}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.18)" }}>© 2026 ARIA, Inc. All rights reserved.</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.18)" }}>Powered by Claude · Vapi · Twilio</span>
          </div>
        </div>
      </footer>

      <VoiceDemo />
    </div>
  )
}
