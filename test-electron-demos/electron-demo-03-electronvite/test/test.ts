//import { join } from 'path'
//import { app } from 'electron'

const elect = require('electron')

console.log(elect.app) // undefined

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// function buildDatabasePath() {
//   const dataBasePath = join(app.getPath('appData'), app.getName(), `./Your Dir/index.db`)
//   console.log(dataBasePath)
// }

// buildDatabasePath()
