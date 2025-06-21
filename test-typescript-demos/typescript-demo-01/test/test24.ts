
export type Shishen = {
  tianGanShiShen: string[],  // 天干十神
  dizhiShiShen: string[][]   // 地支藏干十神
}

export type GeType = '正官格' | '七杀格' | '正财格' | '偏财格' | '正印格' | '偏印格' | '食神格' | '伤官格' | '正官格' | '七杀格' | '正财格' | '偏财格' | '正印格' | '偏印格' | '食神格' | '伤官格'
| '建禄格' | '阳刃格' | '曲直格' | '炎上格' | '稼穑格' | '从革格' | '润下格'
| '从财格' | '从官格' | '从煞格' | '从儿格' | '财官食伤均势格'
| '从火气格' | '从木气格' | '从土气格' | '从金气格' | '从水气格'
| '化土格' | '化木格' | '化金格' | '化水格' | '化火格'



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

// 示例1
const shishen1: Shishen = {
  tianGanShiShen: ['正财', '伤官', '日元', '比肩'],
  dizhiShiShen: [
    ['食神', '偏财', '七杀'],
    ['正财', '正印', '正官'], // 月支
    ['伤官', '正财'],
    ['正印']
  ]
};
console.log(getM1Ge(shishen1)); // 输出: ['正财格']

// 示例2
const shishen2: Shishen = {
  tianGanShiShen: ['正财', '伤官', '日元', '正印'],
  dizhiShiShen: [
    ['食神', '偏财', '七杀'],
    ['正财', '正印', '正官'], // 月支
    ['伤官', '正财'],
    ['正印']
  ]
};
console.log(getM1Ge(shishen2)); // 输出: ['正财格', '正印格']