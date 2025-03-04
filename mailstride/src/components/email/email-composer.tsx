'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import { EmailEditor } from './email-editor'
import { AudienceSelector } from './audience-selector'
import { EmailPreview } from './email-preview'
import { EmailStatus } from './email-status'
import { createDraftEmail, updateEmailAudience, sendEmail } from '@/lib/actions/emails'
import { toast } from 'sonner'

type Step = 'compose' | 'audience' | 'preview' | 'status'

export function EmailComposer({ newsletterId }: { newsletterId: string }) {
  const [step, setStep] = useState<Step>('compose')
  const [emailId, setEmailId] = useState<string | null>(null)
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
    design: null,
  })
  const [selectedAudience, setSelectedAudience] = useState<string[]>([])
  const [status, setStatus] = useState<'success' | 'error' | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const steps = {
    compose: {
      title: 'Compose Email',
      component: (
        <EmailEditor 
          initialData={emailData}
          onSave={async (data) => {
            try {
              setIsLoading(true)
              const email = await createDraftEmail({
                ...data,
                newsletterId
              })
              setEmailId(email.id)
              setEmailData(data)
              setStep('audience')
              toast.success('Email draft saved')
            } catch (error) {
              toast.error('Failed to save email draft')
              console.error(error)
            } finally {
              setIsLoading(false)
            }
          }}
        />
      )
    },
    audience: {
      title: 'Select Audience',
      component: (
        <AudienceSelector
          newsletterId={newsletterId}
          onSelect={async (audience) => {
            if (!emailId) return
            try {
              setIsLoading(true)
              await updateEmailAudience(emailId, audience)
              setSelectedAudience(audience)
              setStep('preview')
              toast.success('Audience updated')
            } catch (error) {
              toast.error('Failed to update audience')
              console.error(error)
            } finally {
              setIsLoading(false)
            }
          }}
          onBack={() => setStep('compose')}
        />
      )
    },
    preview: {
      title: 'Preview & Send',
      component: (
        <EmailPreview
          emailData={emailData}
          audienceCount={selectedAudience.length}
          onEdit={() => setStep('compose')}
          onSend={async () => {
            if (!emailId) return
            try {
              setIsLoading(true)
              await sendEmail(emailId)
              setStatus('success')
              setStep('status')
              toast.success('Email sent successfully')
            } catch (error) {
              setStatus('error')
              setStep('status')
              toast.error('Failed to send email')
              console.error(error)
            } finally {
              setIsLoading(false)
            }
          }}
          onBack={() => setStep('audience')}
        />
      )
    },
    status: {
      title: status === 'success' ? 'Email Sent!' : 'Error',
      component: (
        <EmailStatus 
          status={status} 
          emailData={emailData}
          audienceCount={selectedAudience.length}
        />
      )
    }
  }

  const currentStep = steps[step]
  const progress = {
    compose: 25,
    audience: 50,
    preview: 75,
    status: 100
  }[step]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {currentStep.title}
            </h1>
          </div>
          <Progress value={progress} className="mt-4" />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {currentStep.component}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
} 