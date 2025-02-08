import { Client } from '@notionhq/client';

const NOTION_TOKEN = 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222'

const notion = new Client({
  auth: NOTION_TOKEN,
});


const PAGE_ID = '182deaa8cb4b80aa98b7dd9769a6df02'

//182deaa8-cb4b-800d-bad2-c1790f00a4af


const page_blocks = await notion.blocks.children.list({
  block_id: PAGE_ID
})


console.log(JSON.stringify(page_blocks) )


