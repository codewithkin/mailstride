'use client'

import { motion } from "framer-motion"
import { 
  EnvelopeIcon, 
  UserGroupIcon, 
  ChartBarIcon,
  PencilSquareIcon 
} from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

const stats = [
  {
    name: 'Total Subscribers',
    value: '2,381',
    change: '+14.5%',
    changeType: 'positive',
    icon: UserGroupIcon
  },
  {
    name: 'Open Rate',
    value: '58.3%',
    change: '+4.2%',
    changeType: 'positive',
    icon: EnvelopeIcon
  },
  {
    name: 'Click Rate',
    value: '24.7%',
    change: '-2.1%',
    changeType: 'negative',
    icon: ChartBarIcon
  }
]

const recentEmails = [
  {
    subject: 'Weekly Tech Insights #45',
    sentAt: '2024-02-20',
    opens: 1423,
    clicks: 856
  },
  {
    subject: 'February Newsletter',
    sentAt: '2024-02-15',
    opens: 1567,
    clicks: 934
  }
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 font-geist-sans">
              Dashboard
            </h1>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              <PencilSquareIcon className="h-5 w-5 mr-2" />
              New Email
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              <div className="flex items-center justify-between">
                <stat.icon className="h-8 w-8 text-gray-400" />
                <span className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </span>
              </div>
              <p className="mt-4 text-2xl font-semibold text-gray-900 font-geist-sans">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {stat.name}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Recent Emails */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 font-geist-sans">
              Recent Emails
            </h2>
          </div>
          <div className="divide-y divide-gray-100">
            {recentEmails.map((email) => (
              <div 
                key={email.subject}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      {email.subject}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Sent on {new Date(email.sentAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{email.opens}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ChartBarIcon className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{email.clicks}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
} 