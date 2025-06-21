// 方式1：天透地藏

import { EightCharInfo, Shishen } from "@shared/@types/eightChar/eightCharInfo";
import { GeType } from "@shared/@types/eightChar/geju";

export const getM1Ge = (shishen: Shishen): GeType[] => {
  const tianganShishen = shishen.tianGanShiShen;
  const yuezhiShishen = shishen.dizhiShiShen[1]; // 获取月支十神数组

  const geSet = new Set<GeType>(); // 使用Set避免重复格局

  // 定义有效的格局类型（排除重复项）
  const validGeTypes: GeType[] = [
    '正官格', '七杀格', '正财格', '偏财格',
    '正印格', '偏印格', '食神格', '伤官格'
  ];

  // 遍历月支中的每个十神
  for (const shen of yuezhiShishen) {
    // 检查是否在天干中出现过
    if (tianganShishen.includes(shen)) {
      // 构造格局名称（十神名称 + "格"）
      const geType = `${shen}格` as GeType;

      // 验证是否为有效格局类型
      if (validGeTypes.includes(geType)) {
        geSet.add(geType);
      }
    }
  }

  return Array.from(geSet);
};

