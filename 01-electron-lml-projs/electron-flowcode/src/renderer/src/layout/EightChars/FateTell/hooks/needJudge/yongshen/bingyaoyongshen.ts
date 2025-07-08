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

import { AdjacentCongHaiXing, getAdjacentCongHaiXing, getCharSolve } from "../../tianganDizhiRoles/utils";


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


export type CongXingHaiYongshenType = {
  tianganCong: {
    cong1: TianGanChar,  // 需要抑制的字. eg. 甲庚冲的 甲
    cong1Solve: {
      tongguan: TianGanChar[],
      he: TianGanChar[], // 天干五合
      ke: TianGanChar[], // 天干克
    },
    cong2: TianGanChar, // 需要抑制的字. eg. 甲庚冲的 庚
    cong2Solve: {
      tongguan: TianGanChar[],
      he: TianGanChar[], // 天干五合
      ke: TianGanChar[], // 天干克
    },
  }[],
  dizhiCong: {
    cong1: DiZhiChar,
    cong1Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
    },
    cong2: DiZhiChar,
    cong2Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
    }

  }[],
  dizhiHai: {
    hai1: DiZhiChar,
    hai1Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
    },
    hai2: DiZhiChar,
    hai2Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
    }
  }[],
  dizhiXing: {
    type: '子卯相刑' | '三刑' | '自刑',
    xing1: DiZhiChar,
    xing1Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
      cong: DiZhiChar[],
    },
    xing2: DiZhiChar,
    xing2Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
      cong: DiZhiChar[],
    },
    xing3: DiZhiChar | undefined,
    xing3Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
      cong: DiZhiChar[],
    },
  }[]
}

// 预定义地支六冲关系
const diZhiChongMap: Record<DiZhiChar, DiZhiChar> = {
  '子': '午', '午': '子',
  '丑': '未', '未': '丑',
  '寅': '申', '申': '寅',
  '卯': '酉', '酉': '卯',
  '辰': '戌', '戌': '辰',
  '巳': '亥', '亥': '巳'
};

// 获取与指定地支相冲的地支
const getDiZhiChong = (dizhi: DiZhiChar): DiZhiChar => {
  return diZhiChongMap[dizhi];
};

// 获取：冲刑害的推荐用神
export const getCongXingHaiYongshen = (
  eightchar: EightChar
): CongXingHaiYongshenType => {
  // 步骤1：获取八字原局的所有天干地支的作用关系
  // 步骤2：获取相邻的刑冲害
  const adjacentCongHaiXing: AdjacentCongHaiXing = getAdjacentCongHaiXing(eightchar);

  const congXingHaiYongshen: CongXingHaiYongshenType = {
    tianganCong: [],
    dizhiCong: [],
    dizhiHai: [],
    dizhiXing: [],
  };

  // 处理天干相冲
  if (adjacentCongHaiXing.tiangan.cong && adjacentCongHaiXing.tiangan.cong.length > 0) {
    adjacentCongHaiXing.tiangan.cong.forEach((tianGanPair) => {
      if (tianGanPair.length === 2) {
        const [cong1, cong2] = tianGanPair as [TianGanChar, TianGanChar];

        // 获取第一个相冲字的解决方法
        const cong1Solve = {
          tongguan: getCharSolve([cong1, cong2], cong1, '天干通关'),
          he: getCharSolve([cong1, cong2], cong1, '天干五合'),
          ke: getCharSolve([cong1, cong2], cong1, '天干克'),
        };

        // 获取第二个相冲字的解决方法
        const cong2Solve = {
          tongguan: getCharSolve([cong1, cong2], cong2, '天干通关'),
          he: getCharSolve([cong1, cong2], cong2, '天干五合'),
          ke: getCharSolve([cong1, cong2], cong2, '天干克'),
        };

        congXingHaiYongshen.tianganCong.push({
          cong1,
          // @ts-ignore
          cong1Solve,
          cong2,
          // @ts-ignore
          cong2Solve,
        });
      }
    });
  }

  // 处理地支相冲
  if (adjacentCongHaiXing.dizhi.cong && adjacentCongHaiXing.dizhi.cong.length > 0) {
    adjacentCongHaiXing.dizhi.cong.forEach((diZhiPair) => {
      if (diZhiPair.length === 2) {
        const [cong1, cong2] = diZhiPair as [DiZhiChar, DiZhiChar];

        // 获取第一个相冲地支的解决方法
        const cong1Solve = {
          tongguan: getCharSolve([cong1, cong2], cong1, '地支通关'),
          liuhe: getCharSolve([cong1, cong2], cong1, '地支六合'),
          sanhe: getCharSolve([cong1, cong2], cong1, '地支三合'),
          banhe: getCharSolve([cong1, cong2], cong1, '地支半合'),
          ke: getCharSolve([cong1, cong2], cong1, '地支克'),
        };

        // 获取第二个相冲地支的解决方法
        const cong2Solve = {
          tongguan: getCharSolve([cong1, cong2], cong2, '地支通关'),
          liuhe: getCharSolve([cong1, cong2], cong2, '地支六合'),
          sanhe: getCharSolve([cong1, cong2], cong2, '地支三合'),
          banhe: getCharSolve([cong1, cong2], cong2, '地支半合'),
          ke: getCharSolve([cong1, cong2], cong2, '地支克'),
        };

        congXingHaiYongshen.dizhiCong.push({
          cong1,
          // @ts-ignore
          cong1Solve,
          cong2,
          // @ts-ignore
          cong2Solve,
        });
      }
    });
  }

  // 处理地支相害
  if (adjacentCongHaiXing.dizhi.hai && adjacentCongHaiXing.dizhi.hai.length > 0) {
    adjacentCongHaiXing.dizhi.hai.forEach((diZhiPair) => {
      if (diZhiPair.length === 2) {
        const [hai1, hai2] = diZhiPair as [DiZhiChar, DiZhiChar];

        // 获取第一个相害地支的解决方法
        const hai1Solve = {
          tongguan: getCharSolve([hai1, hai2], hai1, '地支通关'),
          liuhe: getCharSolve([hai1, hai2], hai1, '地支六合'),
          sanhe: getCharSolve([hai1, hai2], hai1, '地支三合'),
          banhe: getCharSolve([hai1, hai2], hai1, '地支半合'),
          ke: getCharSolve([hai1, hai2], hai1, '地支克'),
        };

        // 获取第二个相害地支的解决方法
        const hai2Solve = {
          tongguan: getCharSolve([hai1, hai2], hai2, '地支通关'),
          liuhe: getCharSolve([hai1, hai2], hai2, '地支六合'),
          sanhe: getCharSolve([hai1, hai2], hai2, '地支三合'),
          banhe: getCharSolve([hai1, hai2], hai2, '地支半合'),
          ke: getCharSolve([hai1, hai2], hai2, '地支克'),
        };


        congXingHaiYongshen.dizhiHai.push({
          hai1,
          // @ts-ignore
          hai1Solve,
          hai2,
          // @ts-ignore
          hai2Solve,
        });
      }
    });
  }

  // 修改处理地支相刑的部分
  if (adjacentCongHaiXing.dizhi.xing && adjacentCongHaiXing.dizhi.xing.length > 0) {
    adjacentCongHaiXing.dizhi.xing.forEach((diZhiGroup) => {
      // 判断相刑类型
      let type: '子卯相刑' | '三刑' | '自刑' = '自刑';

      // 三刑判断：丑戌未 或 寅巳申
      if (diZhiGroup.length === 3) {
        if (diZhiGroup.includes('丑') && diZhiGroup.includes('戌') && diZhiGroup.includes('未')) {
          type = '三刑';
        } else if (diZhiGroup.includes('寅') && diZhiGroup.includes('巳') && diZhiGroup.includes('申')) {
          type = '三刑';
        }
      }
      // 子卯相刑：两个地支且是子和卯
      else if (diZhiGroup.length === 2 && diZhiGroup.includes('子') && diZhiGroup.includes('卯')) {
        type = '子卯相刑';
      }
      // 自刑：两个相同的地支，且属于自刑类型（辰、午、酉、亥）
      else if (diZhiGroup.length === 2 && diZhiGroup[0] === diZhiGroup[1] && ['辰', '午', '酉', '亥'].includes(diZhiGroup[0])) {
        type = '自刑';
      }

      const xing1 = diZhiGroup[0] as DiZhiChar;
      const xing2 = diZhiGroup[1] as DiZhiChar;
      const xing3 = diZhiGroup.length > 2 ? diZhiGroup[2] as DiZhiChar : undefined;

      // 获取解决方案的辅助函数
      const getSolutions = (char: DiZhiChar) => ({
        tongguan: getCharSolve(diZhiGroup, char, '地支通关'),
        liuhe: getCharSolve(diZhiGroup, char, '地支六合'),
        sanhe: getCharSolve(diZhiGroup, char, '地支三合'),
        banhe: getCharSolve(diZhiGroup, char, '地支半合'),
        ke: getCharSolve(diZhiGroup, char, '地支克'),
        cong: [getDiZhiChong(char)],
      });

      // 创建条目
      const entry = {
        type,
        xing1,
        xing1Solve: getSolutions(xing1),
        xing2,
        xing2Solve: getSolutions(xing2),
        xing3: undefined as DiZhiChar | undefined,
        xing3Solve: {
          tongguan: [],
          liuhe: [],
          sanhe: [],
          banhe: [],
          ke: [],
          cong: []
        }
      };

      // 如果是三刑，设置第三个地支及其解决方法
      if (type === '三刑' && xing3) {
        entry.xing3 = xing3;
        // @ts-ignore
        entry.xing3Solve = getSolutions(xing3);
      }
      // @ts-ignore
      congXingHaiYongshen.dizhiXing.push(entry);
    });
  }

  return congXingHaiYongshen
}



