import MKNotion from './MKNotion/lib/mknotion'
import MKNotionDatabase from './MKNotion/lib/mkdatabase'
import { Database001PageType } from './PageType'
import MKNotionPage from './MKNotion/lib/mkpage'

import { Client } from '@notionhq/client'
import { NotionCompatAPI } from 'notion-compat'

import express, { Request, Response } from 'express';
// 引入 cors 中间件
import cors from 'cors'



// const Client = require('@notionhq/client');
// const NotionCompatAPI = require('notion-compat');

// 创建 Express 应用实例
const app = express();
// 定义端口号
const port = 3000;

// 使用 cors 中间件，允许所有来源的跨域请求
app.use(cors());

// 定义一个处理根路径 GET 请求的路由
app.get('/', (req: Request, res: Response) => {
    res.send('Hello, TypeScript with Express!');
});


app.get('/blocks/:pageid', async (req: Request, res: Response) => {

    const token = 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222'
    const dbId = '17ddeaa8cb4b80babdb6db9d10f6bd77'

    MKNotion.init(token)

    const db: MKNotionDatabase = MKNotion.getDbInstance(dbId);

    const pages: MKNotionPage<Database001PageType>[] = await db.getPages<Database001PageType>()
    console.log(JSON.stringify(pages[0].properties.name))

    // 基于page的id，查询出page的所有blocks，转为markdown进行展示
    const blocks = await pages[3].getBlocks()

    console.log('blocks', JSON.stringify(blocks))

    const data = JSON.stringify(blocks)

    res.send(`${data}`);
});


app.get('/blocks2/:pageid', async (req: Request, res: Response) => {
    const token = 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222'

    const notion = new NotionCompatAPI(
        new Client({ auth: token })
    )

    const pageId = '17ddeaa8cb4b80929a2cc1617a013cdd'

    const recordMap = await notion.getPage(pageId)

    res.send(`${recordMap}`) 

});

// 启动服务器并监听指定端口
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});