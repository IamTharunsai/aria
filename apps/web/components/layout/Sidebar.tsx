"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, Phone, Hash, MessageSquare, Users,
  Mic2, Megaphone, BarChart2, Settings, CreditCard,
  GitBranch, ShieldCheck,
} from "lucide-react"

const nav = [
  { href: "/dashboard",           icon: LayoutDashboard, label: "Dashboard"   },
  { href: "/dashboard/calls",     icon: Phone,           label: "Calls"       },
  { href: "/dashboard/inbox",     icon: MessageSquare,   label: "Inbox"       },
  { href: "/dashboard/contacts",  icon: Users,           label: "Contacts"    },
  { href: "/dashboard/agent",     icon: Mic2,            label: "Voice Agent" },
  { href: "/dashboard/safety",    icon: ShieldCheck,     label: "Safety"      },
  { href: "/dashboard/numbers",   icon: Hash,            label: "Numbers"     },
  { href: "/dashboard/campaigns", icon: Megaphone,       label: "Campaigns"   },
  { href: "/dashboard/analytics", icon: BarChart2,       label: "Analytics"   },
  { href: "/dashboard/workflow",  icon: GitBranch,       label: "Workflows"   },
  { href: "/dashboard/billing",   icon: CreditCard,      label: "Billing"     },
  { href: "/dashboard/settings",  icon: Settings,        label: "Settings"    },
]

// Group nav for visual separation
const navGroups = [
  { items: nav.slice(0, 5) },   // core
  { items: nav.slice(5, 10) },  // tools
  { items: nav.slice(10) },     // account
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside
      className="fixed left-0 top-0 h-full w-60 flex flex-col z-40"
      style={{
        background: "rgba(10,12,22,0.92)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderRight: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* ── Logo ── */}
      <div
        className="px-5 flex items-center gap-2.5"
        style={{ height: 64, borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}
      >
        <div
          style={{
            width: 30, height: 30, borderRadius: 9, flexShrink: 0,
            background: "linear-gradient(135deg,#00D471,#00A855)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 16px rgba(0,212,113,0.4)",
          }}
        >
          <Phone size={14} color="#000" fill="#000" />
        </div>
        <span style={{ fontWeight: 800, fontSize: 17, color: "#F1F5F9", letterSpacing: "-0.025em" }}>
          ARIA
        </span>
        {/* Live pill */}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 5, background: "rgba(0,212,113,0.1)", border: "1px solid rgba(0,212,113,0.22)", borderRadius: 9999, padding: "3px 9px" }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#00D471", animation: "sbar-pulse 1.5s ease-in-out infinite" }} />
          <span style={{ fontSize: 9, fontWeight: 700, color: "#00D471", letterSpacing: "0.06em" }}>LIVE</span>
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto" style={{ padding: "12px 10px" }}>
        <style>{`
          @keyframes sbar-pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.5;transform:scale(.8)}}
          .sbar-link{display:flex;align-items:center;gap:11px;padding:9px 12px;border-radius:12px;font-size:13px;font-weight:500;text-decoration:none;transition:all .15s cubic-bezier(.16,1,.3,1);color:rgba(241,245,249,.45);border:1px solid transparent;position:relative}
          .sbar-link:hover{color:rgba(241,245,249,.85);background:rgba(255,255,255,.04)}
          .sbar-link.active{color:#F1F5F9;font-weight:600;background:rgba(0,212,113,0.1);border-color:rgba(0,212,113,0.2);box-shadow:inset 0 1px 0 rgba(0,212,113,0.15)}
          .sbar-divider{height:1px;background:rgba(255,255,255,.05);margin:8px 2px}
        `}</style>

        {navGroups.map((group, gi) => (
          <div key={gi}>
            {gi > 0 && <div className="sbar-divider" />}
            {group.items.map(({ href, icon: Icon, label }) => {
              const active = href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(href)
              return (
                <Link key={href} href={href} className={cn("sbar-link", active && "active")}>
                  <Icon
                    size={16}
                    strokeWidth={active ? 2.2 : 1.8}
                    style={{ color: active ? "#00D471" : undefined, flexShrink: 0 }}
                  />
                  <span>{label}</span>
                  {active && (
                    <div style={{ marginLeft: "auto", width: 5, height: 5, borderRadius: "50%", background: "#00D471" }} />
                  )}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* ── Footer ── */}
      <div style={{ padding: "14px 14px 16px", borderTop: "1px solid rgba(255,255,255,0.05)", flexShrink: 0 }}>
        <div style={{ padding: "10px 12px", background: "rgba(0,212,113,0.06)", border: "1px solid rgba(0,212,113,0.14)", borderRadius: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00D471", animation: "sbar-pulse 1.5s ease-in-out infinite" }} />
            <span style={{ fontSize: 11, fontWeight: 700, color: "#00D471", letterSpacing: "0.04em" }}>AI Receptionist Active</span>
          </div>
          <p style={{ fontSize: 11, color: "rgba(136,146,164,0.55)", lineHeight: 1.5, margin: 0 }}>
            Your business never sleeps.<br />Neither does ARIA.
          </p>
        </div>
      </div>
    </aside>
  )
}
