import z from 'zod'


const numberParser = z.number() 

export const toStr = (num: unknown) => {
  const parsed = numberParser.parse(num)

  return String(parsed)
}

const str = toStr(111)
console.log(str)
