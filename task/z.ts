import $capitalize from 'lodash/capitalize'
import $read from 'fire-keeper/read'
import $write from 'fire-keeper/write'

// function

const main = async () => {

  const listSource = [
    'abc',
    'def',
    'ghi',
    'jkl',
    'mno',
    'pqr',
    'stu',
    'vwx',
    'yz',
  ]

  const listData = await Promise.all(listSource.map(source => $read(`./data/temp/${source}.yaml`)))

  const data = {
    ...listData[0], // abc
    ...listData[1], // def
    ...listData[2], // ghi
    ...listData[3], // jkl
    ...listData[4], // mno
    ...listData[5], // pqr
    ...listData[6], // stu
    ...listData[7], // vwx
    ...listData[8], // yz
  }

  const result = {}
  Object.keys(data).forEach(key => {
    const it = data[key] as any
    result[it['name-en']] = {
      star: it.star,
      vision: $capitalize(it.vision),
      weapon: $capitalize(it.weapon),
    }
  })

  await $write('./data/temp/all.json', result)
}

// export
export default main