'use client'

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { EmailStatus, AudienceType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { queueEmail } from "@/lib/queue/email"

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
      },
      include: {
        newsletter: {
          include: {
            publication: true
          }
        }
      }
    })

    // Queue the email for sending
    await queueEmail(email.id)

    revalidatePath('/dashboard')
    return { success: true, emailId: email.id }
  } catch (error) {
    console.error('Failed to send email:', error)
    throw error
  }
}

export async function getNewsletterEmails(newsletterId: string) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  return prisma.email.findMany({
    where: {
      newsletterId,
      newsletter: {
        publication: {
          OR: [
            { ownerId: session.user.id },
            {
              members: {
                some: {
                  userId: session.user.id
                }
              }
            }
          ]
        }
      }
    },
    include: {
      analytics: true,
      audience: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
} 