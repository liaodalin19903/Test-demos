// 引入 Notion 客户端
import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { filterBlocksByType } from "./utils/notion-sdk-js-util";

// 初始化 Notion 客户端
const notion = new Client({
  auth: 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222', // 使用环境变量存储 API 密钥
});

//const pageId = '1cbdeaa8cb4b80c18c1afee578754cc9'  // test

const pageId = '1cbdeaa8cb4b80f4bd41dcffa7ad330d'  // test2
//const pageId = '1b1deaa8cb4b80f284bbfdd4115df4d5';  //ok

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

// 定义异步函数以获取单个块的子块
async function fetchBlockChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const children: BlockObjectResponse[] = [];
  let cursor: string | null | undefined = undefined;

  try {
    do {
      const response = await notion.blocks.children.list({
        block_id: blockId,
        start_cursor: cursor,
        page_size: 100,
      });

      const results = response.results as BlockObjectResponse[];
      children.push(...results);
      cursor = response.next_cursor;
    } while (cursor);

    return children;
  } catch (error) {
    console.error("Error fetching block children:", error);
    throw error;
  }
}

// 提取 rich_text 内容的方法
function extractRichText(blocks: BlockObjectResponse[]): string[] {
  const richTexts: string[] = [];

  blocks.forEach((block) => {
    const blockType = block.type;
    const richTextArray = block[blockType]?.rich_text || block[blockType]?.code?.rich_text;

    if (richTextArray) {
      const plainText = richTextArray.map(rt => rt.plain_text).join('');
      richTexts.push(plainText);
    }
  });

  return richTexts;
}

// 主程序入口
(async () => {
  try {
    const blockList = await fetchAllBlocks(pageId);
    // 过滤出 toggle 类型的块
    const toggleBlocks = filterBlocksByType(blockList, 'toggle');
    //console.log('Toggle Blocks:', toggleBlocks);

    // 并发获取每个 toggle 块的子块
    const childrenPromises = toggleBlocks.map(async (toggleBlock) => {
      if (toggleBlock.type === 'toggle') {
        const children = await fetchBlockChildren(toggleBlock.id);
        return { toggleBlockId: toggleBlock.id, children };
      }
      return { toggleBlockId: toggleBlock.id, children: [] };
    });

    const results = await Promise.all(childrenPromises);

    // 提取所有的 children 到一个数组
    const allChildren: BlockObjectResponse[] = [];
    results.forEach((result) => {
      allChildren.push(...result.children);
    });

    // 提取 rich_text 内容
    const richTexts = extractRichText(allChildren);
    console.log('All Rich Text:', richTexts);
  } catch (error) {
    console.error("Error:", error);
  }
})();