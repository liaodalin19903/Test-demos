import { DaYunItem, EightChar } from "@shared/@types/eightChar/eightCharInfo";

/**
 * 获取天干相对于日主的十神
 * @param riZhuTianGan 日主天干
 * @param targetTianGan 目标天干
 * @returns 对应的十神名称
 */
export const getShiShen = (riZhuTianGan: string, targetTianGan: string): string => {
  // 十天干阴阳属性
  const yinYangMap: Record<string, boolean> = {
    '甲': true, '乙': false, '丙': true, '丁': false,
    '戊': true, '己': false, '庚': true, '辛': false,
    '壬': true, '癸': false
  };

  // 天干五行属性
  const wuXingMap: Record<string, string> = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火',
    '戊': '土', '己': '土', '庚': '金', '辛': '金',
    '壬': '水', '癸': '水'
  };

  // 五行相生关系
  const shengMap: Record<string, string> = {
    '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
  };

  // 日主天干的阴阳和五行
  const riZhuIsYang = yinYangMap[riZhuTianGan];
  const riZhuWuXing = wuXingMap[riZhuTianGan];

  // 目标天干的阴阳和五行
  const targetIsYang = yinYangMap[targetTianGan];
  const targetWuXing = wuXingMap[targetTianGan];

  // 十神关系计算逻辑
  if (riZhuWuXing === targetWuXing) {
    // 比劫
    return riZhuIsYang === targetIsYang ? '比肩' : '劫财';
  } else if (shengMap[riZhuWuXing] === targetWuXing) {
    // 食伤
    return riZhuIsYang === targetIsYang ? '食神' : '伤官';
  } else if (shengMap[targetWuXing] === riZhuWuXing) {
    // 印绶
    return riZhuIsYang === targetIsYang ? '偏印' : '正印';
  } else if (
    (riZhuIsYang && targetIsYang) ||
    (!riZhuIsYang && !targetIsYang)
  ) {
    // 七杀、偏财
    return riZhuWuXing === '土' && targetWuXing === '水'
      ? '偏财'  // 土日主见水（阳土见阳水为偏财）
      : '七杀'; // 其他阴阳相同的克关系为七杀
  } else {
    // 正官、正财
    return riZhuWuXing === '土' && targetWuXing === '水'
      ? '正财'  // 土日主见水（阴土见阴水为正财）
      : '正官'; // 其他阴阳不同的克关系为正官
  }
};

/**
 * 计算大运名称的十神（每个大运对应一个十神）
 * @param dayunLiunians 大运流年数组
 * @param eightChar 八字信息
 * @returns 包含每个大运名称十神的数组
 */
export const calculateDayunNameShiShen = (
  dayunLiunians: DaYunItem[],
  eightChar: EightChar
): string[] => {
  // 获取日元（日干）
  const riYuan = eightChar[3];

  // 遍历每个大运，计算其十神
  return dayunLiunians.map(dayun => {
    let targetTianGan: string;

    // 处理大运名称
    if (dayun.dayunName === '运前') {
      // 运前使用月柱的天干
      targetTianGan = eightChar[2]; // 月干
    } else {
      // 正常大运名称（如"癸巳"），取第一个字符作为天干
      targetTianGan = dayun.dayunName.charAt(0);
    }

    // 使用提供的 getShiShen 方法计算十神
    return getShiShen(riYuan, targetTianGan);
  });
};
