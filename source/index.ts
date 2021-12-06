import {
  Artifact as Arti,
  Slot,
  Stats,
  TypeCharacter,
  listTypeSlot,
} from './type'
import listArtifact from '../data/save/artifact.json'
import pickRandom from './function/pickRandom'
import plan from '../data/save/plan.json'
// import $shuffle from 'lodash/shuffle'

// interface

type Artifact = Arti & {
  id: string
  owner: TypeCharacter
}

type Db = Record<Slot, Artifact[]>

type Member = {
  artifact: Record<Slot, Artifact>
  name: TypeCharacter
  stats: Record<Stats, number>
  weight: number
}

// variable

let db: Db = {}

// function

const calcTotal = (
  member: Member,
) => {
  let total = 0
  Object.keys(member.stats).forEach(key => {
    listTypeSlot.forEach(slot => {
      total += (member.artifact[slot]?.stats[key] || 0) * member.stats[key]
    })
  })
  return total * member.weight
}

const equip = (
  member: Member,
  slot?: Slot,
): void => (slot ? [slot] : listTypeSlot).forEach(s => {

  const artifact = pickRandom(db[s].filter(it => !it.owner))
  if (!artifact) return

  artifact.owner = member.name
  member.artifact[s] = artifact
})

const main = () => {

  makeDb()

  const listMember: Member[] = Object.keys(plan).map(name => ({
    artifact: {},
    name,
    weight: plan[name].weight,
    stats: plan[name].stats,
  }))

  listMember.forEach(member => {
    equip(member)
  })

  listMember.forEach(member => {
    const total = calcTotal(member)
    console.log(`${member.name} total: ${total}`)
  })
}

const makeDb = () => {
  db = {} // clear
  listTypeSlot.forEach(slot => {
    db[slot] = (listArtifact as unknown as Arti[]).filter(it => it.slot === slot)
      .map(it => ({
        ...it,
        id: makeId(),
        owner: '',
      }))
  })
}

const makeId = (): string => Math.random().toString(36)
  .slice(-8)

// export
export default main