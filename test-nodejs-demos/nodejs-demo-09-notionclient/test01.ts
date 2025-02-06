import { NotionAPI } from "notion-client"

const notion = new NotionAPI({
  authToken: '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'
})

console.log('notion: ', notion)

const PAGE_ID = '182deaa8-cb4b-80aa-98b7-dd9769a6df02'  // 'e68c18a461904eb5a2ddc3748e76b893'

const recordMap = await notion.getPage(PAGE_ID)
console.log('recordMap: ', JSON.stringify(recordMap) )

