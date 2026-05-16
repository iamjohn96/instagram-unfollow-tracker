import { NextRequest, NextResponse } from 'next/server';
import { isPremiumEmail, removePremiumEmail, getSubscriptionId } from '@/lib/redis';

const DODO_API_BASE = 'https://api.dodopayments.com';

/**
 * Cancel a subscription with Dodo Payments.
 * Returns true on success (or if no API key / subscription ID is configured),
 * false if the Dodo API returned an unexpected error.
 */
async function cancelDodoSubscription(subscriptionId: string): Promise<boolean> {
  const apiKey = process.env.DODO_API_KEY;
  if (!apiKey) {
    // No API key configured — skip remote cancellation but allow local removal.
    console.warn('[cancel] DODO_API_KEY not set; skipping remote cancellation');
    return true;
  }

  const response = await fetch(
    `${DODO_API_BASE}/subscriptions/${subscriptionId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: 'cancelled' }),
    },
  );

  // 200 = cancelled successfully; 404 = already cancelled / not found — both OK
  if (response.ok || response.status === 404) return true;

  const text = await response.text().catch(() => '');
  console.error(
    `[cancel] Dodo API error ${response.status} for sub ${subscriptionId}: ${text}`,
  );
  return false;
}

export async function DELETE(request: NextRequest): Promise<NextResponse> {
  let body: { email?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const { email } = body;

  if (typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const normalised = email.toLowerCase().trim();

  // Verify this email actually has premium
  const hasPremium = await isPremiumEmail(normalised);
  if (!hasPremium) {
    return NextResponse.json(
      { error: 'No active subscription found for this email' },
      { status: 404 },
    );
  }

  // Cancel with Dodo Payments if we have a subscription ID on record
  const subscriptionId = await getSubscriptionId(normalised);
  if (subscriptionId) {
    const cancelled = await cancelDodoSubscription(subscriptionId);
    if (!cancelled) {
      return NextResponse.json(
        { error: 'Failed to cancel with payment provider; please try again' },
        { status: 502 },
      );
    }
  }

  // Remove premium access from Redis
  await removePremiumEmail(normalised);

  console.log(`[cancel] Premium removed for ${normalised}`);

  return NextResponse.json({
    success: true,
    message: 'Your subscription has been cancelled successfully.',
  });
}
