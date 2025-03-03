'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { createPublication } from "@/lib/actions/publications"
import Link from "next/link"
import { PencilSquareIcon } from "@heroicons/react/24/outline"
import { CheckIcon } from "@heroicons/react/24/outline"
import { LayoutDashboard } from "lucide-react"

const AUDIENCES = [
  { value: 'startup-founders', label: 'Startup Founders' },
  { value: 'tech-enthusiasts', label: 'Tech Enthusiasts' },
  { value: 'business', label: 'Business Professionals' },
  { value: 'developers', label: 'Developers' },
  { value: 'marketers', label: 'Marketers' },
  { value: 'creators', label: 'Content Creators' },
  { value: 'other', label: 'Other' },
]

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
        style={{ width: `${(currentStep / 2) * 100}%` }}
      />
    </div>
  )
}

function WelcomeStep({ onNext, name }: { onNext: () => void, name: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">
          Hey {name}! 👋
        </h2>
        <p className="text-gray-600">
          Welcome to Mailstride! Let's create your first publication.
        </p>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onNext}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          Let's Go
          <ChevronRightIcon className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </motion.div>
  )
}

function PublicationSetupStep({ onNext }: { onNext: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(formData: FormData) {
    try {
      setIsSubmitting(true)
      await createPublication(formData)
      onNext()
    } catch (error) {
      console.error('Failed to create publication:', error)
      // Add error handling UI here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-slate-800">
          Create Your Publication
        </h2>
        <p className="text-gray-600">
          This will be your space for managing emails, subscribers, and content.
        </p>
      </div>

      <form action={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Publication Name
          </label>
          <Input
            type="text"
            name="newsletterName"
            placeholder="e.g., Tech Weekly, Marketing Insights"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Target Audience
          </label>
          <select 
            name="audience" 
            className="w-full rounded-md border border-input bg-background px-3 py-2"
            required
          >
            <option value="">Select your target audience</option>
            {AUDIENCES.map((audience) => (
              <option key={audience.value} value={audience.value}>
                {audience.label}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea
            name="description"
            placeholder="What's your publication about? This helps your team and subscribers understand its purpose."
            className="h-24"
          />
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <span>Creating...</span>
            </div>
          ) : (
            <>
              Create Publication
              <ChevronRightIcon className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </form>
    </motion.div>
  )
}

function SuccessStep() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <div className="text-center space-y-2">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
        >
          <CheckIcon className="h-8 w-8 text-green-600" />
        </motion.div>
        <h2 className="text-2xl font-bold text-slate-800">
          You're all set! 🎉
        </h2>
        <p className="text-gray-600">
          Your publication has been created. What would you like to do next?
        </p>
      </div>

      <div className="grid gap-4">
        <Button
          asChild
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          <Link href="/dashboard/newsletters/create">
            <div className="flex items-center justify-center">
              <PencilSquareIcon className="w-4 h-4 mr-2" />
              Create Your First Newsletter
            </div>
          </Link>
        </Button>
        <Button
          asChild
          variant="outline"
          className="w-full"
        >
          <Link href="/dashboard">
            <div className="flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Go to Dashboard
            </div>
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("there")

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
        <ProgressBar currentStep={step} />

        <AnimatePresence mode="wait">
          {step === 1 && (
            <WelcomeStep 
              key="welcome"
              name={name}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <PublicationSetupStep 
              key="setup"
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <SuccessStep 
              key="success"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 