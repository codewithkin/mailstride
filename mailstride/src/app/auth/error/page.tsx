'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useSearchParams } from 'next/navigation'
import Link from "next/link"
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const errorMessages: { [key: string]: string } = {
    'Configuration': 'There is a problem with the server configuration.',
    'AccessDenied': 'You do not have permission to sign in.',
    'Verification': 'The verification link was invalid or has expired.',
    'Default': 'There was a problem signing you in.'
  }

  const errorMessage = error ? errorMessages[error] : errorMessages.Default

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
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center"
        >
          <ExclamationTriangleIcon className="h-8 w-8 text-red-600" />
        </motion.div>
        
        <div className="space-y-2 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-2xl font-bold text-slate-800"
          >
            Authentication error
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            {errorMessage}
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Button
            asChild
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            <Link href="/auth/signin">
              Try Again
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
} 