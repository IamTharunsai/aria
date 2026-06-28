"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, Volume2, X, Zap } from "lucide-react"

const DEMO_SCRIPT = `Hello! I'm ARIA, your AI voice receptionist. I'm available 24 hours a day, 7 days a week, so you never miss a customer call again. I can book appointments, answer questions about your business, handle multiple callers at once, and even send follow-up text messages. I speak naturally, understand context, and I learn everything about your business from the knowledge base you give me. Setup takes just 5 minutes — no technical knowledge required. I'm currently serving businesses in healthcare, restaurants, legal, and many more industries. With plans starting at just $97 per month, I'm more affordable than a part-time receptionist. Want to get started? Click the button below to try ARIA free today.`

export default function VoiceDemo() {
  const [speaking, setSpeaking] = useState(false)
  const [supported, setSupported] = useState(true)
  const [dismissed, setDismissed] = useState(false)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !window.speechSynthesis) {
      setSupported(false)
      return
    }
    synthRef.current = window.speechSynthesis
    return () => { synthRef.current?.cancel() }
  }, [])

  function startDemo() {
    if (!synthRef.current || !supported) return
    synthRef.current.cancel()
    const utt = new SpeechSynthesisUtterance(DEMO_SCRIPT)
    // Prefer a clear English voice
    const voices = synthRef.current.getVoices()
    const pick = voices.find(v =>
      v.name.includes("Samantha") ||
      v.name.includes("Google US English") ||
      (v.lang === "en-US" && v.localService)
    ) ?? voices.find(v => v.lang.startsWith("en"))
    if (pick) utt.voice = pick
    utt.rate = 1.05
    utt.pitch = 1.0
    utt.onstart = () => setSpeaking(true)
    utt.onend = () => setSpeaking(false)
    utt.onerror = () => setSpeaking(false)
    utterRef.current = utt
    synthRef.current.speak(utt)
  }

  function stopDemo() {
    synthRef.current?.cancel()
    setSpeaking(false)
  }

  if (!supported || dismissed) return null

  return (
    <>
      <style>{`
        @keyframes vd-bar {
          0%, 100% { transform: scaleY(0.3); opacity: 0.5; }
          50%       { transform: scaleY(1);   opacity: 1; }
        }
        @keyframes vd-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(99,102,241,0.3); }
          50%       { box-shadow: 0 0 40px rgba(99,102,241,0.6), 0 0 60px rgba(34,211,238,0.2); }
        }
        @keyframes vd-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.05); }
        }
        .vd-badge { animation: vd-pulse 2s ease-in-out infinite; }
        .vd-glow  { animation: vd-glow 2s ease-in-out infinite; }
      `}</style>

      <div
        className={speaking ? "vd-glow" : ""}
        style={{
          position: "fixed", bottom: 24, right: 24, zIndex: 9999,
          background: "rgba(10,10,22,0.97)", backdropFilter: "blur(24px)",
          border: `1px solid ${speaking ? "rgba(99,102,241,0.5)" : "rgba(99,102,241,0.25)"}`,
          borderRadius: 20, padding: "20px 22px 18px", width: 288,
          boxShadow: "0 24px 64px rgba(0,0,0,0.7)",
          transition: "border-color 0.3s",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Dismiss */}
        <button
          onClick={() => { stopDemo(); setDismissed(true) }}
          aria-label="Close"
          style={{ position: "absolute", top: 10, right: 10, background: "none", border: "none", color: "rgba(241,245,249,0.35)", cursor: "pointer", padding: 4, lineHeight: 1 }}
        >
          <X size={14} />
        </button>

        {/* Live badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 14 }}>
          <div className="vd-badge" style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)", borderRadius: 100, padding: "4px 10px" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: speaking ? "#22D3EE" : "#6366F1", boxShadow: speaking ? "0 0 8px #22D3EE" : "0 0 6px #6366F1" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#818CF8", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {speaking ? "Speaking" : "AI Demo"}
            </span>
          </div>
        </div>

        {/* Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: speaking ? 14 : 18 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, flexShrink: 0,
            background: speaking ? "linear-gradient(135deg,#6366F1,#22D3EE)" : "rgba(99,102,241,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "all 0.4s",
            boxShadow: speaking ? "0 4px 24px rgba(99,102,241,0.5)" : "none",
          }}>
            {speaking
              ? <Volume2 size={22} color="#fff" />
              : <Zap size={22} color="#6366F1" fill="#6366F1" />}
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "#F1F5F9", lineHeight: 1.3 }}>ARIA</div>
            <div style={{ fontSize: 12, color: "#64748B", marginTop: 2 }}>AI Receptionist Demo</div>
          </div>
        </div>

        {/* Waveform */}
        {speaking && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 3, height: 40, marginBottom: 14 }}>
            {[12, 20, 28, 36, 44, 36, 28, 40, 32, 24, 18, 30, 22, 16].map((h, i) => (
              <div key={i} style={{
                width: 3, borderRadius: 3,
                background: "linear-gradient(to top,#6366F1,#22D3EE)",
                height: h,
                transformOrigin: "bottom",
                animation: `vd-bar ${0.6 + (i % 4) * 0.15}s ease-in-out ${i * 0.06}s infinite`,
              }} />
            ))}
          </div>
        )}

        {/* Message when not speaking */}
        {!speaking && (
          <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 14px", lineHeight: 1.5 }}>
            Hear how ARIA sounds on a real call. Click play for a 30-second demo.
          </p>
        )}

        {/* CTA */}
        <button
          onClick={speaking ? stopDemo : startDemo}
          style={{
            width: "100%", padding: "11px 0", borderRadius: 100,
            background: speaking
              ? "rgba(244,63,94,0.1)"
              : "linear-gradient(135deg,#6366F1 0%,#818CF8 100%)",
            color: speaking ? "#F87171" : "#fff",
            border: speaking ? "1px solid rgba(244,63,94,0.25)" : "none",
            fontSize: 14, fontWeight: 600, cursor: "pointer",
            letterSpacing: "0.01em", transition: "all 0.2s",
          }}
        >
          {speaking ? "■  Stop" : "▶  Play demo"}
        </button>
      </div>
    </>
  )
}
