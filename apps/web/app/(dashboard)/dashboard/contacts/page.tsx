"use client"

import { useState } from "react"
import { TopBar } from "@/components/layout/TopBar"
import { api } from "@/lib/trpc"
import { Users, Search, Phone, Mail, MessageSquare, Tag } from "lucide-react"

export default function ContactsPage() {
  const [search, setSearch] = useState("")
  const { data: contacts, isLoading } = api.contacts.list.useQuery({ search: search || undefined })
  const all = contacts ?? []

  return (
    <>
      <TopBar title="Contacts" subtitle={`${all.length} customer${all.length !== 1 ? "s" : ""}`} />
      <main style={{ flex: 1, padding: 24 }}>

        {/* STATS */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Total", value: all.length, c: "#6366F1", icon: <Users size={18} color="#6366F1" /> },
            { label: "With calls", value: all.filter(c => c._count.calls > 0).length, c: "#22D3EE", icon: <Phone size={18} color="#22D3EE" /> },
            { label: "Messaged", value: all.filter(c => c._count.conversations > 0).length, c: "#10B981", icon: <MessageSquare size={18} color="#10B981" /> },
            { label: "Tagged", value: all.filter(c => c.tags.length > 0).length, c: "#F59E0B", icon: <Tag size={18} color="#F59E0B" /> },
          ].map(s => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 16, padding: "16px 20px", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: "#F8FAFC", display: "flex", alignItems: "center", justifyContent: "center" }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "#0D1117" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* SEARCH */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "#94A3B8", pointerEvents: "none" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, phone, or email…"
            style={{ width: "100%", paddingLeft: 40, paddingRight: 16, height: 42, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 12, fontSize: 14, color: "#0D1117", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        {/* TABLE */}
        <div style={{ background: "#fff", border: "1px solid #E5E7EB", borderRadius: 20, overflow: "hidden" }}>
          <div style={{ padding: "16px 24px", borderBottom: "1px solid #F1F5F9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#0D1117" }}>All contacts</span>
            <span style={{ fontSize: 12, color: "#94A3B8" }}>Auto-created from calls & messages</span>
          </div>

          {isLoading ? (
            <div style={{ padding: "48px 0", textAlign: "center", color: "#94A3B8", fontSize: 14 }}>Loading…</div>
          ) : all.length === 0 ? (
            <div style={{ padding: "60px 24px", textAlign: "center" }}>
              <Users size={32} color="#E5E7EB" style={{ margin: "0 auto 12px" }} />
              <p style={{ fontWeight: 600, color: "#6B7280", margin: "0 0 4px" }}>{search ? "No results" : "No contacts yet"}</p>
              <p style={{ fontSize: 13, color: "#94A3B8", margin: 0 }}>Contacts appear automatically when customers call or text.</p>
            </div>
          ) : (
            all.map((c, i) => {
              const initials = c.name ? c.name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0,2) : c.phone.slice(-2)
              return (
                <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 24px", borderBottom: i < all.length - 1 ? "1px solid #F8FAFC" : "none" }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(99,102,241,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#6366F1", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                    {initials}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, color: "#0D1117" }}>{c.name ?? "Unknown"}</div>
                    <div style={{ fontSize: 12, color: "#6B7280", display: "flex", gap: 12, flexWrap: "wrap", marginTop: 2 }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Phone size={10} />{c.phone}</span>
                      {c.email && <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Mail size={10} />{c.email}</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 20, alignItems: "center", flexShrink: 0 }}>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 700, color: "#6366F1" }}>{c._count.calls}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>calls</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontWeight: 700, color: "#22D3EE" }}>{c._count.conversations}</div>
                      <div style={{ fontSize: 11, color: "#94A3B8" }}>msgs</div>
                    </div>
                    {c.language && (
                      <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 100, padding: "3px 10px", fontSize: 11, fontWeight: 600, color: "#818CF8" }}>{c.language.toUpperCase()}</div>
                    )}
                    {c.tags.slice(0,2).map(t => (
                      <span key={t} style={{ background: "rgba(34,211,238,0.08)", border: "1px solid rgba(34,211,238,0.15)", borderRadius: 100, padding: "3px 8px", fontSize: 11, color: "#22D3EE" }}>{t}</span>
                    ))}
                  </div>
                </div>
              )
            })
          )}
        </div>
      </main>
    </>
  )
}
