// notion-sdk-js-util.ts

import { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

/**
 * 过滤出特定类型的块
 * @param blocks - 块数组
 * @param type - 块类型
 * @returns 过滤后的块数组
 */
export function filterBlocksByType(blocks: BlockObjectResponse[], type: string): BlockObjectResponse[] {
  return blocks.filter(block => block.type === type);
}