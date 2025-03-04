'use client'

import { EmailComposer } from "@/components/email/email-composer"
import { useParams } from "next/navigation"

export default function ComposePage() {
  const params = useParams()
  const newsletterId = params.newsletterId as string

  return <EmailComposer newsletterId={newsletterId} />
} 