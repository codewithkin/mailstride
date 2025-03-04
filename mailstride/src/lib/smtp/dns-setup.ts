interface DNSRecord {
  type: 'TXT' | 'MX' | 'CNAME'
  name: string
  value: string
  ttl?: number
  priority?: number
}

export function generateDNSRecords(domain: string, selector: string = 'mail'): DNSRecord[] {
  return [
    // SPF Record
    {
      type: 'TXT',
      name: '@',
      value: 'v=spf1 mx ip4:YOUR_SERVER_IP include:_spf.mailstride.com -all',
      ttl: 3600
    },
    
    // DKIM Record
    {
      type: 'TXT',
      name: `${selector}._domainkey`,
      value: `v=DKIM1; k=rsa; p=${process.env.DKIM_PUBLIC_KEY}`,
      ttl: 3600
    },
    
    // DMARC Record
    {
      type: 'TXT',
      name: '_dmarc',
      value: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@mailstride.com; pct=100; adkim=s; aspf=s',
      ttl: 3600
    },
    
    // MX Records
    {
      type: 'MX',
      name: '@',
      value: 'mx1.mailstride.com',
      priority: 10,
      ttl: 3600
    },
    {
      type: 'MX',
      name: '@',
      value: 'mx2.mailstride.com',
      priority: 20,
      ttl: 3600
    }
  ]
} 