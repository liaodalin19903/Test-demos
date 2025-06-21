export type Shishen = {
  tianGanShiShen: string[],  // 天干十神
  dizhiShiShen: string[][]   // 地支藏干十神
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

export type GeType = '正官格' | '七杀格' | '正财格' | '偏财格' | '正印格' | '偏印格' | '食神格' | '伤官格' | '正官格' | '七杀格' | '正财格' | '偏财格' | '正印格' | '偏印格' | '食神格' | '伤官格'
| '建禄格' | '阳刃格' | '曲直格' | '炎上格' | '稼穑格' | '从革格' | '润下格'
| '从财格' | '从官格' | '从煞格' | '从儿格' | '财官食伤均势格'
| '从火气格' | '从木气格' | '从土气格' | '从金气格' | '从水气格'
| '化土格' | '化木格' | '化金格' | '化水格' | '化火格'



export const getM2Ge = (eightChar: EightChar, shishen: Shishen): GeType[] => {
  // 天干五行映射
  const ganToWuxing: Record<string, string> = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
  };
  
  // 十神五行映射
  const shishenToWuxing: Record<string, string> = {
    '正官': '金', '七杀': '金',
    '正财': '木', '偏财': '木',
    '正印': '土', '偏印': '土',
    '食神': '水', '伤官': '水',
    '比肩': '同', '劫财': '同'
  };
  
  // 获取日干五行
  const dayGan = eightChar[3];
  const dayWuxing = ganToWuxing[dayGan];
  
  // 确定十神五行映射关系
  const shenWuxingMap: Record<string, string> = {};
  for (const [shen, wuxing] of Object.entries(shishenToWuxing)) {
    shenWuxingMap[shen] = wuxing === '同' ? dayWuxing : wuxing;
  }
  
  // 统计五行出现次数
  const wuxingCount: Record<string, number> = { 木:0, 火:0, 土:0, 金:0, 水:0 };
  
  // 统计天干十神（排除日元）
  const tianGanWithoutRi = shishen.tianGanShiShen.filter((_, i) => i !== 2);
  for (const shen of tianGanWithoutRi) {
    const wuxing = shenWuxingMap[shen];
    if (wuxing) wuxingCount[wuxing]++;
  }
  
  // 统计地支藏干十神
  for (const innerArr of shishen.dizhiShiShen) {
    for (const shen of innerArr) {
      const wuxing = shenWuxingMap[shen];
      if (wuxing) wuxingCount[wuxing]++;
    }
  }
  
  // 找出出现次数>=4的五行
  const overFourWuxing = Object.entries(wuxingCount)
    .filter(([_, count]) => count >= 4)
    .map(([wuxing]) => wuxing);
  
  // 获取有效格局列表
  const validGe = ['正官', '七杀', '正财', '偏财', '正印', '偏印', '食神', '伤官'];
  
  // 收集天干透出的十神格局
  const resultSet = new Set<GeType>();
  for (const wuxing of overFourWuxing) {
    for (const shen of tianGanWithoutRi) {
      // 检查十神是否属于当前五行且是有效格局
      if (shenWuxingMap[shen] === wuxing && validGe.includes(shen)) {
        resultSet.add(`${shen}格` as GeType);
      }
    }
  }
  
  return Array.from(resultSet);
};

const eightChar = {
  1: '壬', 2: '甲', 3: '辛', 4: '壬',
  5: '辰', 6: '辰', 7: '巳', 8: '辰'
};

const shishen = {
  tianGanShiShen: ['伤官', '正财', '日元', '伤官'],
  dizhiShiShen: [
    ['正印', '偏财', '食神'],
    ['正印', '偏财', '食神'],
    ['正官', '正印', '劫财'],
    ['正印', '偏财', '食神']
  ]
};

console.log(getM2Ge(eightChar, shishen)); // 输出: ['伤官格']