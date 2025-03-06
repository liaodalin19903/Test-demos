// notion.ts
import { Client } from '@notionhq/client';
import { Request, Response } from 'express';

// 初始化 Notion Client
const notion = new Client({
  //auth: process.env.NOTION_API_KEY, // 确保在环境变量中设置了 NOTION_API_KEY
  auth: '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'
});

// 定义请求体的类型
interface GetDataN2CRequest {
  database_id: string;
  key: string;
}

interface SyncC2NRequest {
  database_id: string;
  key: string;
  value: {
    id: string;
    name: string;
    age: number;
    created_time: string;
    last_update_time: string;
  };
}


// 获取数据
export const getdata_n2c = async (req: Request<{}, {}, {}, GetDataN2CRequest>, res: Response) => {
  const { database_id, key } = req.query;

  console.log("database_id+key:", database_id, key);
  console.log("req:", req);

  if (!database_id || !key) {
    return res.status(400).json({ message: 'database_id and key are required' });
  }

  try {
    // 查询数据库
    const response = await notion.databases.query({
      database_id: database_id as string,
      filter: {
        property: 'key',
        title: {
          equals: key as string,
        },
      },
    });

    if (response.results.length === 0) {
      return res.status(404).json({ message: 'No data found for the given key' });
    }

    const page = response.results[0];
    const properties = page.properties;

    // 提取 value 属性
    const value = JSON.parse(properties['value']?.rich_text[0]?.plain_text || '{}');

    return res.status(200).json(value);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    return res.status(500).json({ message: 'Failed to fetch data', error: error.message });
  }
};

// 同步数据
export const sync_c2n = async (req: Request<{}, {}, SyncC2NRequest>, res: Response) => {
  //console.log('req.body: ', req.body);
  
  const { database_id, key, value } = req.query;

  try {
    // 查询数据库
    const response = await notion.databases.query({
      database_id,
      filter: {
        property: 'key',
        title: {
          equals: key,
        },
      },
    });

    const properties = {
      key: {
        title: [
          {
            type: 'text',
            text: {
              content: key,
            },
          },
        ],
      },
      value: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: JSON.stringify(value),
            },
          },
        ],
      },
    };

    if (response.results.length === 0) {
      // 如果 key 不存在，则创建新页面
      await notion.pages.create({
        parent: {
          database_id: database_id,
        },
        properties: properties,
      });

      return res.status(201).json({ message: 'New page created successfully' });
    } else {
      // 如果 key 存在，则更新现有页面
      const pageId = response.results[0].id;

      await notion.pages.update({
        page_id: pageId,
        properties: properties,
      });

      return res.status(200).json({ message: 'Sync completed successfully' });
    }
  } catch (error) {
    console.error('Error syncing data to Notion:', error);
    return res.status(500).json({ message: 'Sync failed', error: error.message });
  }
};