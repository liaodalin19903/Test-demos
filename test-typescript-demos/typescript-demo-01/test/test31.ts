


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


export type Shishen = {
  tianGanShiShen: string[];  // 天干十神
  dizhiShiShen: string[][];  // 地支藏干十神
}

export const getM5GeCongruoCongshi = (eightChar: EightChar, shishen: Shishen): GeType[] => {
    const result: GeType[] = [];
    const { tianGanShiShen, dizhiShiShen } = shishen;
    
    // 定义帮扶十神（比肩、劫财、正印、偏印）
    const bangfuShishen = ['比肩', '劫财', '正印', '偏印'];
    
    // 1. 检查地支藏干中是否有帮扶十神
    const hasBangfuInDizhi = dizhiShiShen.some(zhiShishen => {
        return zhiShishen.some(shiShen => bangfuShishen.includes(shiShen));
    });
    
    // 2. 统计天干中帮扶十神的数量（排除日主）
    let bangfuCount = 0;
    for (let i = 0; i < tianGanShiShen.length; i++) {
        // 跳过日主位置（索引2）
        if (i === 2) continue;
        
        if (bangfuShishen.includes(tianGanShiShen[i])) {
            bangfuCount++;
        }
    }
    
    // 3. 判断是否满足从弱格条件
    if (!hasBangfuInDizhi && bangfuCount <= 1) {
        // 返回所有从弱格类型（供后续分析）
        return [
            '从财格', 
            '从官格', 
            '从煞格', 
            '从儿格', 
            '财官食伤均势格'
        ];
    }
    
    return result;
};

// 示例1
const eightChar1 = {
  1: '甲', 2: '戊', 3: '甲', 4: '戊',
  5: '戌', 6: '戌', 7: '戌', 8: '戌' 
};

const shishen1 = {
  tianGanShiShen: ['比肩', '偏财', '日元', '偏财'],
  dizhiShiShen: [
    ['偏财', '正官', '伤官'],
    ['偏财', '正官', '伤官'],
    ['偏财', '正官', '伤官'],
    ['偏财', '正官', '伤官']
  ]
};

const c1 = getM5GeCongruoCongshi(eightChar1, shishen1); 
// 返回 ['从财格','从官格','从煞格','从儿格','财官食伤均势格']

// 示例2（不满足条件）
const eightChar2 = {
  1: '甲', 2: '乙', 3: '丙', 4: '丁',
  5: '寅', 6: '卯', 7: '辰', 8: '巳' 
};

const shishen2 = {
  tianGanShiShen: ['比肩', '正印', '日元', '劫财'],
  dizhiShiShen: [
    ['偏印', '比肩', '食神'],
    ['正印'],
    ['食神', '正印', '正官'],
    ['比肩', '食神', '偏财']
  ]
};

const c2 = getM5GeCongruoCongshi(eightChar2, shishen2); 
// 返回 []（地支有比肩劫财，天干有多个帮扶）


console.log(c1, c2);
