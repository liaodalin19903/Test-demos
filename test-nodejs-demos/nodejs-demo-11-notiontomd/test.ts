// 引入 Notion 客户端
import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { filterBlocksByType } from "./utils/notion-sdk-js-util";

// 初始化 Notion 客户端
const notion = new Client({
  auth: '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', // 使用环境变量存储 API 密钥
});

const pageId = '1b1deaa8cb4b80f284bbfdd4115df4d5';

// 定义异步函数以获取所有块
async function fetchAllBlocks(pageId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = []; // 明确 blocks 类型
  let cursor: string | null | undefined = undefined;

  try {
    do {
      const response = await notion.blocks.children.list({
        block_id: pageId,
        start_cursor: cursor, // 类型匹配
        page_size: 100, // 每次请求的最大块数
      });

      const results = response.results as BlockObjectResponse[]; // 类型断言
      blocks.push(...results); // 确保类型匹配
      cursor = response.next_cursor;
    } while (cursor);

    return blocks;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    throw error;
  }
}



// 主程序入口
(async () => {
  try {
    const blockList = await fetchAllBlocks(pageId);
    // 过滤出 toggle 类型的块
     const toggleBlocks = filterBlocksByType(blockList, 'toggle');
     console.log('Toggle Blocks:', toggleBlocks);
 
     // 过滤出 paragraph 类型的块
     const paragraphBlocks = filterBlocksByType(blockList, 'paragraph');
     console.log('Paragraph Blocks:', paragraphBlocks);
   
  } catch (error) {
    console.error("Error:", error);
  }
})();