'use client'

import { motion } from "framer-motion"
import { 
  UserIcon, 
  CreditCardIcon, 
  BellIcon, 
  KeyIcon,
  ShieldCheckIcon,
  PaintBrushIcon,
} from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const settingsSections = [
  {
    name: 'Profile',
    description: 'Manage your personal information and preferences',
    href: '/dashboard/settings/profile',
    icon: UserIcon,
  },
  {
    name: 'Billing',
    description: 'View your subscription and billing history',
    href: '/dashboard/settings/billing',
    icon: CreditCardIcon,
  },
  {
    name: 'Notifications',
    description: 'Configure how you receive updates and alerts',
    href: '/dashboard/settings/notifications',
    icon: BellIcon,
  },
  {
    name: 'API Keys',
    description: 'Manage API keys for integrations',
    href: '/dashboard/settings/api-keys',
    icon: KeyIcon,
  },
  {
    name: 'Security',
    description: 'Update your security preferences',
    href: '/dashboard/settings/security',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Appearance',
    description: 'Customize your dashboard experience',
    href: '/dashboard/settings/appearance',
    icon: PaintBrushIcon,
  },
]

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 font-geist-sans ml-12 sm:ml-0">
              Settings
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {settingsSections.map((section, index) => (
            <motion.div
              key={section.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link 
                href={section.href}
                className="block h-full"
              >
                <div className="h-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:border-purple-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50">
                      <section.icon className="w-6 h-6 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {section.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {section.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
} 