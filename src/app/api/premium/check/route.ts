import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.json({ isPremium: false })

  const result = await redis.get(`premium:${email.toLowerCase()}`)
  return NextResponse.json({ isPremium: result === 'true' })
}
