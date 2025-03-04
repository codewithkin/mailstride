import { Redis } from 'ioredis'
import { RateLimiterRedis } from 'rate-limiter-flexible'

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD
})

// Rate limiters for different scopes
const rateLimiters = {
  ip: new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'ratelimit:ip',
    points: 100, // Number of requests
    duration: 3600 // Per hour
  }),
  
  domain: new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'ratelimit:domain',
    points: 1000, // Number of emails
    duration: 3600 // Per hour
  }),
  
  email: new RateLimiterRedis({
    storeClient: redis,
    keyPrefix: 'ratelimit:email',
    points: 50, // Number of recipients
    duration: 3600 // Per hour
  })
}

// IP reputation scoring
interface IPReputation {
  score: number // 0-100, higher is better
  lastCheck: Date
  bounces: number
  complaints: number
  successful: number
}

export class ReputationManager {
  private static readonly CACHE_TTL = 3600 // 1 hour

  static async getReputation(ip: string): Promise<IPReputation> {
    const cached = await redis.get(`reputation:${ip}`)
    if (cached) return JSON.parse(cached)

    // Check external reputation services
    const reputation = await this.checkExternalReputation(ip)
    await redis.setex(`reputation:${ip}`, this.CACHE_TTL, JSON.stringify(reputation))
    
    return reputation
  }

  static async updateReputation(ip: string, event: 'bounce' | 'complaint' | 'success'): Promise<void> {
    const reputation = await this.getReputation(ip)
    
    switch (event) {
      case 'bounce':
        reputation.bounces++
        reputation.score = Math.max(0, reputation.score - 5)
        break
      case 'complaint':
        reputation.complaints++
        reputation.score = Math.max(0, reputation.score - 10)
        break
      case 'success':
        reputation.successful++
        reputation.score = Math.min(100, reputation.score + 1)
        break
    }

    reputation.lastCheck = new Date()
    await redis.setex(`reputation:${ip}`, this.CACHE_TTL, JSON.stringify(reputation))
  }

  private static async checkExternalReputation(ip: string): Promise<IPReputation> {
    // TODO: Implement checks against external reputation services
    // For now, return a default reputation
    return {
      score: 50,
      lastCheck: new Date(),
      bounces: 0,
      complaints: 0,
      successful: 0
    }
  }
}

// Middleware for checking rate limits and reputation
export async function checkSendingLimits(ip: string, domain: string, recipientCount: number) {
  try {
    // Check IP reputation
    const reputation = await ReputationManager.getReputation(ip)
    if (reputation.score < 20) {
      throw new Error('IP has poor reputation')
    }

    // Check rate limits
    await Promise.all([
      rateLimiters.ip.consume(ip, 1),
      rateLimiters.domain.consume(domain, recipientCount),
      rateLimiters.email.consume(`${domain}:${ip}`, recipientCount)
    ])

    return true
  } catch (error) {
    console.error('Rate limit or reputation check failed:', error)
    throw error
  }
} 