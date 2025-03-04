'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { getNewsletterSubscribers } from '@/lib/actions/newsletters'

interface AudienceStepProps {
  newsletterId: string
  onNext: (audience: string[]) => void
  onBack: () => void
}

export function AudienceStep({ newsletterId, onNext, onBack }: AudienceStepProps) {
  const [manualEmails, setManualEmails] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['newsletter-subscribers', newsletterId],
    queryFn: () => getNewsletterSubscribers(newsletterId)
  })

  const handleAllSubscribers = () => {
    if (subscribers) {
      onNext(subscribers.map(sub => sub.email))
    }
  }

  const handleManualList = () => {
    const emails = manualEmails
      .split(',')
      .map(email => email.trim())
      .filter(email => email.includes('@'))
    onNext(emails)
  }

  const handleCsvUpload = async () => {
    if (!file) return
    
    const text = await file.text()
    const emails = text
      .split('\n')
      .map(line => line.split(',')[0].trim())
      .filter(email => email.includes('@'))
    onNext(emails)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="all">All Subscribers</TabsTrigger>
          <TabsTrigger value="manual">Manual List</TabsTrigger>
          <TabsTrigger value="csv">CSV Upload</TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="all">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner className="w-8 h-8" />
                </div>
              ) : (
                <div className="space-y-4">
                  <h3 className="font-medium">
                    {subscribers?.length || 0} Total Subscribers
                  </h3>
                  <Button onClick={handleAllSubscribers}>
                    Select All Subscribers
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="manual">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <div>
                <Label>Email Addresses</Label>
                <Input
                  as="textarea"
                  value={manualEmails}
                  onChange={(e) => setManualEmails(e.target.value)}
                  placeholder="Enter email addresses, separated by commas"
                  className="h-32 mt-1"
                />
              </div>
              <Button onClick={handleManualList}>Continue</Button>
            </div>
          </TabsContent>

          <TabsContent value="csv">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <div>
                <Label>Upload CSV File</Label>
                <Input
                  type="file"
                  accept=".csv"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="mt-1"
                />
              </div>
              <Button onClick={handleCsvUpload} disabled={!file}>
                Upload and Continue
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Editor
        </Button>
      </div>
    </div>
  )
} 