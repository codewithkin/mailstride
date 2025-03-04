'use client'

import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

// Dynamically import the email editor
const UnlayerEmailEditor = dynamic(
  () => import('react-email-editor').then(mod => mod.default),
  { ssr: false }
)

interface EmailEditorProps {
  initialData: {
    subject: string
    content: string
    design: any
  }
  onSave: (data: any) => void
}

export function EmailEditor({ initialData, onSave }: EmailEditorProps) {
  const emailEditorRef = useRef<any>(null)
  const [subject, setSubject] = useState(initialData.subject)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    emailEditorRef.current?.editor?.exportHtml((data: any) => {
      const { design, html } = data
      onSave({
        subject,
        content: html,
        design
      })
      setIsLoading(false)
    })
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="subject">Email Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter your email subject"
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden h-[600px]">
        <UnlayerEmailEditor
          ref={emailEditorRef}
          onReady={() => {
            if (initialData.design) {
              emailEditorRef.current?.editor?.loadDesign(initialData.design)
            }
          }}
          options={{
            appearance: {
              theme: 'light',
              panels: {
                tools: {
                  dock: 'right'
                }
              }
            }
          }}
        />
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isLoading || !subject.trim()}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner />
              <span>Saving...</span>
            </div>
          ) : (
            'Next'
          )}
        </Button>
      </div>
    </div>
  )
} 