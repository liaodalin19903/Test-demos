// notion.ts
import { Client } from '@notionhq/client';
import { Request, Response } from 'express';

// 初始化 Notion Client
const notion = new Client({
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
    update_time: string;
  };
}

interface PageExistRequest {
  database_id: string;
  key: string;
}

// 检查页面是否存在
export const page_exsist = async (req: Request<{}, {}, {}, PageExistRequest>, res: Response) => {
  const { database_id, key } = req.query;

  if (!database_id || !key) {
    return res.status(400).json({ message: 'database_id and key are required' });
  }

  try {
    const response = await notion.databases.query({
      database_id: database_id as string,
      filter: {
        property: 'key',
        title: {
          equals: key as string,
        },
      },
    });

    const exists = response.results.length > 0;

    return res.status(200).json({ exists });
  } catch (error) {
    console.error('Error checking page existence in Notion:', error);
    return res.status(500).json({ message: 'Failed to check page existence', error: error.message });
  }
};

// 获取数据（通过属性）
export const getdata_n2c = async (req: Request<{}, {}, {}, GetDataN2CRequest>, res: Response) => {
  const { database_id, key } = req.query;

  if (!database_id || !key) {
    return res.status(400).json({ message: 'database_id and key are required' });
  }

  try {
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

    const value = JSON.parse(properties['value']?.rich_text[0]?.plain_text || '{}');

    return res.status(200).json(value);
  } catch (error) {
    console.error('Error fetching data from Notion:', error);
    return res.status(500).json({ message: 'Failed to fetch data', error: error.message });
  }
};


// 同步数据到notion（同步本地数据到notion）
// 同步数据到notion（同步本地数据到notion）
export const sync_c2n = async (req: Request<{}, {}, SyncC2NRequest>, res: Response) => {
  const { database_id, key, value } = req.body;

  console.log("database_id, key, value: ", database_id, key, value);

  const properties = {
    key: {
      title: [
        {
          type: 'text',
          text: {
            content: key.toString(),
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

  try {

    console.log("查询前：")
    // 查询具有指定 key 属性的页面
    const response = await notion.databases.query({
      database_id: database_id,
      filter: {
        property: 'key',
        title: {
          equals: key.toString(),
        },
      },
    });

    console.log("查询后：",  response.results[0] ? response.results[0].id : '')

    if (response.results.length > 0) {
      // 页面存在，使用页面 ID 进行更新
      const pageId = response.results[0].id;
      await notion.pages.update({
        page_id: pageId,
        properties: properties,
      });

      return res.status(200).json({ message: 'Sync completed successfully' });
    } else {
      // 页面不存在，创建新页面
      await notion.pages.create({
        parent: {
          database_id: database_id,
        },
        properties: properties,
      });

      return res.status(201).json({ message: 'New page created successfully' });
    }
  } catch (error) {
    console.error('Error syncing data to Notion:', error);
    return res.status(500).json({ message: 'Sync failed', error: error.message });
  }
};


// 获取数据库页面，基于过滤条件
export const getDbPages = async (database_id: string, filter: string) => {
  try {
    const query = {
      database_id,
      filter: JSON.parse(filter)
    };

    const response = await notion.databases.query(query);

    const pages = response.results;

    console.log(`找到 ${pages.length} 个符合条件的页面：`);
    pages.forEach((page) => {
      console.log(`页面 ID: ${page.id}, 最后编辑时间: ${page.last_edited_time}`);
    });

    return pages;
  } catch (error) {
    console.error('查询页面时出错:', error);
    return [];
  }
};