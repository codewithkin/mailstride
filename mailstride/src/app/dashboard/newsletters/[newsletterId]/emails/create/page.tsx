'use client'

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useMutation } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import dynamic from "next/dynamic"
import { 
  ArrowLeftIcon, 
  ClockIcon,
  EyeIcon
} from "@heroicons/react/24/outline"
import Link from "next/link"
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { createEmail } from "@/lib/actions/newsletters"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { use } from "react"

// Create a dynamic import for EmailEditor with SSR disabled
const EmailEditor = dynamic(() => import('react-email-editor').then(mod => mod.default), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[700px] bg-gray-50">
      <LoadingSpinner className="h-6 w-6" />
    </div>
  )
})

interface CreateEmailPageProps {
  params: Promise<{ newsletterId: string }>
}

const defaultTemplate = {
  "body": {
    "rows": [],
    "values": {
      "backgroundColor": "#FFFFFF",
      "backgroundImage": {
        "url": "",
        "fullWidth": true,
        "repeat": false,
        "center": true,
        "cover": false
      },
      "padding": "0px",
      "columnsBackgroundColor": "#ffffff"
    }
  }
}

// Update the type for the editor ref
type UnlayerType = {
  loadDesign: (design: any) => void;
  exportHtml: (callback: (data: { design: any; html: string }) => void) => void;
  saveDesign: (callback: (design: any) => void) => void;
}

export default function CreateEmailPage({ params }: CreateEmailPageProps) {
  const { newsletterId } = use(params)
  const router = useRouter()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const emailEditorRef = useRef<{ editor: UnlayerType } | null>(null)
  const [date, setDate] = useState<Date>()
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [subject, setSubject] = useState('')
  const [previewMode, setPreviewMode] = useState(false)

  const { mutate: createEmailMutation, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      return new Promise((resolve, reject) => {
        if (!emailEditorRef.current?.editor) {
          reject(new Error('Editor not initialized'))
          return
        }

        emailEditorRef.current.editor.exportHtml((data) => {
          const { html, design } = data
          formData.append('content', html)
          formData.append('design', JSON.stringify(design))
          if (date) {
            formData.append('scheduledFor', date.toISOString())
          }
          try {
            const result = createEmail(newsletterId, formData)
            resolve(result)
          } catch (error) {
            reject(error)
          }
        })
      })
    },
    onSuccess: () => {
      toast.success('Email created successfully', {
        description: 'Your email has been created and is ready to send.',
        action: {
          label: 'View',
          onClick: () => router.push(`/dashboard/newsletters/${newsletterId}`)
        }
      })
      router.push(`/dashboard/newsletters/${newsletterId}`)
    },
    onError: (error: Error) => {
      toast.error('Failed to create email', {
        description: error.message || 'Please try again later.'
      })
    }
  })

  const onReady = (editor: UnlayerType) => {
    emailEditorRef.current = { editor }
    setEditorLoaded(true)
    editor.loadDesign(defaultTemplate)
  }

  const exportHtml = () => {
    if (!emailEditorRef.current?.editor) return

    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data
      console.log('exportHtml', html)
    })
  }

  async function handleSubmit(formData: FormData) {
    if (!subject.trim()) {
      toast.error('Please enter a subject')
      return
    }
    formData.append('subject', subject)
    createEmailMutation(formData)
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="flex-none bg-white border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href={`/dashboard/newsletters/${newsletterId}`}>
                  <ArrowLeftIcon className="h-5 w-5" />
                </Link>
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">
                New Email
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <EyeIcon className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                variant="outline"
                onClick={exportHtml}
              >
                Export HTML
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex-none bg-white border-b border-gray-200">
        <form action={handleSubmit} className="px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Enter your email subject"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Schedule</Label>
              <div className="flex items-center gap-4">
                <Switch
                  id="schedule"
                  checked={showAdvanced}
                  onCheckedChange={setShowAdvanced}
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
                  className="mt-2"
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
                    <PopoverContent className="w-auto p-0" align="start">
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

          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant="outline"
              asChild
              disabled={isPending}
            >
              <Link href={`/dashboard/newsletters/${newsletterId}`}>
                Cancel
              </Link>
            </Button>
            <Button
              type="submit"
              disabled={isPending || !subject.trim()}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <LoadingSpinner />
                  <span>Creating...</span>
                </div>
              ) : (
                "Create Email"
              )}
            </Button>
          </div>
        </form>
      </div>

      <div className="flex-1 overflow-hidden">
        <EmailEditor 
          ref={emailEditorRef}
          onReady={onReady}
          style={{ 
            height: 'calc(100vh - 200px)',
            margin: 0,
            padding: 0,
            border: 'none'
          }}
          options={{
            appearance: {
              theme: 'light',
              panels: {
                tools: {
                  dock: 'right'
                }
              }
            },
            tools: {
              button: { enabled: true },
              divider: { enabled: true },
              form: { enabled: true },
              heading: { enabled: true },
              image: { enabled: true },
              text: { enabled: true },
              social: { enabled: true },
              timer: { enabled: true },
              video: { enabled: true }
            },
            displayMode: 'email',
            minHeight: '100%'
          }}
        />
      </div>
    </div>
  )
} 