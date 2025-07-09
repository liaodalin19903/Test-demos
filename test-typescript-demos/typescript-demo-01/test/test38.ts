// 判断八字的寒热燥湿 



// import { 
//   getWuxingPercentage, 
//   getTianganXiangchong, 
//   getDizhiXiangchong, 
//   getDizhiSanhe 
// } from './path/to/methods';
// import { TiaohouReasonType, EightChar, WuxingPercentage } from './types';



// 调候依据原因
export type TiaohouReasonType = '寒' | '热' | '燥' | '湿'

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

// 月支对应的五行旺度系数表
export const monthCoefficients: Record<string, Record<string, number>> = {
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


export const getWuxingPercentage = (eightChar: EightChar): WuxingPercentage => {
  // 初始化五行原始分数
  const rawScores: Record<string, number> = {
    '金': 0, '木': 0, '水': 0, '火': 0, '土': 0
  };

  // 处理天干部分（位置1-4）
  for (let i = 1; i <= 4; i++) {
    const gan = eightChar[i as keyof EightChar] as string;
    const element = wuxingMap[gan];
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
        const element = wuxingMap[gan];
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

  // 计算各五行占比
  return {
    '金': weightedScores['金'] / totalScore,
    '木': weightedScores['木'] / totalScore,
    '水': weightedScores['水'] / totalScore,
    '火': weightedScores['火'] / totalScore,
    '土': weightedScores['土'] / totalScore
  };
};

export const getEightCharHanReZaoShi = (eightChar: EightChar): TiaohouReasonType[] => {
  const results: TiaohouReasonType[] = [];
  const yuezhi = eightChar[6]; // 月支
  const wuxing: WuxingPercentage = getWuxingPercentage(eightChar);
  
  // 1. 判断寒热（基于月令和五行比例）
  const winterMonths = ['亥', '子', '丑']; // 冬季月份
  const summerMonths = ['巳', '午', '未']; // 夏季月份
  
  if (winterMonths.includes(yuezhi)) {
    if (wuxing['火'] < 0.1) results.push('寒'); // 冬季火弱则寒
  } else if (summerMonths.includes(yuezhi)) {
    if (wuxing['水'] < 0.1) results.push('热'); // 夏季水弱则热
  }
  
  // 2. 判断燥湿（基于月令和五行比例）
  const dryEarthMonths = ['戌', '未']; // 燥土月
  const wetEarthMonths = ['辰', '丑']; // 湿土月
  const waterMonths = ['亥', '子'];   // 水月
  
  // 燥土月且水弱 -> 燥
  if (dryEarthMonths.includes(yuezhi) && wuxing['水'] < 0.1) {
    results.push('燥');
  } 
  // 湿土月且火弱 -> 湿
  else if (wetEarthMonths.includes(yuezhi) && wuxing['火'] < 0.1) {
    results.push('湿');
  }
  
  // 水月且土弱水旺 -> 湿
  if (waterMonths.includes(yuezhi) && wuxing['土'] < 0.1 && wuxing['水'] > 0.3) {
    results.push('湿');
  }
  
  // 3. 特殊局判断（三合局/相冲）
  const sanhe = getDizhiSanhe(eightChar);
  const dizhiChong = getDizhiXiangchong(eightChar);
  
  // 三合水局加强寒/湿
  if (sanhe.includes('申子辰')) {
    if (wuxing['火'] < 0.15 && !results.includes('寒')) results.push('寒');
    if (wuxing['土'] < 0.15 && !results.includes('湿')) results.push('湿');
  }
  // 三合火局加强热/燥
  if (sanhe.includes('寅午戌')) {
    if (wuxing['水'] < 0.15 && !results.includes('热')) results.push('热');
    if (wuxing['水'] < 0.15 && !results.includes('燥')) results.push('燥');
  }
  
  // 水火冲缓解寒热
  if (dizhiChong.some(chong => ['子午', '巳亥'].includes(chong))) {
    if (results.includes('寒') && wuxing['火'] > 0.15) {
      results.splice(results.indexOf('寒'), 1);
    }
    if (results.includes('热') && wuxing['水'] > 0.15) {
      results.splice(results.indexOf('热'), 1);
    }
  }

  return Array.from(new Set(results)); // 去重后返回
};