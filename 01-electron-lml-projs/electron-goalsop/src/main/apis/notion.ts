import { notionInstance } from './helpers/notionInstance'

import { NOTION_INDEX_DATABASE_ID } from '@shared/constants'

import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'


export type NotionDatabasePage = Awaited<ReturnType<typeof notionInstance.databases.query>>['results'][number]

/**
 * 基于index_database_id：获取到所有的database的信息
 */
export const databasesApi = publicProcedure.query(async () => {

  let databases: NotionDatabasePage[] = []

  const query_result = await notionInstance.databases.query({
    database_id: NOTION_INDEX_DATABASE_ID
  })

  databases = query_result.results

  return databases
})

/**
 * 基于database_id，查询出database的元数据
 */
export const databaseByIdApi =  publicProcedure.input(
  z.object({
    database_id: z.string()
  })
).query( async({ input: {database_id} }) => {
  //console.log(database_id)

  const database = await notionInstance.databases.retrieve({
    database_id: database_id
  })

  return database
})

// TODO: 基于属性:type 进行查询（G6config/X6/NodePage）




