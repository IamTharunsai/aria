"use client"
import { TopBar } from "@/components/layout/TopBar"
import { SignUpButton } from "@clerk/nextjs"
import { api } from "@/lib/trpc"
import { Check, Zap, Building2, Rocket } from "lucide-react"

const PLANS = [
  {
    id: "STARTER",
    name: "Starter",
    price: 97,
    icon: <Zap size={20} />,
    tagline: "1 location · 500 min/mo",
    features: ["1 AI voice agent", "500 minutes/month", "SMS & WhatsApp inbox", "Knowledge base (50 items)", "Basic analytics", "Email support"],
    color: "#1447E6",
  },
  {
    id: "PRO",
    name: "Pro",
    price: 197,
    icon: <Rocket size={20} />,
    tagline: "3 locations · 2,000 min/mo",
    features: ["3 AI voice agents", "2,000 minutes/month", "Full omnichannel inbox", "Unlimited knowledge base", "Advanced analytics & sentiment", "Outbound campaigns", "Priority support"],
    color: "#0EA5E9",
    highlight: true,
  },
  {
    id: "AGENCY",
    name: "Agency",
    price: 497,
    icon: <Building2 size={20} />,
    tagline: "Unlimited locations · 10k min/mo",
    features: ["Unlimited locations", "10,000 minutes/month", "White-label dashboard", "API access", "Custom integrations", "Dedicated account manager", "SLA 99.9% uptime"],
    color: "#A78BFA",
  },
]

export default function BillingPage() {
  const { data: billing } = api.settings.billing.useQuery()
  const currentPlan = billing?.plan ?? "STARTER"

  return (
    <>
      <TopBar title="Billing" subtitle="Manage your subscription and usage" />
      <main className="flex-1 overflow-auto p-6" style={{ background: "#F7F9FC" }}>

        {/* Current usage card */}
        {billing && (
          <div className="mb-8 p-6 rounded-2xl bg-white" style={{ border: "1px solid #E5E7EB" }}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-xs font-medium mb-1" style={{ color: "#6B7280" }}>Current plan</p>
                <p className="text-xl font-black" style={{ color: "#0D1117" }}>
                  {currentPlan.charAt(0) + currentPlan.slice(1).toLowerCase()}
                </p>
              </div>
              {billing.renewsAt && (
                <p className="text-sm" style={{ color: "#9CA3AF" }}>
                  Renews {new Date(billing.renewsAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              )}
            </div>
            {/* Usage bar */}
            <div className="mb-2 flex justify-between text-xs" style={{ color: "#6B7280" }}>
              <span>Minutes used</span>
              <span>{billing.minutesUsed} / {billing.minutesLimit} min</span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: "#F0F2F5" }}>
              <div className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min(100, (billing.minutesUsed / billing.minutesLimit) * 100)}%`,
                  background: billing.minutesUsed / billing.minutesLimit > 0.85
                    ? "linear-gradient(to right,#EF4444,#F97316)"
                    : "linear-gradient(to right,#1447E6,#0EA5E9)",
                }} />
            </div>
          </div>
        )}

        {/* Plan cards */}
        <h2 className="text-lg font-bold mb-4" style={{ color: "#0D1117" }}>Plans</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {PLANS.map(plan => {
            const isCurrent = plan.id === currentPlan
            return (
              <div key={plan.id}
                className="relative flex flex-col rounded-3xl p-6 transition-all duration-200"
                style={{
                  background: plan.highlight ? "linear-gradient(135deg,rgba(20,71,230,0.04),rgba(14,165,233,0.04))" : "#fff",
                  border: isCurrent ? `2px solid ${plan.color}` : "1px solid #E5E7EB",
                  boxShadow: isCurrent ? `0 0 0 4px ${plan.color}18` : "none",
                }}>
                {isCurrent && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white"
                      style={{ background: plan.color }}>
                      Current plan
                    </span>
                  </div>
                )}
                {plan.highlight && !isCurrent && (
                  <div className="absolute -top-3 left-6">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold text-white"
                      style={{ background: "#0EA5E9" }}>
                      Most popular
                    </span>
                  </div>
                )}
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center text-white mb-4"
                  style={{ background: `${plan.color}20`, color: plan.color }}>
                  {plan.icon}
                </div>
                <p className="text-base font-bold mb-1" style={{ color: "#0D1117" }}>{plan.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-black" style={{ color: "#0D1117" }}>${plan.price}</span>
                  <span className="text-sm" style={{ color: "#9CA3AF" }}>/mo</span>
                </div>
                <p className="text-xs mb-5" style={{ color: "#9CA3AF" }}>{plan.tagline}</p>
                <ul className="space-y-2 flex-1 mb-6">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#374151" }}>
                      <Check size={14} className="mt-0.5 flex-shrink-0" style={{ color: plan.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                {isCurrent ? (
                  <div className="w-full py-3 rounded-2xl text-center text-sm font-semibold"
                    style={{ background: `${plan.color}12`, color: plan.color }}>
                    Your current plan
                  </div>
                ) : (
                  <SignUpButton>
                    <button className="w-full py-3 rounded-2xl text-sm font-semibold text-white cursor-pointer transition-all"
                      style={{ background: plan.color }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)" }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)" }}>
                      {plan.price > (PLANS.find(p => p.id === currentPlan)?.price ?? 0) ? "Upgrade" : "Switch"} to {plan.name}
                    </button>
                  </SignUpButton>
                )}
              </div>
            )
          })}
        </div>

        {/* Invoice history placeholder */}
        <div className="mt-8 p-6 rounded-2xl bg-white" style={{ border: "1px solid #E5E7EB" }}>
          <p className="text-sm font-semibold mb-4" style={{ color: "#0D1117" }}>Invoice history</p>
          <p className="text-sm" style={{ color: "#9CA3AF" }}>
            Invoices will appear here once billing is active. For billing support, contact{" "}
            <a href="mailto:billing@aria.ai" className="underline" style={{ color: "#1447E6" }}>billing@aria.ai</a>
          </p>
        </div>
      </main>
    </>
  )
}
