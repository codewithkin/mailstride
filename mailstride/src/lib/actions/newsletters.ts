'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"

export async function createNewsletter(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const name = formData.get('name') as string
  const subject = formData.get('subject') as string
  const content = formData.get('content') as string
  const publicationId = formData.get('publicationId') as string
  const scheduledFor = formData.get('scheduledFor') as string | null
  const trackOpens = formData.get('trackOpens') === 'true'
  const trackClicks = formData.get('trackClicks') === 'true'

  if (!name || !subject || !content || !publicationId) {
    throw new Error("Required fields are missing")
  }

  try {
    // First create the newsletter
    const newsletter = await prisma.newsletter.create({
      data: {
        name,
        publicationId,
        emails: {
          create: {
            subject,
            content,
            scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
            analytics: {
              create: {
                opens: 0,
                uniqueOpens: 0,
                clicks: 0,
                uniqueClicks: 0,
                bounces: 0,
                unsubscribes: 0
              }
            }
          }
        }
      },
      include: {
        emails: true
      }
    })

    revalidatePath('/dashboard')
    return newsletter
  } catch (error) {
    console.error('Failed to create newsletter:', error)
    throw new Error('Failed to create newsletter')
  }
}

export async function getUserNewsletters(publicationId: string) {
  const session = await auth()
  if (!session?.user?.id) return []

  try {
    const newsletters = await prisma.newsletter.findMany({
      where: {
        publicationId
      },
      include: {
        emails: {
          include: {
            analytics: true
          }
        }
      }
    })

    return newsletters
  } catch (error) {
    console.error('Failed to fetch newsletters:', error)
    return []
  }
} 