"use client"

import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Phone, TrendingUp, PhoneMissed, Clock, PhoneIncoming, ArrowRight, BookOpen, Zap } from "lucide-react"

// ── Design tokens (matches the brand) ─────────────────────────
const G   = "#00D471"
const AM  = "#F59E0B"
const CY  = "#22D3EE"
const RED = "#F87171"
const TX  = "#F1F5F9"
const MT  = "#8892A4"
const BD  = "rgba(255,255,255,0.07)"
const CARD = "rgba(255,255,255,0.035)"
const CARD_BORDER = "rgba(255,255,255,0.08)"

// Hourly call volume (demo) — realistic 9-5 peak shape
const HOURLY = [1,0,0,0,1,2,5,10,16,21,24,22,17,20,23,20,17,13,9,6,4,3,2,1]
const H_MAX  = Math.max(...HOURLY)

const DEMO_CALLS = [
  { type:"answered", label:"Appointment booking — cleaning inquiry",     time:"2m ago",   dur:"3m 24s", lang:"EN" },
  { type:"answered", label:"Menu & hours question",                       time:"18m ago",  dur:"1m 12s", lang:"HI" },
  { type:"answered", label:"Legal consultation booking",                  time:"47m ago",  dur:"4m 02s", lang:"ES" },
  { type:"missed",   label:"+1 (555) 234-5678",                           time:"1h ago",   dur:null,     lang:""   },
  { type:"answered", label:"Product availability — returns policy",       time:"1h 22m ago",dur:"2m 08s",lang:"EN" },
]

const kf = `
@keyframes db-fade{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes db-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.8)}}
@keyframes db-wv{0%,100%{transform:scaleY(.3);opacity:.5}50%{transform:scaleY(1);opacity:1}}
@keyframes db-ping{75%,100%{transform:scale(2.2);opacity:0}}
`

function GlassCard({ children, style = {}, className = "" }: { children: React.ReactNode; style?: React.CSSProperties; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: CARD,
        backdropFilter: "blur(20px) saturate(160%)",
        WebkitBackdropFilter: "blur(20px) saturate(160%)",
        border: `1px solid ${CARD_BORDER}`,
        borderRadius: 20,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default function DashboardPage() {
  const { data: stats } = api.calls.stats.useQuery(undefined, { refetchInterval: 30_000 })

  const callsToday  = stats?.callsToday  ?? 0
  const resolved    = stats?.resolved    ?? 0
  const missed      = stats?.missed      ?? 0
  const avgDuration = stats?.avgDuration ?? 0
  const avgFmt      = avgDuration ? `${Math.floor(avgDuration/60)}m ${avgDuration%60}s` : "—"
  const currentHour = new Date().getHours()

  const statCards = [
    { label:"Calls Today",   value: callsToday,   suffix:"",   icon: Phone,       color: CY,  dim:"rgba(34,211,238,0.1)",  bdr:"rgba(34,211,238,0.22)",  trend:"+12% vs yesterday",    up:true  },
    { label:"Answer Rate",   value:`${resolved}%`,suffix:"",   icon: TrendingUp,  color: G,   dim:"rgba(0,212,113,0.1)",   bdr:"rgba(0,212,113,0.22)",   trend:"+3% vs yesterday",     up:true  },
    { label:"Missed",        value: missed,        suffix:"",   icon: PhoneMissed, color: RED, dim:"rgba(248,113,113,0.1)", bdr:"rgba(248,113,113,0.22)", trend:"-1 vs yesterday",      up:false },
    { label:"Avg Duration",  value: avgFmt,        suffix:"",   icon: Clock,       color: AM,  dim:"rgba(245,158,11,0.1)",  bdr:"rgba(245,158,11,0.22)",  trend:"2m 48s avg",           up:null  },
  ]

  return (
    <>
      <style>{kf}</style>
      <TopBar title="Dashboard" subtitle="Live overview · your AI receptionist" />

      <main style={{ padding: "20px 24px 32px", display:"flex", flexDirection:"column", gap:18 }}>

        {/* ── Status Banner ── */}
        <div
          style={{
            display:"flex", alignItems:"center", justifyContent:"space-between",
            padding:"14px 20px",
            background:"rgba(0,212,113,0.06)",
            border:"1px solid rgba(0,212,113,0.18)",
            borderRadius:16,
            boxShadow:"0 0 40px rgba(0,212,113,0.04)",
            animation:"db-fade .4s ease-out both",
          }}
        >
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <div style={{ position:"relative", width:10, height:10, flexShrink:0 }}>
              <div style={{ position:"absolute", inset:-1, borderRadius:"50%", background:G, opacity:.5, animation:"db-ping 2s cubic-bezier(0,0,.2,1) infinite" }} />
              <div style={{ width:10, height:10, borderRadius:"50%", background:G, position:"relative", animation:"db-pulse 1.8s ease-in-out infinite" }} />
            </div>
            <span style={{ fontSize:14, fontWeight:600, color:TX, letterSpacing:"-0.01em" }}>
              ARIA is <span style={{ color:G }}>LIVE</span> &mdash; your AI receptionist is answering every call
            </span>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:24, fontWeight:900, color:TX, letterSpacing:"-0.04em", fontVariantNumeric:"tabular-nums" }}>{callsToday}</span>
            <span style={{ fontSize:13, color:MT }}>calls handled today</span>
          </div>
        </div>

        {/* ── Stat Cards ── */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, animation:"db-fade .4s ease-out .08s both" }}>
          {statCards.map(({ label,value,icon:Icon,color,dim,bdr,trend,up }) => (
            <GlassCard
              key={label}
              style={{ padding:"20px 22px", cursor:"default", transition:"all .2s cubic-bezier(.16,1,.3,1)" }}
              className="db-stat-card"
            >
              <style>{`.db-stat-card:hover{transform:translateY(-2px);border-color:${CARD_BORDER}!important;box-shadow:0 12px 40px rgba(0,0,0,.35)}`}</style>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
                <div style={{ width:38, height:38, borderRadius:11, background:dim, border:`1px solid ${bdr}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Icon size={17} color={color} strokeWidth={2} />
                </div>
                <span style={{
                  fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:9999,
                  background: up===true?"rgba(0,212,113,0.1)":up===false?"rgba(248,113,113,0.1)":"rgba(245,158,11,0.1)",
                  color: up===true?G:up===false?RED:AM,
                  border:`1px solid ${up===true?"rgba(0,212,113,0.2)":up===false?"rgba(248,113,113,0.2)":"rgba(245,158,11,0.2)"}`,
                }}>
                  {trend}
                </span>
              </div>
              <div style={{ fontSize:36, fontWeight:900, color:TX, letterSpacing:"-0.04em", lineHeight:1, marginBottom:5, fontVariantNumeric:"tabular-nums" }}>{value}</div>
              <div style={{ fontSize:13, color:MT, fontWeight:500 }}>{label}</div>
            </GlassCard>
          ))}
        </div>

        {/* ── Main 2-col grid ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 0.44fr", gap:14, animation:"db-fade .4s ease-out .14s both" }}>

          {/* Left: Live Activity */}
          <GlassCard style={{ padding:"22px 22px", display:"flex", flexDirection:"column" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                <div style={{ position:"relative", width:8, height:8 }}>
                  <div style={{ position:"absolute", inset:-1, borderRadius:"50%", background:G, opacity:.5, animation:"db-ping 2s cubic-bezier(0,0,.2,1) infinite" }} />
                  <div style={{ width:8, height:8, borderRadius:"50%", background:G, position:"relative" }} />
                </div>
                <span style={{ fontSize:13, fontWeight:700, color:TX }}>Live Activity</span>
              </div>
              <a href="/dashboard/calls" style={{ fontSize:12, color:MT, textDecoration:"none", display:"flex", alignItems:"center", gap:4, transition:"color .15s" }}
                onMouseEnter={e=>(e.currentTarget.style.color=TX)} onMouseLeave={e=>(e.currentTarget.style.color=MT)}>
                All calls <ArrowRight size={12} />
              </a>
            </div>

            {callsToday === 0 ? (
              /* ── Empty state ── */
              <div style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 0", textAlign:"center" }}>
                <div style={{ width:64, height:64, borderRadius:"50%", background:"rgba(0,212,113,0.08)", border:"1px solid rgba(0,212,113,0.18)", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                  <PhoneIncoming size={26} color={G} strokeWidth={1.6} />
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, color:TX, margin:"0 0 8px", letterSpacing:"-0.02em" }}>No calls yet today</h3>
                <p style={{ fontSize:13, color:MT, maxWidth:260, lineHeight:1.55, margin:"0 0 24px" }}>
                  Connect your Twilio number to start receiving calls through ARIA.
                </p>
                <a href="/dashboard/agent" style={{ display:"inline-flex", alignItems:"center", gap:8, background:G, color:"#000", borderRadius:9999, padding:"9px 20px", fontSize:13, fontWeight:700, textDecoration:"none" }}>
                  Configure Agent <ArrowRight size={13} />
                </a>
              </div>
            ) : (
              /* ── Call feed ── */
              <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
                {DEMO_CALLS.map((call,i)=>(
                  <div
                    key={i}
                    style={{
                      display:"flex", alignItems:"center", gap:12, padding:"11px 0",
                      borderBottom: i<DEMO_CALLS.length-1 ? `1px solid ${BD}` : "none",
                    }}
                  >
                    {/* Icon */}
                    <div style={{
                      width:34, height:34, borderRadius:10, flexShrink:0,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      background: call.type==="answered"?"rgba(0,212,113,0.1)":"rgba(248,113,113,0.1)",
                      border:`1px solid ${call.type==="answered"?"rgba(0,212,113,0.2)":"rgba(248,113,113,0.2)"}`,
                    }}>
                      {call.type==="answered"
                        ? <Phone     size={14} color={G}   strokeWidth={2} />
                        : <PhoneMissed size={14} color={RED} strokeWidth={2} />
                      }
                    </div>
                    {/* Info */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <p style={{ fontSize:13, fontWeight:600, color:TX, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {call.type==="answered" ? "Incoming call answered" : "Missed call"}
                      </p>
                      <p style={{ fontSize:12, color:MT, margin:"2px 0 0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
                        {call.label}{call.dur ? ` · ${call.dur}` : ""}
                      </p>
                    </div>
                    {/* Lang badge */}
                    {call.lang && (
                      <div style={{ background:"rgba(34,211,238,0.08)", border:"1px solid rgba(34,211,238,0.18)", borderRadius:6, padding:"2px 7px", fontSize:10, fontWeight:700, color:CY, flexShrink:0 }}>
                        {call.lang}
                      </div>
                    )}
                    <span style={{ fontSize:11, color:"rgba(136,146,164,0.5)", flexShrink:0 }}>{call.time}</span>
                  </div>
                ))}
              </div>
            )}
          </GlassCard>

          {/* Right: System Status */}
          <GlassCard style={{ padding:"22px", display:"flex", flexDirection:"column" }}>
            <h2 style={{ fontSize:13, fontWeight:700, color:TX, margin:"0 0 18px" }}>System Status</h2>

            <div style={{ display:"flex", flexDirection:"column", gap:0, flex:1 }}>
              {[
                { label:"Voice Agent",    dot:G,   status: callsToday>0?"Active":"Not configured", href: callsToday===0?"/dashboard/agent":undefined },
                { label:"SMS Inbox",      dot:G,   status:"Active",                                href:undefined },
                { label:"Knowledge Base", dot:CY,  status:"Ready",                                 href:undefined },
                { label:"Business Hours", dot:AM,  status:"Configure",                             href:"/dashboard/agent" },
                { label:"Spam Guard",     dot:G,   status:"Active · 0 blocked",                    href:undefined },
              ].map(({ label,dot,status,href },i,arr)=>(
                <div
                  key={label}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom: i<arr.length-1 ? `1px solid ${BD}` : "none" }}
                >
                  <span style={{ fontSize:12, color:MT }}>{label}</span>
                  <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:6, height:6, borderRadius:"50%", background:dot, animation:"db-pulse 1.8s ease-in-out infinite" }} />
                    {href
                      ? <a href={href} style={{ fontSize:12, fontWeight:600, color:dot, textDecoration:"none" }}>{status}</a>
                      : <span style={{ fontSize:12, fontWeight:600, color:dot }}>{status}</span>
                    }
                  </div>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{ marginTop:18, paddingTop:16, borderTop:`1px solid ${BD}` }}>
              <p style={{ fontSize:10, fontWeight:700, color:"rgba(136,146,164,.38)", textTransform:"uppercase", letterSpacing:"0.08em", margin:"0 0 12px" }}>Quick Actions</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {[
                  { label:"View All Calls", href:"/dashboard/calls", color:CY },
                  { label:"Train Knowledge Base", href:"/dashboard/agent", color:G },
                ].map(({ label,href,color })=>(
                  <a
                    key={label}
                    href={href}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"space-between",
                      padding:"9px 13px", borderRadius:11, textDecoration:"none",
                      background:"rgba(255,255,255,0.03)",
                      border:`1px solid ${BD}`,
                      fontSize:12, fontWeight:600, color:TX,
                      transition:"all .15s",
                    }}
                    onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor=`rgba(255,255,255,0.12)` }}
                    onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor=BD }}
                  >
                    {label}
                    <ArrowRight size={12} color={color} />
                  </a>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>

        {/* ── Call Volume Chart + ARIA Insights ── */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 0.44fr", gap:14, animation:"db-fade .4s ease-out .20s both" }}>

          {/* Call Volume Bar Chart */}
          <GlassCard style={{ padding:"22px 24px" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:24 }}>
              <div>
                <h2 style={{ fontSize:13, fontWeight:700, color:TX, margin:"0 0 3px" }}>Call Volume</h2>
                <p style={{ fontSize:12, color:MT, margin:0 }}>Hourly distribution — today</p>
              </div>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:MT }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:G }} />
                  Answered
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, color:MT }}>
                  <div style={{ width:8, height:8, borderRadius:2, background:"rgba(255,255,255,0.12)" }} />
                  Quiet
                </div>
              </div>
            </div>

            {/* Bars */}
            <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:80, marginBottom:10 }}>
              {HOURLY.map((val,h)=>{
                const pct = val / H_MAX
                const isNow = h === currentHour
                const isPast = h < currentHour
                const height = Math.max(pct * 80, 3)
                return (
                  <div
                    key={h}
                    title={`${h}:00 — ${val} calls`}
                    style={{
                      flex:1, height:`${height}px`, borderRadius:"3px 3px 2px 2px",
                      background: isNow
                        ? G
                        : isPast && val > 0
                        ? `rgba(0,212,113,${0.2 + pct * 0.45})`
                        : "rgba(255,255,255,0.07)",
                      boxShadow: isNow ? `0 0 12px rgba(0,212,113,0.5)` : undefined,
                      transition:"height .3s cubic-bezier(.16,1,.3,1)",
                    }}
                  />
                )
              })}
            </div>
            {/* Hour labels */}
            <div style={{ display:"flex", justifyContent:"space-between", paddingTop:4 }}>
              {["12a","3a","6a","9a","12p","3p","6p","9p","12a"].map(l=>(
                <span key={l} style={{ fontSize:10, color:"rgba(136,146,164,0.4)", fontVariantNumeric:"tabular-nums" }}>{l}</span>
              ))}
            </div>

            {/* Summary row */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginTop:20, paddingTop:16, borderTop:`1px solid ${BD}` }}>
              {[
                { label:"Peak hour",      value:"10 AM",  color:TX  },
                { label:"Total today",    value:callsToday.toString(), color:TX },
                { label:"Answer rate",    value:`${resolved||0}%`, color:G  },
              ].map(s=>(
                <div key={s.label} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:18, fontWeight:800, color:s.color, letterSpacing:"-0.03em", fontVariantNumeric:"tabular-nums" }}>{s.value}</div>
                  <div style={{ fontSize:11, color:MT, marginTop:3 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* ARIA Insights */}
          <GlassCard style={{ padding:"22px", background:"rgba(0,212,113,0.04)", borderColor:"rgba(0,212,113,0.14)", display:"flex", flexDirection:"column", gap:18 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <div style={{ width:28, height:28, borderRadius:8, background:"rgba(0,212,113,0.12)", border:"1px solid rgba(0,212,113,0.2)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <Zap size={13} color={G} fill={G} />
                </div>
                <span style={{ fontSize:13, fontWeight:700, color:TX }}>ARIA Insights</span>
              </div>
              <p style={{ fontSize:12, color:MT, margin:0, lineHeight:1.55 }}>
                Every call makes your AI smarter. Train with your FAQs, menus, or documents.
              </p>
            </div>

            {/* Stats */}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[
                { label:"Training items", value:"0",    note:"Add your first →", href:"/dashboard/agent", color:AM },
                { label:"Languages",      value:"36",   note:"auto-detected",     href:undefined,          color:G  },
                { label:"Uptime",         value:"99.9%",note:"this month",         href:undefined,          color:G  },
              ].map(({ label,value,note,href,color })=>(
                <div
                  key={label}
                  style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 13px", background:"rgba(255,255,255,0.03)", border:`1px solid ${BD}`, borderRadius:12 }}
                >
                  <div>
                    <div style={{ fontSize:18, fontWeight:800, color, letterSpacing:"-0.03em", lineHeight:1 }}>{value}</div>
                    <div style={{ fontSize:11, color:MT, marginTop:3 }}>{label}</div>
                  </div>
                  {href
                    ? <a href={href} style={{ fontSize:11, color:AM, fontWeight:600, textDecoration:"none", display:"flex", alignItems:"center", gap:4 }}>{note} <ArrowRight size={10} /></a>
                    : <span style={{ fontSize:11, color:"rgba(136,146,164,.4)" }}>{note}</span>
                  }
                </div>
              ))}
            </div>

            <a
              href="/dashboard/agent"
              style={{
                display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                background:G, color:"#000", borderRadius:12, padding:"11px",
                fontSize:13, fontWeight:700, textDecoration:"none",
                transition:"all .15s", boxShadow:"0 4px 24px rgba(0,212,113,0.2)",
                marginTop:"auto",
              }}
              onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 32px rgba(0,212,113,0.35)"; e.currentTarget.style.transform="translateY(-1px)" }}
              onMouseLeave={e=>{ e.currentTarget.style.boxShadow="0 4px 24px rgba(0,212,113,0.2)"; e.currentTarget.style.transform="translateY(0)" }}
            >
              <BookOpen size={14} />
              Add to Knowledge Base
            </a>
          </GlassCard>
        </div>

      </main>
    </>
  )
}
