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
  
  // 五行相克关系（克者 → 被克者）
  const keMap: Record<string, string> = {
    '金': '木', '木': '土', '土': '水', '水': '火', '火': '金'
  };

  // 日主天干的阴阳和五行
  const riZhuIsYang = yinYangMap[riZhuTianGan];
  const riZhuWuXing = wuXingMap[riZhuTianGan];

  // 目标天干的阴阳和五行
  const targetIsYang = yinYangMap[targetTianGan];
  const targetWuXing = wuXingMap[targetTianGan];

  // 1. 同五行关系（比劫）
  if (riZhuWuXing === targetWuXing) {
    return riZhuIsYang === targetIsYang ? '比肩' : '劫财';
  } 
  // 2. 相生关系（食伤/印绶）
  else if (shengMap[riZhuWuXing] === targetWuXing) {
    return riZhuIsYang === targetIsYang ? '食神' : '伤官';
  } 
  else if (shengMap[targetWuXing] === riZhuWuXing) {
    return riZhuIsYang === targetIsYang ? '偏印' : '正印';
  } 
  // 3. 相克关系（分我克/克我两种情况）
  else {
    // 3.1 日主克目标（我克者 → 财星）
    if (keMap[riZhuWuXing] === targetWuXing) {
      return riZhuIsYang === targetIsYang ? '偏财' : '正财';
    } 
    // 3.2 目标克日主（克我者 → 官杀）
    else if (keMap[targetWuXing] === riZhuWuXing) {
      return riZhuIsYang === targetIsYang ? '七杀' : '正官';
    }
  }
  
  // 理论上不会执行到这里（五行关系完备）
  return '未知';
};

// 测试用例
const result1 = getShiShen('甲', '己'); // 阳木克阴土 → 正财
const result2 = getShiShen('甲', '戊'); // 阳木克阳土 → 偏财
const result3 = getShiShen('甲', '庚'); // 阳金克阳木 → 七杀
const result4 = getShiShen('甲', '辛'); // 阴金克阳木 → 正官

console.log(result1, result2, result3, result4); // 输出: 正财 偏财 七杀 正官