import { UserButton } from "@clerk/nextjs"
import { Bell, Search } from "lucide-react"

interface TopBarProps {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6"
      style={{
        height: 64,
        background: "rgba(10,12,22,0.88)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Left: title */}
      <div>
        <h1 style={{ fontSize: 16, fontWeight: 700, color: "#F1F5F9", letterSpacing: "-0.02em", lineHeight: 1.2, margin: 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ fontSize: 12, color: "rgba(136,146,164,0.65)", marginTop: 2, margin: 0 }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* Right: actions */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Search */}
        <button
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10, padding: "6px 14px",
            cursor: "pointer", transition: "all .15s",
            color: "rgba(136,146,164,0.6)", fontSize: 13,
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.07)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)"
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"
          }}
          aria-label="Search"
        >
          <Search size={14} strokeWidth={1.8} />
          <span style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <span>Search</span>
            <kbd style={{ fontSize: 10, fontWeight: 600, color: "rgba(136,146,164,0.4)", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 5, padding: "1px 5px" }}>⌘K</kbd>
          </span>
        </button>

        {/* Notifications */}
        <button
          style={{
            width: 36, height: 36, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            cursor: "pointer", transition: "all .15s",
            color: "rgba(136,146,164,0.6)", position: "relative",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.08)"
            e.currentTarget.style.color = "#F1F5F9"
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = "rgba(255,255,255,0.04)"
            e.currentTarget.style.color = "rgba(136,146,164,0.6)"
          }}
          aria-label="Notifications"
        >
          <Bell size={15} strokeWidth={1.8} />
          {/* Unread dot */}
          <span style={{ position: "absolute", top: 7, right: 7, width: 6, height: 6, borderRadius: "50%", background: "#00D471", border: "1.5px solid rgba(10,12,22,1)" }} />
        </button>

        {/* User */}
        <div style={{ borderLeft: "1px solid rgba(255,255,255,0.07)", paddingLeft: 10 }}>
          <UserButton appearance={{ elements: { avatarBox: "w-8 h-8 rounded-xl" } }} />
        </div>
      </div>
    </header>
  )
}
