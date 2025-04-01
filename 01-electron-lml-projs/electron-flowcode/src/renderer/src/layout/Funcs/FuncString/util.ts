// 方法1：将函数代码转换为一行的字符串
export const functionToString = (func: Function): string => {
  return func.toString().replace(/\s+/g, ' ').trim();
};

// 方法2：将字符串反转为函数代码
export const stringToFunction = (funcString: string): Function => {
  if (funcString.trim() === '') {
    return () => {}; // 返回一个空函数
  }

  const funcBody = funcString.match(/\{([\s\S]*)\}/);
  if (!funcBody) {
    throw new Error('Invalid function string.');
  }
  return new Function(`return (${funcString})`)();
};

// 方法3：将多行文本转换为单行文本，并保留换行符的可视化表示
export const multilineToOneLine = (multilineText: string): string => {
  return multilineText.replace(/\n/g, '\\n').trim(); // 将换行符替换为 "\n"
};

// 方法4：将单行文本转换为多行文本，并还原换行符
export const oneLineToMultiline = (oneLineText: string): string => {
  // 将可视化换行符 "\n" 还原为实际换行符
  const functions = oneLineText.split(/;(?![^\\]*\\n)/).map(func => func.trim()); // 按分号分割，忽略 "\n" 中的分号
  return functions.join('\n\n').replace(/\\n/g, '\n'); // 还原换行符
};
