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
  const publicationId = formData.get('publicationId') as string

  if (!name || !publicationId) {
    throw new Error("Missing required fields")
  }

  try {
    const newsletter = await prisma.newsletter.create({
      data: {
        name,
        publicationId,
        status: EmailStatus.DRAFT,
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

export async function getUserNewsletters() {
  const session = await auth()
  if (!session?.user?.id) throw new Error("User not logged in");

  try {
    const newsletters = await prisma.newsletter.findMany({
      where: {
        publication: {
          ownerId: session.user.id
        }
      },
      include: {
        emails: {
          include: {
            analytics: true
          }
        }
      }
    })

    console.log(newsletters)

    return newsletters
  } catch (error) {
    console.error('Failed to fetch newsletters:', error)
    return []
  }
}

export async function createEmail(newsletterId: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const subject = formData.get('subject') as string
  const content = formData.get('content') as string
  const design = formData.get('design') as string
  const scheduledFor = formData.get('scheduledFor') as string | null

  if (!subject || !content) {
    throw new Error("Missing required fields")
  }

  try {
    const email = await prisma.email.create({
      data: {
        subject,
        content,
        design,
        status: EmailStatus.DRAFT,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        newsletterId
      }
    })

    revalidatePath('/dashboard')
    revalidatePath('/dashboard/newsletters')
    revalidatePath(`/dashboard/newsletters/${newsletterId}`)
    return email
  } catch (error) {
    console.error('Failed to create email:', error)
    throw error
  }
}

export async function addSubscriber(newsletterId: string, formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const email = formData.get('email') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  if (!email) {
    throw new Error("Email is required")
  }

  try {
    const subscriber = await prisma.subscriber.upsert({
      where: { email },
      update: {
        firstName,
        lastName,
        newsletters: {
          connect: { id: newsletterId }
        }
      },
      create: {
        email,
        firstName,
        lastName,
        newsletters: {
          connect: { id: newsletterId }
        }
      }
    })

    revalidatePath(`/dashboard/newsletters/${newsletterId}/subscribers`)
    return subscriber
  } catch (error) {
    console.error('Failed to add subscriber:', error)
    throw error
  }
}

export async function getNewsletterSubscribers(newsletterId: string) {
  const session = await auth()
  if (!session?.user?.id) return []

  try {
    const newsletter = await prisma.newsletter.findUnique({
      where: { id: newsletterId },
      include: {
        subscribers: {
          where: { 
            subscribed: true
          },
          orderBy: { 
            createdAt: 'desc' 
          }
        }
      }
    })

    return newsletter?.subscribers || []
  } catch (error) {
    console.error('Failed to fetch subscribers:', error)
    return []
  }
} 