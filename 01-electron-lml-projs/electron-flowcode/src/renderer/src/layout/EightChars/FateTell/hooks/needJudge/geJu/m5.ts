// 方式5：特殊格局

// 1、【从强】专旺格
// 2、【从弱】从格（弃命从势）
// 3、化气格（略）
// 4、其他（eg. 魁罡格、金神格）


import { EightChar, Shishen } from "@shared/@types/eightChar/eightCharInfo"
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
export const getM5GeCongqi = (eightChar: EightChar, shishen: Shishen): GeType[] => {


  return []
}

/**
 * 化气格（略）
 * @param eightChar 八字
 * @param shishen 十神
 * @returns
 */
export const getM5GeHuaqi = (eightChar: EightChar, shishen: Shishen): GeType[] => {


  return []
}


/**
 * 其他的特殊格局. eg.魁罡格、金神格
 * @param eightChar
 * @param shishen
 * @returns
 */
export const getM5GeQita = (eightChar: EightChar, shishen: Shishen): GeType[] => {


  return []
}

