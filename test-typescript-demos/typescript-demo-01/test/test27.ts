
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



export const getTianGanWuhe = (eightChar: EightChar): string[] => {
  // 定义天干五合组合
  const wuheCombinations: Record<string, string> = {
    '甲己': '甲己合',
    '乙庚': '乙庚合',
    '丙辛': '丙辛合',
    '丁壬': '丁壬合',
    '戊癸': '戊癸合'
  };

  // 提取四个天干
  const tianGan = [
    eightChar[1], // 年干
    eightChar[2], // 月干
    eightChar[3], // 日干
    eightChar[4]  // 时干
  ];

  const results: string[] = [];
  const usedIndices = new Set<number>(); // 记录已使用的天干索引

  // 检查所有可能的组合
  for (let i = 0; i < tianGan.length; i++) {
    if (usedIndices.has(i)) continue;

    for (let j = i + 1; j < tianGan.length; j++) {
      if (usedIndices.has(j)) continue;

      // 尝试两种顺序的组合
      const combo1 = tianGan[i] + tianGan[j];
      const combo2 = tianGan[j] + tianGan[i];

      if (wuheCombinations[combo1]) {
        results.push(wuheCombinations[combo1]);
        usedIndices.add(i);
        usedIndices.add(j);
        break; // 找到配对后跳出内层循环
      } else if (wuheCombinations[combo2]) {
        results.push(wuheCombinations[combo2]);
        usedIndices.add(i);
        usedIndices.add(j);
        break; // 找到配对后跳出内层循环
      }
    }
  }

  return results;
};


// 示例 1
const char1 = {
  1: '己', 2: '丁', 3: '甲', 4: '甲',
  5: '巳', 6: '丑', 7: '午', 8: '子'
};
const c1 = getTianGanWuhe(char1); // 返回 ['甲己合']

// 示例 2
const char2 = {
  1: '己', 2: '甲', 3: '丙', 4: '辛',
  5: '子', 6: '丑', 7: '寅', 8: '卯'
};
const c2 = getTianGanWuhe(char2); // 返回 ['甲己合', '丙辛合']

console.log(c1, c2);