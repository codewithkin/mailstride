'use client'

import { Newsletter } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { 
  EnvelopeIcon, 
  ChevronRightIcon,
  DocumentPlusIcon
} from '@heroicons/react/24/outline'
import Link from 'next/link'

interface NewsletterSelectorProps {
  newsletters: Newsletter[]
  onSelect: (newsletterId: string) => void
}

export function NewsletterSelector({ newsletters, onSelect }: NewsletterSelectorProps) {
  if (newsletters.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center flex flex-col justify-center items-center space-y-6 mt-12">
        <div className="bg-gray-50 rounded-full p-4 w-16 h-16 mx-auto">
          <DocumentPlusIcon className="w-8 h-8 text-gray-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-medium">No Newsletters Found</h3>
          <p className="text-gray-500">
            Create your first newsletter to start sending emails.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/newsletters/new">
            Create Newsletter
          </Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Select Newsletter</h2>
        <p className="text-gray-500">
          Choose which newsletter you want to send this email to
        </p>
      </div>

      <div className="grid gap-4">
        {newsletters.map((newsletter) => (
          <Card
            key={newsletter.id}
            className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => onSelect(newsletter.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-50 rounded-full p-3">
                  <EnvelopeIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-medium">{newsletter.name}</h3>
                  <p className="text-sm text-gray-500">
                    {newsletter.status === 'DRAFT' ? 'Draft' : 'Active'}
                  </p>
                </div>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" asChild>
          <Link href="/dashboard/newsletters/new">
            Create New Newsletter
          </Link>
        </Button>
      </div>
    </div>
  )
} 