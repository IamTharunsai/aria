import { SignIn } from "@clerk/nextjs"
import { Zap } from "lucide-react"
import Link from "next/link"

export default function SignInPage() {
  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#F8FAFC" }}
    >
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 w-[420px] flex-shrink-0"
        style={{ background: "#2563EB" }}
      >
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">ARIA</span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-snug mb-4" style={{ letterSpacing: "-0.03em" }}>
            Every call answered.<br />Every booking captured.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, lineHeight: 1.65 }}>
            Your AI receptionist never takes a day off. Sign in to see what ARIA has been handling for you.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { num: "94%",  label: "calls answered in under 2 seconds" },
            { num: "3.2×", label: "more bookings vs voicemail" },
            { num: "24/7", label: "always on, zero downtime" },
          ].map(s=>(
            <div key={s.num} className="flex items-center gap-4">
              <div style={{ fontSize: 24, fontWeight: 900, color: "rgba(255,255,255,0.9)", letterSpacing: "-0.04em", minWidth: 52 }}>{s.num}</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Mobile logo */}
        <div className="lg:hidden flex items-center gap-3 mb-10">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#0EA5E9)", boxShadow: "0 4px 14px rgba(37,99,235,.28)" }}>
            <Zap size={18} className="text-white" fill="white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight" style={{ color: "#0F172A" }}>ARIA</span>
        </div>

        <div style={{ maxWidth: 420, width: "100%", textAlign: "center" }}>
          <h1 className="font-bold mb-2" style={{ fontSize: 26, color: "#0F172A", letterSpacing: "-0.025em" }}>Welcome back</h1>
          <p className="mb-8" style={{ fontSize: 15, color: "#64748B" }}>Sign in to your ARIA dashboard</p>

          <SignIn
            forceRedirectUrl="/dashboard"
            appearance={{
              elements: {
                headerTitle:    { display: "none" },
                headerSubtitle: { display: "none" },
                card: {
                  borderRadius: "16px",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                  border: "1px solid #E2E8F0",
                  backgroundColor: "#FFFFFF",
                },
              },
              variables: {
                colorPrimary: "#2563EB",
                colorBackground: "#F8FAFC",
                borderRadius: "12px",
              },
            }}
          />

          <p className="mt-6 text-sm" style={{ color: "#94A3B8" }}>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>
              Start free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
