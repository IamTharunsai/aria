"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Phone,
  Hash,
  MessageSquare,
  Users,
  Mic2,
  Megaphone,
  BarChart2,
  Settings,
  Zap,
  CreditCard,
  GitBranch,
  ShieldCheck,
} from "lucide-react"

const nav = [
  { href: "/dashboard",              icon: LayoutDashboard, label: "Dashboard"    },
  { href: "/dashboard/calls",        icon: Phone,           label: "Calls"        },
  { href: "/dashboard/inbox",        icon: MessageSquare,   label: "Inbox"        },
  { href: "/dashboard/contacts",     icon: Users,           label: "Contacts"     },
  { href: "/dashboard/agent",        icon: Mic2,            label: "Voice Agent"  },
  { href: "/dashboard/safety",       icon: ShieldCheck,     label: "Safety"       },
  { href: "/dashboard/numbers",      icon: Hash,            label: "Numbers"      },
  { href: "/dashboard/campaigns",    icon: Megaphone,       label: "Campaigns"    },
  { href: "/dashboard/analytics",    icon: BarChart2,       label: "Analytics"    },
  { href: "/dashboard/workflow",     icon: GitBranch,       label: "Workflows"    },
  { href: "/dashboard/billing",      icon: CreditCard,      label: "Billing"      },
  { href: "/dashboard/settings",     icon: Settings,        label: "Settings"     },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-full w-60 flex flex-col z-40"
      style={{ background: "#060E1E", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
      {/* Logo */}
      <div className="px-5 py-4.5 flex items-center gap-2.5"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div className="w-7 h-7 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1447E6 0%, #0EA5E9 100%)" }}>
          <Zap size={14} className="text-white" fill="white" />
        </div>
        <span className="text-white font-bold text-[17px] tracking-tight">ARIA</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, icon: Icon, label }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer select-none",
                active
                  ? "text-white"
                  : "text-white/50 hover:text-white/80 hover:bg-white/5"
              )}
              style={active ? {
                background: "linear-gradient(135deg, rgba(20,71,230,0.9) 0%, rgba(14,165,233,0.7) 100%)",
                boxShadow: "0 2px 8px rgba(20,71,230,0.35)",
              } : undefined}
            >
              <Icon size={17} strokeWidth={active ? 2.2 : 1.8} />
              <span className="tracking-[0.01em]">{label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Bottom brand tagline */}
      <div className="px-5 py-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.25)" }}>
          Your business never sleeps.
          <br />Neither does ARIA.
        </p>
      </div>
    </aside>
  )
}
