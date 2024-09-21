//import to from 'await-to-done'
const to = require('await-to-done')

const bar = () => new Promise<boolean>((resolve) => {
  resolve(true)
})
const foo = () => new Promise<string>((resolve) => {
  resolve('小明')
})

const [err, data] = to([bar(), foo()]) 

console.log([err, data])