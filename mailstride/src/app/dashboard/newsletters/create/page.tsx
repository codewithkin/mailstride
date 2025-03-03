'use client'

import { useQuery } from "@tanstack/react-query"
import { getUserPublications } from "@/lib/actions/publications"
import { PlusCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

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
  // Move the form logic here
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ... rest of your existing form code ... */}
    </div>
  )
} 