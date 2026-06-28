import { Sidebar } from "@/components/layout/Sidebar"
import { DashboardClient } from "./DashboardClient"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: "#06070D" }}>
      <Sidebar />
      <div className="ml-60 min-h-screen flex flex-col">
        <DashboardClient>{children}</DashboardClient>
      </div>
    </div>
  )
}
