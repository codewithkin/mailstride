import { SMTPServer } from 'smtp-server'
import { simpleParser } from 'mailparser'
import { prisma } from '@/prisma'
import { EmailStatus } from '@prisma/client'
import { sign } from '@/lib/smtp/dkim'
import { checkSendingLimits, ReputationManager } from './rate-limiter'
import dns from 'dns'
import { promisify } from 'util'

const resolveMx = promisify(dns.resolveMx)
const resolveTxt = promisify(dns.resolveTxt)

const server = new SMTPServer({
  secure: true,
  key: process.env.SMTP_TLS_KEY,
  cert: process.env.SMTP_TLS_CERT,
  
  // Disable auth for now - we'll add it later
  authOptional: true,

  // This is called when a client connects
  async onConnect(session, callback) {
    try {
      const { remoteAddress, clientHostname } = session
      
      // Check sending limits and reputation
      await checkSendingLimits(
        remoteAddress,
        clientHostname,
        1 // Will be updated in onMailFrom
      )
      
      callback()
    } catch (error) {
      callback(new Error('Connection rejected'))
    }
  },

  // This is called when receiving mail
  async onData(stream, session, callback) {
    try {
      const email = await simpleParser(stream)
      const { from, to, subject, html, textAsHtml } = email

      // Store the email and update reputation
      const storedEmail = await prisma.email.create({
        data: {
          subject: subject || '',
          content: html || textAsHtml || '',
          status: EmailStatus.RECEIVED,
          // Add other fields as needed
        }
      })

      await ReputationManager.updateReputation(session.remoteAddress, 'success')
      
      callback()
    } catch (error) {
      console.error('Error processing email:', error)
      await ReputationManager.updateReputation(session.remoteAddress, 'bounce')
      callback(new Error('Error processing email'))
    }
  }
})

export function startSMTPServer(port: number = 25) {
  server.listen(port)
  console.log(`SMTP server listening on port ${port}`)
} 