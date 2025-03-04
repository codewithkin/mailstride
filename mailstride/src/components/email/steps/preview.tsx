'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  EnvelopeIcon, 
  PencilSquareIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'

interface PreviewStepProps {
  emailData: {
    subject: string
    content: string
  }
  audienceCount: number
  onSend: () => Promise<void>
  onEdit: () => void
  onBack: () => void
}

export function PreviewStep({ 
  emailData, 
  audienceCount, 
  onSend, 
  onEdit, 
  onBack 
}: PreviewStepProps) {
  const [isSending, setIsSending] = useState(false)

  const handleSend = async () => {
    setIsSending(true)
    try {
      await onSend()
    } catch (error) {
      console.error('Failed to send email:', error)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Ready to Send</h3>
            <p className="text-sm text-gray-500 mt-1">
              Your email will be sent to {audienceCount} recipients
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={onEdit}>
            <PencilSquareIcon className="h-4 w-4 mr-2" />
            Edit Email
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="font-medium">Subject: {emailData.subject}</div>
        </div>
        <div className="p-4">
          <div 
            dangerouslySetInnerHTML={{ __html: emailData.content }} 
            className="prose max-w-none"
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Audience
        </Button>

        <Button
          onClick={handleSend}
          disabled={isSending}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          {isSending ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <span>Sending...</span>
            </div>
          ) : (
            <>
              <EnvelopeIcon className="h-4 w-4 mr-2" />
              Send Email
            </>
          )}
        </Button>
      </div>
    </div>
  )
} 