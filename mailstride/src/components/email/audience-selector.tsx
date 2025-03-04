'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useQuery } from '@tanstack/react-query'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { 
  UsersIcon, 
  UserPlusIcon, 
  TableCellsIcon,
  AdjustmentsHorizontalIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline'
import { getNewsletterSubscribers } from '@/lib/actions/newsletters'

interface AudienceSelectorProps {
  newsletterId: string
  onSelect: (audience: string[]) => void
  onBack: () => void
}

export function AudienceSelector({ newsletterId, onSelect, onBack }: AudienceSelectorProps) {
  const [selectedEmails, setSelectedEmails] = useState<string[]>([])
  const [manualEmails, setManualEmails] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['newsletter-subscribers', newsletterId],
    queryFn: () => getNewsletterSubscribers(newsletterId)
  })

  const handleAllSubscribers = () => {
    if (subscribers) {
      onSelect(subscribers.map(sub => sub.email))
    }
  }

  const handleManualList = () => {
    const emails = manualEmails
      .split(',')
      .map(email => email.trim())
      .filter(email => email.includes('@'))
    onSelect(emails)
  }

  const handleCsvUpload = async () => {
    if (!file) return
    
    const text = await file.text()
    const emails = text
      .split('\n')
      .map(line => line.split(',')[0].trim()) // Assumes email is first column
      .filter(email => email.includes('@'))
    onSelect(emails)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid grid-cols-4 gap-4 bg-transparent h-auto">
          <TabsTrigger 
            value="all"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 h-24"
          >
            <div className="text-center space-y-2">
              <UsersIcon className="h-6 w-6 mx-auto" />
              <div className="text-sm">All Subscribers</div>
            </div>
          </TabsTrigger>
          
          <TabsTrigger 
            value="manual"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 h-24"
          >
            <div className="text-center space-y-2">
              <UserPlusIcon className="h-6 w-6 mx-auto" />
              <div className="text-sm">Manual List</div>
            </div>
          </TabsTrigger>

          <TabsTrigger 
            value="csv"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 h-24"
          >
            <div className="text-center space-y-2">
              <TableCellsIcon className="h-6 w-6 mx-auto" />
              <div className="text-sm">Import CSV</div>
            </div>
          </TabsTrigger>

          <TabsTrigger 
            value="segment"
            className="data-[state=active]:bg-indigo-50 data-[state=active]:text-indigo-600 h-24"
          >
            <div className="text-center space-y-2">
              <AdjustmentsHorizontalIcon className="h-6 w-6 mx-auto" />
              <div className="text-sm">Segment</div>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="all" className="m-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              {isLoading ? (
                <div className="flex justify-center py-8">
                  <LoadingSpinner />
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

          <TabsContent value="manual" className="m-0">
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
              <Button onClick={handleManualList}>
                Continue
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="csv" className="m-0">
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

          <TabsContent value="segment" className="m-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <p className="text-gray-500">Coming soon...</p>
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