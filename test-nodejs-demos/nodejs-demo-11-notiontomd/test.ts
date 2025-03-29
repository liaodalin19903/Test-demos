// 引入 Notion 客户端
import { Client } from "@notionhq/client";
import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

// 初始化 Notion 客户端
const notion = new Client({
  auth: 'ntn_111597715054833VgFVtnUaFvR6C62bam4UVJEFMRrkPhu8RE222', // 使用环境变量存储 API 密钥
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

// 工具方法：按照 id 进行升序排序
function sortBlocksById(blocks: BlockObjectResponse[]): BlockObjectResponse[] {
  return blocks.sort((a, b) => a.id.localeCompare(b.id));
}

// 提取 toggle 和 paragraph 块中的 rich_text 内容，并转换为 JSON 字符串
function extractRichTextFromBlocks(blocks: BlockObjectResponse[]): any[] {
  const richTexts: any[] = [];

  blocks.forEach(block => {
    if (block.type === 'toggle' && block.toggle.rich_text) {
      richTexts.push({ id: block.id, type: block.type, rich_text: JSON.stringify(block.toggle.rich_text) });
    } else if (block.type === 'paragraph' && block.paragraph.rich_text) {
      richTexts.push({ id: block.id, type: block.type, rich_text: JSON.stringify(block.paragraph.rich_text) });
    }
  });

  return richTexts;
}

// 主程序入口
(async () => {
  try {
    const data = await fetchAllBlocks(pageId);
    const sortedData = sortBlocksById(data);
    const richTexts = extractRichTextFromBlocks(sortedData);
    console.log(richTexts);
  } catch (error) {
    console.error("Error:", error);
  }
})();