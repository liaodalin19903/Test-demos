

import { Client } from '@notionhq/client'
import { NotionCompatAPI } from 'notion-compat'

// const Client = require('@notionhq/client');
// const NotionCompatAPI = require('notion-compat');


(async() => {
  const token = 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222'

  const notion = new NotionCompatAPI(
      new Client({ auth: token })
  )
  
  const pageId = '17ddeaa8cb4b80929a2cc1617a013cdd'
  
  const recordMap = await notion.getPage(pageId)
  
  console.log(recordMap)

})()
