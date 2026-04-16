import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get('email')
  if (!email) return NextResponse.json({ isPremium: false })

  const result = await redis.get(`premium:${email.toLowerCase()}`)
  console.log('Premium check:', email, 'result:', result, 'type:', typeof result)
  const isPremium = result === 'true' || result === true || result === 1 || String(result) === 'true'
  return NextResponse.json({ isPremium })
}
