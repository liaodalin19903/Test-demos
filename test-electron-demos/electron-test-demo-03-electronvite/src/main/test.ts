import { join } from 'path'
import { app } from 'electron'

console.log(app) // undefined

//eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function buildDatabasePath() {
  const dataBasePath = join(app.getPath('appData'), app.getName(), `./Data/db.sqlite`)
  console.log(dataBasePath)
}

// buildDatabasePath()
