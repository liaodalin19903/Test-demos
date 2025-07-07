// 工具

import {
  DiZhiChar, dizhiWuxing, EightChar, liuHeMap, sanHeMap, SolveType, TianGanChar, TianGanDizhiChar,
  tianganWuxing,
  wuHeMap
} from "@shared/@types/eightChar/eightCharInfo"
import { getRole2XingChongHeHui, Role2XingChongHeHui } from "./role2xingchonghehui";

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
  const extractedChars = chars.match(regex) as TianGanDizhiChar[] | null;

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
    const char = eightChar[pos] as TianGanDizhiChar;
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
  const positionMap: Record<TianGanDizhiChar, number[]> = {
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
    const char = eightChar[i as keyof EightChar] as TianGanDizhiChar;
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
    const ganPair = relation.match(/[甲乙丙丁戊己庚辛壬癸]/g) as TianGanChar[];
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
    const zhiPair = relation.match(/[子丑寅卯辰巳午未申酉戌亥]/g) as DiZhiChar[];
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
    const zhiPair = relation.match(/[子丑寅卯辰巳午未申酉戌亥]/g) as DiZhiChar[];
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
    const zhiPair = relation.match(/[子丑寅卯辰巳午未申酉戌亥]/g) as DiZhiChar[];
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
 *     "xing":[]
 *   }
 * }
 */
export type AdjacentCongHaiXing = {
  tiangan: {
    cong: TianGanChar[][]
  },
  dizhi: {
    cong: DiZhiChar[][],
    hai: DiZhiChar[][],
    xing: DiZhiChar[][],
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
    return (str.match(regex) || []) as TianGanDizhiChar[];
  };

  // 处理天干相冲
  const tianganCong = role2XingChongHeHui.role2Tiangan.tianganXiangchong
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  // 处理地支相冲、相害、相刑
  const dizhiCong = role2XingChongHeHui.role2Dizhi.dizhiXiangchong
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  const dizhiHai = role2XingChongHeHui.role2Dizhi.dizhiXianghai
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  const dizhiXing = role2XingChongHeHui.role2Dizhi.dizhiXiangxing
    .filter(relation => charIsAdjacency(eightChar, relation))
    .map(relation => extractCharsToArray(relation));

  return {
    tiangan: {
      cong: tianganCong
    },
    dizhi: {
      cong: dizhiCong,
      hai: dizhiHai,
      xing: dizhiXing
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
    relations: TianGanDizhiChar[],
    char: TianGanDizhiChar,
    typeStr: SolveType
): TianGanDizhiChar[] => {
    // 1. 判断relations类型（天干或地支）
    const isTianGan = relations.length > 0 && relations[0] in tianganWuxing;
    const isDiZhi = relations.length > 0 && relations[0] in dizhiWuxing;

    // 处理天干相关解决类型
    if (isTianGan) {
        const tianGanChar = char as TianGanChar;

        switch (typeStr) {
            case '天干通关':
                { if (relations.length !== 2) return [];
                const [a, b] = relations as [TianGanChar, TianGanChar];
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
                return (Object.entries(tianganWuxing) as [TianGanChar, string][])
                    .filter(([_, w]) => w === keWx)
                    .map(([tg]) => tg); }
        }
    }

    // 处理地支相关解决类型
    if (isDiZhi) {
        const diZhiChar = char as DiZhiChar;

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


