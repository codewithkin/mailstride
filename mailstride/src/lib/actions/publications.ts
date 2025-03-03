'use server'

import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createPublication(formData: FormData) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error("Not authenticated")
  }

  const name = formData.get('newsletterName') as string
  const audience = formData.get('audience') as string
  const description = formData.get('description') as string | null

  // Generate a slug from the name
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

  try {
    const publication = await prisma.publication.create({
      data: {
        name,
        audience,
        description,
        slug,
        ownerId: session.user.id,
        members: {
          create: {
            userId: session.user.id,
            role: 'OWNER'
          }
        }
      }
    })

    revalidatePath('/dashboard')
    return publication
  } catch (error) {
    console.error('Failed to create publication:', error)
    throw new Error('Failed to create publication')
  }
}

export async function getUserPublications() {
  const session = await auth()
  if (!session?.user?.id) return []

  try {
    const publications = await prisma.publication.findMany({
      where: {
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
      },
      include: {
        members: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          }
        },
        _count: {
          select: {
            subscribers: true,
            emails: true
          }
        }
      }
    })

    return publications
  } catch (error) {
    console.error('Failed to fetch publications:', error)
    return []
  }
} 