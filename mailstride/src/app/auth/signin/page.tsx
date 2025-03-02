'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { FcGoogle } from 'react-icons/fc'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { authenticateWithEmail, authenticateWithGoogle } from '@/lib/actions'
import { useFormStatus } from 'react-dom'

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
          <span>Signing in...</span>
        </div>
      ) : (
        'Sign in with Email'
      )}
    </Button>
  )
}

export default function SignIn() {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  async function onSubmit(formData: FormData) {
    try {
      await authenticateWithEmail(formData)
      // No need to handle success case as it will redirect
    } catch (error) {
      // Only log actual errors, not redirect "errors"
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        console.error('Sign in error:', error)
      }
    }
  }

  async function onGoogleSignIn() {
    setIsGoogleLoading(true)
    try {
      await authenticateWithGoogle()
      // No need to handle success case as it will redirect
    } catch (error) {
      // Only log actual errors, not redirect "errors"
      if (error instanceof Error && error.message !== 'NEXT_REDIRECT') {
        console.error('Google sign in error:', error)
      }
    } finally {
      setIsGoogleLoading(false)
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
            Welcome back
          </motion.h2>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full"
            onClick={onGoogleSignIn}
            disabled={isGoogleLoading}
          >
            {isGoogleLoading ? (
              <div className="flex items-center gap-2">
                <LoadingSpinner />
                <span>Connecting to Google...</span>
              </div>
            ) : (
              <>
                <FcGoogle className="mr-2 h-5 w-5" />
                Continue with Google
              </>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <form action={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="relative">
                <Input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="alan@turing.com"
                  className="pr-10"
                />

                <EnvelopeIcon className="h-5 w-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>

            <SubmitButton />
          </form>
        </div>
      </motion.div>
    </div>
  )
} 