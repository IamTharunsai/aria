"use client"
import { Phone, X } from "lucide-react"

interface LiveCallBannerProps {
  callId?: string
  fromNumber?: string
  contactName?: string
  onDismiss?: () => void
}

export function LiveCallBanner({ callId, fromNumber, contactName, onDismiss }: LiveCallBannerProps) {
  if (!callId) return null

  return (
    <div
      style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"10px 20px",
        background:"rgba(0,212,113,0.08)",
        borderBottom:"1px solid rgba(0,212,113,0.2)",
        backdropFilter:"blur(12px)",
        WebkitBackdropFilter:"blur(12px)",
      }}
    >
      <style>{`
        @keyframes lcb-ping{75%,100%{transform:scale(2.2);opacity:0}}
        @keyframes lcb-wv{0%,100%{transform:scaleY(.3);opacity:.5}50%{transform:scaleY(1);opacity:1}}
        .lcb-wv{animation:lcb-wv 1.1s ease-in-out infinite;transform-origin:bottom}
        .lcb-wv:nth-child(1){animation-delay:.00s;height:8px}
        .lcb-wv:nth-child(2){animation-delay:.10s;height:14px}
        .lcb-wv:nth-child(3){animation-delay:.20s;height:18px}
        .lcb-wv:nth-child(4){animation-delay:.15s;height:12px}
        .lcb-wv:nth-child(5){animation-delay:.05s;height:10px}
      `}</style>

      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
        {/* Ping dot */}
        <div style={{ position:"relative", width:10, height:10, flexShrink:0 }}>
          <div style={{ position:"absolute", inset:-1, borderRadius:"50%", background:"#00D471", opacity:.5, animation:"lcb-ping 2s cubic-bezier(0,0,.2,1) infinite" }} />
          <div style={{ width:10, height:10, borderRadius:"50%", background:"#00D471", position:"relative" }} />
        </div>

        <Phone size={14} color="#00D471" strokeWidth={2} />

        {/* Mini waveform */}
        <div style={{ display:"flex", alignItems:"flex-end", gap:2, height:18 }}>
          {[0,1,2,3,4].map(i=>(
            <div key={i} className="lcb-wv" style={{ width:3, background:"#00D471", borderRadius:"2px 2px 1px 1px" }} />
          ))}
        </div>

        <span style={{ fontSize:13, fontWeight:600, color:"#F1F5F9" }}>
          Live call in progress
        </span>

        {contactName && (
          <>
            <span style={{ color:"rgba(136,146,164,.5)", fontSize:13 }}>·</span>
            <span style={{ fontSize:13, fontWeight:700, color:"#F1F5F9" }}>{contactName}</span>
          </>
        )}

        {fromNumber && (
          <span style={{ fontSize:12, color:"rgba(136,146,164,.6)" }}>{fromNumber}</span>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            width:28, height:28, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center",
            background:"transparent", border:"none", cursor:"pointer",
            color:"rgba(136,146,164,.6)", transition:"all .15s",
          }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.08)"; e.currentTarget.style.color="#F1F5F9" }}
          onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.color="rgba(136,146,164,.6)" }}
          aria-label="Dismiss"
        >
          <X size={13} />
        </button>
      )}
    </div>
  )
}
