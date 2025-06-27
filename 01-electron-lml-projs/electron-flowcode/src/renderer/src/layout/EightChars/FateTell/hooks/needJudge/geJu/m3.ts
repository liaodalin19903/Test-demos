// 方式3：阴阳相见

import { EightChar, Shishen } from "@shared/@types/eightChar/eightCharInfo"
import { GeType } from "@shared/@types/eightChar/geju"


export const intro = [
  '我命名：降低版天透地藏（①我：地支位置要求降低；②地支阴阳属性降低）',
  '数量至少：同阴阳性2个；不同性3个',
  '勉强算是格局'
]

export const getM3Ge = (eightChar: EightChar, shishen: Shishen): GeType[] => {
  const geList: GeType[] = [];

  // 定义十神分组映射（相同五行的十神分组）
  const shenGroups: Record<string, {same: string[], different: string[]}> = {
    '正官': {same: ['正官'], different: ['七杀']},
    '七杀': {same: ['七杀'], different: ['正官']},
    '正财': {same: ['正财'], different: ['偏财']},
    '偏财': {same: ['偏财'], different: ['正财']},
    '正印': {same: ['正印'], different: ['偏印']},
    '偏印': {same: ['偏印'], different: ['正印']},
    '食神': {same: ['食神'], different: ['伤官']},
    '伤官': {same: ['伤官'], different: ['食神']}
  };

  // 检查月干或时干
  const checkGan = (ganPosition: '2' | '4') => {
    const ganIndex = ganPosition === '2' ? 1 : 3; // 天干十神数组索引
    const shen = shishen.tianGanShiShen[ganIndex];

    // 只处理特定十神（排除比肩劫财等）
    if (!shenGroups[shen]) return;

    // 获取相同和不同阴阳性的十神列表
    const {same, different} = shenGroups[shen];

    // 初始化计数
    let sameCount = 0;
    let totalCount = 0; // 相同五行十神的总数

    // 统计天干部分（四个天干）
    for (let i = 0; i < 4; i++) {
      const shenType = shishen.tianGanShiShen[i];
      if (same.includes(shenType)) {
        sameCount++;
        totalCount++;
      } else if (different.includes(shenType)) {
        totalCount++;
      }
    }

    // 统计地支藏干部分（四个地支）
    for (let i = 0; i < 4; i++) {
      const dzShens = shishen.dizhiShiShen[i];
      for (const shenType of dzShens) {
        if (same.includes(shenType)) {
          sameCount++;
          totalCount++;
        } else if (different.includes(shenType)) {
          totalCount++;
        }
      }
    }

    // 检查成格条件
    // 1. 相同阴阳性数量 ≥ 2
    // 2. 相同五行总数 ≥ 3
    if (sameCount >= 2 || totalCount >= 3) {
      const geType = `${shen}格` as GeType;
      // 避免重复添加（同一个格局可能被月干和时干都触发）
      if (!geList.includes(geType)) {
        geList.push(geType);
      }
    }
  };

  // 检查月干和时干
  checkGan('2'); // 月干
  checkGan('4'); // 时干

  return geList;
};
