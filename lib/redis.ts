import { Redis } from '@upstash/redis';

export const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function setPremiumEmail(email: string): Promise<void> {
  await redis.set(`premium:${email.toLowerCase().trim()}`, 'true');
}

export async function isPremiumEmail(email: string): Promise<boolean> {
  const val = await redis.get(`premium:${email.toLowerCase().trim()}`);
  return val === 'true';
}
