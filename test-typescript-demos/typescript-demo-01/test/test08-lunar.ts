/**
 * 计算单个地支相对于日元的十二长生状态
 * @param tianGan 日元天干（甲、乙、丙、丁、戊、己、庚、辛、壬、癸）
 * @param diZhi 地支（子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥）
 * @returns 对应的十二长生状态（长生、沐浴、冠带等）
 */
export const getTianGanDiZhiZhangSheng = (tianGan: string, diZhi: string): string => {
  // 十二长生顺序列表
  const zhangShengOrder = [
    '长生', '沐浴', '冠带', '临官',
    '帝旺', '衰', '病', '死',
    '墓', '绝', '胎', '养'
  ];

  // 天干对应的起始地支（阳干顺行，阴干逆行）
  const zhangShengStart: Record<string, string> = {
    '甲': '亥', '丙': '寅', '戊': '寅', '庚': '巳', '壬': '申',
    '乙': '午', '丁': '酉', '己': '酉', '辛': '子', '癸': '卯'
  };

  // 地支顺序列表
  const diZhiOrder = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  // 检查输入有效性
  if (!zhangShengStart.hasOwnProperty(tianGan) || !diZhiOrder.includes(diZhi)) {
    throw new Error(`无效的天干或地支: 天干=${tianGan}, 地支=${diZhi}`);
  }

  // 判断天干是阳干还是阴干
  const isYangGan = ['甲', '丙', '戊', '庚', '壬'].includes(tianGan);
  
  // 获取该天干的起始地支
  const startDiZhi = zhangShengStart[tianGan];
  
  // 计算起始地支和当前地支在地支顺序中的索引
  const startIndex = diZhiOrder.indexOf(startDiZhi);
  const currentIndex = diZhiOrder.indexOf(diZhi);

  // 计算偏移量（阳干顺行，阴干逆行）
  const offset = isYangGan
    ? (currentIndex - startIndex + 12) % 12  // 阳干：顺行计算
    : (startIndex - currentIndex + 12) % 12; // 阴干：逆行计算

  // 返回对应的十二长生状态
  return zhangShengOrder[offset];
};

// 使用示例
// const exampleResult = getTianGanDiZhiZhangSheng('辛', '未');
// console.log(`甲在子的十二长生状态是: ${exampleResult}`); // 输出应该是 "沐浴"


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
 * 计算大运名称的十二长生状态（每个大运对应一个长生字）
 * @param dayunLiunians 大运流年数组
 * @param eightChar 八字信息
 * @returns 包含每个大运名称十二长生状态的数组
 */
export const calculateDayunNameZhangSheng = (
  dayunLiunians: DaYunItem[], 
  eightChar: EightChar
): string[] => {
  // 获取日元（日干）
  const riYuan = eightChar[3];
  
  // 计算结果数组
  return dayunLiunians.map(dayun => {
    let tianGan: string, diZhi: string;
    
    // 处理大运名称
    if (dayun.dayunName === '运前') {
      // 运前使用月柱的天干和地支
      //tianGan = eightChar[2]; // 月干
      diZhi = eightChar[6];   // 月支
    } else {
      // 正常大运名称（如"癸巳"），分解为天干和地支
      //tianGan = dayun.dayunName.charAt(0);
      diZhi = dayun.dayunName.charAt(1);
    }
    
    // 计算并返回十二长生状态
    return getTianGanDiZhiZhangSheng(riYuan, diZhi);
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
const results = calculateDayunNameZhangSheng(dayunLiunians, eightChar);
console.log("大运名称的十二长生状态:", results);
// 输出示例: ['长生', '沐浴', '冠带', ...]（共11个）