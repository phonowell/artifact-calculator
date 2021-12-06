import {
  Artifact,
  Stats,
  listTypeArtifact,
  listTypeBonusStats,
  listTypeMainStats,
  listTypeSlot,
  listTypeSubStats,
} from '../source/type'
import $shuffle from 'lodash/shuffle'
import $write from 'fire-keeper/write'
import pickRandom from '../source/function/pickRandom'


// function

const main = async (): Promise<void> => {

  const listArtifact = new Array(50).fill(0)
    .map((): Artifact => ({
      level: 20,
      slot: pickRandom(listTypeSlot),
      star: 5,
      stats: makeStats(),
      type: pickRandom(listTypeArtifact),
    }))

  await $write('./data/save/artifact.json', listArtifact)
}

const makeStats = (): Record<Stats, number> => {

  const mainStats = pickRandom([
    ...listTypeMainStats,
    ...listTypeBonusStats,
  ])

  const listSubStats = $shuffle([
    ...listTypeMainStats.filter(it => it !== mainStats),
    ...listTypeSubStats,
  ]).slice(0, 4)

  const result: Record<Stats, number> = {};

  [mainStats, ...listSubStats]
    .map(key => ({
      key,
      value: Math.floor(Math.random() * 50) + 1,
    }))
    .forEach(it => (result[it.key] = it.value))

  return result
}

// export
export default main