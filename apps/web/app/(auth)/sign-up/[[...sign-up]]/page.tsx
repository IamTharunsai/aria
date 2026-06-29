import { SignUp } from "@clerk/nextjs"
import { Zap } from "lucide-react"

export default function SignUpPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ background: "#07070F" }}
    >
      <div className="mb-6 flex flex-col items-center gap-3">
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #6366F1 0%, #22D3EE 100%)", boxShadow: "0 8px 32px rgba(99,102,241,0.4)" }}
        >
          <Zap size={22} className="text-white" fill="white" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white tracking-tight">Start with ARIA free</h1>
          <p className="text-sm mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
            Set up your AI voice receptionist in 5 minutes
          </p>
        </div>
      </div>

      <SignUp
        forceRedirectUrl="/dashboard/onboarding"
        appearance={{
          elements: {
            headerTitle: { display: "none" },
            headerSubtitle: { display: "none" },
            card: {
              borderRadius: "20px",
              boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
              margin: "0 auto",
            },
          },
        }}
      />
    </div>
  )
}
