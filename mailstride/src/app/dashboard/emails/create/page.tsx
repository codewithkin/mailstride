'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { EmailComposer } from '@/components/email/email-composer'
import { NewsletterSelector } from '@/components/email/newsletter-selector'
import { getUserNewsletters } from '@/lib/actions/newsletters'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

export default function CreateEmailPage() {
  const [selectedNewsletterId, setSelectedNewsletterId] = useState<string | null>(null)

  const { data: newsletters, isLoading } = useQuery({
    queryKey: ['user-newsletters'],
    queryFn: getUserNewsletters
  })

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner className="w-8 h-8" />
      </div>
    )
  }

  if (!selectedNewsletterId) {
    return (
      <NewsletterSelector 
        newsletters={newsletters || []}
        onSelect={setSelectedNewsletterId}
      />
    )
  }

  return <EmailComposer newsletterId={selectedNewsletterId} />
} 