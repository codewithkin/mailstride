'use client'

import { useState } from "react"
import { useQuery, useMutation } from "@tanstack/react-query"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeftIcon, 
  EnvelopeIcon,
  ClockIcon,
  Cog6ToothIcon,
  CheckCircleIcon,
  XCircleIcon
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { getUserPublications } from "@/lib/actions/publications"
import { createNewsletter } from "@/lib/actions/newsletters"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function NewNewsletter() {
  const [date, setDate] = useState<Date>()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const router = useRouter()

  // Query for fetching publications
  const { data: publications, isLoading: loadingPublications } = useQuery({
    queryKey: ['publications'],
    queryFn: getUserPublications
  })

  // Mutation for creating newsletter
  const { mutate: createNewsletterMutation, isLoading, isError, error } = useMutation({
    mutationFn: async (formData: FormData) => {
      const result = await createNewsletter(formData)
      return result
    },
    onSuccess: () => {
      toast.success('Newsletter created successfully', {
        description: 'Your newsletter has been created and is ready to use.',
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
                  <div>
                    <Label>Publication</Label>
                    <Select name="publicationId" required>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={loadingPublications ? "Loading publications..." : "Select a publication"} />
                      </SelectTrigger>
                      <SelectContent>
                        {publications?.map((pub) => (
                          <SelectItem key={pub.id} value={pub.id}>
                            {pub.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {!publications?.length && !loadingPublications && (
                      <p className="mt-1.5 text-sm text-yellow-600">
                        You need to create a publication first
                      </p>
                    )}
                  </div>

                  <div>
                    <Label>Newsletter Name</Label>
                    <Input 
                      name="name"
                      placeholder="e.g., Weekly Tech Updates, Monthly Marketing Tips"
                      className="mt-1.5"
                      required
                    />
                    <p className="mt-1.5 text-sm text-gray-500">
                      This will help you organize your emails under a specific category
                    </p>
                  </div>

                  <div>
                    <Label>First Email Subject</Label>
                    <Input 
                      name="subject"
                      placeholder="Enter your email subject"
                      className="mt-1.5"
                      required
                    />
                  </div>

                  <div>
                    <Label>Content</Label>
                    <Textarea 
                      name="content"
                      placeholder="Write your email content..."
                      className="mt-1.5 min-h-[300px]"
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
                        name="schedule"
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
                        <input 
                          type="hidden" 
                          name="scheduledFor" 
                          value={date?.toISOString() ?? ''} 
                        />
                      </motion.div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <Label>Tracking</Label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-4">
                        <Switch id="track-opens" name="trackOpens" defaultChecked />
                        <Label htmlFor="track-opens" className="font-normal">
                          Track opens
                        </Label>
                      </div>
                      <div className="flex items-center gap-4">
                        <Switch id="track-clicks" name="trackClicks" defaultChecked />
                        <Label htmlFor="track-clicks" className="font-normal">
                          Track clicks
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>

            <div className="border-t border-gray-200 p-6 bg-gray-50/50">
              <AnimatePresence>
                {isError && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200"
                  >
                    <div className="flex items-center gap-2 text-red-700">
                      <XCircleIcon className="h-5 w-5" />
                      <p className="text-sm">
                        {error?.message || 'Failed to create newsletter. Please try again.'}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-end gap-3">
                <Button 
                  variant="outline" 
                  disabled={isLoading || loadingPublications}
                >
                  Save as Draft
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading || loadingPublications || !publications?.length}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  {isLoading ? (
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