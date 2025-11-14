
export const normalizeAppProtocolPath = (url: string): string => {
  // 检查是否以 app:// 开头
  if (!url.startsWith('app://')) {
    throw new Error('Invalid app protocol URL');
  }

  // 找到第一个 '/' 在协议之后的位置（即 host 结束后）
  const hostEndIndex = url.indexOf('/', 8); // 'app://' 是 7 个字符，从第 8 个开始找 '/'
  
  if (hostEndIndex === -1) {
    throw new Error('Invalid path format');
  }

  // 提取 host 后面的路径部分
  let path = url.slice(hostEndIndex);

  // 去除查询参数（如果存在）
  const queryIndex = path.indexOf('?');
  if (queryIndex !== -1) {
    path = path.substring(0, queryIndex);
  }

  return decodeURIComponent(path);
}

