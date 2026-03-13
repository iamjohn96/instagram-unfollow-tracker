import JSZip from 'jszip'

export interface InstagramUser {
  username: string
  href: string
  timestamp: number
}

function parseFollowers(data: unknown): InstagramUser[] {
  const users: InstagramUser[] = []
  if (!Array.isArray(data)) return users
  for (const item of data) {
    const entries = item?.string_list_data
    if (Array.isArray(entries)) {
      for (const entry of entries) {
        if (entry?.value) {
          users.push({
            username: entry.value,
            href: entry.href || `https://www.instagram.com/${entry.value}`,
            timestamp: entry.timestamp || 0,
          })
        }
      }
    }
  }
  return users
}

function parseFollowing(data: unknown): InstagramUser[] {
  const users: InstagramUser[] = []
  let items: unknown[] = []

  if (Array.isArray(data)) {
    items = data
  } else if (data && typeof data === 'object') {
    const obj = data as Record<string, unknown>
    if (Array.isArray(obj.relationships_following)) {
      items = obj.relationships_following
    }
  }

  for (const item of items) {
    const entries = (item as Record<string, unknown>)?.string_list_data
    if (Array.isArray(entries)) {
      for (const entry of entries as Record<string, unknown>[]) {
        if (entry?.value) {
          users.push({
            username: entry.value as string,
            href: (entry.href as string) || `https://www.instagram.com/${entry.value}`,
            timestamp: (entry.timestamp as number) || 0,
          })
        }
      }
    }
  }
  return users
}

export interface ParseResult {
  followers: InstagramUser[]
  following: InstagramUser[]
}

export async function parseZipFile(file: File): Promise<ParseResult> {
  const zip = await JSZip.loadAsync(file)
  let followers: InstagramUser[] = []
  let following: InstagramUser[] = []

  const followerFiles = Object.keys(zip.files).filter(
    (name) => name.includes('followers') && name.endsWith('.json')
  )
  const followingFiles = Object.keys(zip.files).filter(
    (name) => name.includes('following') && name.endsWith('.json')
  )

  if (followerFiles.length === 0 && followingFiles.length === 0) {
    throw new Error(
      'No followers or following JSON files found in the ZIP. Make sure you selected "Followers and Following" when requesting your Instagram data.'
    )
  }

  for (const fileName of followerFiles) {
    const content = await zip.files[fileName].async('string')
    const data = JSON.parse(content)
    followers = [...followers, ...parseFollowers(data)]
  }

  for (const fileName of followingFiles) {
    const content = await zip.files[fileName].async('string')
    const data = JSON.parse(content)
    following = [...following, ...parseFollowing(data)]
  }

  return { followers, following }
}

export async function parseJsonFile(file: File): Promise<ParseResult> {
  const text = await file.text()
  const data = JSON.parse(text)

  const followers = parseFollowers(Array.isArray(data) ? data : [])
  const following = parseFollowing(data)

  return { followers, following }
}

export async function parseFile(file: File): Promise<ParseResult> {
  if (file.name.endsWith('.zip')) {
    return parseZipFile(file)
  } else if (file.name.endsWith('.json')) {
    return parseJsonFile(file)
  } else {
    throw new Error('Unsupported file type. Please upload a .zip or .json file.')
  }
}
