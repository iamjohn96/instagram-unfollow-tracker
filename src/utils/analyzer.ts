import type { InstagramUser } from './parser'

export interface AnalysisResult {
  notFollowingBack: InstagramUser[]
  iDontFollowBack: InstagramUser[]
  mutual: InstagramUser[]
}

export function analyze(followers: InstagramUser[], following: InstagramUser[]): AnalysisResult {
  const followerSet = new Set(followers.map((u) => u.username.toLowerCase()))
  const followingSet = new Set(following.map((u) => u.username.toLowerCase()))

  const notFollowingBack = following.filter((u) => !followerSet.has(u.username.toLowerCase()))
  const iDontFollowBack = followers.filter((u) => !followingSet.has(u.username.toLowerCase()))
  const mutual = following.filter((u) => followerSet.has(u.username.toLowerCase()))

  return { notFollowingBack, iDontFollowBack, mutual }
}

export interface ChangeResult {
  newUnfollowers: InstagramUser[]
  newFollowers: InstagramUser[]
  lostFollowers: InstagramUser[]
  gainedFollowers: InstagramUser[]
}

export function compareSnapshots(
  prev: { followers: InstagramUser[]; following: InstagramUser[] },
  curr: { followers: InstagramUser[]; following: InstagramUser[] }
): ChangeResult {
  const prevFollowerSet = new Set(prev.followers.map((u) => u.username.toLowerCase()))
  const currFollowerSet = new Set(curr.followers.map((u) => u.username.toLowerCase()))
  const prevFollowingSet = new Set(prev.following.map((u) => u.username.toLowerCase()))
  const currFollowingSet = new Set(curr.following.map((u) => u.username.toLowerCase()))

  const newUnfollowers = prev.following.filter((u) => !currFollowingSet.has(u.username.toLowerCase()))
  const newFollowers = curr.following.filter((u) => !prevFollowingSet.has(u.username.toLowerCase()))
  const lostFollowers = prev.followers.filter((u) => !currFollowerSet.has(u.username.toLowerCase()))
  const gainedFollowers = curr.followers.filter((u) => !prevFollowerSet.has(u.username.toLowerCase()))

  return { newUnfollowers, newFollowers, lostFollowers, gainedFollowers }
}
