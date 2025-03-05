import { Client } from '@notionhq/client';

const NOTION_TOKEN = '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'

const client = new Client({
  auth: NOTION_TOKEN,
});

const database_id = '1acdeaa8cb4b8098a2ace32e51ba6508'

client.databases.query({
  database_id: database_id
}).then((data) => {
  console.log(JSON.stringify(data))
} )