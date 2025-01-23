import { useMemo, useEffect } from 'react'
import PouchDB from 'pouchdb-browser'

interface Config {
  dbName?: string
}

export const usePouchDB = (config?: Config) => {
  const remoteUrl = config?.dbName
    ? `http://localhost:5984/${config.dbName}`
    : 'http://localhost:5984/todo-db'

  const [localDB, remoteDB] = useMemo(
    () => [
      new PouchDB(config?.dbName || 'todo-db'),
      new PouchDB(remoteUrl, {
        auth: { username: 'admin', password: 'admin' }
      })
    ],
    [config?.dbName, remoteUrl]
  )

  useEffect(() => {
    const sync = localDB.sync(remoteDB, {
      live: true,
      retry: true
    })

    return () => {
      sync.cancel()
    }
  }, [localDB, remoteDB])

  return {
    localDB,
    remoteDB
  }
}
