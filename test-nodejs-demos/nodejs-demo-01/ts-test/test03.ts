// 

import { Client } from '@notionhq/client';

const NOTION_TOKEN = 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222'

const client = new Client({
  auth: NOTION_TOKEN,
});


(async() => {

  const database_id = '18adeaa8cb4b8052a124d52a5b0b6aed'

  await client.databases.query({
    database_id: database_id
  }).then((data) => {
    console.log(data.results[0].properties.goalsop_proj_id.rich_text[0].plain_text)
  } )
})()

