import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { EmailStatus } from "@prisma/client"
import { NextResponse } from "next/server"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(
  request: Request,
  { params }: { params: { emailId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const email = await prisma.email.findUnique({
      where: { id: params.emailId },
      include: {
        newsletter: {
          include: {
            publication: true
          }
        }
      }
    })

    if (!email) {
      return new NextResponse("Email not found", { status: 404 })
    }

    // Update email status to sending
    await prisma.email.update({
      where: { id: email.id },
      data: { status: EmailStatus.SENDING }
    })

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: `${email.newsletter.publication.name} <newsletters@yourdomain.com>`,
      to: ['recipient@example.com'], // You'll need to implement subscriber management
      subject: email.subject,
      html: email.content,
    })

    if (error) {
      throw error
    }

    // Update email status to sent
    await prisma.email.update({
      where: { id: email.id },
      data: {
        status: EmailStatus.SENT,
        sentAt: new Date()
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Failed to send email:', error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 