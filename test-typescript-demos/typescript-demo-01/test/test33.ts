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


export const getM5GeCongruoHuaqi = (eightChar: EightChar, shishen: Shishen): GeType[] => {
  // 1. 定义天干五合映射
  const heMap: Record<string, string> = {
    '甲': '己', '己': '甲',
    '乙': '庚', '庚': '乙',
    '丙': '辛', '辛': '丙',
    '丁': '壬', '壬': '丁',
    '戊': '癸', '癸': '戊'
  };

  // 2. 定义天干五行映射
  const wuxingMap: Record<string, string> = {
    '甲': '木', '乙': '木',
    '丙': '火', '丁': '火',
    '戊': '土', '己': '土',
    '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
  };

  // 3. 定义合化五行映射
  const huaqiMap: Record<string, string> = {
    '甲己': '土', '己甲': '土',
    '乙庚': '金', '庚乙': '金',
    '丙辛': '水', '辛丙': '水',
    '丁壬': '木', '壬丁': '木',
    '戊癸': '火', '癸戊': '火'
  };

  // 4. 定义强根地支映射
  const strongRootMap: Record<string, string[]> = {
    '土': ['辰', '戌', '丑', '未', '巳', '午'],
    '金': ['申', '酉', '辰', '戌', '丑', '未'],
    '水': ['亥', '子', '申', '酉'],
    '木': ['寅', '卯', '亥', '子'],
    '火': ['巳', '午', '寅', '卯']
  };

  // 5. 定义月令生助地支映射
  const monthSupportMap: Record<string, string[]> = {
    '土': ['巳', '午', '辰', '戌', '丑', '未'],
    '金': ['申', '酉', '辰', '戌', '丑', '未'],
    '水': ['亥', '子', '申', '酉'],
    '木': ['寅', '卯', '亥', '子'],
    '火': ['巳', '午', '寅', '卯']
  };

  // 6. 定义化气格类型映射
  const geMap: Record<string, GeType> = {
    '土': '化土格',
    '金': '化金格',
    '水': '化水格',
    '木': '化木格',
    '火': '化火格'
  };

  // 获取天干和地支
  const nianGan = eightChar[1];
  const yueGan = eightChar[2];
  const riGan = eightChar[3];
  const shiGan = eightChar[4];
  const yueZhi = eightChar[6];
  const shiZhi = eightChar[8];

  // 检查日干是否与月干或时干相合
  const withYue = heMap[riGan] === yueGan;
  const withShi = heMap[riGan] === shiGan;

  // 如果同时与月干和时干相合，属于争合，直接返回空数组
  if (withYue && withShi) {
    return [];
  }

  let heTarget: string | null = null;  // 合化对象
  let huaQi: string | null = null;     // 合化五行

  // 处理日干与月干相合的情况
  if (withYue) {
    heTarget = yueGan;
    const key = riGan + yueGan;
    huaQi = huaqiMap[key];
    
    // 检查月支是否为强根
    if (!huaQi || !strongRootMap[huaQi].includes(yueZhi)) {
      return [];
    }
  } 
  // 处理日干与时干相合的情况
  else if (withShi) {
    heTarget = shiGan;
    const key = riGan + shiGan;
    huaQi = huaqiMap[key];
    
    // 检查时支是否为强根
    if (!huaQi || !strongRootMap[huaQi].includes(shiZhi)) {
      return [];
    }
  } 
  // 无相合情况
  else {
    return [];
  }

  // 检查月令是否生助合化五行
  if (!monthSupportMap[huaQi].includes(yueZhi)) {
    return [];
  }

  // 检查妒合/争合
  const targetWuxing = wuxingMap[heTarget];  // 合化对象的五行
  const tianGans = [nianGan, yueGan, shiGan]; // 年、月、时干
  
  // 检查除合化对象外的天干是否有相同五行
  const hasInterfere = tianGans.some(gan => 
    gan !== heTarget && wuxingMap[gan] === targetWuxing
  );

  if (hasInterfere) {
    return [];
  }

  // 所有条件满足，返回对应的化气格
  return [geMap[huaQi]];
};

const eightChar = {
  1: '戊', 2: '庚', 3: '乙', 4: '丁',
  5: '子', 6: '申', 7: '卯', 8: '丑' 
}

const shishen = {
  tianGanShiShen: ['正财', '正官', '日元', '食神'],
  dizhiShiShen: [ ['偏印'], ['正官','正印','正财'], ['比肩'], ['偏财','偏印','七杀'] ]
}

const c1 = getM5GeCongruoHuaqi(eightChar, shishen) // 返回 ['化金格']

const eightChar2 = {
  1: '戊', 2: '庚', 3: '乙', 4: '辛',
  5: '子', 6: '申', 7: '庚', 8: '巳' 
}

const shishen2 = {
  tianGanShiShen: ['正财', '正官', '日元', '七杀'],
  dizhiShiShen: [ ['偏印'], ['正官','正印','正财'], ['比肩'], ['伤官','正官','正财'] ]
}

const c2 = getM5GeCongruoHuaqi(eightChar2, shishen2) // 返回 []（时干辛金妒合）

console.log(c1, c2)