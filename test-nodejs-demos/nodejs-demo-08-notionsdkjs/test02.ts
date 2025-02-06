

const notion = new NotionAPI({
  authToken: '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'
})

const PAGE_ID = '182deaa8cb4b80aa98b7dd9769a6df02'

const recordMap = await notion.getPage(PAGE_ID)
console.log('recordMap: ', recordMap )