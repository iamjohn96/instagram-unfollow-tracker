import { NextRequest, NextResponse } from 'next/server'
import { redis } from '@/lib/redis'

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text()
    const payload = JSON.parse(rawBody)

    const eventType = payload.type

    if (eventType === 'payment.succeeded' || eventType === 'subscription.active') {
      const email = payload.data?.customer?.email
      if (email) {
        await redis.set(`premium:${email.toLowerCase()}`, 'true')
      }
    }

    if (eventType === 'subscription.cancelled' || eventType === 'subscription.expired') {
      const email = payload.data?.customer?.email
      if (email) {
        await redis.del(`premium:${email.toLowerCase()}`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('Webhook error:', err)
    return NextResponse.json({ error: 'Webhook failed' }, { status: 400 })
  }
}
