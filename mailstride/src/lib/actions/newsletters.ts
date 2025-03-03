'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"
import { EmailStatus } from "@prisma/client"

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

  if (!name || !subject || !content || !publicationId) {
    throw new Error("Missing required fields")
  }

  try {
    // First create the newsletter
    const newsletter = await prisma.newsletter.create({
      data: {
        name,
        publicationId,
        status: EmailStatus.DRAFT,
        // Create the first email for this newsletter
        emails: {
          create: {
            subject,
            content,
            status: EmailStatus.DRAFT,
            scheduledFor: scheduledFor ? new Date(scheduledFor) : null
          }
        }
      },
      include: {
        emails: true,
        publication: {
          select: {
            name: true,
            slug: true
          }
        }
      }
    })

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/newsletters')
    return newsletter
  } catch (error) {
    console.error('Failed to create newsletter:', error)
    if (error instanceof Error) {
      throw new Error(error.message)
    }
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