'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { EmailStatus, AudienceType } from "@prisma/client"
import { revalidatePath } from "next/cache"

interface SendEmailParams {
  subject: string
  content: string
  design: any
  audience: string[]
  newsletterId: string
}

export async function sendEmail({
  subject,
  content,
  design,
  audience,
  newsletterId
}: SendEmailParams) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  try {
    // Create the email record
    const email = await prisma.email.create({
      data: {
        subject,
        content,
        design,
        status: EmailStatus.SENDING,
        newsletterId,
        audience: {
          create: {
            type: AudienceType.MANUAL_LIST,
            emailList: audience
          }
        },
        analytics: {
          create: {
            opens: 0,
            uniqueOpens: 0,
            clicks: 0,
            uniqueClicks: 0,
            bounces: 0,
            complaints: 0
          }
        }
      }
    })

    // Queue the email for sending
    await queueEmailForSending(email.id)

    revalidatePath('/dashboard')
    return { success: true, emailId: email.id }
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

async function queueEmailForSending(emailId: string) {
  // TODO: Implement email queueing logic
  // This will be implemented when we set up the SMTP server
  return true
} 