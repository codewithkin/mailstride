import { Skeleton } from "@/components/ui/skeleton"

export function LoadingCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-8" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="mt-4 h-8 w-24" />
      <Skeleton className="mt-1 h-4 w-32" />
    </div>
  )
} 