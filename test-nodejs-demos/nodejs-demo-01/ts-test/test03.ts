// 

import { Client } from '@notionhq/client';

const NOTION_TOKEN = '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'

const client = new Client({
  auth: NOTION_TOKEN,
});

const database_id = '18adeaa8cb4b8052a124d52a5b0b6aed'

client.databases.query({
  database_id: database_id
}).then((data) => {
  console.log(data.results[0].properties.goalsop_proj_id.rich_text[0].plain_text)
} )



