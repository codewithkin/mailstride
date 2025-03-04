'use server'

import { prisma } from "@/prisma"
import { auth } from "@/auth"
import { Email } from "@prisma/client"

export async function getDashboardStats() {
  const session = await auth()
  if (!session?.user?.id) return null

  const userId = session?.user?.id;

  const publications = await prisma.publication.findMany({
    where: { ownerId: userId },
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
  const stats = publications.reduce((acc, pub: any) => {
    acc.totalSubscribers += pub._count.subscribers
    
    pub.emails.forEach((email: {analytics: any}) => {
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

  const newsLetters = await prisma.newsletter.findMany({
    where: {
      publication: {
        ownerId: userId
      }
    },
    include: {
      emails: {
        include: {
          analytics: true
        }
      }
    }
  });

  // Calculate rates
  const openRate = 0;

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