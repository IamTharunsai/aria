"use client"
import { TopBar } from "@/components/layout/TopBar"
import { Settings, ShieldCheck, AlertTriangle, FileText } from "lucide-react"
import { api } from "@/lib/trpc"
import { useState, useEffect } from "react"

export default function SettingsPage() {
  const { data: org, isLoading } = api.settings.getOrg.useQuery()
  const setHipaaMode = api.settings.setHipaaMode.useMutation()

  const [hipaaEnabled, setHipaaEnabled] = useState(false)

  useEffect(() => {
    if (org?.hipaaMode !== undefined) {
      setHipaaEnabled(org.hipaaMode)
    }
  }, [org?.hipaaMode])

  const handleHipaaToggle = () => {
    const next = !hipaaEnabled
    setHipaaEnabled(next)
    setHipaaMode.mutate(next)
  }

  return (
    <>
      <TopBar title="Settings" subtitle="Organization, billing, and integration settings" />
      <main className="flex-1 p-6 space-y-6">

        {/* General placeholder */}
        <div
          className="rounded-2xl bg-white p-8 flex flex-col items-center justify-center text-center"
          style={{ border: "1px solid #E5E7EB", minHeight: "220px" }}
        >
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "rgba(107,114,128,0.08)" }}>
            <Settings size={24} style={{ color: "#6B7280" }} strokeWidth={1.8} />
          </div>
          <h3 className="text-base font-semibold mb-1" style={{ color: "#0D1117" }}>Settings</h3>
          <p className="text-sm max-w-xs" style={{ color: "#6B7280" }}>
            Organization settings, billing, and API integrations will be configured here.
          </p>
        </div>

        {/* Compliance & Privacy */}
        <div
          className="rounded-2xl bg-white p-6"
          style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
        >
          {/* Section header */}
          <div className="flex items-center gap-2.5 mb-5">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(20,71,230,0.08)" }}
            >
              <ShieldCheck size={17} style={{ color: "#1447E6" }} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-sm font-semibold" style={{ color: "#0D1117" }}>
                Compliance &amp; Privacy
              </h2>
              <p className="text-xs" style={{ color: "#6B7280" }}>
                Regulatory and data protection settings
              </p>
            </div>
          </div>

          <div style={{ borderTop: "1px solid #E5E7EB" }} className="pt-5 space-y-4">

            {/* HIPAA Mode toggle row */}
            <div className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm font-medium mb-0.5" style={{ color: "#0D1117" }}>
                  HIPAA Mode
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "#6B7280" }}>
                  {org?.businessType === "HEALTHCARE"
                    ? "Required for your healthcare business type. Enables encrypted storage and consent prompts."
                    : "Enable HIPAA-compliant handling of all call data and transcripts."}
                </p>
              </div>

              {/* Toggle */}
              <button
                onClick={handleHipaaToggle}
                disabled={isLoading || setHipaaMode.isPending}
                className="relative shrink-0 transition-all duration-200"
                style={{
                  width: "44px",
                  height: "24px",
                  borderRadius: "12px",
                  background: hipaaEnabled
                    ? "linear-gradient(135deg, #1447E6 0%, #0EA5E9 100%)"
                    : "#D1D5DB",
                  border: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading || setHipaaMode.isPending ? 0.6 : 1,
                }}
                aria-checked={hipaaEnabled}
                role="switch"
              >
                <span
                  className="absolute top-0.5 transition-all duration-200"
                  style={{
                    left: hipaaEnabled ? "22px" : "2px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.18)",
                  }}
                />
              </button>
            </div>

            {/* HIPAA enabled notice */}
            {hipaaEnabled && (
              <div
                className="rounded-xl px-4 py-3 flex items-start gap-3"
                style={{
                  background: "rgba(22,163,74,0.06)",
                  border: "1px solid rgba(22,163,74,0.2)",
                }}
              >
                <ShieldCheck
                  size={15}
                  className="shrink-0 mt-0.5"
                  style={{ color: "#16A34A" }}
                />
                <p className="text-xs leading-relaxed" style={{ color: "#166534" }}>
                  Transcripts and recordings will not be stored. Patient call data is encrypted.
                </p>
              </div>
            )}

            {/* BAA reminder */}
            <div
              className="rounded-xl px-4 py-3 flex items-start gap-3"
              style={{
                background: "rgba(245,158,11,0.06)",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              <FileText
                size={15}
                className="shrink-0 mt-0.5"
                style={{ color: "#D97706" }}
              />
              <p className="text-xs leading-relaxed" style={{ color: "#92400E" }}>
                <span className="font-medium">BAA Required:</span> Ensure you have a Business
                Associate Agreement (BAA) on file before handling protected health information.
              </p>
            </div>

          </div>
        </div>

      </main>
    </>
  )
}
