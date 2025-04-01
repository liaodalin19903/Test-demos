
const addFunc = (a: number, b: number) => {
  return a + b;
};

// 方法1：将函数代码转换为一行的字符串
const functionToString = (func: Function): string => {
  return func.toString().replace(/\s+/g, ' ').trim();
};

// 方法2：将字符串反转为函数代码
const stringToFunction = (funcString: string): Function => {
  const funcBody = funcString.match(/\{([\s\S]*)\}/);
  if (!funcBody) {
    throw new Error('Invalid function string');
  }
  return new Function(`return (${funcString})`)();
};

// 测试
const addFuncString = functionToString(addFunc);
console.log('Function as string:', addFuncString);

const addFuncFromStr = stringToFunction(addFuncString);
console.log('Function from string:', addFuncFromStr(2, 3)); // 输出: 5