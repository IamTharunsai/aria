import { SignUp } from "@clerk/nextjs"
import { Zap, Check } from "lucide-react"
import Link from "next/link"

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex"
      style={{ background: "#F8FAFC" }}
    >
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between p-12 w-[420px] flex-shrink-0"
        style={{ background: "#0F172A" }}
      >
        <div>
          <div className="flex items-center gap-3 mb-16">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg,#2563EB,#0EA5E9)" }}>
              <Zap size={18} className="text-white" fill="white" />
            </div>
            <span className="font-extrabold text-xl text-white tracking-tight">ARIA</span>
          </div>
          <h2 className="text-3xl font-bold text-white leading-snug mb-4" style={{ letterSpacing: "-0.03em" }}>
            Your best receptionist<br />never takes a day off.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 15, lineHeight: 1.65, marginBottom: 32 }}>
            Be live in 5 minutes. No hardware, no training, no credit card.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              "Answers every call in under 2 seconds",
              "Books appointments automatically",
              "Speaks 36 languages out of the box",
              "Costs less than a part-time receptionist",
            ].map(f=>(
              <div key={f} className="flex items-center gap-3">
                <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(37,99,235,0.2)", border: "1px solid rgba(37,99,235,0.4)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Check size={11} color="#3B82F6" />
                </div>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.55)" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
          Trusted by 500+ businesses in the US and India
        </p>
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
          <h1 className="font-bold mb-2" style={{ fontSize: 26, color: "#0F172A", letterSpacing: "-0.025em" }}>Start your free account</h1>
          <p className="mb-8" style={{ fontSize: 15, color: "#64748B" }}>No credit card required · Setup in 5 minutes</p>

          <SignUp
            forceRedirectUrl="/dashboard/onboarding"
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
                colorBackground: "#FFFFFF",
                colorInputBackground: "#F8FAFC",
                colorInputText: "#0F172A",
                borderRadius: "12px",
              },
            }}
          />

          <p className="mt-6 text-sm" style={{ color: "#94A3B8" }}>
            Already have an account?{" "}
            <Link href="/sign-in" style={{ color: "#2563EB", fontWeight: 600, textDecoration: "none" }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
