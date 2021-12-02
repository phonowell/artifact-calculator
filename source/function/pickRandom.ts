// function

const main = <T>(
  input: T[] | readonly T[],
): T => input[Math.floor(Math.random() * input.length)]

// export

export default main