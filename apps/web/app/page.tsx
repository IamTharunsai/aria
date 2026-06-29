"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import VoiceDemo from "@/components/VoiceDemo"
import {
  ArrowRight, Check, Star, Zap, BarChart3,
  MessageSquare, Phone, PhoneCall,
} from "lucide-react"

// ── tokens (inline only, per project rule) ──────────────────────
const BG   = "#07070F"
const SF   = "#0D0E1C"
const CD   = "#111120"
const TX   = "#F1F5F9"
const MT   = "#8892A4"
const IND  = "#6366F1"
const INDL = "#818CF8"
const CY   = "#22D3EE"
const BD   = "rgba(255,255,255,0.07)"
const GL   = "rgba(255,255,255,0.04)"
const GLB  = "rgba(255,255,255,0.08)"

// ── inline product mockup (no image file needed) ─────────────────
function Mockup() {
  return (
    <div style={{
      background: SF, borderRadius: 18, overflow: "hidden",
      border: "1px solid rgba(99,102,241,0.28)",
      boxShadow: "0 48px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(99,102,241,0.1), inset 0 1px 0 rgba(255,255,255,0.06)",
      fontFamily: "system-ui,sans-serif", userSelect: "none",
    }}>
      {/* browser chrome */}
      <div style={{ background: "#08080F", height: 38, display: "flex", alignItems: "center", padding: "0 16px", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ display: "flex", gap: 6 }}>
          {["#FF5F57","#FFBD2E","#28C840"].map(c=>(
            <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <div style={{ flex: 1, height: 22, background: "rgba(255,255,255,0.04)", borderRadius: 6, maxWidth: 260, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)" }}>aria.app/dashboard</span>
        </div>
      </div>
      {/* layout */}
      <div style={{ display: "flex", height: 380 }}>
        {/* sidebar */}
        <div style={{ width: 56, background: "#06060E", borderRight: "1px solid rgba(255,255,255,0.04)", padding: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${IND},${CY})`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <Zap size={14} color="#fff" fill="#fff" />
          </div>
          {[true,false,false,false].map((a,i)=>(
            <div key={i} style={{ width: 36, height: 36, borderRadius: 9, background: a ? "rgba(99,102,241,0.18)" : "transparent", border: a ? "1px solid rgba(99,102,241,0.3)" : "1px solid transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: a ? IND : "rgba(255,255,255,0.12)" }} />
            </div>
          ))}
        </div>
        {/* main */}
        <div style={{ flex: 1, padding: 18, display: "flex", flexDirection: "column", gap: 12, overflow: "hidden" }}>
          {/* header row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: TX }}>Dashboard</div>
              <div style={{ fontSize: 10, color: MT, marginTop: 1 }}>Live overview</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.22)", borderRadius: 100, padding: "4px 10px" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: CY, boxShadow: `0 0 8px ${CY}` }} />
              <span style={{ fontSize: 10, fontWeight: 700, color: CY }}>3 ACTIVE CALLS</span>
            </div>
          </div>
          {/* stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
            {[
              { l:"Calls Today", v:"47", c:IND, g:"rgba(99,102,241,0.12)" },
              { l:"Booked",      v:"12", c:"#10B981", g:"rgba(16,185,129,0.1)" },
              { l:"Revenue",     v:"$2.4k", c:CY, g:"rgba(34,211,238,0.1)" },
            ].map(s=>(
              <div key={s.l} style={{ background: GL, border: `1px solid ${GLB}`, borderRadius: 10, padding: "10px 12px", boxShadow: `inset 0 0 20px ${s.g}` }}>
                <div style={{ fontSize: 9, color: MT, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 4 }}>{s.l}</div>
                <div style={{ fontSize: 22, fontWeight: 900, color: s.c, letterSpacing: "-0.04em" }}>{s.v}</div>
              </div>
            ))}
          </div>
          {/* live call */}
          <div style={{ background: "rgba(34,211,238,0.05)", border: "1px solid rgba(34,211,238,0.18)", borderRadius: 10, padding: "10px 14px", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: CY, boxShadow: `0 0 10px ${CY}`, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: CY, marginBottom: 1, textTransform: "uppercase", letterSpacing: "0.06em" }}>ARIA Answering</div>
              <div style={{ fontSize: 11, color: "rgba(241,245,249,0.45)" }}>Maria's Dental Clinic · 0:47</div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
              {[4,8,14,10,16,12,6,10].map((h,i)=>(
                <div key={i} style={{ width: 2.5, height: h, background: `linear-gradient(to top,${IND},${CY})`, borderRadius: 2, opacity: 0.8 }} />
              ))}
            </div>
          </div>
          {/* recent calls */}
          <div style={{ background: GL, border: `1px solid ${GLB}`, borderRadius: 10, overflow: "hidden", flex: 1 }}>
            <div style={{ padding: "8px 12px", borderBottom: `1px solid ${BD}` }}>
              <span style={{ fontSize: 9, fontWeight: 700, color: MT, textTransform: "uppercase", letterSpacing: "0.08em" }}>Recent Calls</span>
            </div>
            {[
              { n:"Sunrise Dental",  t:"2m ago",  tag:"Booked",      tc:"#10B981", tb:"rgba(16,185,129,0.1)" },
              { n:"Lakewood Spa",    t:"8m ago",  tag:"FAQ",         tc:IND,       tb:"rgba(99,102,241,0.1)" },
              { n:"QuickFix Auto",   t:"14m ago", tag:"Transferred", tc:"#F59E0B", tb:"rgba(245,158,11,0.1)" },
            ].map((c,i)=>(
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", borderBottom: i<2 ? `1px solid ${BD}` : "none" }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.04)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <PhoneCall size={11} color={MT} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: TX, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.n}</div>
                  <div style={{ fontSize: 9, color: MT, marginTop: 1 }}>{c.t}</div>
                </div>
                <div style={{ fontSize: 9, fontWeight: 700, color: c.tc, background: c.tb, padding: "3px 8px", borderRadius: 100, whiteSpace: "nowrap" }}>{c.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ── page ─────────────────────────────────────────────────────────
export default function MarketingPage() {
  const heroRef  = useRef<HTMLElement>(null)
  const [rot,    setRot]    = useState({ x: 16, y: -8 })
  const [mouse,  setMouse]  = useState({ x: 0,  y: 0  })

  // scroll-driven 3-D rotation
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return
      const rect = heroRef.current.getBoundingClientRect()
      const p = Math.max(0, Math.min(1, (window.innerHeight - rect.top) / (rect.height * 0.65)))
      setRot({ x: 16 - p * 16, y: -8 + p * 8 })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // mouse parallax
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

  // scroll reveal
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("rv") }),
      { threshold: 0.08 }
    )
    document.querySelectorAll(".sr").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  const rotX = rot.x + mouse.x * 4
  const rotY = rot.y + mouse.y * 6

  return (
    <div style={{ background: BG, color: TX, fontFamily: "var(--font-jakarta,system-ui,-apple-system,sans-serif)", overflowX: "hidden" }}>
      <style>{`
        /* scroll reveal */
        .sr{opacity:0;transform:translateY(28px);transition:opacity .72s cubic-bezier(.16,1,.3,1),transform .72s cubic-bezier(.16,1,.3,1)}
        .sr.rv{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.10s}.d2{transition-delay:.20s}.d3{transition-delay:.30s}
        .d4{transition-delay:.40s}.d5{transition-delay:.50s}
        /* hero entrance */
        @keyframes hup{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        .h0{animation:hup .8s cubic-bezier(.16,1,.3,1) .00s both}
        .h1{animation:hup .8s cubic-bezier(.16,1,.3,1) .12s both}
        .h2{animation:hup .8s cubic-bezier(.16,1,.3,1) .24s both}
        .h3{animation:hup .8s cubic-bezier(.16,1,.3,1) .36s both}
        .h4{animation:hup .8s cubic-bezier(.16,1,.3,1) .50s both}
        /* live pulse */
        @keyframes ldot{0%,100%{opacity:1}50%{opacity:.35}}
        .ldot{animation:ldot 1.8s ease-in-out infinite}
        @keyframes ping{75%,100%{transform:scale(2.4);opacity:0}}
        .ping{animation:ping 2s cubic-bezier(0,0,.2,1) infinite}
        /* glass card hover */
        .gc{transition:transform .3s cubic-bezier(.16,1,.3,1),box-shadow .3s,border-color .3s}
        .gc:hover{transform:translateY(-5px)!important;box-shadow:0 32px 80px rgba(0,0,0,.5)!important;border-color:rgba(99,102,241,.4)!important}
        /* marquee */
        @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .mq{animation:mq 28s linear infinite;display:flex;width:max-content}
        .mq:hover{animation-play-state:paused}
        /* gradient text helpers */
        .tg{background:linear-gradient(135deg,#818CF8 0%,#22D3EE 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ta{background:linear-gradient(135deg,#F59E0B 0%,#FCD34D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        /* buttons */
        .btn-p{transition:transform .15s,box-shadow .15s;cursor:pointer;border:none}
        .btn-p:hover{transform:translateY(-2px);box-shadow:0 16px 44px rgba(99,102,241,.45)}
        .btn-g{transition:background .2s;cursor:pointer}
        .btn-g:hover{background:rgba(255,255,255,.08)!important}
        @media(prefers-reduced-motion:reduce){*,.ldot,.ping,.mq{animation:none!important;transition:none!important}.sr{opacity:1!important;transform:none!important}}
      `}</style>

      {/* ══════════════════ NAV ══════════════════ */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(7,7,15,0.75)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${IND},${CY})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 20px rgba(99,102,241,.35)" }}>
              <Zap size={15} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: TX, letterSpacing: "-0.025em" }}>ARIA</span>
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["Features","/features"],["How it works","/how-it-works"],["Pricing","/pricing"],["Industries","/industries"]].map(([l,h])=>(
              <Link key={l} href={h} style={{ color: "rgba(241,245,249,.5)", textDecoration: "none", fontSize: 14, fontWeight: 500, transition: "color .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.color=TX}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(241,245,249,.5)"}}>
                {l}
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SignInButton>
              <button className="btn-g" style={{ background: "none", border: "none", color: "rgba(241,245,249,.5)", fontSize: 14, fontWeight: 500, padding: "7px 14px", borderRadius: 8 }}>
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="btn-p" style={{ background: IND, color: "#fff", borderRadius: 9999, padding: "8px 20px", fontSize: 14, fontWeight: 600 }}>
                Start free
              </button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* ══════════════════ HERO ══════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center",
        padding: "100px 24px 80px", position: "relative", overflow: "hidden",
        background: `radial-gradient(ellipse 80% 55% at 50% -8%,rgba(99,102,241,.2) 0%,transparent 65%),radial-gradient(ellipse 45% 35% at 80% 60%,rgba(34,211,238,.06) 0%,transparent 55%),${BG}`,
      }}>
        {/* subtle grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)`, backgroundSize: "56px 56px", maskImage: "radial-gradient(ellipse 90% 65% at 50% 0%,black 10%,transparent 75%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 860, width: "100%", textAlign: "center", position: "relative", zIndex: 2 }}>
          {/* badge */}
          <div className="h0" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.28)", borderRadius: 9999, padding: "6px 18px", marginBottom: 36 }}>
            <div style={{ position: "relative", width: 8, height: 8 }}>
              <div className="ping"  style={{ position: "absolute", inset: 0, borderRadius: "50%", background: IND, opacity: .7 }} />
              <div className="ldot" style={{ width: 8, height: 8, borderRadius: "50%", background: IND, position: "relative" }} />
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: INDL, letterSpacing: "0.05em", textTransform: "uppercase" }}>AI Receptionist · Answering calls right now</span>
          </div>

          {/* headline */}
          <h1 className="h1" style={{ fontSize: "clamp(52px,8vw,96px)", fontWeight: 900, lineHeight: .92, letterSpacing: "-0.045em", color: TX, margin: "0 0 26px" }}>
            Every call<br /><span className="tg">answered.</span><br />Every booking<br /><span className="ta">captured.</span>
          </h1>

          {/* sub */}
          <p className="h2" style={{ fontSize: "clamp(16px,2vw,20px)", color: MT, maxWidth: 520, margin: "0 auto 44px", lineHeight: 1.65 }}>
            ARIA is the AI phone receptionist that picks up every call, books appointments instantly, and learns your business in under 5 minutes.
          </p>

          {/* CTAs */}
          <div className="h3" style={{ display: "flex", alignItems: "center", gap: 14, justifyContent: "center", flexWrap: "wrap", marginBottom: 20 }}>
            <SignUpButton>
              <button className="btn-p" style={{ background: `linear-gradient(135deg,${IND},${INDL})`, color: "#fff", borderRadius: 9999, padding: "15px 34px", fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", gap: 8 }}>
                Start answering every call <ArrowRight size={16} />
              </button>
            </SignUpButton>
            <Link href="/how-it-works" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "rgba(241,245,249,.55)", textDecoration: "none", fontSize: 15, fontWeight: 500 }}
              onMouseEnter={e=>{e.currentTarget.style.color=TX}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(241,245,249,.55)"}}>
              See how it works <ArrowRight size={14} />
            </Link>
          </div>

          {/* trust chips */}
          <div className="h4" style={{ fontSize: 12, color: "rgba(136,146,164,.45)", display: "flex", gap: 6, justifyContent: "center", flexWrap: "wrap", marginBottom: 88 }}>
            {["No credit card required","14-day free trial","36 languages","Cancel anytime"].map((t,i)=>(
              <span key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i>0&&<span style={{ color:"rgba(136,146,164,.2)" }}>·</span>}
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* ── 3-D mockup ── */}
        <div className="h4" style={{ maxWidth: 760, width: "100%", position: "relative", zIndex: 2 }}>
          {/* glow bloom */}
          <div style={{ position: "absolute", bottom: -80, left: "50%", transform: "translateX(-50%)", width: 640, height: 220, background: "radial-gradient(ellipse,rgba(99,102,241,.28) 0%,transparent 70%)", filter: "blur(24px)", pointerEvents: "none" }} />
          {/* shine overlay */}
          <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: "linear-gradient(135deg,rgba(99,102,241,.14) 0%,transparent 45%,rgba(34,211,238,.06) 100%)", zIndex: 1, pointerEvents: "none" }} />
          <div style={{
            transform: `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg)`,
            transition: "transform 0.07s linear",
            willChange: "transform",
            transformOrigin: "center center",
          }}>
            <Mockup />
          </div>
        </div>
      </section>

      {/* ══════════════════ TRUSTED BY ══════════════════ */}
      <section style={{ background: SF, borderTop: `1px solid ${BD}`, borderBottom: `1px solid ${BD}`, padding: "20px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32, padding: "0 40px" }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(136,146,164,.28)", whiteSpace: "nowrap", letterSpacing: "0.09em", textTransform: "uppercase", flexShrink: 0 }}>Trusted by</span>
          <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(90deg,${SF},transparent)`, zIndex: 1 }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 60, background: `linear-gradient(-90deg,${SF},transparent)`, zIndex: 1 }} />
            <div className="mq">
              {[...Array(2)].flatMap((_,r)=>
                ["Dental Plus","GreenLeaf Bistro","Elite Legal","Sunrise Salon","QuickFix Auto","Summit Fitness","City Realty","PetCare Vets","TechRepair Hub","Lakewood Spa"].map((n,i)=>(
                  <span key={`${r}${i}`} style={{ fontSize: 13, fontWeight: 700, color: "rgba(241,245,249,.13)", whiteSpace: "nowrap", padding: "0 32px", letterSpacing: "0.02em" }}>{n}</span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ PROOF STATS ══════════════════ */}
      <section style={{ background: BG, padding: "80px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: BD, borderRadius: 20, overflow: "hidden", border: `1px solid ${BD}` }}>
          {[
            { num: "94%",  label: "calls answered in < 2 seconds" },
            { num: "3.2×", label: "more bookings vs voicemail" },
            { num: "24/7", label: "always on, never on hold" },
          ].map((s,i)=>(
            <div key={i} className="sr" style={{ background: CD, padding: "40px 24px", textAlign: "center" }}>
              <div style={{ fontSize: "clamp(40px,5vw,56px)", fontWeight: 900, letterSpacing: "-0.05em", background: `linear-gradient(135deg,${INDL},${CY})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: 8 }}>{s.num}</div>
              <div style={{ fontSize: 14, color: MT, lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════ FEATURES BENTO ══════════════════ */}
      <section style={{ background: BG, padding: "40px 24px 104px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ display: "inline-block", background: "rgba(34,211,238,.1)", border: "1px solid rgba(34,211,238,.28)", color: CY, borderRadius: 9999, padding: "5px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 20 }}>Capabilities</div>
            <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, color: TX, margin: 0, letterSpacing: "-0.04em" }}>
              Built for how real<br />business calls work
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 16 }}>
            {/* ① 36 Languages — 4 col */}
            <div className="sr gc" style={{ gridColumn: "span 4", background: GL, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${GLB}`, borderRadius: 22, padding: "32px 36px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -80, right: -80, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,rgba(34,211,238,.07) 0%,transparent 65%)", pointerEvents: "none" }} />
              <div style={{ display: "inline-block", background: "rgba(34,211,238,.1)", border: "1px solid rgba(34,211,238,.22)", color: CY, borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 16 }}>36 Languages</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: TX, margin: "0 0 10px", letterSpacing: "-0.025em" }}>Your callers speak Hindi. Tagalog. Mandarin. ARIA does too.</h3>
              <p style={{ fontSize: 14, color: MT, lineHeight: 1.6, margin: "0 0 24px", maxWidth: 480 }}>Auto-detects language at call start. Full support for US languages + 22 Indian regional languages.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["🇺🇸 English","🇪🇸 Spanish","🇮🇳 Hindi","🇮🇳 Telugu","🇮🇳 Tamil","🇨🇳 Chinese","🇵🇭 Tagalog","🇻🇳 Vietnamese","🇰🇷 Korean","🇫🇷 French"].map(l=>(
                  <div key={l} style={{ background: "rgba(255,255,255,.04)", border: `1px solid ${BD}`, borderRadius: 9999, padding: "5px 12px", fontSize: 12, fontWeight: 600, color: "rgba(241,245,249,.6)" }}>{l}</div>
                ))}
                <div style={{ background: "rgba(34,211,238,.08)", border: "1px solid rgba(34,211,238,.2)", borderRadius: 9999, padding: "5px 12px", fontSize: 12, fontWeight: 700, color: CY }}>+26 more</div>
              </div>
            </div>

            {/* ② 24/7 — 2 col */}
            <div className="sr d1 gc" style={{ gridColumn: "span 2", background: GL, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${GLB}`, borderRadius: 22, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(99,102,241,.14) 0%,transparent 65%)", pointerEvents: "none" }} />
              <div style={{ fontSize: 58, fontWeight: 900, color: IND, letterSpacing: "-0.05em", lineHeight: 1, marginBottom: 8 }}>24/7</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: TX, marginBottom: 10 }}>Never misses a call</div>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 20px" }}>No sick days. No holidays. No staffing gaps. ARIA is always on.</p>
              {[{l:"Answer rate",v:"99.8%",c:IND},{l:"Avg wait",v:"< 2 s",c:CY},{l:"Uptime SLA",v:"99.9%",c:"#F59E0B"}].map(s=>(
                <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: "rgba(255,255,255,.03)", borderRadius: 9, border: `1px solid ${BD}`, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: MT }}>{s.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.c }}>{s.v}</span>
                </div>
              ))}
            </div>

            {/* ③ Booking — 2 col */}
            <div className="sr d2 gc" style={{ gridColumn: "span 2", background: GL, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${GLB}`, borderRadius: 22, padding: "28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, left: -30, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle,rgba(16,185,129,.1) 0%,transparent 65%)", pointerEvents: "none" }} />
              <div style={{ display: "inline-block", background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.25)", color: "#10B981", borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 16 }}>Booking Engine</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 8px" }}>Books while you sleep</h3>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 18px" }}>Finds the next open slot, confirms with the caller, and fires an SMS — all in under 30 seconds.</p>
              <div style={{ background: "rgba(16,185,129,.06)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 12, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                <Check size={15} color="#10B981" />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#10B981" }}>Booked · Thu Nov 14 · 2:00 PM</div>
                  <div style={{ fontSize: 11, color: MT, marginTop: 2 }}>Dr. Anjali Chen · SMS sent ✓</div>
                </div>
              </div>
            </div>

            {/* ④ Handoff — 2 col */}
            <div className="sr d3 gc" style={{ gridColumn: "span 2", background: GL, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${GLB}`, borderRadius: 22, padding: "28px" }}>
              <div style={{ display: "inline-block", background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.25)", color: INDL, borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 16 }}>Human Handoff</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 8px" }}>Knows when to step back</h3>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 20px" }}>Caller asks for a human? ARIA bridges instantly, context already collected.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { step: "Caller says 'let me speak to someone'", done: true  },
                  { step: "ARIA collects name + reason for call",  done: true  },
                  { step: "Call bridged · agent connected in 0:02",active: true },
                ].map((s,i)=>(
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 7, height: 7, borderRadius: "50%", background: s.active ? "#10B981" : s.done ? IND : "rgba(255,255,255,.15)", flexShrink: 0, marginTop: 5 }} />
                    <span style={{ fontSize: 12, color: s.active ? TX : "rgba(241,245,249,.5)", lineHeight: 1.5 }}>{s.step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ⑤ Spam — 2 col */}
            <div className="sr d4 gc" style={{ gridColumn: "span 2", background: GL, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${GLB}`, borderRadius: 22, padding: "28px" }}>
              <div style={{ display: "inline-block", background: "rgba(248,113,113,.1)", border: "1px solid rgba(248,113,113,.25)", color: "#F87171", borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 16 }}>Spam Guard</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 8px" }}>Kills spam calls dead</h3>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 18px" }}>Content filters detect abuse and end calls gracefully — before they waste a second.</p>
              {[{l:"Spam blocked today",v:"23",c:"#F87171"},{l:"Robocalls rejected",v:"11",c:"#F87171"},{l:"Real calls answered",v:"94",c:"#10B981"}].map(s=>(
                <div key={s.l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 12px", background: "rgba(255,255,255,.03)", borderRadius: 9, border: `1px solid ${BD}`, marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: MT }}>{s.l}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: s.c }}>{s.v}</span>
                </div>
              ))}
            </div>

            {/* ⑥ Analytics — 2 col */}
            <div className="sr d5 gc" style={{ gridColumn: "span 2", background: GL, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${GLB}`, borderRadius: 22, padding: "28px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", bottom: -30, right: -30, width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle,rgba(245,158,11,.08) 0%,transparent 65%)", pointerEvents: "none" }} />
              <div style={{ display: "inline-block", background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.25)", color: "#F59E0B", borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 16 }}>Analytics</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 8px" }}>Know what's happening</h3>
              <p style={{ fontSize: 13, color: MT, lineHeight: 1.55, margin: "0 0 18px" }}>Every call scored for sentiment, urgency, and outcome. Live in your dashboard.</p>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 48 }}>
                {[40,65,55,80,70,90,75].map((h,i)=>(
                  <div key={i} style={{ flex: 1, height: `${h}%`, background: i===5 ? `linear-gradient(180deg,${IND},${CY})` : "rgba(255,255,255,.07)", borderRadius: "3px 3px 0 0" }} />
                ))}
              </div>
            </div>
          </div>

          <div className="sr" style={{ textAlign: "center", marginTop: 40 }}>
            <Link href="/features" style={{ display: "inline-flex", alignItems: "center", gap: 8, color: INDL, textDecoration: "none", fontSize: 15, fontWeight: 600 }}>
              View all features <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ HOW IT WORKS ══════════════════ */}
      <section style={{ background: SF, padding: "104px 24px", borderTop: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 80 }}>
            <div style={{ display: "inline-block", background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.25)", color: INDL, borderRadius: 9999, padding: "5px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 20 }}>Setup</div>
            <h2 style={{ fontSize: "clamp(30px,4vw,48px)", fontWeight: 900, color: TX, margin: 0, letterSpacing: "-0.04em" }}>
              Live in 5 minutes.<br />Seriously.
            </h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24, position: "relative" }}>
            <div style={{ position: "absolute", top: 34, left: "17%", right: "17%", height: 1, background: `linear-gradient(90deg,rgba(99,102,241,.08),rgba(99,102,241,.5) 50%,rgba(99,102,241,.08))`, pointerEvents: "none" }} />
            {[
              { n:"01", icon:<Phone size={20} color={IND} />, title:"Connect your number",   body:"Link your existing phone number via Twilio. ARIA answers from the first ring — no queue, no delay.",     tint:"rgba(99,102,241,.12)", b:"rgba(99,102,241,.25)" },
              { n:"02", icon:<MessageSquare size={20} color={CY} />, title:"Teach your business", body:"Upload your FAQ, set your hours, paste your services list. ARIA learns everything in under 3 minutes.", tint:"rgba(34,211,238,.1)",  b:"rgba(34,211,238,.22)"  },
              { n:"03", icon:<BarChart3 size={20} color="#F59E0B" />, title:"Watch revenue grow",  body:"Every call answered. Every appointment booked. Track it all live in your real-time dashboard.",       tint:"rgba(245,158,11,.1)", b:"rgba(245,158,11,.22)"  },
            ].map((s,i)=>(
              <div key={i} className={`sr d${i+1} gc`} style={{ background: GL, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${GLB}`, borderRadius: 20, padding: "32px 28px", position: "relative", overflow: "hidden" }}>
                <div style={{ fontSize: 72, fontWeight: 900, color: "rgba(255,255,255,.025)", lineHeight: 1, position: "absolute", top: 12, right: 18, letterSpacing: "-0.06em", userSelect: "none" }}>{s.n}</div>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: s.tint, border: `1px solid ${s.b}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: TX, margin: "0 0 12px", letterSpacing: "-0.02em" }}>{s.title}</h3>
                <p style={{ fontSize: 14, color: MT, lineHeight: 1.65, margin: 0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TESTIMONIALS ══════════════════ */}
      <section style={{ background: BG, padding: "104px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ display: "inline-block", background: "rgba(245,158,11,.1)", border: "1px solid rgba(245,158,11,.25)", color: "#F59E0B", borderRadius: 9999, padding: "5px 16px", fontSize: 12, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 20 }}>Results</div>
            <h2 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 900, color: TX, margin: 0, letterSpacing: "-0.04em" }}>Real businesses. Real revenue.</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { quote:"We answer every call now. Literally every one. Revenue is up 23% this quarter.",                roi:"+23% revenue",  roiC:IND,       name:"Maria C.", role:"Restaurant Owner"  },
              { quote:"Legal intake used to take 3 staff hours a day. ARIA does it automatically. Every lead captured.", roi:"3 hrs/day saved",roiC:CY,        name:"James T.", role:"Managing Partner"  },
              { quote:"12 locations, one subscription. The ROI is insane. Nothing else comes close at this price.",     roi:"12× scale",     roiC:"#F59E0B", name:"Priya S.", role:"Agency Owner"      },
            ].map((t,i)=>(
              <div key={i} className={`sr d${i+1} gc`} style={{ background: GL, backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${GLB}`, borderRadius: 24, padding: "36px 32px" }}>
                <div style={{ display: "flex", gap: 3, marginBottom: 18 }}>
                  {[0,1,2,3,4].map(s=><Star key={s} size={14} color="#F59E0B" fill="#F59E0B" />)}
                </div>
                <div style={{ display: "inline-block", background: "rgba(99,102,241,.1)", border: "1px solid rgba(99,102,241,.2)", color: t.roiC, borderRadius: 9999, padding: "4px 14px", fontSize: 12, fontWeight: 700, marginBottom: 18 }}>
                  {t.roi}
                </div>
                <p style={{ fontSize: 18, fontWeight: 700, color: TX, lineHeight: 1.45, margin: "0 0 28px" }}>&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: TX }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: MT, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ PRICING ══════════════════ */}
      <section style={{ background: SF, padding: "104px 24px", borderTop: `1px solid ${BD}` }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="sr" style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 style={{ fontSize: "clamp(28px,4vw,48px)", fontWeight: 900, color: TX, margin: "0 0 12px", letterSpacing: "-0.04em" }}>Simple, honest pricing.</h2>
            <p style={{ fontSize: 17, color: MT, margin: 0 }}>Start free. Scale as you grow.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { name:"Starter", price:"$97",  sub:"1 location",            features:["500 minutes/month","1 AI agent","SMS inbox","Appointment booking","14-day free trial"],                   cta:"Start for free",  featured:false },
              { name:"Pro",     price:"$197", sub:"Growing businesses",     features:["2,000 minutes/month","3 AI agents","Omnichannel inbox","Priority support","Advanced analytics"],           cta:"Start Pro free",  featured:true  },
              { name:"Agency",  price:"$497", sub:"Multi-location & agencies",features:["10,000 minutes/month","White-label dashboard","API access","Dedicated account manager","Custom integrations"], cta:"Contact sales", featured:false },
            ].map((p,i)=>(
              <div key={i} className={`sr d${i+1}`} style={{
                background: p.featured ? `linear-gradient(160deg,rgba(99,102,241,.18) 0%,rgba(34,211,238,.07) 100%)` : GL,
                backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
                border: p.featured ? "1px solid rgba(99,102,241,.5)" : `1px solid ${GLB}`,
                borderRadius: 24, padding: "32px 28px", position: "relative",
                boxShadow: p.featured ? "0 0 60px rgba(99,102,241,.15)" : "none",
                transition: "transform .3s,box-shadow .3s",
              }}>
                {p.featured && (
                  <div style={{ position: "absolute", top: -13, left: "50%", transform: "translateX(-50%)", background: `linear-gradient(135deg,${IND},${CY})`, color: "#fff", borderRadius: 9999, padding: "4px 18px", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", whiteSpace: "nowrap" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize: 11, fontWeight: 700, color: p.featured ? INDL : MT, marginBottom: 12, letterSpacing: "0.09em", textTransform: "uppercase" }}>{p.name}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                  <span style={{ fontSize: 48, fontWeight: 900, color: TX, letterSpacing: "-0.05em", lineHeight: 1 }}>{p.price}</span>
                  <span style={{ fontSize: 14, color: MT, fontWeight: 500 }}>/mo</span>
                </div>
                <div style={{ fontSize: 13, color: MT, marginBottom: 24 }}>{p.sub}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                  {p.features.map((f,j)=>(
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(241,245,249,.8)" }}>
                      <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.featured ? "rgba(99,102,241,.18)" : "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={11} color={p.featured ? INDL : IND} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <SignUpButton>
                  <button className="btn-p" style={{ width: "100%", padding: "13px", borderRadius: 12, fontSize: 15, fontWeight: 700, cursor: "pointer", background: p.featured ? `linear-gradient(135deg,${IND},${INDL})` : "transparent", color: p.featured ? "#fff" : INDL, border: p.featured ? "none" : "1.5px solid rgba(99,102,241,.38)", transition: "all .2s" }}>
                    {p.cta}
                  </button>
                </SignUpButton>
              </div>
            ))}
          </div>
          <div className="sr" style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/pricing" style={{ color: MT, textDecoration: "none", fontSize: 14, fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Full pricing details, annual discounts & FAQ <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════ FINAL CTA ══════════════════ */}
      <section style={{ background: BG, padding: "128px 24px", position: "relative", overflow: "hidden", borderTop: `1px solid ${BD}` }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 900, height: 450, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(99,102,241,.13) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 400, height: 200, borderRadius: "50%", background: "radial-gradient(ellipse,rgba(34,211,238,.07) 0%,transparent 65%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <h2 className="sr" style={{ fontSize: "clamp(36px,5.5vw,68px)", fontWeight: 900, color: TX, margin: "0 0 20px", letterSpacing: "-0.045em", lineHeight: 1.0 }}>
            Stop losing revenue<br />to voicemail.
          </h2>
          <p className="sr d1" style={{ fontSize: 19, color: MT, margin: "0 0 52px", lineHeight: 1.65 }}>
            ARIA answers every call from day one — no hardware, no training, no delays.
          </p>
          <div className="sr d2" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
            <SignUpButton>
              <button className="btn-p" style={{ background: `linear-gradient(135deg,${IND},${INDL})`, color: "#fff", fontWeight: 800, borderRadius: 9999, padding: "18px 52px", fontSize: 18, border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 0 0 1px rgba(99,102,241,.3),0 24px 60px rgba(99,102,241,.3)" }}>
                Start for free <ArrowRight size={18} />
              </button>
            </SignUpButton>
            <span style={{ fontSize: 13, color: "rgba(136,146,164,.38)" }}>No credit card required · Cancel anytime · Setup in 5 minutes</span>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ background: SF, borderTop: `1px solid ${BD}`, padding: "72px 24px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2.5fr 1fr 1fr 1fr", gap: 56, marginBottom: 56 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: `linear-gradient(135deg,${IND},${CY})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={14} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontWeight: 800, fontSize: 15, color: TX }}>ARIA</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(136,146,164,.4)", lineHeight: 1.7, maxWidth: 260, margin: "0 0 20px" }}>
                AI voice receptionist for every business. Answer every call, book every appointment, capture every lead.
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(136,146,164,.3)" }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10B981" }} />
                All systems operational
              </div>
            </div>
            {([
              { title:"Product", links:[["Dashboard","/dashboard"],["Features","/features"],["Pricing","/pricing"],["How it works","/how-it-works"]] },
              { title:"Company", links:[["About","/about"],["Industries","/industries"],["Contact","/contact"],["Blog","#"]] },
              { title:"Legal",   links:[["Privacy","#"],["Terms","#"],["Security","#"]] },
            ] as {title:string;links:[string,string][]}[]).map(col=>(
              <div key={col.title}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(136,146,164,.22)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>{col.title}</div>
                {col.links.map(([l,h])=>(
                  <Link key={l} href={h} style={{ color: "rgba(241,245,249,.28)", textDecoration: "none", fontSize: 14, display: "block", marginBottom: 10, transition: "color .2s" }}
                    onMouseEnter={e=>{e.currentTarget.style.color=TX}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(241,245,249,.28)"}}>
                    {l}
                  </Link>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: `1px solid ${BD}`, paddingTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "rgba(136,146,164,.18)" }}>© 2026 ARIA, Inc. All rights reserved.</span>
            <span style={{ fontSize: 13, color: "rgba(136,146,164,.18)" }}>Powered by Claude · Vapi · Twilio</span>
          </div>
        </div>
      </footer>

      <VoiceDemo />
    </div>
  )
}
