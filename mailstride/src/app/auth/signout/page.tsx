'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { signOut } from "@/auth"
import { useState } from "react"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"

export default function SignOut() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSignOut() {
    setIsLoading(true)
    await signOut({ 
      redirect: true,
      callbackUrl: '/auth/signin'
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-200 to-purple-400 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-8 bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl relative"
        style={{
          backgroundImage: 'linear-gradient(white, white), linear-gradient(to right,rgb(142, 144, 255), #a855f7)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          border: '1px solid transparent',
        }}
      >
        <div className="space-y-2 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-slate-800"
          >
            Sign out
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            Are you sure you want to sign out?
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-2"
        >
          <Button
            onClick={handleSignOut}
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner />
                <span>Signing out...</span>
              </div>
            ) : (
              'Sign out'
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => window.history.back()}
            disabled={isLoading}
            className="w-full"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Go back
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
} 