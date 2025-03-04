'use server'

import nodemailer from 'nodemailer'

interface SendEmailParams {
  subject: string
  content: string
  recipients: string[]
  from: string
}

export async function sendEmailToList({
  subject,
  content,
  recipients,
  from
}: SendEmailParams) {
  // Create a test account if no SMTP settings
  const testAccount = await nodemailer.createTestAccount()

  // Create reusable transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.ethereal.email",
    port: parseInt(process.env.SMTP_PORT || "587"),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER || testAccount.user,
      pass: process.env.SMTP_PASS || testAccount.pass,
    },
  })

  // Send emails in batches of 50
  const batchSize = 50
  for (let i = 0; i < recipients.length; i += batchSize) {
    const batch = recipients.slice(i, i + batchSize)
    
    await Promise.all(
      batch.map(async (to) => {
        try {
          const info = await transporter.sendMail({
            from,
            to,
            subject,
            html: content
          })

          if (testAccount) {
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
          }
        } catch (error) {
          console.error(`Failed to send email to ${to}:`, error)
          // You might want to track bounces here
        }
      })
    )
  }
} 