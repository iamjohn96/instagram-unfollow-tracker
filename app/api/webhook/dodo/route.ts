import { NextRequest, NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'crypto';
import { setPremiumEmail } from '@/lib/redis';

function verifySignature(payload: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(payload, 'utf8').digest('hex');
  const expectedBuf = Buffer.from(`sha256=${expected}`, 'utf8');
  const sigBuf = Buffer.from(signature, 'utf8');
  if (expectedBuf.length !== sigBuf.length) return false;
  return timingSafeEqual(expectedBuf, sigBuf);
}

function extractEmail(body: Record<string, unknown>): string | null {
  // Dodo Payments webhook payload shape
  const data = body.data as Record<string, unknown> | undefined;
  if (data) {
    const customer = data.customer as Record<string, unknown> | undefined;
    if (customer?.email && typeof customer.email === 'string') return customer.email;
    if (data.email && typeof data.email === 'string') return data.email;
  }
  if (body.customer_email && typeof body.customer_email === 'string') return body.customer_email;
  if (body.email && typeof body.email === 'string') return body.email as string;
  return null;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const secret = process.env.DODO_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('webhook-signature') ?? request.headers.get('x-dodo-signature') ?? '';

  if (!verifySignature(rawBody, signature, secret)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Only process successful payment events
  const eventType = body.type ?? body.event_type;
  const isPayment = typeof eventType === 'string' && (
    eventType.includes('payment') || eventType.includes('subscription') || eventType.includes('order')
  );

  if (!isPayment) {
    return NextResponse.json({ received: true });
  }

  const email = extractEmail(body);
  if (!email) {
    return NextResponse.json({ error: 'No email in payload' }, { status: 422 });
  }

  try {
    await setPremiumEmail(email);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to save premium status' }, { status: 500 });
  }
}
