"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"
import { useEffect } from "react"
import VoiceDemo from "@/components/VoiceDemo"
import {
  Phone, ArrowRight, Check, MessageSquare, Star, TrendingUp,
  Stethoscope, UtensilsCrossed, Scale, Scissors, ShoppingBag,
  Building2, ChevronRight, PhoneCall, Zap,
} from "lucide-react"

// ── Design tokens ──────────────────────────────────────────────
const G   = "#00D471"                    // electric green  – "always answering"
const AM  = "#F59E0B"                    // warm amber      – "value / ROI"
const CY  = "#22D3EE"                    // cool cyan       – "data / info"
const RED = "#F87171"                    // soft red        – "spam / problem"
const BG  = "#06070D"                    // deep near-black
const SF  = "#0C0E1A"                    // surface
const CD  = "#10121E"                    // card dark
const TX  = "#F1F5F9"                    // primary text
const MT  = "#8892A4"                    // muted text
const BD  = "rgba(255,255,255,0.07)"     // border

const gDim  = "rgba(0,212,113,0.10)"
const gBrd  = "rgba(0,212,113,0.22)"
const aDim  = "rgba(245,158,11,0.10)"
const aBrd  = "rgba(245,158,11,0.22)"
const cyDim = "rgba(34,211,238,0.10)"
const cyBrd = "rgba(34,211,238,0.22)"
const rDim  = "rgba(248,113,113,0.10)"
const rBrd  = "rgba(248,113,113,0.22)"

export default function MarketingPage() {
  useEffect(() => {
    const io = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add("sr-v")
      }),
      { threshold: 0.08 }
    )
    document.querySelectorAll(".sr").forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div style={{ background: BG, color: TX, fontFamily: "var(--font-jakarta,system-ui,-apple-system,sans-serif)", overflowX: "hidden" }}>
      <style>{`
        /* ── scroll reveal ── */
        .sr{opacity:0;transform:translateY(26px);transition:opacity .65s cubic-bezier(.16,1,.3,1),transform .65s cubic-bezier(.16,1,.3,1)}
        .sr.sr-v{opacity:1;transform:translateY(0)}
        .d1{transition-delay:.08s} .d2{transition-delay:.16s} .d3{transition-delay:.24s}
        .d4{transition-delay:.32s} .d5{transition-delay:.40s} .d6{transition-delay:.48s}

        /* ── hero entrance ── */
        @keyframes hup{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        .h0{animation:hup .7s cubic-bezier(.16,1,.3,1) .00s both}
        .h1{animation:hup .7s cubic-bezier(.16,1,.3,1) .10s both}
        .h2{animation:hup .7s cubic-bezier(.16,1,.3,1) .22s both}
        .h3{animation:hup .7s cubic-bezier(.16,1,.3,1) .34s both}
        .h4{animation:hup .7s cubic-bezier(.16,1,.3,1) .46s both}
        .h5{animation:hup .7s cubic-bezier(.16,1,.3,1) .60s both}

        /* ── live dot ── */
        @keyframes ldot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.85)}}
        .ldot{animation:ldot 1.5s ease-in-out infinite}
        @keyframes ping{75%,100%{transform:scale(2.2);opacity:0}}
        .ping{animation:ping 2s cubic-bezier(0,0,.2,1) infinite}

        /* ── waveform ── */
        @keyframes wv{0%,100%{transform:scaleY(.3);opacity:.5}50%{transform:scaleY(1);opacity:1}}
        .wv{animation:wv 1.1s ease-in-out infinite;transform-origin:bottom}
        .wv:nth-child(1){animation-delay:.00s;height:14px} .wv:nth-child(2){animation-delay:.10s;height:26px}
        .wv:nth-child(3){animation-delay:.20s;height:34px} .wv:nth-child(4){animation-delay:.30s;height:20px}
        .wv:nth-child(5){animation-delay:.20s;height:38px} .wv:nth-child(6){animation-delay:.10s;height:24px}
        .wv:nth-child(7){animation-delay:.00s;height:16px} .wv:nth-child(8){animation-delay:.15s;height:30px}

        /* ── booking confirmation pop ── */
        @keyframes bkpop{0%{opacity:0;transform:translateY(8px) scale(.95)}100%{opacity:1;transform:translateY(0) scale(1)}}
        .bkpop{animation:bkpop .5s cubic-bezier(.16,1,.3,1) 1.9s both}

        /* ── orbs ── */
        @keyframes orb{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(22px,-22px) scale(1.04)}66%{transform:translate(-14px,14px) scale(.97)}}
        .orb{animation:orb 11s ease-in-out infinite}
        .orb2{animation:orb 14s ease-in-out infinite reverse}

        /* ── marquee ── */
        @keyframes mq{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .mq{animation:mq 30s linear infinite;display:flex;gap:0;width:max-content}
        .mq:hover{animation-play-state:paused}

        /* ── gradient text ── */
        .tg{background:linear-gradient(135deg,#00D471 0%,#00F5A8 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .ta{background:linear-gradient(135deg,#F59E0B 0%,#FCD34D 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}

        /* ── interactive ── */
        .nl{color:rgba(241,245,249,.55);text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}
        .nl:hover{color:#F1F5F9}
        .fl{color:rgba(241,245,249,.35);text-decoration:none;font-size:14px;display:block;margin-bottom:10px;transition:color .2s}
        .fl:hover{color:#F1F5F9}
        .btn-g{transition:transform .15s,box-shadow .15s;cursor:pointer;border:none}
        .btn-g:hover{transform:translateY(-1px);box-shadow:0 14px 40px rgba(0,212,113,.35)}
        .btn-o{transition:background .2s;cursor:pointer}
        .btn-o:hover{background:rgba(255,255,255,.08)!important}
        .bc{transition:transform .25s cubic-bezier(.16,1,.3,1),border-color .25s,box-shadow .25s}
        .bc:hover{transform:translateY(-3px);box-shadow:0 24px 60px rgba(0,0,0,.4)}
        .ic{transition:all .25s cubic-bezier(.16,1,.3,1)}
        .ic:hover{transform:translateY(-4px);border-color:rgba(0,212,113,.3)!important;box-shadow:0 16px 48px rgba(0,0,0,.12)}
        .pc{transition:transform .25s,box-shadow .25s}
        .pc:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,.18)}
        .stc{transition:transform .2s}
        .stc:hover{transform:translateY(-2px)}

        @media(prefers-reduced-motion:reduce){
          *,.wv,.ldot,.bkpop,.h0,.h1,.h2,.h3,.h4,.h5,.orb,.orb2,.ping,.mq{animation:none!important;transition:none!important}
          .sr{opacity:1!important;transform:none!important}
        }
      `}</style>

      {/* ═══════════════════════════════════ NAV ═════════════════════════════════════ */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 100,
        background: "rgba(6,7,13,.88)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: `1px solid ${BD}`,
      }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", padding: "0 24px", height: 62, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${G},#00A855)`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 18px rgba(0,212,113,.35)`, flexShrink: 0 }}>
              <Phone size={15} color="#000" fill="#000" />
            </div>
            <span style={{ fontWeight: 800, fontSize: 17, color: TX, letterSpacing: "-0.025em" }}>ARIA</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
            {[["Features","/features"],["How it works","/how-it-works"],["Pricing","/pricing"],["Industries","/industries"]].map(([l,h]) => (
              <Link key={l} href={h} className="nl">{l}</Link>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <SignInButton>
              <button className="btn-o" style={{ background: "none", border: "none", color: "rgba(241,245,249,.55)", fontSize: 14, fontWeight: 500, padding: "7px 14px", borderRadius: 8 }}>
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="btn-g" style={{ background: G, color: "#000", borderRadius: 9999, padding: "8px 20px", fontSize: 14, fontWeight: 700 }}>
                Start free
              </button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════ HERO ════════════════════════════════════ */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 24px 80px", position: "relative", overflow: "hidden",
        background: `
          radial-gradient(ellipse 75% 55% at 50% -5%, rgba(0,212,113,.13) 0%, transparent 65%),
          radial-gradient(ellipse 50% 40% at 10% 65%, rgba(34,211,238,.05) 0%, transparent 55%),
          radial-gradient(ellipse 45% 35% at 90% 40%, rgba(245,158,11,.05) 0%, transparent 50%),
          ${BG}
        `,
      }}>
        {/* Ambient orbs */}
        <div className="orb"  style={{ position:"absolute", width:700, height:700, borderRadius:"50%", background:"radial-gradient(circle,rgba(0,212,113,.055) 0%,transparent 65%)", top:-220, left:"50%", transform:"translateX(-50%)", pointerEvents:"none" }} />
        <div className="orb2" style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle,rgba(34,211,238,.04) 0%,transparent 65%)",  bottom:-50, right:-80, pointerEvents:"none" }} />

        {/* Grid */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          backgroundImage:`linear-gradient(rgba(255,255,255,.018) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.018) 1px,transparent 1px)`,
          backgroundSize:"64px 64px",
          maskImage:"radial-gradient(ellipse 80% 60% at 50% 0%,black 20%,transparent 76%)",
        }} />

        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2, width: "100%" }}>

          {/* Badge */}
          <div className="h0" style={{ display:"inline-flex", alignItems:"center", gap:8, background:gDim, border:`1px solid ${gBrd}`, borderRadius:9999, padding:"6px 18px", marginBottom:36 }}>
            <div style={{ position:"relative", width:8, height:8 }}>
              <div className="ping" style={{ position:"absolute", inset:0, borderRadius:"50%", background:G, opacity:.7 }} />
              <div className="ldot" style={{ width:8, height:8, borderRadius:"50%", background:G, position:"relative" }} />
            </div>
            <span style={{ fontSize:12, fontWeight:700, color:G, letterSpacing:"0.05em", textTransform:"uppercase" }}>AI Receptionist · Answering Calls Right Now</span>
          </div>

          {/* Headline */}
          <h1 className="h1" style={{ fontSize:"clamp(52px,8vw,96px)", fontWeight:900, lineHeight:.93, letterSpacing:"-0.045em", color:TX, margin:"0 0 28px" }}>
            Every call<br />
            <span className="tg">answered.</span><br />
            Every booking<br />
            <span className="ta">captured.</span>
          </h1>

          {/* Sub */}
          <p className="h2" style={{ fontSize:"clamp(17px,2.2vw,21px)", color:MT, maxWidth:570, margin:"0 auto 44px", lineHeight:1.65 }}>
            ARIA is the AI phone receptionist that picks up every call, books appointments instantly, and learns your business — all without you lifting a finger.
          </p>

          {/* CTAs */}
          <div className="h3" style={{ display:"flex", alignItems:"center", gap:16, justifyContent:"center", flexWrap:"wrap", marginBottom:22 }}>
            <SignUpButton>
              <button className="btn-g" style={{ background:G, color:"#000", borderRadius:9999, padding:"16px 36px", fontSize:16, fontWeight:700, display:"flex", alignItems:"center", gap:8 }}>
                Start answering every call <ArrowRight size={16} />
              </button>
            </SignUpButton>
            <Link href="/how-it-works" style={{ display:"inline-flex", alignItems:"center", gap:8, color:"rgba(241,245,249,.7)", textDecoration:"none", fontSize:15, fontWeight:500 }}
              onMouseEnter={e=>{e.currentTarget.style.color=TX}} onMouseLeave={e=>{e.currentTarget.style.color="rgba(241,245,249,.7)"}}>
              See how it works <ArrowRight size={14} />
            </Link>
          </div>

          {/* Trust line */}
          <div className="h4" style={{ fontSize:13, color:"rgba(136,146,164,.65)", display:"flex", gap:8, justifyContent:"center", flexWrap:"wrap", marginBottom:72, alignItems:"center" }}>
            {["No credit card required","14-day free period","36 languages","Cancel anytime"].map((t,i)=>(
              <span key={t} style={{ display:"flex", alignItems:"center", gap:8 }}>
                {i>0&&<span style={{ color:"rgba(136,146,164,.25)" }}>·</span>}
                {t}
              </span>
            ))}
          </div>

          {/* ── Live call infographic card ── */}
          <div className="h5" style={{
            background: SF, border:`1px solid ${gBrd}`, borderRadius:24,
            padding:"28px 28px 24px", maxWidth:520, margin:"0 auto",
            boxShadow:`0 0 0 1px rgba(0,212,113,.04), 0 40px 100px rgba(0,0,0,.55), 0 0 80px rgba(0,212,113,.07)`,
            textAlign:"left",
          }}>
            {/* Top bar */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ position:"relative", width:10, height:10 }}>
                  <div className="ping" style={{ position:"absolute", inset:-1, borderRadius:"50%", background:G, opacity:.5 }} />
                  <div className="ldot" style={{ width:10, height:10, borderRadius:"50%", background:G, position:"relative" }} />
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:G, letterSpacing:"0.06em", textTransform:"uppercase" }}>ARIA Answering</span>
              </div>
              <span style={{ fontSize:12, color:MT, fontWeight:500, fontVariantNumeric:"tabular-nums" }}>0:47</span>
            </div>

            {/* Caller info */}
            <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px", background:CD, borderRadius:14, marginBottom:16, border:`1px solid ${BD}` }}>
              <div style={{ width:40, height:40, borderRadius:"50%", background:`linear-gradient(135deg,#1a2a4a,#1e3060)`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <PhoneCall size={17} color={CY} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:TX }}>Maria&apos;s Dental Clinic</div>
                <div style={{ fontSize:12, color:MT, marginTop:2 }}>+1 (512) 555-0182</div>
              </div>
              <div style={{ background:cyDim, border:`1px solid ${cyBrd}`, borderRadius:6, padding:"4px 10px", fontSize:11, fontWeight:700, color:CY, flexShrink:0 }}>Live</div>
            </div>

            {/* Waveform */}
            <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:48, marginBottom:14, padding:"4px 2px 0" }}>
              {[0,1,2,3,4,5,6,7].map(i=>(
                <div key={i} className="wv" style={{ flex:1, background:`linear-gradient(180deg,${G},rgba(0,212,113,.35))`, borderRadius:"3px 3px 2px 2px" }} />
              ))}
            </div>

            {/* Transcript */}
            <p style={{ fontSize:13, color:"rgba(241,245,249,.6)", margin:"0 0 18px", lineHeight:1.55, fontStyle:"italic" }}>
              &ldquo;Hi, I&apos;d like to book a cleaning for Thursday afternoon if that&apos;s possible...&rdquo;
            </p>

            {/* Booking confirmation pop */}
            <div className="bkpop" style={{ background:gDim, border:`1px solid ${gBrd}`, borderRadius:12, padding:"13px 16px", display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:30, height:30, borderRadius:"50%", background:"rgba(0,212,113,.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Check size={14} color={G} />
              </div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:G }}>Appointment Booked</div>
                <div style={{ fontSize:11, color:MT, marginTop:3 }}>Thu Nov 14 · 2:00 PM · Dr. Anjali Chen · SMS sent ✓</div>
              </div>
            </div>
          </div>

          {/* ── 3 stats strip ── */}
          <div className="h5" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:1, marginTop:32, background:BD, borderRadius:16, overflow:"hidden", border:`1px solid ${BD}` }}>
            {[
              { num:"94%",   label:"calls answered in <2 s" },
              { num:"3.2×",  label:"more bookings vs voicemail" },
              { num:"24/7",  label:"always on, never on hold" },
            ].map((s,i)=>(
              <div key={i} style={{ background:SF, padding:"20px 16px", textAlign:"center" }}>
                <div style={{ fontSize:28, fontWeight:900, letterSpacing:"-0.04em", color:TX, marginBottom:4 }}>{s.num}</div>
                <div style={{ fontSize:12, color:MT, lineHeight:1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ TRUSTED BY ══════════════════════════════════ */}
      <section style={{ background:SF, borderTop:`1px solid ${BD}`, borderBottom:`1px solid ${BD}`, padding:"22px 0", overflow:"hidden" }}>
        <div style={{ display:"flex", alignItems:"center", gap:40, padding:"0 40px" }}>
          <span style={{ fontSize:11, fontWeight:700, color:"rgba(136,146,164,.4)", whiteSpace:"nowrap", letterSpacing:"0.08em", textTransform:"uppercase", flexShrink:0 }}>Trusted by</span>
          <div style={{ flex:1, overflow:"hidden", position:"relative" }}>
            <div style={{ position:"absolute", left:0, top:0, bottom:0, width:64, background:`linear-gradient(90deg,${SF},transparent)`, zIndex:1 }} />
            <div style={{ position:"absolute", right:0, top:0, bottom:0, width:64, background:`linear-gradient(-90deg,${SF},transparent)`, zIndex:1 }} />
            <div className="mq">
              {["Dental Plus","GreenLeaf Bistro","Elite Legal Group","Sunrise Salon","QuickFix Auto","Summit Fitness","City Realty","PetCare Vets","TechRepair Hub","Lakewood Spa",
                "Dental Plus","GreenLeaf Bistro","Elite Legal Group","Sunrise Salon","QuickFix Auto","Summit Fitness","City Realty","PetCare Vets","TechRepair Hub","Lakewood Spa"].map((n,i)=>(
                <span key={i} style={{ fontSize:14, fontWeight:700, color:"rgba(241,245,249,.2)", whiteSpace:"nowrap", padding:"0 36px", letterSpacing:"0.02em" }}>{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ PROOF STATS ══════════════════════════════════ */}
      <section style={{ background:"#F8FAFB", padding:"104px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="sr" style={{ textAlign:"center", marginBottom:72 }}>
            <div style={{ display:"inline-block", background:"rgba(245,158,11,.1)", border:"1px solid rgba(245,158,11,.28)", color:AM, borderRadius:9999, padding:"5px 16px", fontSize:12, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:20 }}>The cost of missed calls</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,52px)", fontWeight:900, color:"#0D1117", margin:0, letterSpacing:"-0.035em", lineHeight:1.1 }}>
              Your competitors are answering.<br />You&apos;re going to voicemail.
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
            {[
              { num:"67%",    label:"of callers who reach voicemail never call back",               accent:"#EF4444", bg:"#FEF2F2", bdr:"#FECACA" },
              { num:"$2,400", label:"average annual revenue lost per missed call",                   accent:AM,       bg:"#FFFBEB", bdr:"#FDE68A" },
              { num:"3.2×",   label:"more bookings when calls answered within 3 rings",             accent:"#10B981", bg:"#ECFDF5", bdr:"#A7F3D0" },
            ].map((s,i)=>(
              <div key={i} className={`stc sr d${i+1}`} style={{ background:"#fff", borderRadius:24, padding:"36px 32px", border:"1px solid #E2E8F0", boxShadow:"0 2px 24px rgba(0,0,0,.05)" }}>
                <div style={{ fontSize:"clamp(48px,5vw,68px)", fontWeight:900, color:s.accent, letterSpacing:"-0.04em", lineHeight:1, marginBottom:16 }}>{s.num}</div>
                <p style={{ fontSize:16, color:"#4B5563", lineHeight:1.6, margin:0 }}>{s.label}</p>
              </div>
            ))}
          </div>

          <div className="sr" style={{ textAlign:"center", marginTop:60 }}>
            <p style={{ fontSize:18, color:"#374151", fontWeight:600, margin:"0 0 24px" }}>
              ARIA fixes this permanently. Starting at $97/month.
            </p>
            <SignUpButton>
              <button className="btn-g" style={{ background:G, color:"#000", borderRadius:9999, padding:"14px 32px", fontSize:15, fontWeight:700, border:"none", cursor:"pointer" }}>
                Stop losing revenue →
              </button>
            </SignUpButton>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ HOW IT WORKS ═════════════════════════════════ */}
      <section style={{ background:BG, padding:"104px 24px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div className="sr" style={{ textAlign:"center", marginBottom:80 }}>
            <div style={{ display:"inline-block", background:gDim, border:`1px solid ${gBrd}`, color:G, borderRadius:9999, padding:"5px 16px", fontSize:12, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:20 }}>Setup</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,48px)", fontWeight:900, color:TX, margin:0, letterSpacing:"-0.035em" }}>
              Live in 5 minutes.<br />Seriously.
            </h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24, position:"relative" }}>
            {/* Connector */}
            <div style={{ position:"absolute", top:34, left:"17%", right:"17%", height:1, background:`linear-gradient(90deg,rgba(0,212,113,.1),rgba(0,212,113,.45) 50%,rgba(0,212,113,.1))`, pointerEvents:"none" }} />

            {[
              { n:"01", icon:<Phone size={20} color={G} />, title:"Connect your number", body:"Link your existing phone number via Twilio. ARIA answers from the first ring — no queue, no delay, no setup fee.", accentDim:gDim, accentBrd:gBrd },
              { n:"02", icon:<MessageSquare size={20} color={AM} />, title:"Teach your business", body:"Upload your FAQ, set your hours, paste your services list. ARIA learns your entire business in under 3 minutes.", accentDim:aDim, accentBrd:aBrd },
              { n:"03", icon:<TrendingUp size={20} color={CY} />, title:"Watch revenue grow", body:"Every call answered. Every appointment booked. Track it all live in your real-time dashboard.", accentDim:cyDim, accentBrd:cyBrd },
            ].map((s,i)=>(
              <div key={i} className={`sr d${i+1} bc`} style={{ background:SF, border:`1px solid ${BD}`, borderRadius:20, padding:"32px 28px", position:"relative", overflow:"hidden" }}>
                <div style={{ fontSize:72, fontWeight:900, color:"rgba(255,255,255,.03)", lineHeight:1, position:"absolute", top:12, right:20, letterSpacing:"-0.05em", userSelect:"none" }}>{s.n}</div>
                <div style={{ width:52, height:52, borderRadius:14, background:s.accentDim, border:`1px solid ${s.accentBrd}`, display:"flex", alignItems:"center", justifyContent:"center", marginBottom:24 }}>
                  {s.icon}
                </div>
                <h3 style={{ fontSize:18, fontWeight:700, color:TX, margin:"0 0 12px", letterSpacing:"-0.02em" }}>{s.title}</h3>
                <p style={{ fontSize:14, color:MT, lineHeight:1.65, margin:0 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════ CAPABILITIES BENTO ═══════════════════════════════ */}
      <section style={{ background:SF, padding:"104px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="sr" style={{ textAlign:"center", marginBottom:72 }}>
            <div style={{ display:"inline-block", background:cyDim, border:`1px solid ${cyBrd}`, color:CY, borderRadius:9999, padding:"5px 16px", fontSize:12, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:20 }}>Capabilities</div>
            <h2 style={{ fontSize:"clamp(30px,4vw,48px)", fontWeight:900, color:TX, margin:0, letterSpacing:"-0.035em" }}>
              Built for how real<br />business calls work
            </h2>
          </div>

          {/* Bento: 6-col grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(6,1fr)", gap:16 }}>

            {/* ① 36 Languages — 4 cols wide, 1 row */}
            <div className="sr bc" style={{ gridColumn:"span 4", background:CD, border:`1px solid ${BD}`, borderRadius:22, padding:"32px 36px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-60, right:-60, width:320, height:320, borderRadius:"50%", background:`radial-gradient(circle,rgba(34,211,238,.06) 0%,transparent 65%)`, pointerEvents:"none" }} />
              <div style={{ display:"inline-block", background:cyDim, border:`1px solid ${cyBrd}`, color:CY, borderRadius:9999, padding:"4px 12px", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:16 }}>36 Languages</div>
              <h3 style={{ fontSize:22, fontWeight:800, color:TX, margin:"0 0 10px", letterSpacing:"-0.025em" }}>Your callers speak Hindi. Tagalog. Mandarin. ARIA does too.</h3>
              <p style={{ fontSize:14, color:MT, lineHeight:1.6, margin:"0 0 24px", maxWidth:500 }}>Auto-detects language at call start. No transfers, no awkwardness. Full support for 22 Indian regional languages + 14 global.</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {["🇮🇳 Hindi","🇮🇳 Telugu","🇮🇳 Tamil","🇪🇸 Spanish","🇨🇳 Chinese","🇵🇭 Tagalog","🇻🇳 Vietnamese","🇰🇷 Korean","🇫🇷 French","🇩🇪 German"].map(l=>(
                  <div key={l} style={{ background:"rgba(255,255,255,.05)", border:`1px solid ${BD}`, borderRadius:9999, padding:"5px 12px", fontSize:12, fontWeight:600, color:"rgba(241,245,249,.7)" }}>{l}</div>
                ))}
                <div style={{ background:cyDim, border:`1px solid ${cyBrd}`, borderRadius:9999, padding:"5px 12px", fontSize:12, fontWeight:700, color:CY }}>+26 more</div>
              </div>
            </div>

            {/* ② 24/7 Uptime — 2 cols */}
            <div className="sr d1 bc" style={{ gridColumn:"span 2", background:CD, border:`1px solid ${BD}`, borderRadius:22, padding:"32px 28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%", background:`radial-gradient(circle,rgba(0,212,113,.1) 0%,transparent 65%)`, pointerEvents:"none" }} />
              <div style={{ fontSize:60, fontWeight:900, color:G, letterSpacing:"-0.05em", lineHeight:1, marginBottom:8 }}>24/7</div>
              <div style={{ fontSize:18, fontWeight:700, color:TX, marginBottom:10 }}>Never misses a call</div>
              <p style={{ fontSize:13, color:MT, lineHeight:1.55, margin:"0 0 22px" }}>No sick days. No holidays. No staffing gaps. ARIA is always on.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[{l:"Answer rate",v:"99.8%",c:G},{l:"Avg wait",v:"< 2 s",c:G},{l:"Uptime SLA",v:"99.9%",c:AM}].map(s=>(
                  <div key={s.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 12px", background:"rgba(255,255,255,.03)", borderRadius:9, border:`1px solid ${BD}` }}>
                    <span style={{ fontSize:12, color:MT }}>{s.l}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:s.c }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ③ Human Handoff — 2 cols */}
            <div className="sr d2 bc" style={{ gridColumn:"span 2", background:CD, border:`1px solid ${BD}`, borderRadius:22, padding:"28px" }}>
              <div style={{ display:"inline-block", background:"rgba(16,185,129,.1)", border:"1px solid rgba(16,185,129,.22)", color:"#10B981", borderRadius:9999, padding:"4px 12px", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:16 }}>Human Handoff</div>
              <h3 style={{ fontSize:18, fontWeight:700, color:TX, margin:"0 0 8px" }}>Knows when to step back</h3>
              <p style={{ fontSize:13, color:MT, lineHeight:1.55, margin:"0 0 20px" }}>Caller asks for a human? ARIA bridges instantly, with context already collected.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { step:"Caller says 'let me speak to someone'", done:true },
                  { step:"ARIA collects name + reason for call",  done:true },
                  { step:"Call bridged · agent connected in 0:02", active:true },
                ].map((s,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:10 }}>
                    <div style={{ width:7, height:7, borderRadius:"50%", background:s.active?"#10B981":s.done?G:"rgba(255,255,255,.18)", flexShrink:0, marginTop:5 }} />
                    <span style={{ fontSize:12, color:s.active?TX:s.done?"rgba(241,245,249,.6)":MT, lineHeight:1.5 }}>{s.step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ④ Barge-in — 2 cols */}
            <div className="sr d3 bc" style={{ gridColumn:"span 2", background:CD, border:`1px solid ${BD}`, borderRadius:22, padding:"28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", bottom:-24, right:-24, width:140, height:140, borderRadius:"50%", background:`radial-gradient(circle,rgba(245,158,11,.07) 0%,transparent 65%)`, pointerEvents:"none" }} />
              <div style={{ display:"inline-block", background:aDim, border:`1px solid ${aBrd}`, color:AM, borderRadius:9999, padding:"4px 12px", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:16 }}>Natural Voice</div>
              <h3 style={{ fontSize:18, fontWeight:700, color:TX, margin:"0 0 8px" }}>Barge-in detection</h3>
              <p style={{ fontSize:13, color:MT, lineHeight:1.55, margin:"0 0 18px" }}>Caller interrupts mid-sentence? ARIA stops instantly and listens. Zero robotic awkwardness.</p>
              <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:36 }}>
                {[8,16,24,30,7,7,26,20,14,10].map((h,i)=>(
                  <div key={i} className="wv" style={{ flex:1, height:h, background:i===4||i===5?`rgba(245,158,11,.25)`:`linear-gradient(180deg,${AM},rgba(245,158,11,.35))`, borderRadius:"3px 3px 2px 2px", opacity:i===4||i===5?.3:1 }} />
                ))}
              </div>
              <div style={{ marginTop:12, fontSize:11, fontWeight:700, color:AM, display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:6, height:6, borderRadius:"50%", background:AM }} />
                Barge-in detected · ARIA paused
              </div>
            </div>

            {/* ⑤ Spam Guard — 2 cols */}
            <div className="sr d4 bc" style={{ gridColumn:"span 2", background:CD, border:`1px solid ${BD}`, borderRadius:22, padding:"28px" }}>
              <div style={{ display:"inline-block", background:rDim, border:`1px solid ${rBrd}`, color:RED, borderRadius:9999, padding:"4px 12px", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:16 }}>Spam Guard</div>
              <h3 style={{ fontSize:18, fontWeight:700, color:TX, margin:"0 0 8px" }}>Kills spam calls dead</h3>
              <p style={{ fontSize:13, color:MT, lineHeight:1.55, margin:"0 0 18px" }}>Content safety filters detect abuse and end calls gracefully — before they waste a second of your time.</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[{l:"Spam blocked today",v:"23",c:RED},{l:"Robocalls rejected",v:"11",c:RED},{l:"Real calls answered",v:"94",c:G}].map(s=>(
                  <div key={s.l} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 12px", background:"rgba(255,255,255,.03)", borderRadius:9, border:`1px solid ${BD}` }}>
                    <span style={{ fontSize:12, color:MT }}>{s.l}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:s.c }}>{s.v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ⑥ Appointment booking — 2 cols */}
            <div className="sr d5 bc" style={{ gridColumn:"span 2", background:CD, border:`1px solid ${BD}`, borderRadius:22, padding:"28px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-30, left:-30, width:160, height:160, borderRadius:"50%", background:`radial-gradient(circle,rgba(0,212,113,.08) 0%,transparent 65%)`, pointerEvents:"none" }} />
              <div style={{ display:"inline-block", background:gDim, border:`1px solid ${gBrd}`, color:G, borderRadius:9999, padding:"4px 12px", fontSize:11, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:16 }}>Booking Engine</div>
              <h3 style={{ fontSize:18, fontWeight:700, color:TX, margin:"0 0 8px" }}>Books while you sleep</h3>
              <p style={{ fontSize:13, color:MT, lineHeight:1.55, margin:"0 0 18px" }}>Syncs with your calendar, finds the next open slot, confirms with the caller, and fires an SMS — all in under 30 seconds.</p>
              <div style={{ background:gDim, border:`1px solid ${gBrd}`, borderRadius:12, padding:"12px 14px", display:"flex", alignItems:"center", gap:10 }}>
                <Check size={16} color={G} />
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:G }}>Booked · Thu Nov 14 · 2:00 PM</div>
                  <div style={{ fontSize:11, color:MT, marginTop:2 }}>Dr. Anjali Chen · SMS sent ✓</div>
                </div>
              </div>
            </div>

          </div>

          <div className="sr" style={{ textAlign:"center", marginTop:48 }}>
            <Link href="/features" style={{ display:"inline-flex", alignItems:"center", gap:8, color:G, textDecoration:"none", fontSize:15, fontWeight:600 }}>
              View all features <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════ INDUSTRIES ══════════════════════════════════ */}
      <section style={{ background:"#F8FAFB", padding:"104px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="sr" style={{ textAlign:"center", marginBottom:56 }}>
            <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:900, color:"#0D1117", margin:"0 0 12px", letterSpacing:"-0.035em" }}>
              Speaks your industry&apos;s language
            </h2>
            <p style={{ fontSize:17, color:"#64748B", maxWidth:480, margin:"0 auto" }}>
              Pre-configured workflows for how calls actually work in your field.
            </p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16, marginBottom:40 }}>
            {[
              { icon:<Stethoscope size={22} color={G}     />, name:"Healthcare",  blurb:"HIPAA mode, appointment intake, insurance FAQs",     stat:"98% bookings filled",  href:"#healthcare"  },
              { icon:<UtensilsCrossed size={22} color={AM}/>, name:"Restaurant",  blurb:"Reservations, menu questions, wait times",            stat:"3× more covers booked", href:"#restaurant"  },
              { icon:<Scale size={22} color={CY}          />, name:"Legal",       blurb:"Client intake, conflict checks, consultation booking", stat:"Zero leads dropped",   href:"#legal"       },
              { icon:<Building2 size={22} color="#A78BFA" />, name:"Real Estate", blurb:"Listing info, showing bookings, buyer qualification",  stat:"2× more showings",     href:"#realestate"  },
              { icon:<Scissors size={22} color="#F472B6"  />, name:"Salon & Spa", blurb:"Stylist scheduling, services, product questions",      stat:"No-shows down 60%",    href:"#salon"       },
              { icon:<ShoppingBag size={22} color="#34D399"/>, name:"Retail",     blurb:"Hours, stock availability, returns policy",           stat:"100% queries handled", href:"#retail"      },
            ].map((ind,i)=>(
              <Link key={i} href={`/industries${ind.href}`} style={{ textDecoration:"none" }}>
                <div className="ic" style={{ background:"#fff", borderRadius:20, padding:"24px", border:"1px solid #E2E8F0", cursor:"pointer" }}>
                  <div style={{ width:44, height:44, borderRadius:12, background:"#F8FAFB", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:16, border:"1px solid #E2E8F0" }}>
                    {ind.icon}
                  </div>
                  <div style={{ fontSize:16, fontWeight:700, color:"#0D1117", marginBottom:6 }}>{ind.name}</div>
                  <div style={{ fontSize:13, color:"#64748B", lineHeight:1.5, marginBottom:14 }}>{ind.blurb}</div>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:"#10B981", background:"#ECFDF5", padding:"3px 10px", borderRadius:9999, border:"1px solid #A7F3D0" }}>{ind.stat}</span>
                    <ChevronRight size={14} color="#9CA3AF" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="sr" style={{ textAlign:"center" }}>
            <Link href="/industries" style={{ color:G, textDecoration:"none", fontSize:15, fontWeight:600, display:"inline-flex", alignItems:"center", gap:8 }}>
              See all 15 industries <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════ TESTIMONIALS ═════════════════════════════════ */}
      <section style={{ background:BG, padding:"104px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div className="sr" style={{ textAlign:"center", marginBottom:72 }}>
            <div style={{ display:"inline-block", background:aDim, border:`1px solid ${aBrd}`, color:AM, borderRadius:9999, padding:"5px 16px", fontSize:12, fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:20 }}>Results</div>
            <h2 style={{ fontSize:"clamp(28px,4vw,44px)", fontWeight:900, color:TX, margin:0, letterSpacing:"-0.035em" }}>Real businesses. Real revenue.</h2>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:24 }}>
            {[
              { quote:"We answer every call now. Literally every one. Revenue is up 23% this quarter.", roi:"+23% revenue", roiC:G,  roiDim:gDim,  roiB:gBrd,  name:"Maria C.",  role:"Restaurant Owner",   industry:"Food & Beverage" },
              { quote:"Legal intake used to take 3 staff hours a day. ARIA does it automatically. Every lead captured.", roi:"3 hrs/day saved", roiC:AM, roiDim:aDim, roiB:aBrd, name:"James T.", role:"Managing Partner", industry:"Legal" },
              { quote:"12 locations, one subscription. The ROI is insane. Nothing else comes close at this price.", roi:"12× scale", roiC:CY, roiDim:cyDim, roiB:cyBrd, name:"Priya S.", role:"Agency Owner", industry:"Multi-location" },
            ].map((t,i)=>(
              <div key={i} className={`sr d${i+1} bc`} style={{ background:SF, border:`1px solid ${BD}`, borderRadius:24, padding:"36px 32px" }}>
                <div style={{ display:"flex", gap:3, marginBottom:18 }}>
                  {[0,1,2,3,4].map(s=><Star key={s} size={15} color={AM} fill={AM} />)}
                </div>
                <div style={{ display:"inline-block", background:t.roiDim, border:`1px solid ${t.roiB}`, color:t.roiC, borderRadius:9999, padding:"4px 14px", fontSize:12, fontWeight:700, marginBottom:18 }}>
                  {t.roi}
                </div>
                <p style={{ fontSize:19, fontWeight:700, color:TX, lineHeight:1.45, margin:"0 0 28px" }}>&ldquo;{t.quote}&rdquo;</p>
                <div>
                  <div style={{ fontSize:15, fontWeight:700, color:TX }}>{t.name}</div>
                  <div style={{ fontSize:13, color:MT, marginTop:2 }}>{t.role}</div>
                  <div style={{ fontSize:11, fontWeight:700, color:"rgba(136,146,164,.4)", marginTop:6, textTransform:"uppercase", letterSpacing:"0.07em" }}>{t.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ PRICING ════════════════════════════════════ */}
      <section style={{ background:"#F8FAFB", padding:"104px 24px" }}>
        <div style={{ maxWidth:1000, margin:"0 auto" }}>
          <div className="sr" style={{ textAlign:"center", marginBottom:64 }}>
            <h2 style={{ fontSize:"clamp(28px,4vw,48px)", fontWeight:900, color:"#0D1117", margin:"0 0 12px", letterSpacing:"-0.035em" }}>Simple, honest pricing.</h2>
            <p style={{ fontSize:17, color:"#64748B", margin:0 }}>Start free. Scale as you grow. Less than one missed booking per month.</p>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20, marginBottom:40 }}>
            {[
              { name:"Starter", price:"$97",  tag:"1 location",            features:["500 minutes/month","1 AI agent","SMS inbox","Appointment booking","14-day free period"],              cta:"Start for free", featured:false },
              { name:"Pro",     price:"$197", tag:"Growing businesses",     features:["2,000 minutes/month","3 AI agents","Omnichannel inbox","Priority support","Advanced analytics"],      cta:"Start Pro free", featured:true  },
              { name:"Agency",  price:"$497", tag:"Multi-location & agencies", features:["10,000 minutes/month","White-label dashboard","API access","Dedicated account manager","Custom integrations"], cta:"Contact sales", featured:false },
            ].map((p,i)=>(
              <div key={i} className="pc sr" style={{
                background: p.featured ? "#0D1117" : "#fff",
                border: p.featured ? `2px solid ${G}` : "1px solid #E2E8F0",
                borderRadius:24, padding:"32px 28px", position:"relative",
                boxShadow: p.featured ? `0 0 60px rgba(0,212,113,.12)` : "0 2px 16px rgba(0,0,0,.04)",
              }}>
                {p.featured && (
                  <div style={{ position:"absolute", top:-14, left:"50%", transform:"translateX(-50%)", background:G, color:"#000", borderRadius:9999, padding:"4px 18px", fontSize:11, fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase", whiteSpace:"nowrap" }}>
                    Most Popular
                  </div>
                )}
                <div style={{ fontSize:11, fontWeight:700, color:p.featured?"rgba(255,255,255,.4)":"#9CA3AF", marginBottom:12, letterSpacing:"0.08em", textTransform:"uppercase" }}>{p.name}</div>
                <div style={{ display:"flex", alignItems:"baseline", gap:4, marginBottom:6 }}>
                  <span style={{ fontSize:48, fontWeight:900, color:p.featured?TX:"#0D1117", letterSpacing:"-0.04em", lineHeight:1 }}>{p.price}</span>
                  <span style={{ fontSize:14, color:p.featured?MT:"#9CA3AF", fontWeight:500 }}>/mo</span>
                </div>
                <div style={{ fontSize:13, color:p.featured?MT:"#9CA3AF", marginBottom:24 }}>{p.tag}</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                  {p.features.map((f,j)=>(
                    <div key={j} style={{ display:"flex", alignItems:"center", gap:10, fontSize:14, color:p.featured?"rgba(241,245,249,.85)":"#374151" }}>
                      <div style={{ width:18, height:18, borderRadius:"50%", background:p.featured?"rgba(0,212,113,.15)":"#ECFDF5", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <Check size={11} color={G} />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>
                <SignUpButton>
                  <button
                    style={{ width:"100%", padding:"13px", borderRadius:12, fontSize:15, fontWeight:700, cursor:"pointer", background:p.featured?G:"transparent", color:p.featured?"#000":G, border:p.featured?"none":`2px solid ${G}`, transition:"all .2s" }}
                    onMouseEnter={e=>{ if(!p.featured) e.currentTarget.style.background="rgba(0,212,113,.06)" }}
                    onMouseLeave={e=>{ if(!p.featured) e.currentTarget.style.background="transparent" }}
                  >
                    {p.cta}
                  </button>
                </SignUpButton>
              </div>
            ))}
          </div>

          <div className="sr" style={{ textAlign:"center" }}>
            <Link href="/pricing" style={{ color:"#6B7280", textDecoration:"none", fontSize:14, fontWeight:500, display:"inline-flex", alignItems:"center", gap:6 }}>
              Full pricing details, annual discounts & FAQ <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FINAL CTA ══════════════════════════════════ */}
      <section style={{ background:BG, padding:"128px 24px", position:"relative", overflow:"hidden", borderTop:`1px solid ${BD}` }}>
        {/* Glow */}
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:900, height:450, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(0,212,113,.09) 0%,transparent 65%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", width:500, height:250, borderRadius:"50%", background:"radial-gradient(ellipse,rgba(0,212,113,.12) 0%,transparent 65%)", pointerEvents:"none" }} />

        <div style={{ position:"relative", zIndex:10, maxWidth:680, margin:"0 auto", textAlign:"center" }}>
          <div className="sr" style={{ display:"inline-flex", alignItems:"center", gap:8, background:gDim, border:`1px solid ${gBrd}`, borderRadius:9999, padding:"6px 18px", fontSize:12, fontWeight:700, color:G, letterSpacing:"0.05em", textTransform:"uppercase", marginBottom:36 }}>
            <div className="ldot" style={{ width:7, height:7, borderRadius:"50%", background:G }} />
            Start free · No credit card required
          </div>

          <h2 className="sr d1" style={{ fontSize:"clamp(36px,5.5vw,68px)", fontWeight:900, color:TX, margin:"0 0 20px", letterSpacing:"-0.042em", lineHeight:1.0 }}>
            Stop losing revenue<br />to voicemail.
          </h2>

          <p className="sr d2" style={{ fontSize:19, color:MT, margin:"0 0 52px", lineHeight:1.65 }}>
            ARIA answers every call from day one — no hardware, no training, no delays.
          </p>

          <div className="sr d3" style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:16 }}>
            <SignUpButton>
              <button className="btn-g" style={{ background:G, color:"#000", fontWeight:800, borderRadius:9999, padding:"18px 52px", fontSize:18, border:"none", cursor:"pointer", display:"flex", alignItems:"center", gap:10 }}>
                Start for free <ArrowRight size={18} />
              </button>
            </SignUpButton>
            <span style={{ fontSize:13, color:"rgba(136,146,164,.4)" }}>No credit card required · Cancel anytime · Setup in 5 minutes</span>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════ FOOTER ═════════════════════════════════════ */}
      <footer style={{ background:SF, borderTop:`1px solid ${BD}`, padding:"72px 24px 40px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"2.5fr 1fr 1fr 1fr", gap:56, marginBottom:56 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:18 }}>
                <div style={{ width:30, height:30, borderRadius:8, background:`linear-gradient(135deg,${G},#00A855)`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 0 12px rgba(0,212,113,.28)` }}>
                  <Phone size={14} color="#000" fill="#000" />
                </div>
                <span style={{ fontWeight:800, fontSize:15, color:TX }}>ARIA</span>
              </div>
              <p style={{ fontSize:14, color:"rgba(136,146,164,.5)", lineHeight:1.7, maxWidth:260, margin:"0 0 20px" }}>
                AI voice receptionist for every business. Answer every call, book every appointment, capture every lead.
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:"rgba(136,146,164,.38)" }}>
                <div className="ldot" style={{ width:6, height:6, borderRadius:"50%", background:G }} />
                All systems operational
              </div>
            </div>

            {([
              { title:"Product", links:[["Dashboard","/dashboard"],["Features","/features"],["Pricing","/pricing"],["How it works","/how-it-works"],["Status","#"]] },
              { title:"Company", links:[["About","/about"],["Industries","/industries"],["Contact","/contact"],["Blog","#"],["Careers","#"]] },
              { title:"Legal",   links:[["Privacy Policy","#"],["Terms of Service","#"],["Cookie Policy","#"],["Security","#"]] },
            ] as { title:string; links:[string,string][] }[]).map(col=>(
              <div key={col.title}>
                <div style={{ fontSize:11, fontWeight:700, color:"rgba(136,146,164,.3)", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:20 }}>{col.title}</div>
                {col.links.map(([l,h])=>(
                  <Link key={l} href={h} className="fl">{l}</Link>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop:`1px solid ${BD}`, paddingTop:28, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <span style={{ fontSize:13, color:"rgba(136,146,164,.22)" }}>© 2026 ARIA, Inc. All rights reserved.</span>
            <span style={{ fontSize:13, color:"rgba(136,146,164,.22)" }}>Powered by Claude · Vapi · Twilio</span>
          </div>
        </div>
      </footer>
      <VoiceDemo />
    </div>
  )
}
