// 方式5：特殊格局

// 1、【从强】专旺格
// 2、【从弱】从格（弃命从势）
// 3、化气格（略）
// 4、其他（eg. 魁罡格、金神格）


import { EightChar, getWuXingByTianGan, SANHE_JU, SANHUI_JU, Shishen, WUXING_DIZHI } from "@shared/@types/eightChar/eightCharInfo"
import { GeType } from "@shared/@types/eightChar/geju"
import { getDizhiSanhe, getDizhiSanhui } from '@renderer/layout/EightChars/FateTell/hooks/tianganDizhiRoles/role2xingchonghehui';

export const intro = [

]


/**
 * 从强专旺格:
 * 曲直格（木）
 * 炎上格（火）
 * 稼穑格（土）
 * 从革格（金）
 * 润下格（水）
 *
 * @param eightChar 八字
 * @param shishen 十神
 * @returns
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
 * 从弱-从势格
 * @param eightChar 八字
 * @param shishen 十神
 * @returns
 */
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

/**
 * 从弱-从气格
 * @param eightChar 八字
 * @param shishen 十神
 * @returns
 */
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

/**
 * 化气格：5种
 * 甲己合化土格、乙庚合化金格、丙辛合化水格、丁壬合化木格、戊癸合化火格。
 *
 * @param eightChar 八字
 * @param shishen 十神
 * @returns
 */
export const getM5GeHuaqi = (eightChar: EightChar, shishen: Shishen): GeType[] => {
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



/**
 * 其他的特殊格局. eg.魁罡格、金神格
 * @param eightChar
 * @param shishen
 * @returns
 */
export const getM5GeQita = (eightChar: EightChar, shishen: Shishen): GeType[] => {


  const kuigang_ge = getM5GeKuigang(eightChar)
  const jinshen_ge = getM5GeJinshen(eightChar)

  return [...kuigang_ge, ...jinshen_ge]
}


/**
 * 魁罡格
 * @param eightChar
 * @returns
 */
export const getM5GeKuigang = (eightChar: EightChar): GeType[] => {
  // 获取日干和日支
  const riGan = eightChar[3]; // 日干
  const riZhi = eightChar[7]; // 日支

  // 检查日柱组合
  if (riGan === '壬' && riZhi === '辰') {
    return ['水魁罡格'];
  } else if (riGan === '庚' && riZhi === '戌') {
    return ['庚戌金魁罡格'];
  } else if (riGan === '庚' && riZhi === '辰') {
    return ['庚辰金魁罡格'];
  } else if (riGan === '戊' && riZhi === '戌') {
    return ['土魁罡格'];
  }

  // 不满足任何魁罡格条件
  return [];
};

/**
 * 金神格
 * @param eightChar
 * @returns
 */
export const getM5GeJinshen = (eightChar: EightChar): GeType[] => {
  // 提取日柱和时柱信息
  const riGan = eightChar[3]; // 日干
  const riZhi = eightChar[7]; // 日支
  const shiGan = eightChar[4]; // 时干
  const shiZhi = eightChar[8]; // 时支

  // 金神格的三组干支组合
  const jinshenCombinations = new Set([
    '乙丑', // 乙丑日或乙丑时
    '己巳', // 己巳日或己巳时
    '癸酉'  // 癸酉日或癸酉时
  ]);

  // 检查日柱是否为金神格组合
  const riZhu = riGan + riZhi;
  if (jinshenCombinations.has(riZhu)) {
    return ['金神格'];
  }

  // 检查时柱是否为金神格组合
  const shiZhu = shiGan + shiZhi;
  if (jinshenCombinations.has(shiZhu)) {
    return ['金神格'];
  }

  // 不满足金神格条件
  return [];
};
