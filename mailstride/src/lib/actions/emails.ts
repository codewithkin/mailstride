'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { EmailStatus, AudienceType } from "@prisma/client"
import { revalidatePath } from "next/cache"
import { sendEmailToList } from "@/lib/email/send"

interface CreateDraftEmailParams {
  subject: string
  content: string
  design: any
  newsletterId: string
}

export async function createDraftEmail({
  subject,
  content,
  design,
  newsletterId
}: CreateDraftEmailParams) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  try {
    const email = await prisma.email.create({
      data: {
        subject,
        content,
        design,
        status: EmailStatus.DRAFT,
        newsletterId,
        analytics: {
          create: {
            opens: 0,
            uniqueOpens: 0,
            clicks: 0,
            uniqueClicks: 0,
            bounces: 0,
            complaints: 0,
            unsubscribes: 0
          }
        }
      },
      include: {
        analytics: true,
        newsletter: true
      }
    })

    revalidatePath('/dashboard')
    return email
  } catch (error) {
    console.error('Failed to create draft email:', error)
    throw error
  }
}

export async function updateEmailAudience(emailId: string, audience: string[]) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  try {
    const email = await prisma.email.update({
      where: { id: emailId },
      data: {
        audience: {
          create: {
            type: AudienceType.MANUAL_LIST,
            emailList: audience
          }
        }
      },
      include: {
        audience: true,
        newsletter: true
      }
    })

    revalidatePath('/dashboard')
    return email
  } catch (error) {
    console.error('Failed to update email audience:', error)
    throw error
  }
}

export async function sendEmail(emailId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error("Not authenticated")

  try {
    // First update email status to sending
    const email = await prisma.email.update({
      where: { id: emailId },
      data: {
        status: EmailStatus.SENDING,
        sentAt: new Date()
      },
      include: {
        audience: true,
        newsletter: {
          include: {
            publication: true
          }
        }
      }
    })

    // Send the emails
    await sendEmailToList({
      subject: email.subject,
      content: email.content,
      recipients: email.audience?.emailList || [],
      from: `${email.newsletter.publication.name} <noreply@yourdomain.com>`
    })

    // Update status to sent
    await prisma.email.update({
      where: { id: emailId },
      data: {
        status: EmailStatus.SENT
      }
    })

    revalidatePath('/dashboard')
    return email
  } catch (error) {
    // Update status to failed if there's an error
    await prisma.email.update({
      where: { id: emailId },
      data: {
        status: EmailStatus.FAILED
      }
    })
    
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