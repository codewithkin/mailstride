import { redirect } from 'next/navigation'
import { confirmSubscription } from '@/lib/actions/newsletters'

export default async function ConfirmSubscriptionPage({
  searchParams
}: {
  searchParams: { token?: string }
}) {
  const token = searchParams.token

  if (!token) {
    redirect('/')
  }

  const result = await confirmSubscription(token)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">
            {result.success ? 'Subscription Confirmed!' : 'Confirmation Failed'}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {result.message}
          </p>
        </div>
      </div>
    </div>
  )
} 