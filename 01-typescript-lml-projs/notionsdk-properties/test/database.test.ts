
//const MKNotion = require('../lib/mknotion')

import MKNotion from '../lib/mknotion'
import MKNotionDatabase from '../lib/mkdatabase'
import { Database001PageType } from './pagetypes'
import MKNotionPage from '../lib/mkpage'


const token = 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222'
const dbId = '17ddeaa8cb4b80babdb6db9d10f6bd77'

MKNotion.init(token)

const db: MKNotionDatabase = MKNotion.getDbInstance(dbId);

(async() => {

  const pages: MKNotionPage<Database001PageType>[] = await db.getPages<Database001PageType>()
  console.log(JSON.stringify(pages[0].properties.name))

  // 基于page的id，查询出page的所有blocks，转为markdown进行展示
  const blocks = await pages[3].getBlocks()
  
  console.log('blocks', blocks)

})()

