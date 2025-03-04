'use server'

import { prisma } from "@/prisma"
import { auth } from "@/auth"

export async function getDashboardStats() {
  const session = await auth()
  if (!session?.user?.id) return null

  const publications = await prisma.publication.findMany({
    where: { ownerId: session.user.id },
    include: {
      _count: {
        select: { subscribers: true }
      },
      newsletters: {
        include: {
          emails: true
        }
      }
    }
  })

  // Calculate total stats across all publications
  const stats = publications.reduce((acc, pub) => {
    acc.totalSubscribers += pub._count.subscribers
    
    pub.emails.forEach(email => {
      if (email.analytics) {
        acc.totalOpens += email.analytics.opens
        acc.totalClicks += email.analytics.clicks
      }
    })
    
    return acc
  }, {
    totalSubscribers: 0,
    totalOpens: 0,
    totalClicks: 0
  })

  // Calculate rates
  const openRate = pub.emails.length > 0 
    ? (stats.totalOpens / (pub.emails.length * stats.totalSubscribers) * 100).toFixed(1)
    : 0

  const clickRate = stats.totalOpens > 0
    ? (stats.totalClicks / stats.totalOpens * 100).toFixed(1)
    : 0

  return {
    subscribers: stats.totalSubscribers,
    openRate: `${openRate}%`,
    clickRate: `${clickRate}%`
  }
}

export async function getRecentEmails() {
  const session = await auth()
  if (!session?.user?.id) return []

  const userId = session?.user?.id;

  return prisma.email.findMany({
    where: {
      newsletter: {
        publication: {
          ownerId: userId
        }
      }
    },
    include: {
      analytics: true
    },
    orderBy: {
      sentAt: 'desc'
    },
    take: 5
  })
} 