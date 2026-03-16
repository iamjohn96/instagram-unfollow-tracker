import Dexie, { Table } from 'dexie'

export interface Snapshot {
  id?: number
  date: string
  label: string
  followers: string[]
  following: string[]
  followersData: Record<string, number>
  followingData: Record<string, number>
}

class InstagramDB extends Dexie {
  snapshots!: Table<Snapshot>

  constructor() {
    super('SafeUnfollow')
    this.version(1).stores({
      snapshots: '++id, date, label',
    })
  }
}

export const db = new InstagramDB()
