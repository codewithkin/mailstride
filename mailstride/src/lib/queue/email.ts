import Queue from 'bull'
import { prisma } from '@/prisma'
import { EmailStatus } from '@prisma/client'
import nodemailer from 'nodemailer'
import { sign } from '@/lib/smtp/dkim'

interface EmailJob {
  emailId: string
}

const emailQueue = new Queue<EmailJob>('email-sending', {
  redis: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || '6379'),
    password: process.env.REDIS_PASSWORD
  }
})

emailQueue.process(async (job) => {
  const { emailId } = job.data

  const email = await prisma.email.findUnique({
    where: { id: emailId },
    include: {
      newsletter: {
        include: {
          publication: true
        }
      },
      audience: true
    }
  })

  if (!email || !email.audience) {
    throw new Error('Email or audience not found')
  }

  const transport = nodemailer.createTransport({
    host: 'localhost',
    port: 25,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  })

  // Send to each recipient in batches
  const batchSize = 50
  const recipients = email.audience.emailList
  
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize)
    
    await Promise.all(batch.map(async (recipient) => {
      const message = {
        from: `${email.newsletter.publication.name} <no-reply@${email.newsletter.publication.slug}.yourdomain.com>`,
        to: recipient,
        subject: email.subject,
        html: email.content,
        headers: {
          'List-Unsubscribe': `<https://yourdomain.com/unsubscribe?email=${encodeURIComponent(recipient)}>`,
          'Feedback-ID': `${email.id}:${email.newsletter.id}:${email.newsletter.publication.id}`
        }
      }

      // Sign with DKIM
      const rawEmail = await transport.buildMessage(message)
      const dkimSignature = sign(rawEmail.toString())
      message.headers['DKIM-Signature'] = dkimSignature

      await transport.sendMail(message)
    }))

    // Update progress
    await job.progress((i + batchSize) / recipients.length * 100)
  }

  // Update email status
  await prisma.email.update({
    where: { id: emailId },
    data: {
      status: EmailStatus.SENT,
      sentAt: new Date()
    }
  })
})

export function queueEmail(emailId: string) {
  return emailQueue.add({ emailId }, {
    attempts: 3,
    backoff: {
      type: 'exponential',
      delay: 1000
    }
  })
} 