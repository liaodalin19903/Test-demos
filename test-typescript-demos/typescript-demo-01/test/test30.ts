
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

export type GeType = 
  | '正官格' | '七杀格' | '正财格' | '偏财格' | '正印格' | '偏印格' | '食神格' | '伤官格' 
  | '建禄格' | '阳刃格' | '曲直格' | '炎上格' | '稼穑格' | '从革格' | '润下格'
  | '从财格' | '从官格' | '从煞格' | '从儿格' | '财官食伤均势格'
  | '从火气格' | '从木气格' | '从土气格' | '从金气格' | '从水气格'
  | '化土格' | '化木格' | '化金格' | '化水格' | '化火格';

/**
 * 从强专旺格判断函数
 */
export const getM5GeZhuanwang = (eightChar: EightChar): GeType[] => {
  const result: GeType[] = [];
  
  // 提取日主和月令
  const riZhu = eightChar[3]; // 日干
  const yueLing = eightChar[6]; // 月支
  
  // 提取四个地支
  const diZhi = [eightChar[5], eightChar[6], eightChar[7], eightChar[8]];
  
  // 提取四个天干
  const tianGan = [eightChar[1], eightChar[2], eightChar[3], eightChar[4]];
  
  // 检查地支是否构成特定组合
  const sanheGroups = getDizhiSanhe(eightChar);
  const sanhuiGroups = getDizhiSanhui(eightChar);
  
  // 曲直格（木）
  if (
    ['甲', '乙'].includes(riZhu) && // 日主必须是甲或乙
    ['寅', '卯'].includes(yueLing) && // 月令必须是寅或卯
    (sanheGroups.includes('亥卯未') || sanhuiGroups.includes('寅卯辰')) && // 地支构成亥卯未三合或寅卯辰三会
    !diZhi.some(zhi => ['庚', '辛', '申', '酉'].includes(zhi)) && // 地支无庚辛申酉
    !tianGan.some(gan => ['庚', '辛'].includes(gan)) && // 天干无庚辛
    tianGan.filter((gan, index) => index !== 2).some(gan => ['甲', '乙'].includes(gan)) // 天干除日主外有木透出
  ) {
    result.push('曲直格');
  }
  
  // 炎上格（火）
  if (
    ['丙', '丁'].includes(riZhu) && // 日主必须是丙或丁
    ['巳', '午'].includes(yueLing) && // 月令必须是巳或午
    (sanheGroups.includes('寅午戌') || sanhuiGroups.includes('巳午未')) && // 地支构成寅午戌三合或巳午未三会
    !diZhi.some(zhi => ['壬', '癸', '亥', '子'].includes(zhi)) && // 地支无壬癸亥子
    !tianGan.some(gan => ['壬', '癸'].includes(gan)) && // 天干无壬癸
    tianGan.filter((gan, index) => index !== 2).some(gan => ['丙', '丁'].includes(gan)) // 天干除日主外有火透出
  ) {
    result.push('炎上格');
  }
  
  // 稼穑格（土）
  if (
    ['戊', '己'].includes(riZhu) && // 日主必须是戊或己
    ['辰', '戌', '丑', '未'].includes(yueLing) && // 月令必须是辰戌丑未
    diZhi.every(zhi => ['辰', '戌', '丑', '未'].includes(zhi)) && // 地支全是土
    !diZhi.some(zhi => ['甲', '乙', '寅', '卯'].includes(zhi)) && // 地支无甲乙寅卯
    !tianGan.some(gan => ['甲', '乙'].includes(gan)) && // 天干无甲乙
    tianGan.filter((gan, index) => index !== 2).some(gan => ['戊', '己'].includes(gan)) // 天干除日主外有土透出
  ) {
    result.push('稼穑格');
  }
  
  // 从革格（金）
  if (
    ['庚', '辛'].includes(riZhu) && // 日主必须是庚或辛
    ['申', '酉'].includes(yueLing) && // 月令必须是申或酉
    (sanheGroups.includes('巳酉丑') || sanhuiGroups.includes('申酉戌')) && // 地支构成巳酉丑三合或申酉戌三会
    !diZhi.some(zhi => ['丙', '丁', '午', '未'].includes(zhi)) && // 地支无丙丁午未
    !tianGan.some(gan => ['丙', '丁'].includes(gan)) && // 天干无丙丁
    tianGan.filter((gan, index) => index !== 2).some(gan => ['庚', '辛'].includes(gan)) // 天干除日主外有金透出
  ) {
    result.push('从革格');
  }
  
  // 润下格（水）
  if (
    ['壬', '癸'].includes(riZhu) && // 日主必须是壬或癸
    ['亥', '子'].includes(yueLing) && // 月令必须是亥或子
    (sanheGroups.includes('申子辰') || sanhuiGroups.includes('亥子丑')) && // 地支构成申子辰三合或亥子丑三会
    !diZhi.some(zhi => ['戊', '己', '未', '戌'].includes(zhi)) && // 地支无戊己未戌
    !tianGan.some(gan => ['戊', '己'].includes(gan)) && // 天干无戊己
    tianGan.filter((gan, index) => index !== 2).some(gan => ['壬', '癸'].includes(gan)) // 天干除日主外有水透出
  ) {
    result.push('润下格');
  }
  
  return result;
};

/**
 * 地支三合检测方法
 */
export const getDizhiSanhe = (eightChar: EightChar): string[] => {
  // 定义三合局组合
  const sanheGroups = [
    { name: '申子辰', elements: ['申', '子', '辰'] },
    { name: '亥卯未', elements: ['亥', '卯', '未'] },
    { name: '寅午戌', elements: ['寅', '午', '戌'] },
    { name: '巳酉丑', elements: ['巳', '酉', '丑'] }
  ];

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];

  // 检查每个三合局组合
  for (const group of sanheGroups) {
    // 检查三合局的每个地支是否都出现在八字地支中
    const hasAll = group.elements.every(element => diZhi.includes(element));

    if (hasAll) {
      results.push(group.name);
    }
  }

  return results;
};

/**
 * 地支三会检测方法
 */
export const getDizhiSanhui = (eightChar: EightChar): string[] => {
  // 定义三会局组合
  const sanhuiGroups = [
    { name: '巳午未', elements: ['巳', '午', '未'] },
    { name: '申酉戌', elements: ['申', '酉', '戌'] },
    { name: '亥子丑', elements: ['亥', '子', '丑'] },
    { name: '寅卯辰', elements: ['寅', '卯', '辰'] }
  ];

  // 提取四个地支
  const diZhi = [
    eightChar[5], // 年支
    eightChar[6], // 月支
    eightChar[7], // 日支
    eightChar[8]  // 时支
  ];

  const results: string[] = [];

  // 检查每个三会局组合
  for (const group of sanhuiGroups) {
    // 检查三会局的每个地支是否都出现在八字地支中
    const hasAll = group.elements.every(element => diZhi.includes(element));

    if (hasAll) {
      results.push(group.name);
    }
  }

  return results;
};    

const char1: EightChar = {
  1: '乙', 2: '己', 3: '乙', 4: '丙',
  5: '亥', 6: '卯', 7: '未', 8: '子'
};
const geju1 = getM5GeZhuanwang(char1); // 返回 ['曲直格']

const char2: EightChar = {
  1: '庚', 2: '庚', 3: '壬', 4: '癸',
  5: '辰', 6: '子', 7: '申', 8: '亥'
};

const geju2 = getM5GeZhuanwang(char2); // 返回 ['润下格']


// 案例：乾造（乙未、辛巳、丙午、甲午）
const char3: EightChar = {
  1: '乙', 2: '辛', 3: '丙', 4: '丙',
  5: '未', 6: '巳', 7: '午', 8: '午'
};
const geju3 = getM5GeZhuanwang(char3); // 返回 ['炎上格']


// 乾造（戊辰、壬戌、戊午、壬戌
// 乾造（戊辰、壬戌、戊午、壬戌
const char4: EightChar = {
  1: '戊', 2: '壬', 3: '戊', 4: '壬',
  5: '辰', 6: '戌', 7: '戌', 8: '戌'
};
const geju4 = getM5GeZhuanwang(char4); // 返回 ['稼穑格']

// 乾造（戊申、辛酉、庚戌、乙酉）
const char5: EightChar = {
  1: '戊', 2: '辛', 3: '庚', 4: '乙',
  5: '申', 6: '酉', 7: '戌', 8: '酉'
};
const geju5 = getM5GeZhuanwang(char5); // 返回 ['从革格']

console.log(geju1, geju2, geju3, geju4, geju5)


