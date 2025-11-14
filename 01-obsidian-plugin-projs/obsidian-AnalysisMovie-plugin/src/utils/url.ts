/**
 * 构建本地 HTTP URL

// 示例使用
const relativePath = 'aaa/bbb/ccc.png';
const fullUrl = buildHttpUrl(relativePath);
console.log(fullUrl); // 输出: http://localhost:19903/aaa/bbb/ccc.png
 
* 
 * 
 * @param relativePath 相对路径
 * @returns 绝对路径
 */
export const buildLocalHttpUrl = (relativePath: string): string => {
  const baseUrl = 'http://localhost:19903';
  // 使用 URL 构造函数自动处理路径拼接（避免重复斜杠等问题）
  return new URL(relativePath, baseUrl).href;
}


