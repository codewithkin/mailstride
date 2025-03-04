'use client'

import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useDropzone } from 'react-dropzone'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { ArrowLeftIcon, CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { getNewsletterSubscribers } from '@/lib/actions/newsletters'

interface AudienceStepProps {
  newsletterId: string
  onNext: (audience: string[]) => void
  onBack: () => void
}

export function AudienceStep({ newsletterId, onNext, onBack }: AudienceStepProps) {
  const [manualEmails, setManualEmails] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)

  const { data: subscribers, isLoading } = useQuery({
    queryKey: ['newsletter-subscribers', newsletterId],
    queryFn: () => getNewsletterSubscribers(newsletterId)
  })

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadError(null)
    const file = acceptedFiles[0]
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setUploadError('Please upload a CSV file')
      return
    }
    setFile(file)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1,
    multiple: false
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
    
    try {
      const text = await file.text()
      const emails = text
        .split('\n')
        .map(line => line.split(',')[0].trim())
        .filter(email => email.includes('@'))
      onNext(emails)
    } catch (error) {
      setUploadError('Failed to read CSV file')
    }
  }

  const handleNext = () => {
    if (subscribers) {
      onNext(subscribers.map(sub => sub.email))
    }
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
              <Button onClick={handleManualList}>Next</Button>
            </div>
          </TabsContent>

          <TabsContent value="csv">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <div
                {...getRootProps()}
                className={`
                  border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
                  transition-colors duration-200
                  ${isDragActive 
                    ? 'border-indigo-500 bg-indigo-50' 
                    : 'border-gray-300 hover:border-gray-400'
                  }
                `}
              >
                <input {...getInputProps()} />
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                    <CloudArrowUpIcon className="w-6 h-6 text-indigo-600" />
                  </div>
                  {file ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-sm font-medium text-gray-900">
                          {file.name}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setFile(null)
                          }}
                          className="text-gray-500 hover:text-gray-700"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Click to replace or drag and drop a new file
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">
                        Drop your CSV file here, or click to browse
                      </p>
                      <p className="text-xs text-gray-500">
                        Your CSV should have email addresses in the first column
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {uploadError && (
                <p className="text-sm text-red-600 mt-2">{uploadError}</p>
              )}

              <Button 
                onClick={handleCsvUpload} 
                disabled={!file}
                className="w-full"
              >
                {file ? 'Upload and Continue' : 'Select a CSV File'}
              </Button>
            </div>
          </TabsContent>
        </div>
      </Tabs>

      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back
        </Button>
        <Button onClick={handleNext}>Next</Button>
      </div>
    </div>
  )
} 