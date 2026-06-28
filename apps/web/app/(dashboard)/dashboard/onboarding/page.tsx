"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { api } from "@/lib/trpc"
import {
  Stethoscope,
  UtensilsCrossed,
  Scissors,
  Scale,
  Home,
  GraduationCap,
  ShoppingBag,
  Hotel,
  Car,
  Wrench,
  TrendingUp,
  Rocket,
  Building2,
  Heart,
  Truck,
  Zap,
  AlertTriangle,
} from "lucide-react"

type BusinessType =
  | "HEALTHCARE"
  | "RESTAURANT"
  | "SALON"
  | "LEGAL"
  | "REAL_ESTATE"
  | "EDUCATION"
  | "RETAIL"
  | "HOSPITALITY"
  | "AUTOMOTIVE"
  | "HOME_SERVICES"
  | "FINANCE"
  | "STARTUP"
  | "GOVERNMENT"
  | "RELIGIOUS"
  | "TRANSPORT"

const BUSINESS_TYPES: {
  type: BusinessType
  label: string
  description: string
  icon: React.ElementType
  gradient: string
  iconColor: string
}[] = [
  {
    type: "HEALTHCARE",
    label: "Healthcare",
    description: "Clinics, hospitals, dental, therapy practices",
    icon: Stethoscope,
    gradient: "linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(20,71,230,0.12) 100%)",
    iconColor: "#0EA5E9",
  },
  {
    type: "RESTAURANT",
    label: "Restaurant",
    description: "Restaurants, cafes, fast food, food delivery",
    icon: UtensilsCrossed,
    gradient: "linear-gradient(135deg, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.1) 100%)",
    iconColor: "#F97316",
  },
  {
    type: "SALON",
    label: "Salon & Beauty",
    description: "Hair salons, spas, beauty studios, nail bars",
    icon: Scissors,
    gradient: "linear-gradient(135deg, rgba(168,85,247,0.15) 0%, rgba(139,92,246,0.1) 100%)",
    iconColor: "#A855F7",
  },
  {
    type: "LEGAL",
    label: "Legal",
    description: "Law firms, legal consultants, paralegals",
    icon: Scale,
    gradient: "linear-gradient(135deg, rgba(20,71,230,0.15) 0%, rgba(6,14,30,0.12) 100%)",
    iconColor: "#1447E6",
  },
  {
    type: "REAL_ESTATE",
    label: "Real Estate",
    description: "Real estate agents, property management, rentals",
    icon: Home,
    gradient: "linear-gradient(135deg, rgba(22,163,74,0.15) 0%, rgba(21,128,61,0.1) 100%)",
    iconColor: "#16A34A",
  },
  {
    type: "EDUCATION",
    label: "Education",
    description: "Schools, tutoring, online courses, coaching",
    icon: GraduationCap,
    gradient: "linear-gradient(135deg, rgba(234,179,8,0.15) 0%, rgba(202,138,4,0.1) 100%)",
    iconColor: "#CA8A04",
  },
  {
    type: "RETAIL",
    label: "Retail",
    description: "Retail stores, e-commerce, boutiques",
    icon: ShoppingBag,
    gradient: "linear-gradient(135deg, rgba(236,72,153,0.15) 0%, rgba(219,39,119,0.1) 100%)",
    iconColor: "#EC4899",
  },
  {
    type: "HOSPITALITY",
    label: "Hospitality",
    description: "Hotels, motels, B&Bs, vacation rentals",
    icon: Hotel,
    gradient: "linear-gradient(135deg, rgba(14,165,233,0.15) 0%, rgba(2,132,199,0.1) 100%)",
    iconColor: "#0284C7",
  },
  {
    type: "AUTOMOTIVE",
    label: "Automotive",
    description: "Auto repair, car dealers, towing services",
    icon: Car,
    gradient: "linear-gradient(135deg, rgba(107,114,128,0.15) 0%, rgba(75,85,99,0.1) 100%)",
    iconColor: "#4B5563",
  },
  {
    type: "HOME_SERVICES",
    label: "Home Services",
    description: "Plumbing, HVAC, cleaning, landscaping",
    icon: Wrench,
    gradient: "linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(217,119,6,0.1) 100%)",
    iconColor: "#D97706",
  },
  {
    type: "FINANCE",
    label: "Finance",
    description: "Accounting, insurance, financial advisors",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, rgba(22,163,74,0.15) 0%, rgba(20,71,230,0.1) 100%)",
    iconColor: "#16A34A",
  },
  {
    type: "STARTUP",
    label: "Startup / SaaS",
    description: "Tech startups, SaaS companies, product teams",
    icon: Rocket,
    gradient: "linear-gradient(135deg, rgba(20,71,230,0.18) 0%, rgba(14,165,233,0.12) 100%)",
    iconColor: "#1447E6",
  },
  {
    type: "GOVERNMENT",
    label: "Government",
    description: "Municipal offices, government agencies, public services",
    icon: Building2,
    gradient: "linear-gradient(135deg, rgba(107,114,128,0.15) 0%, rgba(55,65,81,0.1) 100%)",
    iconColor: "#374151",
  },
  {
    type: "RELIGIOUS",
    label: "Religious",
    description: "Churches, mosques, temples, religious organizations",
    icon: Heart,
    gradient: "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(220,38,38,0.08) 100%)",
    iconColor: "#DC2626",
  },
  {
    type: "TRANSPORT",
    label: "Transport",
    description: "Logistics, trucking, taxi, delivery services",
    icon: Truck,
    gradient: "linear-gradient(135deg, rgba(107,114,128,0.15) 0%, rgba(20,71,230,0.1) 100%)",
    iconColor: "#6B7280",
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<BusinessType | null>(null)

  const setBusinessType = api.settings.setBusinessType.useMutation({
    onSuccess: () => {
      router.push("/dashboard")
    },
  })

  const handleContinue = () => {
    if (!selected) return
    setBusinessType.mutate(selected)
  }

  const isHealthcare = selected === "HEALTHCARE"

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-start py-16 px-4"
      style={{ background: "#F7F9FC" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 mb-12">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1447E6 0%, #0EA5E9 100%)" }}
        >
          <Zap size={15} className="text-white" fill="white" />
        </div>
        <span className="font-bold text-lg tracking-tight" style={{ color: "#060E1E" }}>
          ARIA
        </span>
      </div>

      {/* Header */}
      <div className="text-center mb-10 max-w-xl">
        <h1
          className="text-3xl font-bold tracking-tight mb-3"
          style={{ color: "#0D1117" }}
        >
          What type of business is this?
        </h1>
        <p className="text-base" style={{ color: "#6B7280" }}>
          ARIA customizes its behavior based on your industry
        </p>
      </div>

      {/* HIPAA notice */}
      {isHealthcare && (
        <div
          className="flex items-start gap-3 rounded-2xl px-5 py-4 mb-6 max-w-2xl w-full"
          style={{
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.3)",
          }}
        >
          <AlertTriangle
            size={18}
            className="shrink-0 mt-0.5"
            style={{ color: "#D97706" }}
          />
          <p className="text-sm leading-relaxed" style={{ color: "#92400E" }}>
            <span className="font-semibold">Healthcare requires HIPAA compliance mode.</span>{" "}
            ARIA will enable encrypted storage and consent prompts.
          </p>
        </div>
      )}

      {/* Grid */}
      <div
        className="grid gap-3 w-full max-w-5xl"
        style={{
          gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
        }}
      >
        {BUSINESS_TYPES.map(({ type, label, description, icon: Icon, gradient, iconColor }) => {
          const isSelected = selected === type
          return (
            <button
              key={type}
              onClick={() => setSelected(type)}
              className="flex flex-col items-start p-4 rounded-2xl text-left transition-all duration-150 cursor-pointer"
              style={{
                background: "white",
                border: isSelected
                  ? "2px solid #1447E6"
                  : "1.5px solid #E5E7EB",
                boxShadow: isSelected
                  ? "0 0 0 4px rgba(20,71,230,0.1), 0 2px 8px rgba(20,71,230,0.15)"
                  : "0 1px 3px rgba(0,0,0,0.04)",
                transform: isSelected ? "translateY(-1px)" : "translateY(0)",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(0,0,0,0.08)"
                  e.currentTarget.style.borderColor = "#D1D5DB"
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.boxShadow =
                    "0 1px 3px rgba(0,0,0,0.04)"
                  e.currentTarget.style.borderColor = "#E5E7EB"
                }
              }}
            >
              {/* Icon */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ background: gradient }}
              >
                <Icon size={18} style={{ color: iconColor }} strokeWidth={1.8} />
              </div>

              {/* Name */}
              <p
                className="text-sm font-semibold mb-1 leading-tight"
                style={{ color: isSelected ? "#1447E6" : "#0D1117" }}
              >
                {label}
              </p>

              {/* Description */}
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#6B7280" }}
              >
                {description}
              </p>
            </button>
          )
        })}
      </div>

      {/* Continue button */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <button
          onClick={handleContinue}
          disabled={!selected || setBusinessType.isPending}
          className="px-8 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-150"
          style={{
            background:
              !selected
                ? "#D1D5DB"
                : "linear-gradient(135deg, #1447E6 0%, #0EA5E9 100%)",
            cursor: !selected ? "not-allowed" : "pointer",
            boxShadow: selected
              ? "0 4px 14px rgba(20,71,230,0.35)"
              : "none",
            opacity: setBusinessType.isPending ? 0.7 : 1,
          }}
        >
          {setBusinessType.isPending ? "Saving…" : "Continue"}
        </button>
        {setBusinessType.isError && (
          <p className="text-xs" style={{ color: "#EF4444" }}>
            Something went wrong. Please try again.
          </p>
        )}
      </div>
    </div>
  )
}
