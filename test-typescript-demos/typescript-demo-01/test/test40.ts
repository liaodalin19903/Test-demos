export type Wuxing = '木' | '火' | '土' | '金' | '水';

export type TianganChar =
  | '甲' | '乙' | '丙' | '丁' | '戊'
  | '己' | '庚' | '辛' | '壬' | '癸';

export type DizhiChar =
  | '子' | '丑' | '寅' | '卯' | '辰'
  | '巳' | '午' | '未' | '申' | '酉'
  | '戌' | '亥';

export type TianganDizhiChar = TianganChar | DizhiChar;

// 定义五行与天干地支的映射
export const tianganDizhiWuxingMap: Record<Wuxing, TianganDizhiChar[]> = {
  '木': ['甲', '乙', '寅', '卯'],
  '火': ['丙', '丁', '巳', '午'],
  '土': ['戊', '己', '辰', '戌', '丑', '未'],
  '金': ['庚', '辛', '申', '酉'],
  '水': ['壬', '癸', '亥', '子']
};

export type WuxingPercentage = {
  '金': number;
  '木': number;
  '水': number;
  '火': number;
  '土': number;
};


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

/**
 * 获取五行占比
 * @param eightChar 八字信息
 * @returns 五行占比
 *
 *
 * {
    '金': 0.02,
    '木': 0.72,
    '水': 0.04,
    '火': 0.12,
    '土': 0.xx
  };
 *
 * 功能：可以用于判定五行是否缺失、五行的旺衰程度
 */
export const getWuxingPercentage = (eightChar: EightChar): WuxingPercentage => {
  // 初始化五行原始分数
  const rawScores: Record<string, number> = {
    '金': 0, '木': 0, '水': 0, '火': 0, '土': 0
  };

  // 处理天干部分（位置1-4）
  for (let i = 1; i <= 4; i++) {
    const gan = eightChar[i as keyof EightChar] as string;
    const element = tianganDizhiWuxingMap[gan];
    if (element) {
      rawScores[element] += 100;
    }
  }

  // 处理地支部分（位置5-8）
  for (let i = 5; i <= 8; i++) {
    const zhi = eightChar[i as keyof EightChar] as string;
    const canggan = dizhiCanggan[zhi];
    if (canggan) {
      for (const [gan, score] of canggan) {
        const element = tianganDizhiWuxingMap[gan];
        if (element) {
          rawScores[element] += score;
        }
      }
    }
  }

  // 获取月支对应的旺度系数
  const yuezhi = eightChar[6];
  const coefficients = monthCoefficients[yuezhi] || {
    '木': 1, '火': 1, '土': 1, '金': 1, '水': 1
  };

  // 应用旺度系数计算加权分数
  const weightedScores: Record<string, number> = {
    '金': rawScores['金'] * coefficients['金'],
    '木': rawScores['木'] * coefficients['木'],
    '水': rawScores['水'] * coefficients['水'],
    '火': rawScores['火'] * coefficients['火'],
    '土': rawScores['土'] * coefficients['土']
  };

  // 计算总分
  const totalScore = Object.values(weightedScores).reduce((sum, score) => sum + score, 0);

  console.log('weightedScores: ', weightedScores)
  console.log('totalScore: ', totalScore)

  // 计算各五行占比
  return {
    '金': weightedScores['金'] / totalScore,
    '木': weightedScores['木'] / totalScore,
    '水': weightedScores['水'] / totalScore,
    '火': weightedScores['火'] / totalScore,
    '土': weightedScores['土'] / totalScore
  };
};