'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import { createPublication } from "@/lib/actions/publications"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import Link from "next/link"
import { toast } from "sonner"

const AUDIENCES = [
  { value: 'startup-founders', label: 'Startup Founders' },
  { value: 'tech-enthusiasts', label: 'Tech Enthusiasts' },
  { value: 'business', label: 'Business Professionals' },
  { value: 'developers', label: 'Developers' },
  { value: 'marketers', label: 'Marketers' },
  { value: 'creators', label: 'Content Creators' },
  { value: 'other', label: 'Other' },
] as const

export default function NewPublicationPage() {
  const router = useRouter()
  const [audience, setAudience] = useState<string>('')

  const { mutate: createPublicationMutation, isLoading } = useMutation({
    mutationFn: async (formData: FormData) => {
      formData.append('audience', audience)
      const result = await createPublication(formData)
      return result
    },
    onSuccess: () => {
      toast.success('Publication created successfully', {
        description: 'Your publication has been created.',
        action: {
          label: 'Create Newsletter',
          onClick: () => router.push('/dashboard/newsletters/create')
        }
      })
      router.push('/dashboard')
    },
    onError: (error: Error) => {
      toast.error('Failed to create publication', {
        description: error.message || 'Please try again later.'
      })
    }
  })

  async function handleSubmit(formData: FormData) {
    if (!audience) {
      toast.error('Please select a target audience')
      return
    }
    createPublicationMutation(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              New Publication
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <form action={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Publication Name</Label>
                <Input
                  type="text"
                  name="name"
                  placeholder="e.g., Tech Weekly, Marketing Insights"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Target Audience</Label>
                <Select
                  value={audience}
                  onValueChange={setAudience}
                >
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

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  name="description"
                  placeholder="What's your publication about? This helps your team and subscribers understand its purpose."
                  className="h-24"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                asChild
                disabled={isLoading}
              >
                <Link href="/dashboard">
                  Cancel
                </Link>
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Publication"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
} 