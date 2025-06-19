export type EightChar = {
  1: string; // 年干
  2: string; // 月干
  3: string; // 日干（日元）
  4: string; // 时干
  5: string; // 年支
  6: string; // 月支
  7: string; // 日支
  8: string; // 时支
}

// 五行属性映射
const wuXingMap: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火',
  '戊': '土', '己': '土', '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
  '寅': '木', '卯': '木', '巳': '火', '午': '火',
  '辰': '土', '戌': '土', '丑': '土', '未': '土',
  '申': '金', '酉': '金', '亥': '水', '子': '水'
};

// 五行相生关系
const shengMap: Record<string, string> = {
  '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
};

/**
 * 通过八字计分
 * 年干：8分 月干：12分 日干       时干：12分
 * 年支：4分 月支：40分 日支：12分  时支：12分
 * 规则：只有生我（印星）和同我（比劫）才加分
 * @param eightChar 八字对象
 * @returns 总得分
 */
const getShenqiangruoScore = (eightChar: EightChar): number => {
  // 位置对应的分数权重
  const positionScores: Record<number, number> = {
    1: 8,   // 年干
    2: 12,  // 月干
    4: 12,  // 时干
    5: 4,   // 年支
    6: 40,  // 月支
    7: 12,  // 日支
    8: 12   // 时支
  };

  // 获取日元的五行属性
  const riYuan = eightChar[3]; // 日干（日元）
  const riYuanWuXing = wuXingMap[riYuan];
  
  let totalScore = 0;

  // 遍历需要计分的位置（跳过日干位置3）
  const positions: (keyof EightChar)[] = [1, 2, 4, 5, 6, 7, 8];
  for (const position of positions) {
    const element = eightChar[position];
    const elementWuXing = wuXingMap[element];
    
    // 检查是否应该加分
    if (elementWuXing === riYuanWuXing) {
      // 同我（比劫）: 相同五行
      totalScore += positionScores[position];
    } else if (shengMap[elementWuXing] === riYuanWuXing) {
      // 生我（印星）: 生助日元
      totalScore += positionScores[position];
    }
    // 其他情况（我生、我克、克我）不加分
  }

  return totalScore;
};

const eightChar2 = {
  1: '己',
  2: '丁',
  3: '甲',
  4: '甲',
  5: '巳',
  6: '丑',
  7: '午',
  8: '子' 
}

const eightChar = {
  1: '辛',
  2: '甲',
  3: '辛',
  4: '丁',
  5: '未',
  6: '午',
  7: '未',
  8: '酉' 
}

const score = getShenqiangruoScore(eightChar)
console.log(score)
