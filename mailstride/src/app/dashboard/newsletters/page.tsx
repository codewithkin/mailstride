'use client'

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { 
  EnvelopeIcon, 
  ChartBarIcon,
  ClockIcon,
  PencilSquareIcon,
  ArrowUpIcon,
  EyeIcon,
  CursorArrowRaysIcon
} from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { getUserPublications } from "@/lib/actions/publications"
import { getUserNewsletters } from "@/lib/actions/newsletters"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { EmailStatus } from "@prisma/client"

function NewsletterStatusBadge({ status }: { status: EmailStatus }) {
  const variants = {
    DRAFT: "bg-gray-100 text-gray-800",
    SCHEDULED: "bg-blue-100 text-blue-800",
    SENDING: "bg-yellow-100 text-yellow-800",
    SENT: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800"
  }

  return (
    <Badge className={variants[status]}>
      {status.charAt(0) + status.slice(1).toLowerCase()}
    </Badge>
  )
}

function StatsCard({ title, value, icon: Icon, description }: {
  title: string
  value: string | number
  icon: any
  description?: string
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-2xl font-semibold text-gray-900">{value}</span>
        {description && (
          <span className="text-sm text-gray-500">{description}</span>
        )}
      </div>
    </div>
  )
}

export default function NewslettersPage() {
  const { data: publications, isLoading: loadingPublications } = useQuery({
    queryKey: ['publications'],
    queryFn: getUserPublications
  })

  const { data: newsletters, isLoading: loadingNewsletters } = useQuery({
    queryKey: ['newsletters', publications?.[0]?.id],
    queryFn: () => getUserNewsletters(publications?.[0]?.id ?? ''),
    enabled: !!publications?.[0]?.id
  })

  if (loadingPublications || loadingNewsletters) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner className="h-6 w-6" />
      </div>
    )
  }

  if (!publications?.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <p className="text-muted-foreground">
          You need to create a publication first.
        </p>
        <Button asChild>
          <Link href="/dashboard/publications/new">
            Create Publication
          </Link>
        </Button>
      </div>
    )
  }

  const stats = {
    total: newsletters?.length ?? 0,
    sent: newsletters?.filter(n => n.status === 'SENT').length ?? 0,
    scheduled: newsletters?.filter(n => n.status === 'SCHEDULED').length ?? 0,
    avgOpenRate: newsletters?.reduce((acc, n) => {
      const opens = n.emails.reduce((sum, e) => sum + (e.analytics?.opens ?? 0), 0)
      const total = n.emails.length
      return acc + (opens / total)
    }, 0) / (newsletters?.length || 1)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              Newsletters
            </h1>
            <Button
              asChild
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <Link href="/dashboard/newsletters/create">
                <PencilSquareIcon className="w-4 h-4 mr-2" />
                New Newsletter
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Newsletters"
            value={stats.total}
            icon={EnvelopeIcon}
          />
          <StatsCard
            title="Sent"
            value={stats.sent}
            icon={ChartBarIcon}
          />
          <StatsCard
            title="Scheduled"
            value={stats.scheduled}
            icon={ClockIcon}
          />
          <StatsCard
            title="Avg. Open Rate"
            value={`${(stats.avgOpenRate * 100).toFixed(1)}%`}
            icon={EyeIcon}
          />
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Newsletter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opens
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Clicks
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {newsletters?.map((newsletter) => (
                  <tr key={newsletter.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {newsletter.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <NewsletterStatusBadge status={newsletter.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {newsletter.emails[0]?.sentAt ? (
                        format(new Date(newsletter.emails[0].sentAt), 'MMM d, yyyy')
                      ) : (
                        '-'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <EyeIcon className="h-4 w-4 text-gray-400" />
                        {newsletter.emails[0]?.analytics?.opens ?? 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <CursorArrowRaysIcon className="h-4 w-4 text-gray-400" />
                        {newsletter.emails[0]?.analytics?.clicks ?? 0}
                      </div>
                    </td>
                  </tr>
                ))}
                {!newsletters?.length && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      No newsletters yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
} 