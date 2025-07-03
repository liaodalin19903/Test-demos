// 刑冲合会

import { EightChar } from "@shared/@types/eightChar/eightCharInfo"

export type Role2XingChongHeHui = {
  role2Tiangan: {
    tianganWuhe: string[],
    tianganXiangchong: string[]
  },
  role2Dizhi: {
    dizhiSanhui: string[],
    dizhiSanhe: string[],
    dizhiBanhe: string[],
    dizhiAnhe: string[],
    dizhiLiuhe: string[],
    dizhiXiangchong: string[],
    dizhiXianghai: string[],
    dizhiXiangxing: string[],
    dizhiXiangpo: string[],
  }
}

/**
 * 天干：
 *  天干五合
 *  天干相冲
 *
 * 地支：
 *  地支相冲
    地支相害
    地支三会
    地支三合
    地支半三合
    地支暗合
    地支六合
    地支相刑
    地支相破
 * @param eightChar
 * @returns
 */
export const getRole2XingChongHeHui = (eightChar: EightChar): Role2XingChongHeHui => {

  const tianganWuhe = getTianganWuhe(eightChar)
  const tianganXiangchong = getTianganXiangchong(eightChar)
  const dizhiSanhui = getDizhiSanhui(eightChar)
  const dizhiSanhe = getDizhiSanhe(eightChar)
  const dizhiBanhe = getDizhiBanhe(eightChar)
  const dizhiAnhe = getDizhiAnhe(eightChar)
  const dizhiLiuhe = getDizhiLiuhe(eightChar)
  const dizhiXiangchong = getDizhiXiangchong(eightChar)
  const dizhiXianghai = getDizhiXianghai(eightChar)
  const dizhiXiangxing = getDizhiXiangxing(eightChar)
  const dizhiXiangpo = getDizhiXiangpo(eightChar)

  let role2XingChongHeHui = {
    role2Tiangan: {
      tianganWuhe: tianganWuhe,
      tianganXiangchong: tianganXiangchong
    },
    role2Dizhi: {
      dizhiSanhui: dizhiSanhui,
      dizhiSanhe: dizhiSanhe,
      dizhiBanhe: dizhiBanhe,
      dizhiAnhe: dizhiAnhe,
      dizhiLiuhe: dizhiLiuhe,
      dizhiXiangchong: dizhiXiangchong,
      dizhiXianghai: dizhiXianghai,
      dizhiXiangxing: dizhiXiangxing,
      dizhiXiangpo: dizhiXiangpo,
    }
  }

  return role2XingChongHeHui
}

/**
 * 天干五合
 * @param eightChar
 * @returns ['甲己合', '乙庚合']
 */
export const getTianganWuhe = (eightChar: EightChar): string[] => {
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

/**
 * 天干相冲
 * @param eightChar
 * @returns ['甲庚冲', '乙辛冲']
 */
export const getTianganXiangchong = (eightChar: EightChar): string[] => {
  // 定义天干相冲组合
  const xiangchongMap: Record<string, string> = {
    '甲庚': '甲庚冲',
    '庚甲': '甲庚冲',
    '乙辛': '乙辛冲',
    '辛乙': '乙辛冲',
    '丙壬': '丙壬冲',
    '壬丙': '丙壬冲',
    '丁癸': '丁癸冲',
    '癸丁': '丁癸冲'
  };

  // 提取四个天干
  const tianGan = [
    eightChar[1], // 年干
    eightChar[2], // 月干
    eightChar[3], // 日干
    eightChar[4]  // 时干
  ];

  const results: string[] = [];
  const usedPairs = new Set<string>(); // 记录已处理的相冲组合

  // 检查所有可能的组合
  for (let i = 0; i < tianGan.length; i++) {
    for (let j = i + 1; j < tianGan.length; j++) {
      const gan1 = tianGan[i];
      const gan2 = tianGan[j];
      const combo = gan1 + gan2;

      // 检查是否是相冲组合
      if (xiangchongMap[combo]) {
        const chongName = xiangchongMap[combo];

        // 避免重复添加相同的相冲组合
        if (!usedPairs.has(chongName)) {
          results.push(chongName);
          usedPairs.add(chongName);
        }
      }
    }
  }

  return results;
};

/**
 * 地支三会
 * @param eightChar
 * @returns ['巳午未']
 */
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

/**
 * 地支三合
 * @param eightChar
 * @returns ['申子辰']
 */
export const getDizhiSanhe = (eightChar: EightChar): string[] => {
  // 定义三合局组合
  const sanheGroups = [
    { name: '申子辰', elements: ['申', '子', '辰'] },
    { name: '亥卯未', elements: ['亥', '卯', '未'] },
    { name: '寅午戌', elements: ['寅', '午', '戌'] },
    { name: '巳酉丑', elements: ['巳', '酉', '丑'] }
  ];

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];

  // 检查每个三合局组合
  for (const group of sanheGroups) {
    // 检查三合局的每个地支是否都出现在八字地支中
    const hasAll = group.elements.every(element => diZhi.includes(element));

    if (hasAll) {
      results.push(group.name);
    }
  }

  return results;
};

/**
 * 地支半合
 * @param eightChar
 *
 * @returns
 * 返回: ['申子半合']
 */
export const getDizhiBanhe = (eightChar: EightChar): string[] => {
  // 定义半合组合映射表（包含所有可能的组合顺序）
  const banheMap: Record<string, string> = {
    // 申子辰三合的半合组合
    '申子': '申子半合', '子申': '申子半合',
    '子辰': '子辰半合', '辰子': '子辰半合',
    '申辰': '申辰半合', '辰申': '申辰半合',

    // 亥卯未三合的半合组合
    '亥卯': '亥卯半合', '卯亥': '亥卯半合',
    '卯未': '卯未半合', '未卯': '卯未半合',
    '亥未': '亥未半合', '未亥': '亥未半合',

    // 寅午戌三合的半合组合
    '寅午': '寅午半合', '午寅': '寅午半合',
    '午戌': '午戌半合', '戌午': '午戌半合',
    '寅戌': '寅戌半合', '戌寅': '寅戌半合',

    // 巳酉丑三合的半合组合
    '巳酉': '巳酉半合', '酉巳': '巳酉半合',
    '酉丑': '酉丑半合', '丑酉': '酉丑半合',
    '巳丑': '巳丑半合', '丑巳': '巳丑半合'
  };

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];
  const foundPairs = new Set<string>(); // 避免重复记录

  // 检查所有两两地支组合
  for (let i = 0; i < diZhi.length; i++) {
    for (let j = i + 1; j < diZhi.length; j++) {
      const pair = diZhi[i] + diZhi[j];

      // 检查是否是半合组合
      if (banheMap[pair]) {
        const banheName = banheMap[pair];

        // 避免重复添加相同的半合组合
        if (!foundPairs.has(banheName)) {
          results.push(banheName);
          foundPairs.add(banheName);
        }
      }
    }
  }

  return results;
};

/**
 * 地支暗合
 * @param eightChar
 * @returns ['寅丑']
 */
export const getDizhiAnhe = (eightChar: EightChar): string[] => {
  // 定义暗合组合映射表（包含所有可能的组合顺序）
  const anheMap: Record<string, string> = {
    // 寅丑暗合
    '寅丑': '寅丑',
    '丑寅': '寅丑',

    // 亥午暗合
    '亥午': '亥午',
    '午亥': '亥午',

    // 卯申暗合
    '卯申': '卯申',
    '申卯': '卯申',

    // 巳酉暗合
    '巳酉': '巳酉',
    '酉巳': '巳酉',

    // 子巳暗合
    '子巳': '子巳',
    '巳子': '子巳',

    // 寅午暗合
    '寅午': '寅午',
    '午寅': '寅午'
  };

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];
  const foundPairs = new Set<string>(); // 避免重复记录

  // 检查所有两两地支组合
  for (let i = 0; i < diZhi.length; i++) {
    for (let j = i + 1; j < diZhi.length; j++) {
      const pair = diZhi[i] + diZhi[j];

      // 检查是否是暗合组合
      if (anheMap[pair]) {
        const anheName = anheMap[pair];

        // 避免重复添加相同的暗合组合
        if (!foundPairs.has(anheName)) {
          results.push(anheName);
          foundPairs.add(anheName);
        }
      }
    }
  }

  return results;
};

/**
 * 地支六合
 * @param eightChar
 * @returns ['子丑']
 */
export const getDizhiLiuhe = (eightChar: EightChar): string[] => {
  // 定义六合组合映射表（包含所有可能的组合顺序）
  const liuheMap: Record<string, string> = {
    // 子丑合化土
    '子丑': '子丑',
    '丑子': '子丑',

    // 寅亥合化木
    '寅亥': '寅亥',
    '亥寅': '寅亥',

    // 卯戌合化火
    '卯戌': '卯戌',
    '戌卯': '卯戌',

    // 辰酉合化金
    '辰酉': '辰酉',
    '酉辰': '辰酉',

    // 巳申合化水
    '巳申': '巳申',
    '申巳': '巳申',

    // 午未合化火/土
    '午未': '午未',
    '未午': '午未'
  };

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];
  const foundPairs = new Set<string>(); // 避免重复记录

  // 检查所有两两地支组合
  for (let i = 0; i < diZhi.length; i++) {
    for (let j = i + 1; j < diZhi.length; j++) {
      const pair = diZhi[i] + diZhi[j];

      // 检查是否是六合组合
      if (liuheMap[pair]) {
        const liuheName = liuheMap[pair];

        // 避免重复添加相同的六合组合
        if (!foundPairs.has(liuheName)) {
          results.push(liuheName);
          foundPairs.add(liuheName);
        }
      }
    }
  }

  return results;
};

/**
 * 地支相冲
 * @param eightChar
 * @returns ['子午', '丑未']
 */
export const getDizhiXiangchong = (eightChar: EightChar): string[] => {
  // 定义相冲组合映射表（包含所有可能的组合顺序）
  const xiangchongMap: Record<string, string> = {
    // 子午冲
    '子午': '子午',
    '午子': '子午',

    // 丑未冲
    '丑未': '丑未',
    '未丑': '丑未',

    // 寅申冲
    '寅申': '寅申',
    '申寅': '寅申',

    // 卯酉冲
    '卯酉': '卯酉',
    '酉卯': '卯酉',

    // 辰戌冲
    '辰戌': '辰戌',
    '戌辰': '辰戌',

    // 巳亥冲
    '巳亥': '巳亥',
    '亥巳': '巳亥'
  };

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];
  const foundPairs = new Set<string>(); // 避免重复记录

  // 检查所有两两地支组合
  for (let i = 0; i < diZhi.length; i++) {
    for (let j = i + 1; j < diZhi.length; j++) {
      const pair = diZhi[i] + diZhi[j];

      // 检查是否是相冲组合
      if (xiangchongMap[pair]) {
        const chongName = xiangchongMap[pair];

        // 避免重复添加相同的相冲组合
        if (!foundPairs.has(chongName)) {
          results.push(chongName);
          foundPairs.add(chongName);
        }
      }
    }
  }

  return results;
};

/**
 * 地支相害
 * @param eightChar
 * @returns ['寅巳', '子未']
 */
export const getDizhiXianghai = (eightChar: EightChar): string[] => {
  // 定义相害组合映射表（包含所有可能的组合顺序）
  const xianghaiMap: Record<string, string> = {
    // 寅巳相害
    '寅巳': '寅巳',
    '巳寅': '寅巳',

    // 卯辰相害
    '卯辰': '卯辰',
    '辰卯': '卯辰',

    // 申亥相害
    '申亥': '申亥',
    '亥申': '申亥',

    // 酉戌相害
    '酉戌': '酉戌',
    '戌酉': '酉戌',

    // 丑午相害
    '丑午': '丑午',
    '午丑': '丑午',

    // 子未相害
    '子未': '子未',
    '未子': '子未'
  };

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];
  const foundPairs = new Set<string>(); // 避免重复记录

  // 检查所有两两地支组合
  for (let i = 0; i < diZhi.length; i++) {
    for (let j = i + 1; j < diZhi.length; j++) {
      const pair = diZhi[i] + diZhi[j];

      // 检查是否是相害组合
      if (xianghaiMap[pair]) {
        const haiName = xianghaiMap[pair];

        // 避免重复添加相同的相害组合
        if (!foundPairs.has(haiName)) {
          results.push(haiName);
          foundPairs.add(haiName);
        }
      }
    }
  }

  return results;
};

/**
 * 地支相刑
 * @param eightChar
 * @returns ['子卯相刑', '寅刑巳', '巳刑申']
 */
export const getDizhiXiangxing = (eightChar: EightChar): string[] => {
  // 定义相刑组合映射表
  const xiangxingMap: Record<string, string> = {
    // 子卯相刑
    '子卯': '子卯相刑',
    '卯子': '子卯相刑',

    // 寅刑巳
    '寅巳': '寅刑巳',
    '巳寅': '寅刑巳',

    // 巳刑申
    '巳申': '巳刑申',
    '申巳': '巳刑申',

    // 申刑寅
    '申寅': '申刑寅',
    '寅申': '申刑寅',

    // 丑刑戌
    '丑戌': '丑刑戌',
    '戌丑': '丑刑戌',

    // 戌刑未
    '戌未': '戌刑未',
    '未戌': '戌刑未',

    // 未刑丑
    '未丑': '未刑丑',
    '丑未': '未刑丑',
  };

  // 自刑类型
  const selfXing = ['辰', '午', '酉', '亥'];

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];
  const foundPairs = new Set<string>(); // 避免重复记录

  // 检查所有两两地支组合
  for (let i = 0; i < diZhi.length; i++) {
    for (let j = i + 1; j < diZhi.length; j++) {
      const dz1 = diZhi[i];
      const dz2 = diZhi[j];
      const pair = dz1 + dz2;

      // 检查是否是相刑组合
      if (xiangxingMap[pair]) {
        const xingName = xiangxingMap[pair];

        // 避免重复添加相同的相刑组合
        if (!foundPairs.has(xingName)) {
          results.push(xingName);
          foundPairs.add(xingName);
        }
      }
    }
  }

  // 检查自刑（相同地支）
  const selfXingCount: Record<string, number> = {};
  for (const dz of diZhi) {
    if (selfXing.includes(dz)) {
      selfXingCount[dz] = (selfXingCount[dz] || 0) + 1;
    }
  }

  // 如果有两个或以上的相同自刑地支，则添加自刑
  for (const [dz, count] of Object.entries(selfXingCount)) {
    if (count >= 2) {
      const selfXingName = `${dz}${dz}自刑`;
      if (!foundPairs.has(selfXingName)) {
        results.push(selfXingName);
        foundPairs.add(selfXingName);
      }
    }
  }

  return results;
};

/**
 * 地支相破
 * @param eightChar
 * @returns ['子酉', '丑辰']
 */
export const getDizhiXiangpo = (eightChar: EightChar): string[] => {
  // 定义相破组合映射表（包含所有可能的组合顺序）
  const xiangpoMap: Record<string, string> = {
    // 子酉相破
    '子酉': '子酉',
    '酉子': '子酉',

    // 丑辰相破
    '丑辰': '丑辰',
    '辰丑': '丑辰',

    // 寅亥相破
    '寅亥': '寅亥',
    '亥寅': '寅亥',

    // 卯午相破
    '卯午': '卯午',
    '午卯': '卯午',

    // 巳申相破
    '巳申': '巳申',
    '申巳': '巳申',

    // 未戌相破
    '未戌': '未戌',
    '戌未': '未戌'
  };

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];
  const foundPairs = new Set<string>(); // 避免重复记录

  // 检查所有两两地支组合
  for (let i = 0; i < diZhi.length; i++) {
    for (let j = i + 1; j < diZhi.length; j++) {
      const pair = diZhi[i] + diZhi[j];

      // 检查是否是相破组合
      if (xiangpoMap[pair]) {
        const poName = xiangpoMap[pair];

        // 避免重复添加相同的相破组合
        if (!foundPairs.has(poName)) {
          results.push(poName);
          foundPairs.add(poName);
        }
      }
    }
  }

  return results;
};
