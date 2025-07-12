
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

// 修复1: 创建从字符到五行的映射
export const charToWuxingMap: Record<TianganDizhiChar, Wuxing> = {
  // 天干
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水',
  // 地支
  '寅': '木', '卯': '木',
  '巳': '火', '午': '火',
  '辰': '土', '戌': '土', '丑': '土', '未': '土',
  '申': '金', '酉': '金',
  '亥': '水', '子': '水'
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


// 地支藏干分数表
export const dizhiCanggan: Record<DizhiChar, [TianganChar, number][]> = {
  '子': [['癸', 100]],
  '丑': [['己', 60], ['癸', 30], ['辛', 10]],
  '寅': [['甲', 60], ['丙', 30], ['戊', 10]],
  '卯': [['乙', 100]],
  '辰': [['戊', 60], ['乙', 30], ['癸', 10]],
  '巳': [['丙', 60], ['戊', 30], ['庚', 10]],
  '午': [['丁', 70], ['己', 30]],
  '未': [['己', 60], ['丁', 30], ['乙', 10]],
  '申': [['庚', 60], ['壬', 30], ['戊', 10]],
  '酉': [['辛', 100]],
  '戌': [['戊', 60], ['辛', 30], ['丁', 10]],
  '亥': [['壬', 70], ['甲', 30]]
};

// 月支对应的五行旺度系数表
export const monthCoefficients: Record<DizhiChar, Record<Wuxing, number>> = {
  '寅': { '木': 1.571, '火': 1.548, '土': 0.924, '金': 0.716, '水': 0.862 },
  '卯': { '木': 2.000, '火': 1.414, '土': 0.500, '金': 0.707, '水': 1.000 },
  '辰': { '木': 1.166, '火': 1.074, '土': 1.421, '金': 1.161, '水': 0.800 },
  '巳': { '木': 0.862, '火': 1.571, '土': 1.548, '金': 0.924, '水': 0.716 },
  '午': { '木': 0.912, '火': 1.700, '土': 1.590, '金': 0.774, '水': 0.645 },
  '未': { '木': 0.924, '火': 1.341, '土': 1.674, '金': 1.069, '水': 0.612 },
  '申': { '木': 0.795, '火': 0.674, '土': 1.012, '金': 1.641, '水': 1.498 },
  '酉': { '木': 0.500, '火': 0.707, '土': 1.000, '金': 2.000, '水': 1.414 },
  '戌': { '木': 0.674, '火': 1.012, '土': 1.641, '金': 1.498, '水': 0.795 },
  '亥': { '木': 1.590, '火': 0.774, '土': 0.645, '金': 0.912, '水': 1.700 },
  '子': { '木': 1.414, '火': 0.500, '土': 0.707, '金': 1.000, '水': 2.000 },
  '丑': { '木': 0.898, '火': 0.821, '土': 1.512, '金': 1.348, '水': 1.041 }
};



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
  const rawScores: Record<Wuxing, number> = {
    '金': 0, '木': 0, '水': 0, '火': 0, '土': 0
  };

  // 处理天干部分（位置1-4）
  for (let i = 1; i <= 4; i++) {
    const gan = eightChar[i as keyof EightChar] as TianganChar;
    const wuxing = charToWuxingMap[gan];
    if (wuxing) {
      rawScores[wuxing] += 100;
    }
  }

  // 处理地支部分（位置5-8）
  for (let i = 5; i <= 8; i++) {
    const zhi = eightChar[i as keyof EightChar] as DizhiChar;
    const canggan = dizhiCanggan[zhi];
    if (canggan) {
      for (const [gan, score] of canggan) {
        const wuxing = charToWuxingMap[gan as TianganChar];
        if (wuxing) {
          rawScores[wuxing] += score;
        }
      }
    }
  }

  // 获取月支对应的旺度系数
  const yuezhi = eightChar[6] as DizhiChar;
  const coefficients = monthCoefficients[yuezhi] || {
    '木': 1, '火': 1, '土': 1, '金': 1, '水': 1
  };

  // 应用旺度系数计算加权分数
  const weightedScores: Record<Wuxing, number> = {
    '金': rawScores['金'] * coefficients['金'],
    '木': rawScores['木'] * coefficients['木'],
    '水': rawScores['水'] * coefficients['水'],
    '火': rawScores['火'] * coefficients['火'],
    '土': rawScores['土'] * coefficients['土']
  };

  // 计算总分
  const totalScore = Object.values(weightedScores).reduce((sum, score) => sum + score, 0);

  // 计算各五行占比（四舍五入保留4位小数）
  return {
    '金': totalScore > 0 ? parseFloat((weightedScores['金'] / totalScore).toFixed(4)) : 0,
    '木': totalScore > 0 ? parseFloat((weightedScores['木'] / totalScore).toFixed(4)) : 0,
    '水': totalScore > 0 ? parseFloat((weightedScores['水'] / totalScore).toFixed(4)) : 0,
    '火': totalScore > 0 ? parseFloat((weightedScores['火'] / totalScore).toFixed(4)) : 0,
    '土': totalScore > 0 ? parseFloat((weightedScores['土'] / totalScore).toFixed(4)) : 0
  };
};


const ec: EightChar = {
  1: '己',
  2: '丁',
  3: '甲',
  4: '甲',
  5: '巳',
  6: '丑',
  7: '午',
  8: '子'
};

const res = getWuxingPercentage(ec)

console.log(res)

// 得到的结果： { '金': NaN, '木': NaN, '水': NaN, '火': NaN, '土': NaN } 