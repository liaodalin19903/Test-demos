import { notionInstance } from './helpers/notionInstance'

import { NOTION_INDEX_DATABASE_ID } from '@shared/constants'

import * as z from 'zod'
import { publicProcedure } from './trpcServer/procedure'


//export type NotionDatabasePage = Awaited<ReturnType<typeof notionInstance.databases.query>>['results'][number]


import { NotionDatabasePage } from '@shared/@types'
import { CodeBlockObjectResponse, ListBlockChildrenResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints'


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
/**
 * 基于database_id查询出X6的设计数据
 * 原理：database内有DataX6/DataG6Config 的page （且是唯一）
 * @database_id 是哪个数据库
 */
export const dataX6ByIdApi = publicProcedure.input(z.object({
  database_id: z.string()
})).query(async({input: {database_id}}) => {

  // 1、先找到DataX6这个Page
  const query_result = await notionInstance.databases.query({
    database_id: database_id,
    filter: {
      or: [
        {
          title: {equals: 'DataX6'},
          property: 'Name',
          type: "title"
        }
      ]
    }
  })

  //@ts-ignore
  const dataX6Page:NotionDatabasePage  = query_result.results[0]

  // 2、然后基于PageId查找到block内容

  const blocks_result: ListBlockChildrenResponse = await notionInstance.blocks.children.list({
    block_id: dataX6Page.id,
  })

  //console.log('code: ', (blocks_result.results[0] as CodeBlockObjectResponse).code.rich_text[0].plain_text)

  const DataX6Json = (blocks_result.results[0] as CodeBlockObjectResponse).code.rich_text[0].plain_text

  return DataX6Json
})



