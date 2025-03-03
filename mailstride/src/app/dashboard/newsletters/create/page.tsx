'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useQuery, useMutation } from "@tanstack/react-query"
import { motion } from "framer-motion"
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
import { 
  ArrowLeftIcon, 
  EnvelopeIcon,
  ClockIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
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
  const [date, setDate] = useState<Date>()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [selectedPublication, setSelectedPublication] = useState<string>('')

  const { mutate: createNewsletterMutation, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      formData.append('publicationId', selectedPublication)
      if (date) {
        formData.append('scheduledFor', date.toISOString())
      }
      const result = await createNewsletter(formData)
      return result
    },
    onSuccess: () => {
      toast.success('Newsletter created successfully', {
        description: 'Your newsletter has been created.',
        action: {
          label: 'View',
          onClick: () => router.push('/dashboard/newsletters')
        }
      })
      router.push('/dashboard/newsletters')
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
        <form action={handleSubmit}>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <Tabs defaultValue="compose" className="w-full">
              <TabsList className="w-full justify-start border-b rounded-none h-auto gap-4 px-4">
                <TabsTrigger value="compose" className="py-3 px-6">
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  Compose
                </TabsTrigger>
                <TabsTrigger value="settings" className="py-3 px-6">
                  <Cog6ToothIcon className="h-5 w-5 mr-2" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="compose" className="p-6 space-y-6">
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

                  <div className="space-y-2">
                    <Label>First Email Subject</Label>
                    <Input
                      name="subject"
                      placeholder="Enter your email subject"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      name="content"
                      placeholder="Write your email content..."
                      className="min-h-[300px]"
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="p-6 space-y-6">
                <div className="space-y-6">
                  <div>
                    <Label>Scheduling</Label>
                    <div className="mt-1.5 flex items-center gap-4">
                      <Switch
                        id="schedule"
                        onCheckedChange={(checked) => setShowAdvanced(checked)}
                      />
                      <Label htmlFor="schedule" className="font-normal">
                        Schedule for later
                      </Label>
                    </div>
                    {showAdvanced && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4"
                      >
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !date && "text-muted-foreground"
                              )}
                            >
                              <ClockIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Pick a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </motion.div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="border-t border-gray-200 p-6 bg-gray-50/50">
              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  disabled={isPending}
                >
                  Save as Draft
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
            </div>
          </div>
        </form>
      </main>
    </div>
  )
} 