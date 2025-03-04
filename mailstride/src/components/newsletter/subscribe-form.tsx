'use client'

import { useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { subscribeToNewsletter } from '@/lib/actions/newsletters'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'

function SubmitButton() {
  const { pending } = useFormStatus()
  
  return (
    <Button 
      type="submit" 
      className="w-full"
      disabled={pending}
    >
      {pending ? (
        <div className="flex items-center gap-2">
          <LoadingSpinner className="h-4 w-4" />
          <span>Subscribing...</span>
        </div>
      ) : (
        'Subscribe'
      )}
    </Button>
  )
}

export function SubscribeForm({ newsletterId }: { newsletterId: string }) {
  const [state, formAction] = useFormState(subscribeToNewsletter.bind(null, newsletterId), {
    success: false,
    message: null
  })

  if (state.success) {
    return (
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon className="h-5 w-5 text-green-400" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">
              Subscription successful!
            </h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Thank you for subscribing. Check your email for confirmation.</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <Label htmlFor="email">Email address</Label>
        <Input
          type="email"
          name="email"
          id="email"
          required
          placeholder="you@example.com"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="firstName">First name (optional)</Label>
        <Input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="John"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="lastName">Last name (optional)</Label>
        <Input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Doe"
          className="mt-1"
        />
      </div>

      {state.message && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Subscription failed
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{state.message}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <SubmitButton />
    </form>
  )
} 