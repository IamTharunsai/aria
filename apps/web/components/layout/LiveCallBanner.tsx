"use client"
import { Phone, X } from "lucide-react"

interface LiveCallBannerProps {
  callId?: string
  fromNumber?: string
  contactName?: string
  onDismiss?: () => void
}

export function LiveCallBanner({ callId, fromNumber, contactName, onDismiss }: LiveCallBannerProps) {
  if (!callId) return null

  return (
    <div
      className="flex items-center justify-between px-6 py-2.5 text-white text-sm font-medium"
      style={{
        background: "linear-gradient(90deg, #16A34A 0%, #15803d 100%)",
        boxShadow: "0 1px 3px rgba(22,163,74,0.3)",
      }}
    >
      <div className="flex items-center gap-3">
        {/* Pulsing dot */}
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-white/70 animate-ping"
            style={{ animationDuration: "1.4s" }}
          />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
        </span>

        <Phone size={14} strokeWidth={2} />

        <span>Live call in progress</span>

        {contactName && (
          <>
            <span className="text-white/60">·</span>
            <span className="font-semibold">{contactName}</span>
          </>
        )}

        {fromNumber && (
          <span className="text-white/70 font-normal text-xs">{fromNumber}</span>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 p-1 rounded-lg hover:bg-white/20 transition-colors duration-150 cursor-pointer"
          aria-label="Dismiss live call banner"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
