import { Client } from '@notionhq/client';

const NOTION_TOKEN = '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';
const DATABASE_ID = '1acdeaa8cb4b8098a2ace32e51ba6508';

const notion = new Client({
  auth: NOTION_TOKEN,
});

async function queryPagesUpdatedAfter() {
  try {
    // 构建查询参数
    const query = {
      database_id: DATABASE_ID,
      filter: {
        "timestamp": "last_edited_time",
        "last_edited_time": {
          "on_or_before": "2025-03-07"
        }
      }
    };

    // 执行数据库查询
    const response = await notion.databases.query(query);

    // 处理查询结果
    const pages = response.results;
    console.log(`找到 ${pages.length} 个更新时间大于 2025-03-07 的页面：`);
    pages.forEach((page) => {
      console.log(`页面 ID: ${page.id}, 最后编辑时间: ${page.last_edited_time}`);
    });

    return pages;
  } catch (error) {
    console.error('查询页面时出错:', error);
    return [];
  }
}

// 调用函数执行查询
queryPagesUpdatedAfter();