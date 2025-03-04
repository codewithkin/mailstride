import { createSign } from 'crypto'
import { readFileSync } from 'fs'

const DKIM_PRIVATE_KEY = process.env.DKIM_PRIVATE_KEY || readFileSync('path/to/private.key', 'utf8')
const DKIM_SELECTOR = 'mail'
const DKIM_DOMAIN = 'yourdomain.com'

export function sign(email: string): string {
  const headers = [
    'From',
    'To',
    'Subject',
    'Date',
    'Message-ID',
    'MIME-Version',
    'Content-Type'
  ]

  const canonicalizedHeaders = headers
    .map(header => `${header.toLowerCase()}:${getHeaderValue(email, header)}`)
    .join('\n')

  const signer = createSign('rsa-sha256')
  signer.update(canonicalizedHeaders)
  const signature = signer.sign(DKIM_PRIVATE_KEY, 'base64')

  return `DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=${DKIM_DOMAIN}; s=${DKIM_SELECTOR}; t=${Math.floor(Date.now() / 1000)}; bh=${getBodyHash(email)}; h=${headers.join(':')}; b=${signature}`
}

function getHeaderValue(email: string, header: string): string {
  const match = email.match(new RegExp(`^${header}: (.*)$`, 'm'))
  return match ? match[1].trim() : ''
}

function getBodyHash(email: string): string {
  const body = email.split('\n\n')[1] || ''
  const hash = createSign('rsa-sha256')
  hash.update(body)
  return hash.sign(DKIM_PRIVATE_KEY, 'base64')
} 