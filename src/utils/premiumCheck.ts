export async function checkPremiumStatus(email: string): Promise<boolean> {
  const res = await fetch(`/api/premium/check?email=${encodeURIComponent(email)}`)
  const data = await res.json()
  return data.isPremium
}
