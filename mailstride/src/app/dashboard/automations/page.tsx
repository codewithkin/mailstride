'use client'

import { motion } from "framer-motion"
import { BoltIcon } from "@heroicons/react/24/outline"
import { Button } from "@/components/ui/button"

export default function AutomationsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900 font-geist-sans ml-12 sm:ml-0">
              Automations
            </h1>
            <Button
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              Create Sequence
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-center h-64 text-gray-400">
            <BoltIcon className="w-12 h-12" />
          </div>
        </div>
      </main>
    </div>
  )
} 