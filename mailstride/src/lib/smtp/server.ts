import { SMTPServer } from 'smtp-server'
import { simpleParser } from 'mailparser'
import { prisma } from '@/prisma'
import { EmailStatus } from '@prisma/client'
import { sign } from '@/lib/smtp/dkim'
import dns from 'dns'
import { promisify } from 'util'

const resolveMx = promisify(dns.resolveMx)

const server = new SMTPServer({
  secure: true,
  key: process.env.SMTP_TLS_KEY,
  cert: process.env.SMTP_TLS_CERT,
  
  // Disable auth for now - we'll add it later
  authOptional: true,

  // This is called when a client connects
  async onConnect(session, callback) {
    // Verify IP reputation, rate limits, etc.
    // TODO: Implement IP verification and rate limiting
    callback()
  },

  // This is called when receiving mail
  async onData(stream, session, callback) {
    try {
      const email = await simpleParser(stream)
      const { from, to, subject, html, textAsHtml } = email

      // Verify DKIM signature
      // TODO: Implement DKIM verification

      // Verify SPF record
      const domain = from?.value?.[0]?.address?.split('@')[1]
      if (domain) {
        const records = await resolveMx(domain)
        // TODO: Implement SPF verification
      }

      // Store the email in the database
      await prisma.email.create({
        data: {
          subject: subject || '',
          content: html || textAsHtml || '',
          status: EmailStatus.RECEIVED,
          // Add other fields as needed
        }
      })

      callback()
    } catch (error) {
      console.error('Error processing email:', error)
      callback(new Error('Error processing email'))
    }
  }
})

export function startSMTPServer(port: number = 25) {
  server.listen(port)
  console.log(`SMTP server listening on port ${port}`)
} 