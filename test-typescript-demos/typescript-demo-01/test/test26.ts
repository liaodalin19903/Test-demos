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


export const getM3Ge = (eightChar: EightChar, shishen: Shishen): GeType[] => {
  const geList: GeType[] = [];
  
  // 定义十神分组映射（相同五行的十神分组）
  const shenGroups: Record<string, string[]> = {
    '正官': ['正官', '七杀'],
    '七杀': ['正官', '七杀'],
    '正财': ['正财', '偏财'],
    '偏财': ['正财', '偏财'],
    '正印': ['正印', '偏印'],
    '偏印': ['正印', '偏印'],
    '食神': ['食神', '伤官'],
    '伤官': ['食神', '伤官']
  };

  // 检查月干（位置索引2）
  const checkGan = (ganPosition: '2' | '4') => {
    const ganIndex = ganPosition === '2' ? 1 : 3; // 天干十神数组索引（月干=1，时干=3）
    const shen = shishen.tianGanShiShen[ganIndex];
    
    // 只处理特定十神（排除比肩劫财等）
    if (!shenGroups[shen]) return;
    
    // 统计相同五行的十神数量（包括自己）
    let count = 1; // 自己已算1个
    
    // 遍历所有地支藏干（4个地支）
    for (let i = 0; i < 4; i++) {
      const dzShens = shishen.dizhiShiShen[i];
      dzShens.forEach(dzShen => {
        // 检查是否属于同一五行分组
        if (shenGroups[shen].includes(dzShen)) {
          count++;
        }
      });
    }
    
    // 如果找到至少1个相同五行的地支藏干（总数>=2）
    if (count >= 2) {
      // 将十神转换为格局名称
      const geType = `${shen}格` as GeType;
      geList.push(geType);
    }
  };

  // 检查月干和时干
  checkGan('2'); // 月干
  checkGan('4'); // 时干

  return geList;
};

const eightChar = {
  1: '己', 2: '甲', 3: '壬', 4: '庚',
  5: '亥', 6: '戌', 7: '辰', 8: '戌' 
}

const shishen = {
  tianGanShiShen: ['正官', '食神', '日元', '偏印'],
  dizhiShiShen: [
    ['比肩', '食神'],       // 亥
    ['七杀', '正印', '正财'], // 戌
    ['七杀', '伤官', '劫财'], // 辰
    ['七杀', '正印', '正财']  // 戌
  ]
}

const res = getM3Ge(eightChar, shishen)

console.log(res)

