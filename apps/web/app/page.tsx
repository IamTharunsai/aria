"use client"

import { SignInButton, SignUpButton } from "@clerk/nextjs"
import {
  Zap, Phone, Globe, Calendar, MessageSquare, Shield, Users,
  Stethoscope, UtensilsCrossed, Scale, Home, Scissors, ShoppingBag,
  Hotel, Car, Wrench, TrendingUp, Rocket, Truck, GraduationCap,
  Building2, Heart, Check,
} from "lucide-react"

export default function MarketingPage() {
  return (
    <div style={{ background: "#060E1E", color: "#fff", fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }
        @keyframes float {
          0%, 100% { transform: perspective(1200px) rotateX(12deg) rotateY(-3deg) translateY(0px); }
          50%       { transform: perspective(1200px) rotateX(12deg) rotateY(-3deg) translateY(-8px); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .hero-content { animation: fadeUp 0.6s ease-out both; }
        .hero-content-delay1 { animation: fadeUp 0.6s ease-out 0.1s both; }
        .hero-content-delay2 { animation: fadeUp 0.6s ease-out 0.2s both; }
        .hero-content-delay3 { animation: fadeUp 0.6s ease-out 0.3s both; }
        .hero-content-delay4 { animation: fadeUp 0.6s ease-out 0.4s both; }
        .dashboard-float { animation: float 6s ease-in-out infinite; }
        .live-dot { animation: pulse-dot 1.5s ease-in-out infinite; }
        .nav-link { color: rgba(255,255,255,0.6); text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .nav-link:hover { color: #fff; }
        .feature-card { transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s; cursor: default; }
        .feature-card:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,0,0,0.2); border-color: #E5E7EB !important; }
        .industry-card { transition: border-color 0.2s, transform 0.2s; cursor: default; }
        .industry-card:hover { border-color: #1447E6 !important; transform: translateY(-2px); }
        .cta-primary { transition: transform 0.15s, box-shadow 0.15s; cursor: pointer; }
        .cta-primary:hover { transform: scale(1.02); }
        .cta-ghost { transition: background 0.15s; cursor: pointer; }
        .cta-ghost:hover { background: rgba(255,255,255,0.14) !important; }
        .stat-num {
          background: linear-gradient(135deg, #fff 0%, #93BBFF 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-text {
          background: linear-gradient(135deg, #1447E6, #0EA5E9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "sticky", top: 0, left: 0, right: 0, zIndex: 50,
        backdropFilter: "blur(20px)",
        background: "rgba(6,14,30,0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg,#1447E6,#0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={18} color="#fff" fill="#fff" />
            </div>
            <span style={{ fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.01em" }}>ARIA</span>
          </div>

          {/* Nav links — hidden on small screens via max-width check not possible in inline, use a wrapper */}
          <div className="hidden md:flex" style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#industries" className="nav-link">Industries</a>
          </div>

          {/* Right CTAs */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <SignInButton>
              <button className="nav-link" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "rgba(255,255,255,0.6)", padding: "6px 8px" }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}>
                Sign in
              </button>
            </SignInButton>
            <SignUpButton>
              <button className="cta-primary" style={{ background: "#1447E6", color: "#fff", border: "none", borderRadius: 9999, padding: "8px 20px", fontSize: 14, fontWeight: 600 }}>
                Get started free
              </button>
            </SignUpButton>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 40px", position: "relative", overflow: "hidden", background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(20,71,230,0.18) 0%, transparent 70%), #060E1E" }}>
        {/* Glow orbs */}
        <div style={{ position: "absolute", top: "-5%", left: "20%", width: 600, height: 600, borderRadius: "50%", background: "#1447E6", filter: "blur(180px)", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "-5%", width: 400, height: 400, borderRadius: "50%", background: "#0EA5E9", filter: "blur(120px)", opacity: 0.08, pointerEvents: "none" }} />

        {/* Center content */}
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 10 }}>
          {/* Pill badge */}
          <div className="hero-content" style={{ display: "inline-block", background: "rgba(20,71,230,0.15)", border: "1px solid rgba(20,71,230,0.3)", color: "#93BBFF", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 28 }}>
            🚀 Now available — AI voice receptionist for every business
          </div>

          {/* Headline */}
          <h1 className="hero-content-delay1" style={{ fontSize: "clamp(48px, 7vw, 72px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-0.03em", color: "#fff", margin: "0 0 24px" }}>
            Your Business<br />Never Misses{" "}
            <span style={{ background: "linear-gradient(135deg, #1447E6, #0EA5E9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              a Call
            </span>
          </h1>

          {/* Subheadline */}
          <p className="hero-content-delay2" style={{ fontSize: 20, color: "rgba(255,255,255,0.65)", maxWidth: 580, margin: "0 auto 36px", lineHeight: 1.6 }}>
            ARIA answers every inbound call, books appointments, handles FAQs, and routes customers — 24/7, in 36+ languages. No hold music. No missed revenue.
          </p>

          {/* CTA buttons */}
          <div className="hero-content-delay3" style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
            <SignUpButton>
              <button className="cta-primary" style={{ background: "#fff", color: "#060E1E", fontWeight: 700, borderRadius: 9999, padding: "16px 32px", fontSize: 16, border: "none" }}>
                Start free trial
              </button>
            </SignUpButton>
            <button className="cta-ghost" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: 9999, padding: "16px 32px", fontSize: 16 }}>
              Watch demo ▶
            </button>
          </div>

          {/* Trust bar */}
          <div className="hero-content-delay4" style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "6px 12px" }}>
            <span>Trusted by 500+ businesses</span>
            <span style={{ color: "#F59E0B" }}>★★★★★</span>
            {["Dental Plus", "GreenLeaf Restaurant", "Elite Legal", "QuickFix Auto", "Sunrise Salon"].map(n => (
              <span key={n} style={{ color: "rgba(255,255,255,0.25)", fontSize: 12 }}>{n}</span>
            ))}
          </div>
        </div>

        {/* 3D Dashboard Preview */}
        <div style={{ overflow: "hidden", maxWidth: 900, width: "100%", margin: "60px auto 0", position: "relative", zIndex: 10 }}>
          <div className="dashboard-float" style={{ background: "#0C1A32", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: 20, boxShadow: "0 80px 160px rgba(0,0,0,0.6), 0 0 100px rgba(20,71,230,0.2)", maxWidth: "90%", margin: "0 auto" }}>
            {/* Window chrome */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
              <span style={{ marginLeft: 12, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>ARIA Dashboard</span>
            </div>
            {/* Stat cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Calls Today", value: "47" },
                { label: "Answer Rate", value: "94%" },
                { label: "Avg Duration", value: "2m 34s" },
                { label: "Languages", value: "4 active" },
              ].map((s, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "10px 12px" }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{s.value}</div>
                </div>
              ))}
            </div>
            {/* Call activity */}
            <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 12, overflow: "hidden" }}>
              {[
                { dot: "#22C55E", num: "+1 (512) 555-0101", time: "Just now", status: "Answered" },
                { dot: "#F59E0B", num: "+1 (408) 555-0192", time: "2 min ago", status: "Voicemail" },
                { dot: "#1447E6", num: "+1 (650) 555-0183", time: "5 min ago", status: "Booked appt" },
              ].map((row, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", borderBottom: i < 2 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <div className="live-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: row.dot, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", flex: 1 }}>{row.num}</span>
                  <span style={{ fontSize: 11, color: row.dot, fontWeight: 600 }}>{row.status}</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{row.time}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Bottom fade */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, #060E1E, transparent)", pointerEvents: "none" }} />
        </div>
      </section>

      {/* ── STATS BAND ── */}
      <section style={{ background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {[
            { n: "98.7%", label: "Uptime guaranteed" },
            { n: "36+", label: "Languages supported" },
            { n: "500ms", label: "Average response time" },
            { n: "24/7", label: "Always available" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: "0 16px", borderRight: i < 3 ? "1px solid #E5E7EB" : "none" }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#060E1E", lineHeight: 1.1 }}>{s.n}</div>
              <div style={{ fontSize: 14, color: "#6B7280", marginTop: 6 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" style={{ background: "#F7F9FC", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-block", background: "rgba(20,71,230,0.08)", color: "#1447E6", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>What ARIA does</div>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#0D1117", margin: "0 0 16px", letterSpacing: "-0.02em" }}>Everything your business needs</h2>
            <p style={{ fontSize: 18, color: "#6B7280", maxWidth: 560, margin: "0 auto" }}>One AI handles every inbound touchpoint, so you can focus on the work that matters.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { icon: <Phone size={22} color="#1447E6" />, iconBg: "linear-gradient(135deg,rgba(20,71,230,0.15),rgba(20,71,230,0.05))", title: "Voice Intelligence", desc: "Natural conversation AI that understands context, accents, and intent. Powered by GPT-4 + Whisper." },
              { icon: <Globe size={22} color="#0EA5E9" />, iconBg: "linear-gradient(135deg,rgba(14,165,233,0.15),rgba(14,165,233,0.05))", title: "36+ Languages", desc: "Auto-detects caller language. Serves India's 22+ languages and all major US languages natively." },
              { icon: <Calendar size={22} color="#16A34A" />, iconBg: "linear-gradient(135deg,rgba(22,163,74,0.15),rgba(22,163,74,0.05))", title: "Smart Scheduling", desc: "Books appointments, sends SMS confirmations, and syncs with your calendar automatically." },
              { icon: <MessageSquare size={22} color="#A855F7" />, iconBg: "linear-gradient(135deg,rgba(168,85,247,0.15),rgba(168,85,247,0.05))", title: "SMS Follow-up", desc: "Sends call summaries, booking confirmations, and follow-ups via SMS automatically." },
              { icon: <Shield size={22} color="#EF4444" />, iconBg: "linear-gradient(135deg,rgba(239,68,68,0.15),rgba(239,68,68,0.05))", title: "Spam Shield", desc: "Detects and ends robocalls within 60 seconds. STIR/SHAKEN verified. Content safety built-in." },
              { icon: <Users size={22} color="#D97706" />, iconBg: "linear-gradient(135deg,rgba(217,119,6,0.15),rgba(217,119,6,0.05))", title: "Human Handoff", desc: "Seamlessly transfers to a human when needed. Caller never feels abandoned." },
            ].map((f, i) => (
              <div key={i} className="feature-card" style={{ background: "#fff", borderRadius: 24, padding: 24, border: "1px solid #E5E7EB" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: f.iconBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>{f.icon}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0D1117", margin: "0 0 8px" }}>{f.title}</h3>
                <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" style={{ background: "#fff", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 72 }}>
            <div style={{ display: "inline-block", background: "rgba(20,71,230,0.08)", color: "#1447E6", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Simple setup</div>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#0D1117", margin: 0, letterSpacing: "-0.02em" }}>Live in 5 minutes</h2>
          </div>
          {[
            { step: 1, icon: <Phone size={28} color="#1447E6" />, title: "Connect your number", desc: "Link your Twilio phone number in seconds. ARIA starts answering calls immediately.", align: "left" },
            { step: 2, icon: <GraduationCap size={28} color="#0EA5E9" />, title: "Train with your content", desc: "Paste your FAQ, upload your menu, or share your website. ARIA learns in minutes.", align: "right" },
            { step: 3, icon: <TrendingUp size={28} color="#16A34A" />, title: "Watch your business grow", desc: "See real-time analytics, call recordings, and performance insights in your dashboard.", align: "left" },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 48, flexDirection: i % 2 === 1 ? "row-reverse" : "row", marginBottom: i < 2 ? 64 : 0 }}>
              {/* Illustration side */}
              <div style={{ flex: 1, position: "relative", display: "flex", justifyContent: "center" }}>
                <div style={{ fontSize: 120, fontWeight: 900, lineHeight: 1, position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg, #1447E6, #0EA5E9)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", opacity: 0.12, userSelect: "none" }}>{s.step}</div>
                <div style={{ width: 100, height: 100, borderRadius: 28, background: "linear-gradient(135deg, rgba(20,71,230,0.1), rgba(14,165,233,0.05))", border: "1px solid rgba(20,71,230,0.15)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>{s.icon}</div>
              </div>
              {/* Text side */}
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1447E6", marginBottom: 8 }}>Step {s.step}</div>
                <h3 style={{ fontSize: 28, fontWeight: 800, color: "#0D1117", margin: "0 0 12px", letterSpacing: "-0.01em" }}>{s.title}</h3>
                <p style={{ fontSize: 16, color: "#6B7280", lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" style={{ background: "#F7F9FC", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", background: "rgba(20,71,230,0.08)", color: "#1447E6", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Industries</div>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#0D1117", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Built for every type of business</h2>
            <p style={{ fontSize: 16, color: "#6B7280", maxWidth: 480, margin: "0 auto" }}>ARIA knows how to handle calls differently for each industry</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }}>
            {[
              { icon: <Stethoscope size={20} color="#1447E6" />, name: "Healthcare", desc: "Appointment scheduling & insurance FAQs" },
              { icon: <UtensilsCrossed size={20} color="#D97706" />, name: "Restaurant", desc: "Reservations, menu inquiries, takeout" },
              { icon: <Scale size={20} color="#6B7280" />, name: "Legal", desc: "Lead intake & consultation booking" },
              { icon: <Home size={20} color="#16A34A" />, name: "Real Estate", desc: "Listing info & showing bookings" },
              { icon: <Scissors size={20} color="#A855F7" />, name: "Salon", desc: "Stylist scheduling & services" },
              { icon: <ShoppingBag size={20} color="#EF4444" />, name: "Retail", desc: "Store hours, stock & returns" },
              { icon: <Hotel size={20} color="#0EA5E9" />, name: "Hotel", desc: "Reservations & guest requests" },
              { icon: <Car size={20} color="#F59E0B" />, name: "Auto", desc: "Service scheduling & quotes" },
              { icon: <Wrench size={20} color="#64748B" />, name: "Home Services", desc: "Booking & dispatch routing" },
              { icon: <TrendingUp size={20} color="#16A34A" />, name: "Finance", desc: "Lead capture & appointments" },
              { icon: <Rocket size={20} color="#1447E6" />, name: "Startup", desc: "Sales & support at scale" },
              { icon: <Truck size={20} color="#D97706" />, name: "Transport", desc: "Dispatch & booking" },
              { icon: <GraduationCap size={20} color="#A855F7" />, name: "Education", desc: "Enrollment & FAQs" },
              { icon: <Building2 size={20} color="#6B7280" />, name: "Government", desc: "Citizen services & routing" },
              { icon: <Heart size={20} color="#EF4444" />, name: "Religious", desc: "Events, donations & outreach" },
            ].map((ind, i) => (
              <div key={i} className="industry-card" style={{ background: "#fff", borderRadius: 16, padding: 16, border: "1px solid #E5E7EB" }}>
                <div style={{ marginBottom: 10 }}>{ind.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1117", marginBottom: 4 }}>{ind.name}</div>
                <div style={{ fontSize: 12, color: "#9CA3AF", lineHeight: 1.4 }}>{ind.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" style={{ background: "#060E1E", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <div style={{ display: "inline-block", background: "rgba(20,71,230,0.15)", color: "#93BBFF", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16, border: "1px solid rgba(20,71,230,0.3)" }}>Pricing</div>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#fff", margin: "0 0 12px", letterSpacing: "-0.02em" }}>Simple, transparent pricing</h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,0.5)", maxWidth: 440, margin: "0 auto" }}>No per-call fees. No hidden costs. Cancel anytime.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "start" }}>
            {/* Starter */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Starter</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: "#fff" }}>$97</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>/mo</span>
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>1 location, 500 min/mo</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {["1 AI agent", "500 minutes/month", "SMS inbox", "50 KB items", "Analytics", "Email support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                    <Check size={15} color="#1447E6" />
                    {f}
                  </div>
                ))}
              </div>
              <SignUpButton>
                <button className="cta-primary" style={{ width: "100%", background: "rgba(20,71,230,0.2)", color: "#93BBFF", border: "1px solid rgba(20,71,230,0.3)", borderRadius: 12, padding: "12px 0", fontSize: 15, fontWeight: 600 }}>
                  Get started
                </button>
              </SignUpButton>
            </div>

            {/* Pro — highlighted */}
            <div style={{ background: "rgba(20,71,230,0.1)", border: "1px solid #1447E6", borderRadius: 24, padding: 32, position: "relative" }}>
              <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#1447E6", color: "#fff", borderRadius: 100, padding: "4px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>MOST POPULAR</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#93BBFF", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Pro</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: "#fff" }}>$197</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>/mo</span>
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>3 locations, 2,000 min/mo</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {["3 AI agents", "2,000 minutes/month", "Omnichannel inbox", "Unlimited KB", "Advanced analytics", "Outbound campaigns", "Priority support"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.8)" }}>
                    <Check size={15} color="#0EA5E9" />
                    {f}
                  </div>
                ))}
              </div>
              <SignUpButton>
                <button className="cta-primary" style={{ width: "100%", background: "linear-gradient(135deg,#1447E6,#0EA5E9)", color: "#fff", border: "none", borderRadius: 12, padding: "12px 0", fontSize: 15, fontWeight: 700 }}>
                  Start Pro trial
                </button>
              </SignUpButton>
            </div>

            {/* Agency */}
            <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 24, padding: 32 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Agency</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 4 }}>
                <span style={{ fontSize: 48, fontWeight: 900, color: "#fff" }}>$497</span>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)" }}>/mo</span>
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", marginBottom: 28 }}>Unlimited locations, 10k min/mo</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                {["Unlimited locations", "White-label dashboard", "API access", "Custom integrations", "Dedicated account manager", "99.9% SLA"].map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
                    <Check size={15} color="#1447E6" />
                    {f}
                  </div>
                ))}
              </div>
              <SignUpButton>
                <button className="cta-primary" style={{ width: "100%", background: "rgba(20,71,230,0.2)", color: "#93BBFF", border: "1px solid rgba(20,71,230,0.3)", borderRadius: 12, padding: "12px 0", fontSize: 15, fontWeight: 600 }}>
                  Talk to sales
                </button>
              </SignUpButton>
            </div>
          </div>
          <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.3)", marginTop: 24 }}>All plans include 14-day free trial · Cancel anytime · Prices in USD</p>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section style={{ background: "#fff", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <div style={{ display: "inline-block", background: "rgba(20,71,230,0.08)", color: "#1447E6", borderRadius: 100, padding: "6px 16px", fontSize: 13, fontWeight: 600, marginBottom: 16 }}>Testimonials</div>
            <h2 style={{ fontSize: 40, fontWeight: 900, color: "#0D1117", margin: 0, letterSpacing: "-0.02em" }}>Businesses love ARIA</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {[
              { quote: "We went from missing 30% of our calls to zero missed calls. ARIA paid for itself in the first week.", name: "Maria C.", role: "Restaurant Owner" },
              { quote: "Our legal intake is now fully automated. Clients get instant responses at 2am and we close more retainers.", name: "James T.", role: "Law Firm Partner" },
              { quote: "As an agency owner managing 12 locations, ARIA saved us 3 FTE positions. The ROI is insane.", name: "Priya S.", role: "Agency Owner" },
            ].map((t, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 24, padding: 28 }}>
                <div style={{ color: "#F59E0B", fontSize: 18, marginBottom: 16 }}>★★★★★</div>
                <p style={{ fontSize: 15, color: "#374151", lineHeight: 1.65, margin: "0 0 20px" }}>"{t.quote}"</p>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#0D1117" }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: "#9CA3AF" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "#060E1E", padding: "96px 24px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "#1447E6", filter: "blur(200px)", opacity: 0.12, pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 10, maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontSize: 48, fontWeight: 900, color: "#fff", margin: "0 0 16px", letterSpacing: "-0.03em" }}>
            Ready to never miss a call?
          </h2>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.55)", margin: "0 0 36px", lineHeight: 1.6 }}>
            Join 500+ businesses. Set up in 5 minutes. Cancel anytime.
          </p>
          <SignUpButton>
            <button className="cta-primary" style={{ background: "#fff", color: "#060E1E", fontWeight: 700, borderRadius: 9999, padding: "18px 40px", fontSize: 17, border: "none" }}>
              Start your free 14-day trial →
            </button>
          </SignUpButton>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#060E1E", borderTop: "1px solid rgba(255,255,255,0.07)", padding: "56px 24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
            {/* About */}
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#1447E6,#0EA5E9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Zap size={16} color="#fff" fill="#fff" />
                </div>
                <span style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>ARIA</span>
              </div>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, maxWidth: 240 }}>AI voice receptionist that answers every call, books appointments, and grows your business 24/7.</p>
            </div>
            {/* Product */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Product</div>
              {["Dashboard", "Features", "Pricing", "API"].map(l => (
                <a key={l} href="#" style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 10 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {l}
                </a>
              ))}
            </div>
            {/* Resources */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Resources</div>
              {["Documentation", "Blog", "Support", "Status"].map(l => (
                <a key={l} href="#" style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 10 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {l}
                </a>
              ))}
            </div>
            {/* Legal */}
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.4)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Legal</div>
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                <a key={l} href="#" style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.5)", textDecoration: "none", marginBottom: 10 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>
                  {l}
                </a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)", paddingTop: 24, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>© 2026 ARIA. All rights reserved.</span>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>Built with ❤️ for SMBs everywhere.</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
