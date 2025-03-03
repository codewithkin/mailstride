'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  XMarkIcon,
  Bars3Icon,
  HomeIcon,
  EnvelopeIcon,
  UsersIcon,
  ChartPieIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Emails', href: '/dashboard/emails', icon: EnvelopeIcon },
  { name: 'Subscribers', href: '/dashboard/subscribers', icon: UsersIcon },
  { name: 'Analytics', href: '/dashboard/analytics', icon: ChartPieIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
]

export function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const NavContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 sm:px-6">
        <span className="text-xl font-bold font-geist-sans">Mailstride</span>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(false)}
          className="sm:hidden"
        >
          <XMarkIcon className="w-6 h-6" />
        </Button>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <item.icon className={`w-5 h-5 mr-3 ${
                isActive ? 'text-indigo-600' : 'text-gray-400'
              }`} />
              {item.name}
            </Link>
          )
        })}
      </nav>
    </div>
  )

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed top-4 left-4 z-40 sm:hidden"
      >
        <Bars3Icon className="w-6 h-6" />
      </Button>

      {/* Mobile menu modal */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/25 sm:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 20 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl sm:hidden"
            >
              <NavContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden h-screen w-64 fixed inset-y-0 sm:flex flex-col border-r border-gray-200 bg-white">
        <NavContent />
      </div>
    </>
  )
} 