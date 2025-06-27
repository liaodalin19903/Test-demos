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

const eightChar = {
  1: '己', 2: '乙', 3: '丙', 4: '戊',
  5: '丑', 6: '亥', 7: '子', 8: '子' 
}

const shishen = {
  tianGanShiShen: ['伤官', '正印', '日元', '食神'],
  dizhiShiShen: [
    ['伤官', '正官', '正财'],       
    ['七杀', '偏印'],  
    ['正官'],  
    ['正官']   
  ]
}

const res = getM3Ge(eightChar, shishen)

console.log(res)

