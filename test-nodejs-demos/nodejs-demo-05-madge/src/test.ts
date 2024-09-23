//import madge from 'madge'

const madge = require('madge')

madge('./c.ts').then((res) => {
  console.log(res.leaves())
})

