'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ArrowLeftIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { toast } from "sonner"
import { getUserPublications } from "@/lib/actions/publications"
import { createNewsletter } from "@/lib/actions/newsletters"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import { buttonVariants } from "@/components/ui/button"

export default function CreateNewsletterPage() {
  const { data: publications, isLoading } = useQuery({
    queryKey: ['publications'],
    queryFn: getUserPublications
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner className="h-6 w-6" />
      </div>
    )
  }

  return (
    <div>
      {!publications?.length ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
          <p className="text-muted-foreground">
            You need to create a publication first before creating a newsletter.
          </p>
          <Link
            href="/dashboard/publications/new"
            className={buttonVariants({ variant: "default" })}
          >
            <div className="flex items-center justify-center gap-2">
              <PlusCircleIcon className="h-4 w-4" />
              Create Your First Publication
            </div>
          </Link>
        </div>
      ) : (
        <CreateNewsletterForm publications={publications} />
      )}
    </div>
  )
}

function CreateNewsletterForm({ publications }: { publications: any[] }) {
  const router = useRouter()
  const [selectedPublication, setSelectedPublication] = useState<string>('')

  const { mutate: createNewsletterMutation, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      formData.append('publicationId', selectedPublication)
      const result = await createNewsletter(formData)
      return result
    },
    onSuccess: (newsletter) => {
      toast.success('Newsletter created successfully', {
        description: 'Now create your first email.',
        action: {
          label: 'Create Email',
          onClick: () => router.push(`/dashboard/newsletters/${newsletter.id}/emails/create`)
        }
      })
      router.push(`/dashboard/newsletters/${newsletter.id}/emails/create`)
    },
    onError: (error: Error) => {
      toast.error('Failed to create newsletter', {
        description: error.message || 'Please try again later.'
      })
    }
  })

  async function handleSubmit(formData: FormData) {
    if (!selectedPublication) {
      toast.error('Please select a publication')
      return
    }
    createNewsletterMutation(formData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/dashboard">
                <ArrowLeftIcon className="h-5 w-5" />
              </Link>
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">
              New Newsletter
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <form action={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Publication</Label>
                <Select
                  value={selectedPublication}
                  onValueChange={setSelectedPublication}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a publication" />
                  </SelectTrigger>
                  <SelectContent>
                    {publications.map((pub) => (
                      <SelectItem key={pub.id} value={pub.id}>
                        {pub.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Newsletter Name</Label>
                <Input
                  name="name"
                  placeholder="e.g., Weekly Updates, Monthly Digest"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                asChild
                disabled={isPending}
              >
                <Link href="/dashboard">
                  Cancel
                </Link>
              </Button>
              <Button
                type="submit"
                disabled={isPending || !selectedPublication}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
              >
                {isPending ? (
                  <div className="flex items-center gap-2">
                    <LoadingSpinner />
                    <span>Creating...</span>
                  </div>
                ) : (
                  "Create Newsletter"
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </main>
    </div>
  )
} 