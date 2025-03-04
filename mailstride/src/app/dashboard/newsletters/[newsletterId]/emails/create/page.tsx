'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ComposeStep } from '@/components/email/steps/compose'
import { AudienceStep } from '@/components/email/steps/audience'
import { PreviewStep } from '@/components/email/steps/preview'
import { StatusStep } from '@/components/email/steps/status'

type Step = 'compose' | 'audience' | 'preview' | 'status'

export default function CreateEmailPage() {
  const params = useParams()
  const newsletterId = params.newsletterId as string
  
  const [step, setStep] = useState<Step>('compose')
  const [emailData, setEmailData] = useState({
    subject: '',
    content: '',
    design: null
  })
  const [selectedAudience, setSelectedAudience] = useState<string[]>([])
  const [status, setStatus] = useState<'success' | 'error' | null>(null)

  const progress = {
    compose: 25,
    audience: 50,
    preview: 75,
    status: 100
  }[step]

  const steps = {
    compose: {
      title: 'Compose Email',
      component: (
        <ComposeStep
          initialData={emailData}
          onNext={(data) => {
            setEmailData(data)
            setStep('audience')
          }}
        />
      )
    },
    audience: {
      title: 'Select Audience',
      component: (
        <AudienceStep
          newsletterId={newsletterId}
          onNext={(audience) => {
            setSelectedAudience(audience)
            setStep('preview')
          }}
          onBack={() => setStep('compose')}
        />
      )
    },
    preview: {
      title: 'Preview & Send',
      component: (
        <PreviewStep
          emailData={emailData}
          audienceCount={selectedAudience.length}
          onSend={async () => {
            try {
              // Send email logic here
              setStatus('success')
              setStep('status')
            } catch (error) {
              setStatus('error')
              setStep('status')
            }
          }}
          onEdit={() => setStep('compose')}
          onBack={() => setStep('audience')}
        />
      )
    },
    status: {
      title: status === 'success' ? 'Email Sent!' : 'Error',
      component: (
        <StatusStep
          status={status}
          emailData={emailData}
          audienceCount={selectedAudience.length}
        />
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-900">
              {steps[step].title}
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
            {steps[step].component}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
} 