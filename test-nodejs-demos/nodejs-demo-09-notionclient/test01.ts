import { NotionAPI } from "notion-client"

const notion = new NotionAPI({
  authToken: '111ntn_597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222'
})

console.log('notion: ', notion)

const PAGE_ID = '1acdeaa8cb4b80649d46fbe1c2b42503'  // 'e68c18a461904eb5a2ddc3748e76b893'

const recordMap = await notion.getPage(PAGE_ID)
console.log('recordMap: ', JSON.stringify(recordMap) )

