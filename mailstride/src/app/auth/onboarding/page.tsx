'use client'

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { updateProfile } from "@/lib/actions"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useDropzone } from 'react-dropzone'
import { ChevronRightIcon } from "@heroicons/react/24/outline"

const AUDIENCES = [
  { value: 'startup-founders', label: 'Startup Founders' },
  { value: 'tech-enthusiasts', label: 'Tech Enthusiasts' },
  { value: 'personal-blog', label: 'Personal Blog' },
  { value: 'developers', label: 'Developers' },
  { value: 'marketers', label: 'Marketers' },
  { value: 'other', label: 'Other' },
]

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
        style={{ width: `${(currentStep / 4) * 100}%` }}
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
          Welcome to MailStride 🎉 Let's launch your newsletter in under 2 minutes.
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
        <Button variant="outline" onClick={onNext}>
          I'll do this later
        </Button>
      </div>
    </motion.div>
  )
}

function NewsletterSetupStep({ onNext }: { onNext: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Newsletter Name
          </label>
          <Input
            type="text"
            name="newsletterName"
            placeholder="The Growth Hustle"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Choose your audience
          </label>
          <Select name="audience">
            <SelectTrigger>
              <SelectValue placeholder="Select your target audience" />
            </SelectTrigger>
            <SelectContent>
              {AUDIENCES.map((audience) => (
                <SelectItem key={audience.value} value={audience.value}>
                  {audience.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="p-4 bg-gray-50 rounded-xl">
          <p className="text-sm text-gray-600">
            Preview: Introducing <span className="font-medium">The Growth Hustle</span> – 
            delivering weekly insights on Startup Trends.
          </p>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
      >
        Next: Add Subscribers
        <ChevronRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  )
}

function SubscribersStep({ onNext }: { onNext: () => void }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'text/csv': ['.csv']
    },
    onDrop: (files) => console.log(files)
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-purple-400 bg-purple-50' : 'border-gray-300 hover:border-gray-400'}`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            Drop your CSV file here, or click to select
          </p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Or manually add emails
          </label>
          <Textarea
            placeholder="Enter email addresses (one per line)"
            className="h-32"
          />
        </div>

        <div className="p-4 bg-indigo-50 rounded-xl">
          <p className="text-sm text-indigo-600">
            🎁 Start strong! Adding subscribers now unlocks 500 extra free emails this month.
          </p>
        </div>
      </div>

      <Button
        onClick={onNext}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
      >
        Next: Create Your First Email
        <ChevronRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  )
}

function WelcomeEmailStep({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Subject
          </label>
          <Input
            type="text"
            name="emailSubject"
            defaultValue="Welcome to The Growth Hustle!"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Email Content
          </label>
          <Textarea
            defaultValue={`Hey there! 👋

Thanks for subscribing to The Growth Hustle. I'm excited to share weekly insights that will help you grow your startup.

Reply to this email and let me know what topics you're most interested in!

Best,
[Your Name]`}
            className="h-48"
          />
        </div>

        <div className="p-4 bg-green-50 rounded-xl">
          <p className="text-sm text-green-600">
            🚀 Almost there! Your first email will go out in seconds.
          </p>
        </div>
      </div>

      <Button
        onClick={onComplete}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
      >
        Send My First Email
        <ChevronRightIcon className="w-4 h-4 ml-2" />
      </Button>
    </motion.div>
  )
}

export default function Onboarding() {
  const [step, setStep] = useState(1)
  const [name, setName] = useState("there")

  async function handleComplete() {
    try {
      // Here you would save all the collected data
      await updateProfile(new FormData())
    } catch (error) {
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        console.error('Profile update error:', error)
      }
    }
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
            <NewsletterSetupStep 
              key="setup"
              onNext={() => setStep(3)}
            />
          )}
          {step === 3 && (
            <SubscribersStep 
              key="subscribers"
              onNext={() => setStep(4)}
            />
          )}
          {step === 4 && (
            <WelcomeEmailStep 
              key="welcome-email"
              onComplete={handleComplete}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
} 