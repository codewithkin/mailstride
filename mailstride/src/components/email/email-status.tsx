'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { 
  CheckCircleIcon,
  XCircleIcon,
  ArrowPathIcon,
  HomeIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface EmailStatusProps {
  status: 'success' | 'error' | null
  emailData: {
    subject: string
  }
  audienceCount: number
}

export function EmailStatus({ status, emailData, audienceCount }: EmailStatusProps) {
  if (!status) return null

  const isSuccess = status === 'success'

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mx-auto w-16 h-16"
      >
        {isSuccess ? (
          <div className="bg-green-100 rounded-full p-4">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
        ) : (
          <div className="bg-red-100 rounded-full p-4">
            <XCircleIcon className="w-8 h-8 text-red-600" />
          </div>
        )}
      </motion.div>

      <div className="space-y-2">
        <h3 className="text-xl font-medium">
          {isSuccess ? 'Email Sent Successfully!' : 'Failed to Send Email'}
        </h3>
        <p className="text-gray-500">
          {isSuccess ? (
            <>Your email "{emailData.subject}" has been sent to {audienceCount} recipients.</>
          ) : (
            <>There was a problem sending your email. Please try again.</>
          )}
        </p>
      </div>

      <div className="flex justify-center gap-4 pt-4">
        {isSuccess ? (
          <Button asChild>
            <Link href="/dashboard">
              <HomeIcon className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </Button>
        ) : (
          <Button onClick={() => window.location.reload()}>
            <ArrowPathIcon className="w-4 h-4 mr-2" />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
} 