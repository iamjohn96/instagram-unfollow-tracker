import { NextRequest, NextResponse } from 'next/server';
import { isPremiumEmail } from '@/lib/redis';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const email = request.nextUrl.searchParams.get('email');

  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  try {
    const premium = await isPremiumEmail(email);
    return NextResponse.json({ isPremium: premium });
  } catch {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 });
  }
}
