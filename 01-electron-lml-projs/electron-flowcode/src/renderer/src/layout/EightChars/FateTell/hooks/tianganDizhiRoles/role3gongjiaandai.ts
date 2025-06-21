// 拱、夹、暗带

import { EightChar } from "@shared/@types/eightChar/eightCharInfo";

/**
 *
 * @param eightChar
 * @returns eg.['申子拱水']
 */
export const getDizhiGong = (eightChar: EightChar): string[] => {
  // 定义拱局组合
  const gongGroups = [
    { elements: ['申', '子'], name: '申子拱水' },
    { elements: ['亥', '卯'], name: '亥卯拱木' },
    { elements: ['寅', '午'], name: '寅午拱火' },
    { elements: ['巳', '酉'], name: '巳酉拱金' }
  ];

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];

  // 检查每个拱局组合
  for (const group of gongGroups) {
    const [dz1, dz2] = group.elements;
    // 检查是否同时包含两个必需的地支
    if (diZhi.includes(dz1) && diZhi.includes(dz2)) {
      results.push(group.name);
    }
  }

  return results;
};


