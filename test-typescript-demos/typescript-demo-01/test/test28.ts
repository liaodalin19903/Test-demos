

export type EightChar = {
  1: string; // 年干
  2: string; // 月干
  3: string; // 日干
  4: string; // 时干
  5: string; // 年支
  6: string; // 月支
  7: string; // 日支
  8: string; // 时支
}

export const getDizhiSanhui = (eightChar: EightChar): string[] => {
  // 定义三会局组合
  const sanhuiGroups = [
    { name: '巳午未', elements: ['巳', '午', '未'] },
    { name: '申酉戌', elements: ['申', '酉', '戌'] },
    { name: '亥子丑', elements: ['亥', '子', '丑'] },
    { name: '寅卯辰', elements: ['寅', '卯', '辰'] }
  ];

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];

  // 检查每个三会局组合
  for (const group of sanhuiGroups) {
    // 检查三会局的每个地支是否都出现在八字地支中
    const hasAll = group.elements.every(element => diZhi.includes(element));
    
    if (hasAll) {
      results.push(group.name);
    }
  }

  return results;
};

// 示例 1: 巳午未三会火局
const char1 = {
  1: '甲', 2: '乙', 3: '丙', 4: '丁',
  5: '巳', 6: '午', 7: '未', 8: '子'
};
const c1 = getDizhiSanhui(char1); // 返回 ['巳午未']

// 示例 2: 多个三会局
const char2 = {
  1: '甲', 2: '乙', 3: '丙', 4: '丁',
  5: '亥', 6: '子', 7: '丑', 8: '寅'
};
const c2 = getDizhiSanhui(char2); // 返回 ['亥子丑']

// 示例 3: 完整的三会局（顺序无关）
const char3 = {
  1: '甲', 2: '乙', 3: '丙', 4: '丁',
  5: '申', 6: '戌', 7: '酉', 8: '子'
};
const c3 = getDizhiSanhui(char3); // 返回 ['申酉戌']

// 示例 4: 没有三会局
const char4 = {
  1: '甲', 2: '乙', 3: '丙', 4: '丁',
  5: '子', 6: '丑', 7: '寅', 8: '卯'
};
const c4 = getDizhiSanhui(char4); // 返回 []

console.log(c1, c2, c3, c4)

