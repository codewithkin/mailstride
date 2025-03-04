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
import { CheckIcon } from '@heroicons/react/24/outline'

type Step = 'compose' | 'audience' | 'preview' | 'status'

const STEPS = [
  { id: 'compose', name: 'Compose Email', description: 'Write your email content' },
  { id: 'audience', name: 'Select Audience', description: 'Choose who receives your email' },
  { id: 'preview', name: 'Preview & Send', description: 'Review and send your email' },
  { id: 'status', name: 'Status', description: 'Track your email status' }
] as const

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

  const currentStepIndex = STEPS.findIndex(s => s.id === step)

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-between">
              {STEPS.map((stepItem, index) => {
                const isCurrentStep = step === stepItem.id
                const isPastStep = STEPS.findIndex(s => s.id === step) > index
                
                return (
                  <li 
                    key={stepItem.id}
                    className={`relative flex-1 ${
                      index !== STEPS.length - 1 ? 'pr-8' : ''
                    }`}
                  >
                    <div className="group flex flex-col items-center">
                      <div className="flex items-center">
                        <div
                          className={`
                            relative flex h-10 w-10 items-center justify-center rounded-full
                            transition-all duration-200
                            ${
                              isPastStep
                                ? 'bg-indigo-600 ring-2 ring-indigo-600'
                                : isCurrentStep
                                ? 'bg-white ring-2 ring-indigo-600'
                                : 'bg-white ring-2 ring-gray-300'
                            }
                          `}
                        >
                          {isPastStep ? (
                            <CheckIcon className="h-6 w-6 text-white" />
                          ) : (
                            <span
                              className={`text-base font-medium ${
                                isCurrentStep ? 'text-indigo-600' : 'text-gray-500'
                              }`}
                            >
                              {index + 1}
                            </span>
                          )}
                        </div>
                        {index !== STEPS.length - 1 && (
                          <div
                            className={`absolute left-0 top-5 h-0.5 w-full transition-colors duration-200 ${
                              isPastStep ? 'bg-indigo-600' : 'bg-gray-300'
                            }`}
                          />
                        )}
                      </div>
                      <div className="mt-3 flex flex-col items-center">
                        <span
                          className={`text-sm font-medium ${
                            isCurrentStep
                              ? 'text-indigo-600'
                              : isPastStep
                              ? 'text-gray-900'
                              : 'text-gray-500'
                          }`}
                        >
                          {stepItem.name}
                        </span>
                        <span className="mt-1 text-xs text-gray-500 hidden sm:block">
                          {stepItem.description}
                        </span>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ol>
          </nav>
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