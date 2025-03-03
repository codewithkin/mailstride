import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div>
      <Sidebar />
      <div className="sm:pl-64">
        {children}
      </div>
    </div>
  )
} 