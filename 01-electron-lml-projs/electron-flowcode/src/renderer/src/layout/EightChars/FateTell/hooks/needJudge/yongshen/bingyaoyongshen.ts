// 病药用神：只取下面的1、2：3、4、5我们放到其他两种
/**
 * 1、某种五行过旺或过衰
 * 2、干支之间严重的刑、冲、克[x：冲的力量比克大]、害
 * 3、寒暖燥湿润失调（需：调候）【x】
 * 4、两种相克五行交战不通（需：通关）【x】
 * 5、日主过弱或过强【x】
 */

import { DiZhiChar, TianGanChar, TianGanDizhiChar } from "@shared/@types/eightChar/eightCharInfo";

import { dizhiCanggan, EightChar, monthCoefficients, wuxingMap, Wuxing, WuxingPercentage } from "@shared/@types/eightChar/eightCharInfo";


/**
 * 获取五行占比
 * @param eightChar 八字信息
 * @returns 五行占比
 */
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

/**
 * 方式1：某种五行过旺或过衰
 * @param eightchar
 * @param congWuxing
 * @returns
 */
/**
 * 获取五行旺衰用审
 * @param eightchar 八字信息
 * @param congWuxing 是否从五行
 * @returns 天干地支字符数组
 */
export const getWuxingWangshuaiYongshen = (
  eightchar: EightChar,
  congWuxing: boolean
): TianGanDizhiChar[] => {
  // 1. 获取五行占比并找到最旺的五行
  const wuxingPercentage = getWuxingPercentage(eightchar);
  let maxElement: keyof WuxingPercentage = '木';
  let maxPercentage = 0;

  (Object.keys(wuxingPercentage) as (keyof WuxingPercentage)[]).forEach(element => {
    if (wuxingPercentage[element] > maxPercentage) {
      maxPercentage = wuxingPercentage[element];
      maxElement = element;
    }
  });

  // 2. 定义五行生克关系
  const wuxingRelations = {
    '木': {
      sheng: ['木', '水'], // 生扶木的五行（木本身和生木的水）
      kexiehao: ['火', '金', '土'] // 克泄耗木的五行（火泄木，金克木，土耗木）
    },
    '火': {
      sheng: ['火', '木'],
      kexiehao: ['土', '水', '金']
    },
    '土': {
      sheng: ['土', '火'],
      kexiehao: ['金', '木', '水']
    },
    '金': {
      sheng: ['金', '土'],
      kexiehao: ['水', '火', '木']
    },
    '水': {
      sheng: ['水', '金'],
      kexiehao: ['木', '土', '火']
    }
  };

  // 3. 根据congWuxing决定使用生扶还是克泄耗的五行
  const targetElements = congWuxing
    ? wuxingRelations[maxElement].sheng
    : wuxingRelations[maxElement].kexiehao;

  // 4. 遍历八字，找出符合目标五行的字
  const result: TianGanDizhiChar[] = [];

  // 处理天干（位置1-4）
  for (let i = 1; i <= 4; i++) {
    const gan = eightchar[i as keyof EightChar] as string;
    const element = wuxingMap[gan];
    if (element && targetElements.includes(element)) {
      result.push(gan as TianGanChar);
    }
  }

  // 处理地支（位置5-8）
  for (let i = 5; i <= 8; i++) {
    const zhi = eightchar[i as keyof EightChar] as string;
    // 获取地支的本气（主气）五行
    const canggan = dizhiCanggan[zhi];
    if (canggan && canggan.length > 0) {
      const mainGan = canggan[0][0]; // 取第一个藏干作为本气
      const element = wuxingMap[mainGan];
      if (element && targetElements.includes(element)) {
        result.push(zhi as DiZhiChar);
      }
    }
  }

  return result;
};





