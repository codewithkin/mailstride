import { auth } from "@/auth"
import { prisma } from "@/prisma"
import { EmailStatus } from "@prisma/client"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await request.json()
    const { emailId } = body

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

    if (!email) {
      return new NextResponse("Email not found", { status: 404 })
    }

    // TODO: Implement SMTP server logic
    // For now, we'll just update the status
    await prisma.email.update({
      where: { id: emailId },
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