'use client'

import { useQuery } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { 
  EnvelopeIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  PencilSquareIcon,
  ArrowUpIcon
} from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import { LoadingCard } from "@/components/dashboard/loading-card"
import { getDashboardStats, getRecentEmails } from "@/lib/api/queries"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"
import { Plus } from "lucide-react"

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: getDashboardStats
  })

  const { data: recentEmails, isLoading: emailsLoading } = useQuery({
    queryKey: ['recentEmails'],
    queryFn: getRecentEmails
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 font-geist-sans ml-12 sm:ml-0">
              Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="hidden sm:flex items-center gap-2"
              >
                <ArrowUpIcon className="w-4 h-4" />
                Upgrade to Pro
              </Button>
              <Button
                asChild
                className="hidden sm:flex bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                <Link href="/dashboard/emails/new">
                  <PencilSquareIcon className="w-4 h-4 mr-2" />
                  New Newsletter
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {statsLoading ? (
            <>
              <LoadingCard />
              <LoadingCard />
              <LoadingCard />
            </>
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <UserGroupIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    Active
                  </span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900 font-geist-sans">
                  {stats?.subscribers.toLocaleString() ?? '0'}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Total Subscribers
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <EnvelopeIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    {(stats?.openRate ?? "0%") > "50%" ? "Good" : "Needs Improvement"}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900 font-geist-sans">
                  {stats?.openRate ?? '0%'}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Open Rate
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
              >
                <div className="flex items-center justify-between">
                  <ChartBarIcon className="h-8 w-8 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">
                    {(stats?.clickRate ?? "0%") > "20%" ? "Good" : "Needs Improvement"}
                  </span>
                </div>
                <p className="mt-4 text-2xl font-semibold text-gray-900 font-geist-sans">
                  {stats?.clickRate ?? '0%'}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  Click Rate
                </p>
              </motion.div>
            </>
          )}
        </div>

        {/* Recent Emails */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 font-geist-sans">
              Recent Emails
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {emailsLoading ? (
              <div className="p-6">
                <div className="space-y-4">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ) : recentEmails?.length > 0 ? (
              recentEmails.map((email) => (
                <div 
                  key={email.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">
                        {email.subject}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Sent on {new Date(email.sentAt!).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {email.analytics?.opens.toLocaleString() ?? '0'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ChartBarIcon className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-600">
                          {email.analytics?.clicks.toLocaleString() ?? '0'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-gray-500">
                No emails sent yet
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Action Button - visible on all screens */}
      <Link 
        href="/dashboard/newsletters/create"
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