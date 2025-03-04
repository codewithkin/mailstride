import { Sidebar } from "@/components/dashboard/sidebar"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

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

      {/* Floating Action Button - visible on all dashboard pages */}
      <Link 
        href="/dashboard/emails/create"
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 sm:pr-6"
        >
          <Plus className="w-6 h-6 sm:mr-2" />
          <span className="hidden sm:inline">New Email</span>
          <span className="sr-only sm:hidden">New Email</span>
        </Button>
      </Link>
    </div>
  )
} 