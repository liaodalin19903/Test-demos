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

  // 定义大运流年数据结构
export interface DaYunItem {
    dayunName: string;
    liunians: LiuNianItem[];
  }

export interface LiuNianItem {
    liunianYear: number;
    liunianGanzhi: string;
  }

/**
 * 获取天干相对于日主的十神
 * @param riZhuTianGan 日主天干
 * @param targetTianGan 目标天干
 * @returns 对应的十神名称
 */
export const getShiShen = (riZhuTianGan: string, targetTianGan: string): string => {
  // 十天干阴阳属性
  const yinYangMap: Record<string, boolean> = {
    '甲': true, '乙': false, '丙': true, '丁': false,
    '戊': true, '己': false, '庚': true, '辛': false,
    '壬': true, '癸': false
  };

  // 天干五行属性
  const wuXingMap: Record<string, string> = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火',
    '戊': '土', '己': '土', '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
  };

  // 五行相生关系
  const shengMap: Record<string, string> = {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
  };

  // 日主天干的阴阳和五行
  const riZhuIsYang = yinYangMap[riZhuTianGan];
  const riZhuWuXing = wuXingMap[riZhuTianGan];

  // 目标天干的阴阳和五行
  const targetIsYang = yinYangMap[targetTianGan];
  const targetWuXing = wuXingMap[targetTianGan];

  // 十神关系计算逻辑
  if (riZhuWuXing === targetWuXing) {
    // 比劫
    return riZhuIsYang === targetIsYang ? '比肩' : '劫财';
  } else if (shengMap[riZhuWuXing] === targetWuXing) {
    // 食伤
    return riZhuIsYang === targetIsYang ? '食神' : '伤官';
  } else if (shengMap[targetWuXing] === riZhuWuXing) {
    // 印绶
    return riZhuIsYang === targetIsYang ? '偏印' : '正印';
  } else if (
    (riZhuIsYang && targetIsYang) ||
    (!riZhuIsYang && !targetIsYang)
  ) {
    // 七杀、偏财
    return riZhuWuXing === '土' && targetWuXing === '水'
      ? '偏财'  // 土日主见水（阳土见阳水为偏财）
      : '七杀'; // 其他阴阳相同的克关系为七杀
  } else {
    // 正官、正财
    return riZhuWuXing === '土' && targetWuXing === '水'
      ? '正财'  // 土日主见水（阴土见阴水为正财）
      : '正官'; // 其他阴阳不同的克关系为正官
  }
};

/**
 * 计算大运名称的十神（每个大运对应一个十神）
 * @param dayunLiunians 大运流年数组
 * @param eightChar 八字信息
 * @returns 包含每个大运名称十神的数组
 */
export const calculateDayunNameShiShen = (
  dayunLiunians: DaYunItem[],
  eightChar: EightChar
): string[] => {
  // 获取日元（日干）
  const riYuan = eightChar[3];

  // 计算结果数组
  return dayunLiunians.map(dayun => {
    let tianGan: string;

    // 处理大运名称
    if (dayun.dayunName === '运前') {
      // 运前使用月柱的天干
      tianGan = eightChar[2]; // 月干
    } else {
      // 正常大运名称（如"癸巳"），取第一个字符作为天干
      tianGan = dayun.dayunName.charAt(0);
    }

    // 计算并返回十神
    return getShiShen(riYuan, tianGan);
  });
};

const dayunLiunians: DaYunItem[] = [
  {
    "dayunName": "运前",
    "liunians": []
  },
    {
    "dayunName": "丙子",
    "liunians": []
  },
    {
    "dayunName": "乙亥",
    "liunians": []
  },
    {
    "dayunName": "甲戌",
    "liunians": []
  },
    {
    "dayunName": "癸酉",
    "liunians": []
  },
    {
    "dayunName": "壬申",
    "liunians": []
  },
    {
    "dayunName": "辛未",
    "liunians": []
  },
    {
    "dayunName": "庚午",
    "liunians": []
  },
    {
    "dayunName": "己巳",
    "liunians": []
  },
    {
    "dayunName": "戊辰",
    "liunians": []
  },
   {
    "dayunName": "丁卯",
    "liunians": []
  },

] 

const eightChar = {
  1: '己',
  2: '丁',
  3: '甲',
  4: '甲',
  5: '巳',
  6: '丑',
  7: '午',
  8: '子' 
}


// 使用示例
const results = calculateDayunNameShiShen(dayunLiunians, eightChar);
console.log("大运名称的十神:", results);
// 输出示例: ['正官', '七杀', '正财', ...]（共11个）
