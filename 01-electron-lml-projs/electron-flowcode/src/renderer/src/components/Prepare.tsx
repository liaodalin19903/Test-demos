import { databasesApi } from '@renderer/common/apis'
import React, { useEffect } from 'react'
import { db } from '@renderer/common/dexieDB'


export default function Prepare() {

  useEffect(() => {

    const asyncFunc = async() => {
      // 1、准备projs数据, 存放在dexie

      /* TODO: 届时放在手动同步（避免多次调用Notion）
      const results = await databasesApi()
      db.databases.bulkAdd(results)
      */

      // 2、

    }
    asyncFunc()


  }, [])

  return (
    <></>
  )
}
