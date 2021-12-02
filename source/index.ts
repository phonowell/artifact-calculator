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
  name: TypeCharacter
  listArtifact: Artifact[]
  listWeight: Weight[]
}

type Weight = {
  key: Stats
  value: number
}

// variable

let db: Db = {}

// function

const calcTotal = (
  member: Member,
) => {
  let total = 0
  member.listWeight.forEach(weight => {
    member.listArtifact.forEach(artifact => {
      total += artifact.stats[weight.key] * weight.value
    })
  })
  return total
}

const equip = (
  member: Member,
  slot?: Slot,
): void => {
  const listSlot = slot ? [slot] : listTypeSlot
  listSlot.forEach(s => {

    const i = listTypeSlot.indexOf(s)

    const artifact = pickRandom(db[i].filter(it => !it.owner))
    if (!artifact) return

    artifact.owner = member.name
    member.listArtifact[i] = artifact
  })
}

const main = () => {

  makeDb()
  console.log(db)

  const listMember: Member[] = Object.keys(plan).map(name => ({
    listArtifact: [],
    listWeight: Object.keys(plan[name]).map(it => ({
      key: it,
      value: plan[name][it],
    })),
    name,
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