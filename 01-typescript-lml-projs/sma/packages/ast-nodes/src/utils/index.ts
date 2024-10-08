const path = require('path');

// 获取绝对路径
export const getAbFilePath = (filePath: string):string => {

  const absolutePath = path.resolve(__dirname, filePath);
  return absolutePath
}

