import $compile from 'fire-keeper/compile'

// function

const main = (): Promise<void> => $compile([
  './data/*.yaml',
  './data/save/*.yaml',
])

// export
export default main