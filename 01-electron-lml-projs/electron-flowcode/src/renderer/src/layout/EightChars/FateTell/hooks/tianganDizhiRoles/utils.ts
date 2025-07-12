// 工具

import { dizhiCanggan, getTianganWuxing, keMap, monthCoefficients, shengMap, Wuxing, tianganDizhiWuxingMap, WuxingPercentage } from "@shared/@types/eightChar/eightCharInfo";


import {
  DizhiChar, dizhiWuxing, EightChar, liuHeMap, sanHeMap, SolveType, TianganChar, TianganDizhiChar,
  tianganWuxing,
  wuHeMap
} from "@shared/@types/eightChar/eightCharInfo"
import { getDizhiSanhe, getRole2XingChongHeHui } from "./role2xingchonghehui";

import { TiaohouReasonType } from "@shared/@types/eightChar/eightCharInfo";

import { getTianganXiangchong, getDizhiXiangchong, getDizhiSanhui } from "./role2xingchonghehui";

/**
 * 判断字符串内的2个八字是否相邻
 *
 * @eightChar
 * const eightChar: EightChar = {
    1: '己', 2: '乙', 3: '丙', 4: '戊',
    5: '丑', 6: '亥', 7: '子', 8: '子'
   }
 * @chars eg. 给定： '申子半合', '丑刑戌', '甲己合', ...
 * @returns true/false
 */
export const charIsAdjacency = (eightChar: EightChar, chars: string): boolean => {
  // 1. 提取字符串中的天干地支字符
  const regex = /[甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥]/g;
  const extractedChars = chars.match(regex) as TianganDizhiChar[] | null;

  // 如果没有提取到足够字符，返回 false
  if (!extractedChars || extractedChars.length < 2 || extractedChars.length > 3) {
    return false;
  }

  // 2. 创建位置映射表
  const positionMap: Record<string, number[]> = {};

  // 定义位置名称
  const positions = [1, 2, 3, 4, 5, 6, 7, 8] as const;

  // 填充位置映射
  positions.forEach(pos => {
    const char = eightChar[pos] as TianganDizhiChar;
    if (!positionMap[char]) {
      positionMap[char] = [];
    }
    positionMap[char].push(pos);
  });

  // 3. 定义有效相邻位置对（同组内相邻）
  const validAdjacentPairs: [number, number][] = [
    [1, 2], [2, 3], [3, 4],  // 天干组相邻
    [5, 6], [6, 7], [7, 8]   // 地支组相邻
  ];

  // 4. 检查所有字符组合是否相邻
  for (let i = 0; i < extractedChars.length; i++) {
    for (let j = i + 1; j < extractedChars.length; j++) {
      const charA = extractedChars[i];
      const charB = extractedChars[j];

      // 获取两个字符在八字中的位置
      const positionsA = positionMap[charA] || [];
      const positionsB = positionMap[charB] || [];

      // 检查所有位置组合
      for (const posA of positionsA) {
        for (const posB of positionsB) {
          // 检查是否形成有效相邻对（考虑顺序和逆序）
          const isDirectAdjacent = validAdjacentPairs.some(
            ([p1, p2]) => p1 === posA && p2 === posB
          );

          const isReverseAdjacent = validAdjacentPairs.some(
            ([p1, p2]) => p1 === posB && p2 === posA
          );

          if (isDirectAdjacent || isReverseAdjacent) {
            return true;
          }
        }
      }
    }
  }

  return false;
};

export type AdjacentCongHaiXingIndex = {
  tiangan: {
    cong: number[][]; // 天干相冲相邻位置对 eg. [[1, 2]]
  };
  dizhi: {
    cong: number[][]; // 地支相冲相邻位置对 eg. [[5, 6]]
    hai: number[][];  // 地支相害相邻位置对 eg. [[6, 7]]
    xing: number[][]; // 地支相刑相邻位置对 eg. [[7, 8]]
  };
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
 * 获取相邻的相冲（天干相冲、地支相冲）、相害、相刑的相邻位置对
 * @param eightChar
 * @returns
 * eg.
 * {
 *   tiangan: { cong: [[3,4]] },
 *   dizhi: {cong: [], hai: [[5,6]], xing: [[7,8]] }
 * }
 */
export const getAdjacentCongHaiXingIndex = (
  eightChar: EightChar
): AdjacentCongHaiXingIndex => {
  // 1. 获取所有刑冲合会关系
  const relations = getRole2XingChongHeHui(eightChar);

  // 2. 初始化结果对象
  const result: AdjacentCongHaiXingIndex = {
    tiangan: { cong: [] },
    dizhi: { cong: [], hai: [], xing: [] }
  };

  // 3. 定义位置映射表（字符->位置）
  const positionMap: Record<TianganDizhiChar, number[]> = {
    甲: [],
    乙: [],
    丙: [],
    丁: [],
    戊: [],
    己: [],
    庚: [],
    辛: [],
    壬: [],
    癸: [],
    子: [],
    丑: [],
    寅: [],
    卯: [],
    辰: [],
    巳: [],
    午: [],
    未: [],
    申: [],
    酉: [],
    戌: [],
    亥: []
  };
  for (let i = 1; i <= 8; i++) {
    const char = eightChar[i as keyof EightChar] as TianganDizhiChar;
    if (!positionMap[char]) positionMap[char] = [];
    positionMap[char].push(i);
  }

  // 4. 定义有效相邻位置对
  const validPairs: [number, number][] = [
    [1, 2], [2, 3], [3, 4],  // 天干相邻
    [5, 6], [6, 7], [7, 8]   // 地支相邻
  ];

  // 5. 检查两个位置是否相邻
  const isAdjacent = (pos1: number, pos2: number): boolean => {
    return validPairs.some(([p1, p2]) =>
      (p1 === pos1 && p2 === pos2) || (p1 === pos2 && p2 === pos1)
    );
  };

  // 6. 处理天干相冲
  for (const relation of relations.role2Tiangan.tianganXiangchong) {
    // 提取天干字符 (如 "甲庚冲" -> ["甲", "庚"])
    const ganPair = relation.match(/[甲乙丙丁戊己庚辛壬癸]/g) as TianganChar[];
    if (ganPair?.length === 2) {
      const [gan1, gan2] = ganPair;

      // 检查所有位置组合
      for (const pos1 of positionMap[gan1] || []) {
        for (const pos2 of positionMap[gan2] || []) {
          if (isAdjacent(pos1, pos2)) {
            result.tiangan.cong.push([pos1, pos2]);
          }
        }
      }
    }
  }

  // 7. 处理地支相冲
  for (const relation of relations.role2Dizhi.dizhiXiangchong) {
    const zhiPair = relation.match(/[子丑寅卯辰巳午未申酉戌亥]/g) as DizhiChar[];
    if (zhiPair?.length === 2) {
      const [zhi1, zhi2] = zhiPair;
      for (const pos1 of positionMap[zhi1] || []) {
        for (const pos2 of positionMap[zhi2] || []) {
          if (isAdjacent(pos1, pos2)) {
            result.dizhi.cong.push([pos1, pos2]);
          }
        }
      }
    }
  }

  // 8. 处理地支相害
  for (const relation of relations.role2Dizhi.dizhiXianghai) {
    const zhiPair = relation.match(/[子丑寅卯辰巳午未申酉戌亥]/g) as DizhiChar[];
    if (zhiPair?.length === 2) {
      const [zhi1, zhi2] = zhiPair;
      for (const pos1 of positionMap[zhi1] || []) {
        for (const pos2 of positionMap[zhi2] || []) {
          if (isAdjacent(pos1, pos2)) {
            result.dizhi.hai.push([pos1, pos2]);
          }
        }
      }
    }
  }

  // 9. 处理地支相刑
  for (const relation of relations.role2Dizhi.dizhiXiangxing) {
    const zhiPair = relation.match(/[子丑寅卯辰巳午未申酉戌亥]/g) as DizhiChar[];
    if (zhiPair?.length === 2) {
      const [zhi1, zhi2] = zhiPair;
      for (const pos1 of positionMap[zhi1] || []) {
        for (const pos2 of positionMap[zhi2] || []) {
          if (isAdjacent(pos1, pos2)) {
            result.dizhi.xing.push([pos1, pos2]);
          }
        }
      }
    }
  }

  return result;
};


/**
 * {
 *  "tiangan": {
 *     "cong":[["甲","庚"], ["乙", "辛"]] // 代表天干有：甲庚冲，乙辛冲
 *   },
 *   "dizhi": {
 *     "cong":[["子","午"]], // 代表地支有：子午冲
 *     "hai":[["丑","午"]],  // 代表地支有：丑午相害
 *     "xing":[["丑", "戌", "未"]]  // 代表丑戌未三刑
 *   }
 * }
 */
export type AdjacentCongHaiXing = {
  tiangan: {
    cong: TianganDizhiChar[][]
  },
  dizhi: {
    cong: TianganDizhiChar[][],
    hai: TianganDizhiChar[][],
    xing: TianganDizhiChar[][],
  }
}

/**
 * 获取相邻的：冲、害、刑
 * @param eightChar 八字
 * @returns
 */
export const getAdjacentCongHaiXing = (eightChar: EightChar): AdjacentCongHaiXing => {
  // 获取所有刑冲合会信息
  const role2XingChongHeHui = getRole2XingChongHeHui(eightChar);

  // 辅助函数：从字符串中提取天干地支字符并转换为数组
  const extractCharsToArray = (str: string) => {
    const regex = /[甲乙丙丁戊己庚辛壬癸子丑寅卯辰巳午未申酉戌亥]/g;
    return (str.match(regex) || []) as TianganDizhiChar[];
  };

  // 处理天干相冲
  const tianganCong = role2XingChongHeHui.role2Tiangan.tianganXiangchong
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  // 处理地支相冲、相害
  const dizhiCong = role2XingChongHeHui.role2Dizhi.dizhiXiangchong
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  const dizhiHai = role2XingChongHeHui.role2Dizhi.dizhiXianghai
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  // 处理地支相刑 - 特殊处理
  const dizhiXing: TianganDizhiChar[][] = [];

  // 提取所有地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ] as DizhiChar[];

  // 检查三刑（丑戌未或寅巳申）
  const checkSanXing = (group: DizhiChar[]) => {
    return (
      group.includes('丑') &&
      group.includes('戌') &&
      group.includes('未')
    ) || (
      group.includes('寅') &&
      group.includes('巳') &&
      group.includes('申')
    );
  };

  // 检查三刑组合
  if (checkSanXing(diZhi)) {
    if (diZhi.includes('丑') && diZhi.includes('戌') && diZhi.includes('未')) {
      dizhiXing.push(['丑', '戌', '未']);
    }
    if (diZhi.includes('寅') && diZhi.includes('巳') && diZhi.includes('申')) {
      dizhiXing.push(['寅', '巳', '申']);
    }
  }

  // 检查子卯相刑（需要相邻）
  const zimaoXing = role2XingChongHeHui.role2Dizhi.dizhiXiangxing
    .filter(relation => relation.includes('子卯相刑'))
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  // 检查自刑（需要相邻）
  const zixing = role2XingChongHeHui.role2Dizhi.dizhiXiangxing
    .filter(relation => relation.includes('自刑'))
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  // 合并所有相刑类型
  dizhiXing.push(...zimaoXing, ...zixing);

  return {
    tiangan: {
      cong: tianganCong
    },
    dizhi: {
      cong: dizhiCong,
      hai: dizhiHai,
      xing: dizhiXing  // [['丑', '戌', '未']] 代表丑戌未三刑
    }
  };
};

/**
 * 获取天干、地支的解决类型 （抑制）
 * @param relations eg. ['甲', '庚']
 * @param char eg. ['甲']
 * @param typeStr  eg. ['天干通关']
 * @returns eg. ['壬', '癸']
 */
export const getCharSolve = (
    relations: TianganDizhiChar[],
    char: TianganDizhiChar,
    typeStr: SolveType
): TianganDizhiChar[] => {
    // 1. 判断relations类型（天干或地支）
    const isTianGan = relations.length > 0 && relations[0] in tianganWuxing;
    const isDiZhi = relations.length > 0 && relations[0] in dizhiWuxing;

    // 处理天干相关解决类型
    if (isTianGan) {
        const tianGanChar = char as TianganChar;

        switch (typeStr) {
            case '天干通关':
                { if (relations.length !== 2) return [];
                const [a, b] = relations as [TianganChar, TianganChar];
                const wxA = tianganWuxing[a];
                const wxB = tianganWuxing[b];

                // 金木相冲用水通关，水火相冲用木通关
                if ((wxA === '金' && wxB === '木') || (wxA === '木' && wxB === '金')) {
                    return ['壬', '癸'];
                }
                if ((wxA === '水' && wxB === '火') || (wxA === '火' && wxB === '水')) {
                    return ['甲', '乙'];
                }
                return []; }

            case '天干五合':
                return wuHeMap[tianGanChar] ? [wuHeMap[tianGanChar]] : [];

            case '天干克':
                { const wx = tianganWuxing[tianGanChar];
                let keWx = '';

                // 根据五行相克关系确定克制五行
                if (wx === '木') keWx = '金';
                else if (wx === '土') keWx = '木';
                else if (wx === '水') keWx = '土';
                else if (wx === '火') keWx = '水';
                else if (wx === '金') keWx = '火';

                // 返回克制五行的所有天干
                return (Object.entries(tianganWuxing) as [TianganChar, string][])
                    .filter(([_, w]) => w === keWx)
                    .map(([tg]) => tg); }
        }
    }

    // 处理地支相关解决类型
    if (isDiZhi) {
        const diZhiChar = char as DizhiChar;

        switch (typeStr) {
            case '地支六合':
                return liuHeMap[diZhiChar] ? [liuHeMap[diZhiChar]] : [];

            case '地支三合':
                return sanHeMap[diZhiChar] ? [...sanHeMap[diZhiChar]!] : [];

            case '地支半合':
                return sanHeMap[diZhiChar] ? [...sanHeMap[diZhiChar]!] : [];

            case '地支克':
                { const wx = dizhiWuxing[diZhiChar];

                // 根据五行和地支特性返回克制字符
                if (wx === '水') return ['未', '戌']; // 燥土克水
                if (wx === '火') return ['子', '亥']; // 水克火
                if (wx === '金') return ['巳', '午']; // 火克金
                if (wx === '木') return ['申', '酉']; // 金克木
                if (wx === '土') return ['寅', '卯']; // 木克土
                return []; }
        }
    }

    return []; // 不匹配的类型或空relations
};

/**
 * 通过两种五行，获取到通关用神
 * 原理：
 * 水克火，用木通关
 * 火克金，用土通关
 * 金克木，用水通关
 * 木克土，用火通关
 */
export const getWuxingTongguanChar = (
  char1: Wuxing,
  char2: Wuxing
): TianganDizhiChar[] => {
  // 定义通关规则映射
  const tongguanRules: Record<string, Wuxing> = {
    '水火': '木', // 水克火 → 用木通关
    '火水': '木', // 反方向同样适用
    '火金': '土', // 火克金 → 用土通关
    '金火': '土',
    '金木': '水', // 金克木 → 用水通关
    '木金': '水',
    '木土': '火', // 木克土 → 用火通关
    '土木': '火',
    '土水': '金', // 土克水 → 用金通关
    '水土': '金'
  };

  // 检查是否有直接匹配的通关规则
  const directKey = `${char1}${char2}`;
  const reverseKey = `${char2}${char1}`;

  // 获取通关五行
  let tongguanWuxing: Wuxing | null = null;

  if (tongguanRules[directKey]) {
    tongguanWuxing = tongguanRules[directKey];
  } else if (tongguanRules[reverseKey]) {
    tongguanWuxing = tongguanRules[reverseKey];
  }

  // 如果没有匹配的规则，返回空数组
  if (!tongguanWuxing) return [];

  // 五行对应的天干地支字符映射
  const wuxingCharsMap: Record<Wuxing, TianganDizhiChar[]> = {
    '木': ['甲', '乙', '寅', '卯'],        // 木
    '火': ['丙', '丁', '巳', '午'],        // 火
    '土': ['戊', '己', '辰', '戌', '丑', '未'], // 土（含四土支）
    '金': ['庚', '辛', '申', '酉'],        // 金
    '水': ['壬', '癸', '亥', '子']         // 水
  };

  // 返回通关五行对应的字符
  return wuxingCharsMap[tongguanWuxing] || [];
};

/**
 * 判断八字的寒热燥湿
 *
  逻辑说明：
  五行比例阈值（0.1/0.15等）可根据实际需求调整
  三合局/相冲的优先级低于月令判断，仅作属性加强/减弱用

  1、寒热判断：
  冬季月（亥、子、丑）且火弱（<0.1）→ 寒
  夏季月（巳、午、未）且水弱（<0.1）→ 热

  2、燥湿判断：
  燥土月（戌、未）且水弱（<0.1）→ 燥
  湿土月（辰、丑）且火弱（<0.1）→ 湿
  水月（亥、子）且土弱（<0.1）+ 水旺（>0.3）→ 湿

  3、特殊局加强：
  三合水局（申子辰）加强寒/湿属性
  三合火局（寅午戌）加强热/燥属性
  水火冲（子午、巳亥）可缓解寒热属性
 *
 */
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



// 给一个天干的字，返回所有能生助此字的其他字符
export const getFuTianganDizhiChar = (char: TianganChar): TianganDizhiChar[] => {
  const wuxing = getTianganWuxing(char);

  // 1. 同五行（比肩、劫财）的字符
  const sameWuxing = tianganDizhiWuxingMap[wuxing].filter(c => c !== char); // 排除自身

  // 2. 生此五行（正印、偏印）的字符
  const shengWuxing = tianganDizhiWuxingMap[shengMap[shengMap[wuxing]]] || []; // 生我的五行（隔位相生）

  return [...sameWuxing, ...shengWuxing];
};

// 给一个天干的字，返回所有能抑制（克泄耗）此字的其他字符
export const getYiTianganDizhiChar = (char: TianganChar): TianganDizhiChar[] => {
  const wuxing = getTianganWuxing(char);

  // 1. 克此五行（官杀）的字符
  const keWuxing = tianganDizhiWuxingMap[keMap[keMap[wuxing]]] || []; // 克我的五行（隔位相克）

  // 2. 此五行所克（财）的字符
  const beKeWuxing = tianganDizhiWuxingMap[keMap[wuxing]] || []; // 我克的五行

  // 3. 此五行所生（食伤）的字符
  const shengWuxing = tianganDizhiWuxingMap[shengMap[wuxing]] || []; // 我生的五行

  return [...keWuxing, ...beKeWuxing, ...shengWuxing];
};
