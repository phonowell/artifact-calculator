import listTypeArtifact from '../data/artifact.json'
import listTypeSlot from '../data/slot.json'
import listTypeVision from '../data/vision.json'
import listTypeWeapon from '../data/weapon.json'
import mapCharacter from '../data/character.json'
import mapStats from '../data/stats.json'

export {
  listTypeArtifact,
  listTypeSlot,
  listTypeVision,
  listTypeWeapon,
}

export const listTypeBonusStats = [...mapStats.bonus] as const

export const listTypeCharacter = [...Object.keys(mapCharacter)] as const

export const listTypeMainStats = [...mapStats.main] as const

export const listTypeSubStats = [...mapStats.sub] as const

export const listTypeStats = [
  ...listTypeMainStats,
  ...listTypeSubStats,
  ...listTypeBonusStats,
] as const

export type Artifact = {
  level: number
  slot: Slot
  star: number
  stats: Record<Stats, number>
  type: TypeArtifact
}

export type BonusStats = typeof listTypeBonusStats[number]

export type Character = {
  level: number
  name: TypeCharacter
  star: 4 | 5
  vision: Vision
  weapon: TypeWeapon
}

export type MainStats = typeof listTypeMainStats[number]

export type Slot = typeof listTypeSlot[number]

export type Stats = typeof listTypeStats[number]

export type SubStats = typeof listTypeSubStats[number]

export type TypeArtifact = typeof listTypeArtifact[number]

export type TypeCharacter = typeof listTypeCharacter[number]

export type TypeWeapon = typeof listTypeWeapon[number]

export type Vision = typeof listTypeVision[number]

export type Weapon = {
  name: string
  start: 3 | 4 | 5
  type: TypeWeapon
}