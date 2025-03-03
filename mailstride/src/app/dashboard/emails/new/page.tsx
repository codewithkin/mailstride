'use client'

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  ArrowLeftIcon, 
  EnvelopeIcon,
  ClockIcon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function NewNewsletter() {
  const [date, setDate] = useState<Date>()
  const [showAdvanced, setShowAdvanced] = useState(false)

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
                  <Label>Newsletter Name</Label>
                  <Input 
                    placeholder="e.g., Weekly Tech Updates, Monthly Marketing Tips"
                    className="mt-1.5"
                  />
                  <p className="mt-1.5 text-sm text-gray-500">
                    This will help you organize your emails under a specific category
                  </p>
                </div>
                <div>
                  <Label>First Email Subject</Label>
                  <Input 
                    placeholder="Enter your email subject"
                    className="mt-1.5"
                  />
                </div>
                <div>
                  <Label>Content</Label>
                  <Textarea 
                    placeholder="Write your email content..."
                    className="mt-1.5 min-h-[300px]"
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

                <div className="space-y-4">
                  <Label>Tracking</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <Switch id="track-opens" defaultChecked />
                      <Label htmlFor="track-opens" className="font-normal">
                        Track opens
                      </Label>
                    </div>
                    <div className="flex items-center gap-4">
                      <Switch id="track-clicks" defaultChecked />
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
            <div className="flex justify-end gap-3">
              <Button variant="outline">
                Save as Draft
              </Button>
              <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
                Create Newsletter
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 