import { UserButton } from "@clerk/nextjs"
import { Bell } from "lucide-react"

interface TopBarProps {
  title: string
  subtitle?: string
}

export function TopBar({ title, subtitle }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6"
      style={{
        height: "68px",
        background: "rgba(255,255,255,0.96)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #E5E7EB",
      }}
    >
      <div>
        <h1 className="text-[17px] font-semibold leading-tight" style={{ color: "#0D1117" }}>
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs mt-0.5" style={{ color: "#6B7280" }}>
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Notification bell */}
        <button
          className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-150 cursor-pointer"
          style={{ color: "#6B7280" }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = "#F7F9FC"
            ;(e.currentTarget as HTMLButtonElement).style.color = "#0D1117"
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = "transparent"
            ;(e.currentTarget as HTMLButtonElement).style.color = "#6B7280"
          }}
          aria-label="Notifications"
        >
          <Bell size={17} strokeWidth={1.8} />
        </button>

        <UserButton
          appearance={{
            elements: {
              avatarBox: "w-8 h-8 rounded-xl",
            },
          }}
        />
      </div>
    </header>
  )
}
