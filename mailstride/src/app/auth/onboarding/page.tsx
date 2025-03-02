'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { useState } from "react"
import { useFormStatus } from "react-dom"
import { updateProfile } from "@/lib/actions"

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner />
          <span>Saving...</span>
        </div>
      ) : (
        'Complete Setup'
      )}
    </Button>
  )
}

export default function Onboarding() {
  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    try {
      await updateProfile(formData)
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
        <div className="text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-slate-800"
          >
            Welcome to Mailstride
          </motion.h2>
          <p className="mt-2 text-gray-600">Let's complete your profile</p>
        </div>

        <form action={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Full name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                required
                placeholder="Alan Turing"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <Input
                type="text"
                id="username"
                name="username"
                required
                placeholder="alanturing"
              />
            </div>
          </div>

          <SubmitButton />
        </form>
      </motion.div>
    </div>
  )
} 