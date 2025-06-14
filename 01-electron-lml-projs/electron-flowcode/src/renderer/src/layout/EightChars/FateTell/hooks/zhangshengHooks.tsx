import { DaYunItem, EightChar } from "@shared/@types/eightChar/eightCharInfo";

// 计算四柱的十二长生状态（返回数组）
export const calculateECZhangSheng = (eightChar: EightChar ): string[] => {
  const riZhuTianGan = eightChar[3]; // 获取日主

  const ZhangShengOrder = [
    '长生', '沐浴', '冠带', '临官',
    '帝旺', '衰', '病', '死',
    '墓', '绝', '胎', '养'
  ];

  const ZhangShengStart = {
    '甲': '亥', '丙': '寅', '戊': '寅', '庚': '巳', '壬': '申',
    '乙': '午', '丁': '酉', '己': '酉', '辛': '子', '癸': '卯'
  };

  const isYangGan = ['甲', '丙', '戊', '庚', '壬'].includes(riZhuTianGan);
  const startDiZhi = ZhangShengStart[riZhuTianGan];
  const diZhiOrder = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  // 直接返回数组，按年、月、日、时顺序
  return [5, 6, 7, 8].map((position) => {
    const diZhi = eightChar[position];
    const startIndex = diZhiOrder.indexOf(startDiZhi);
    const currentIndex = diZhiOrder.indexOf(diZhi);

    const offset = isYangGan
      ? (currentIndex - startIndex + 12) % 12
      : (startIndex - currentIndex + 12) % 12;

    return ZhangShengOrder[offset];
  });
};

/**
 * 计算单个地支相对于日元的十二长生状态
 * @param tianGan 日元天干（甲、乙、丙、丁、戊、己、庚、辛、壬、癸）
 * @param diZhi 地支（子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥）
 * @returns 对应的十二长生状态（长生、沐浴、冠带等）
 */
export const getTianGanDiZhiZhangSheng = (tianGan: string, diZhi: string): string => {
  // 十二长生顺序列表
  const zhangShengOrder = [
    '长生', '沐浴', '冠带', '临官',
    '帝旺', '衰', '病', '死',
    '墓', '绝', '胎', '养'
  ];

  // 天干对应的起始地支（阳干顺行，阴干逆行）
  const zhangShengStart: Record<string, string> = {
    '甲': '亥', '丙': '寅', '戊': '寅', '庚': '巳', '壬': '申',
    '乙': '午', '丁': '酉', '己': '酉', '辛': '子', '癸': '卯'
  };

  // 地支顺序列表
  const diZhiOrder = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  // 检查输入有效性
  if (!zhangShengStart.hasOwnProperty(tianGan) || !diZhiOrder.includes(diZhi)) {
    throw new Error(`无效的天干或地支: 天干=${tianGan}, 地支=${diZhi}`);
  }

  // 判断天干是阳干还是阴干
  const isYangGan = ['甲', '丙', '戊', '庚', '壬'].includes(tianGan);

  // 获取该天干的起始地支
  const startDiZhi = zhangShengStart[tianGan];

  // 计算起始地支和当前地支在地支顺序中的索引
  const startIndex = diZhiOrder.indexOf(startDiZhi);
  const currentIndex = diZhiOrder.indexOf(diZhi);

  // 计算偏移量（阳干顺行，阴干逆行）
  const offset = isYangGan
    ? (currentIndex - startIndex + 12) % 12  // 阳干：顺行计算
    : (startIndex - currentIndex + 12) % 12; // 阴干：逆行计算

  // 返回对应的十二长生状态
  return zhangShengOrder[offset];
};

/**
 * 将十二长生阶段名称转换为对应的数值和趋势标识
 * @param {string} stage - 十二长生阶段名称（如："长生", "沐浴"等）
 * @returns {string} - 转换后的结果（如："长生2↑", "衰4↓"等）
 */
export function convertZhangShengStage(stage) {
  const stageValues = {
    '胎': '胎0↑',
    '养': '养1↑',
    '长生': '长生2↑',
    '沐浴': '沐浴3↑',
    '冠带': '冠带4↑',
    '临官': '临官5↑',
    '帝旺': '帝旺6',
    '衰': '衰4↓',
    '病': '病3↓',
    '死': '死2↓',
    '墓': '墓1↓',
    '绝': '绝0'
  };

  return stageValues[stage] || `未知阶段: ${stage}`;
}

/**
 * 计算大运名称的十二长生状态（每个大运对应一个长生字）
 * @param dayunLiunians 大运流年数组
 * @param eightChar 八字信息
 * @returns 包含每个大运名称十二长生状态的数组
 */
export const calculateDayunNameZhangSheng = (
  dayunLiunians: DaYunItem[],
  eightChar: EightChar
): string[] => {
  // 获取日元（日干）
  const riYuan = eightChar[3];

  // 计算结果数组
  return dayunLiunians.map(dayun => {
    let tianGan: string, diZhi: string;

    // 处理大运名称
    if (dayun.dayunName === '运前') {
      // 运前使用月柱的天干和地支
      //tianGan = eightChar[2]; // 月干
      diZhi = eightChar[6];   // 月支
    } else {
      // 正常大运名称（如"癸巳"），分解为天干和地支
      //tianGan = dayun.dayunName.charAt(0);
      diZhi = dayun.dayunName.charAt(1);
    }

    // 计算并返回十二长生状态
    return getTianGanDiZhiZhangSheng(riYuan, diZhi);
  });
};
