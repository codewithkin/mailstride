import { prisma } from "@/prisma"
import { EmailRenderer } from "@/components/email/email-renderer"
import { notFound } from "next/navigation"

export default async function EmailPreviewPage({
  params: { emailId }
}: {
  params: { emailId: string }
}) {
  const email = await prisma.email.findUnique({
    where: { id: emailId }
  })

  if (!email) {
    notFound()
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1">
        <EmailRenderer design={email.design} readOnly />
      </div>
    </div>
  )
} 