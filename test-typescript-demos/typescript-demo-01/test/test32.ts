export type Shishen = {
  tianGanShiShen: string[];  // 天干十神
  dizhiShiShen: string[][];  // 地支藏干十神
}

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

export type GeType = '正官格' | '七杀格' | '正财格' | '偏财格' | '正印格' | '偏印格' | '食神格' | '伤官格' 
| '建禄格' | '阳刃格' | '曲直格' | '炎上格' | '稼穑格' | '从革格' | '润下格'
| '从财格' | '从官格' | '从煞格' | '从儿格' | '财官食伤均势格'
| '从火气格' | '从木气格' | '从土气格' | '从金气格' | '从水气格'
| '化土格' | '化木格' | '化金格' | '化水格' | '化火格';

// 五行与地支对应关系
const WUXING_DIZHI: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火', 
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 三合局配置
const SANHE_JU: Record<string, string[]> = {
  '火': ['寅', '午', '戌'],
  '水': ['申', '子', '辰'],
  '木': ['亥', '卯', '未'],
  '金': ['巳', '酉', '丑'],
  '土': ['辰', '戌', '丑', '未'] // 四库土
};

// 三会局配置
const SANHUI_JU: Record<string, string[]> = {
  '火': ['巳', '午', '未'],
  '水': ['亥', '子', '丑'],
  '木': ['寅', '卯', '辰'],
  '金': ['申', '酉', '戌']
};

/**
 * 判断八字是否符合从气格条件
 * @param eightChar 八字
 * @param shishen 十神
 * @returns 符合的从气格类型数组
 */
export const getM5GeCongruoCongqi = (eightChar: EightChar, shishen: Shishen): GeType[] => {
  const rizhu = eightChar[3]; // 日主
  const yueLing = eightChar[6]; // 月令地支
  
  // 日主对应的比肩、劫财、正印、偏印十神
  const bijie_jiecai = ['比肩', '劫财'];
  const zhengyin_pianyin = ['正印', '偏印'];
  const forbidden_shishen = [...bijie_jiecai, ...zhengyin_pianyin];
  
  // 步骤1: 判断衰弱无根 - 地支（包括藏干）没有比肩劫财、正印偏印
  const hasForbiddenInDizhi = shishen.dizhiShiShen.some(
    (canggan) => canggan.some(shi => forbidden_shishen.includes(shi))
  );
  if (hasForbiddenInDizhi) return [];
  
  // 步骤2: 天干比劫/印星在地支无根
  const tianGanBiJieYin = shishen.tianGanShiShen
    .map((shi, index) => ({ shi, index }))
    .filter(({ shi }) => forbidden_shishen.includes(shi));
  
  const hasRootInDizhi = tianGanBiJieYin.some(({ index }) => {
    const tianGanIndex = index + 1; // 天干索引映射到八字对象
    const tianGanWuXing = getWuXingByTianGan(eightChar[tianGanIndex as keyof EightChar]);
    
    // 检查地支是否有该五行的本气根
    return Object.values(eightChar).slice(4).some(dizhi => {
      const dizhiWuXing = WUXING_DIZHI[dizhi];
      return dizhiWuXing === tianGanWuXing;
    });
  });
  if (hasRootInDizhi) return [];
  
  // 步骤3: 统计五行出现次数并检查气势
  const wuxingCount: Record<string, number> = { '木': 0, '火': 0, '土': 0, '金': 0, '水': 0 };
  
  // 天干五行统计
  for (let i = 1; i <= 4; i++) {
    const tg = eightChar[i as keyof EightChar];
    const wuxing = getWuXingByTianGan(tg);
    wuxingCount[wuxing]++;
  }
  
  // 地支五行统计
  for (let i = 5; i <= 8; i++) {
    const dz = eightChar[i as keyof EightChar];
    const wuxing = WUXING_DIZHI[dz];
    wuxingCount[wuxing]++;
  }
  
  const yueLingWuXing = WUXING_DIZHI[yueLing];
  
  // 检查是否有五行出现≥3次且占据月令
  const hasStrongWuxing = Object.entries(wuxingCount)
    .some(([wuxing, count]) => count >= 3 && wuxing === yueLingWuXing);
  
  // 检查是否有三合局或三会局
  const hasSanheOrSanhui = Object.entries(SANHE_JU).some(([wuxing, ju]) => {
    const hasAllSanhe = ju.every(dz => Object.values(eightChar).includes(dz));
    if (hasAllSanhe) return true;
    
    // 检查三会局
    const sanhui = SANHUI_JU[wuxing];
    if (!sanhui) return false;
    return sanhui.every(dz => Object.values(eightChar).includes(dz));
  });
  
  if (!hasStrongWuxing && !hasSanheOrSanhui) return [];
  
  // 步骤4: 根据五行确定从气格类型
  const dominantWuxing = Object.entries(wuxingCount)
    .filter(([wuxing, count]) => count >= 3)
    .sort((a, b) => b[1] - a[1])
    .map(([wuxing]) => wuxing)[0];
  
  const geTypeMap: Record<string, GeType> = {
    '火': '从火气格',
    '木': '从木气格',
    '土': '从土气格',
    '金': '从金气格',
    '水': '从水气格'
  };
  
  return [geTypeMap[dominantWuxing]];
};

// 辅助函数：根据天干获取五行
const getWuXingByTianGan = (tianGan: string): string => {
  const map: Record<string, string> = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
  };
  return map[tianGan] || '';
};    

const eightChar = {
  1: '甲',
  2: '戊',
  3: '甲',
  4: '戊',
  5: '戌',
  6: '戌',
  7: '戌',
  8: '戌' 
}

const shishen = {
  tianGanShiShen: [],
  dizhiShiShen: [

  ]
}



const c1 = getM5GeCongruoCongqi(eightChar, shishen)

console.log(c1)






