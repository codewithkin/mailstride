export function getConfirmationEmailHtml({
  firstName,
  newsletterName,
  publicationName,
  confirmationUrl,
}: {
  firstName?: string | null
  newsletterName: string
  publicationName: string
  confirmationUrl: string
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Confirm your subscription to ${newsletterName}</title>
      </head>
      <body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.5; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 20px;">
            Confirm your subscription${firstName ? `, ${firstName}` : ''}
          </h1>
          
          <p style="color: #4b5563; font-size: 16px; margin-bottom: 16px;">
            Please confirm your subscription to ${newsletterName} by ${publicationName} by clicking the button below:
          </p>
          
          <div style="margin: 30px 0;">
            <a href="${confirmationUrl}" 
               style="background: linear-gradient(to right, #6366f1, #a855f7);
                      color: white;
                      padding: 12px 24px;
                      border-radius: 6px;
                      text-decoration: none;
                      display: inline-block;
                      font-weight: 500;">
              Confirm Subscription
            </a>
          </div>
          
          <p style="color: #4b5563; font-size: 16px;">
            Or copy and paste this URL into your browser:<br>
            <a href="${confirmationUrl}" style="color: #6366f1; word-break: break-all;">
              ${confirmationUrl}
            </a>
          </p>
          
          <p style="color: #6b7280; font-size: 14px; margin-top: 40px;">
            If you didn't request this subscription, you can safely ignore this email.
          </p>
        </div>
      </body>
    </html>
  `
} 