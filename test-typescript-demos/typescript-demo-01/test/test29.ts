export const getM4Ge = (eightChar: EightChar, shishen: Shishen): GeType[] => {
  const geList: GeType[] = [];
  
  // 提取地支数组
  const dizhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  // 定义三合三会组合
  const sanheGroups = [
    ['申', '子', '辰'], // 水局
    ['亥', '卯', '未'], // 木局
    ['寅', '午', '戌'], // 火局
    ['巳', '酉', '丑']  // 金局
  ];
  
  const sanhuiGroups = [
    ['寅', '卯', '辰'], // 东方木
    ['巳', '午', '未'], // 南方火
    ['申', '酉', '戌'], // 西方金
    ['亥', '子', '丑']  // 北方水
  ];

  // 检查是否满足三合或三会条件
  const checkGroup = (group: string[]) => {
    return group.every(char => dizhi.includes(char));
  };

  // 十神到格局的映射
  const shishenToGe: Record<string, GeType> = {
    '正官': '正官格',
    '七杀': '七杀格',
    '正财': '正财格',
    '偏财': '偏财格',
    '正印': '正印格',
    '偏印': '偏印格',
    '食神': '食神格',
    '伤官': '伤官格'
  };

  // 查找满足的三合/三会组合
  let foundGroup: string[] | null = null;
  
  // 先检查三会（力量更强）
  for (const group of sanhuiGroups) {
    if (checkGroup(group)) {
      foundGroup = group;
      break;
    }
  }
  
  // 再检查三合
  if (!foundGroup) {
    for (const group of sanheGroups) {
      if (checkGroup(group)) {
        foundGroup = group;
        break;
      }
    }
  }

  // 如果找到有效的组合
  if (foundGroup) {
    const yuezhi = eightChar[6]; // 月支
    
    // 确定取哪个地支的十神
    let targetIndex = -1;
    if (foundGroup.includes(yuezhi)) {
      // 月支在组合中，取月支
      targetIndex = 1; // 地支数组索引1对应月支
    } else {
      // 月支不在组合中，取日支
      targetIndex = 2; // 地支数组索引2对应日支
    }
    
    // 获取该地支的第一个十神
    const targetShishen = shishen.dizhiShiShen[targetIndex][0];
    
    // 转换为格局类型
    if (shishenToGe[targetShishen]) {
      geList.push(shishenToGe[targetShishen]);
    }
  }

  return geList;
};

const eightChar = {
  1: '己', 2: '乙', 3: '丙', 4: '戊',
  5: '丑', 6: '亥', 7: '子', 8: '子'
};

const shishen = {
  tianGanShiShen: ['正官', '食神', '日元', '偏印'],
  dizhiShiShen: [
    ['伤官', '正官', '正财'], // 丑
    ['七杀', '偏印'],         // 亥
    ['正官'],                 // 子
    ['正官']                  // 子
  ]
};

console.log(getM4Ge(eightChar, shishen)); // 输出: ['七杀格']