"use client"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { formatDistanceToNow } from "date-fns"
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Phone, PhoneIncoming, PhoneOutgoing, ThumbsUp, ThumbsDown, Minus } from "lucide-react"

type CallRow = {
  id: string
  direction: string
  status: string
  sentiment: string | null
  duration: number | null
  startedAt: Date
  contact: { name: string | null; phone: string } | null
}

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  IN_PROGRESS: { label: "Live",      color: "#16A34A", bg: "rgba(22,163,74,0.1)"    },
  COMPLETED:   { label: "Done",      color: "#6366F1", bg: "rgba(99,102,241,0.08)"  },
  MISSED:      { label: "Missed",    color: "#EF4444", bg: "rgba(239,68,68,0.08)"   },
  FAILED:      { label: "Failed",    color: "#6B7280", bg: "rgba(107,114,128,0.08)" },
  VOICEMAIL:   { label: "Voicemail", color: "#7C3AED", bg: "rgba(124,58,237,0.08)"  },
}

const col = createColumnHelper<CallRow>()

const columns = [
  col.accessor("direction", {
    header: "",
    cell: (info) => info.getValue() === "INBOUND"
      ? <PhoneIncoming size={14} style={{ color: "#6366F1" }} />
      : <PhoneOutgoing size={14} style={{ color: "#6B7280" }} />,
  }),
  col.accessor("contact", {
    header: "Contact",
    cell: (info) => {
      const c = info.getValue()
      return (
        <div>
          <p className="text-sm font-medium" style={{ color: "#0D1117" }}>{c?.name ?? "Unknown"}</p>
          <p className="text-xs" style={{ color: "#6B7280" }}>{c?.phone ?? "—"}</p>
        </div>
      )
    },
  }),
  col.accessor("status", {
    header: "Status",
    cell: (info) => {
      const s = STATUS_STYLES[info.getValue()] ?? STATUS_STYLES.COMPLETED
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs font-medium"
          style={{ color: s.color, background: s.bg }}>
          {info.getValue() === "IN_PROGRESS" && (
            <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />
          )}
          {s.label}
        </span>
      )
    },
  }),
  col.accessor("duration", {
    header: "Duration",
    cell: (info) => {
      const d = info.getValue()
      if (!d) return <span style={{ color: "#6B7280" }}>—</span>
      return <span className="text-sm tabular-nums" style={{ color: "#0D1117" }}>{Math.floor(d/60)}:{String(d%60).padStart(2,"0")}</span>
    },
  }),
  col.accessor("sentiment", {
    header: "Sentiment",
    cell: (info) => {
      const s = info.getValue()
      if (s === "POSITIVE") return <ThumbsUp size={14} style={{ color: "#16A34A" }} />
      if (s === "NEGATIVE") return <ThumbsDown size={14} style={{ color: "#EF4444" }} />
      return <Minus size={14} style={{ color: "#6B7280" }} />
    },
  }),
  col.accessor("startedAt", {
    header: "Time",
    cell: (info) => (
      <span className="text-sm" style={{ color: "#6B7280" }}>
        {formatDistanceToNow(new Date(info.getValue()), { addSuffix: true })}
      </span>
    ),
  }),
]

export default function CallsPage() {
  const { data: calls = [], isLoading } = api.calls.list.useQuery({ limit: 100 }, { refetchInterval: 15_000 })

  const table = useReactTable({
    data: calls as unknown as CallRow[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <>
      <TopBar title="Calls" subtitle={`${calls.length} calls`} />
      <main className="flex-1 p-6">
        <div className="rounded-2xl bg-white overflow-hidden"
          style={{ border: "1px solid #E5E7EB", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <div className="w-8 h-8 rounded-full border-2 animate-spin"
                style={{ borderColor: "#E5E7EB", borderTopColor: "#1447E6" }} />
            </div>
          ) : calls.length === 0 ? (
            <div className="p-12 flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                style={{ background: "rgba(20,71,230,0.08)" }}>
                <Phone size={20} style={{ color: "#1447E6" }} />
              </div>
              <p className="text-sm font-medium mb-1" style={{ color: "#0D1117" }}>No calls yet</p>
              <p className="text-xs max-w-xs" style={{ color: "#6B7280" }}>
                Calls appear here once your Vapi assistant is connected to a phone number.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                {table.getHeaderGroups().map((hg) => (
                  <tr key={hg.id} style={{ borderBottom: "1px solid #E5E7EB" }}>
                    {hg.headers.map((h) => (
                      <th key={h.id} className="px-4 py-3 text-left text-xs font-medium"
                        style={{ color: "#6B7280", background: "#F7F9FC" }}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id}
                    style={{ borderBottom: "1px solid #E5E7EB", cursor: "pointer" }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#F7F9FC" }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent" }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-3">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </>
  )
}
