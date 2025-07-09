import { TiaohouReasonType } from './../../../../../../../../shared/@types/eightChar/eightCharInfo';
// 调候用神

import { EightChar, TianganDizhiChar, TiaohouReasonType, TiaohouYongshenJishenType, WuxingPercentage } from "@shared/@types/eightChar/eightCharInfo";
import { getDizhiSanhe, getDizhiXiangchong } from "../../tianganDizhiRoles/role2xingchonghehui";
import { getWuxingPercentage } from "../../tianganDizhiRoles/utils";

// 判断八字的：寒热燥湿
export const getEightCharHanReZaoShi = (eightChar: EightChar): TiaohouReasonType[] => {
  const results: TiaohouReasonType[] = [];
  const yuezhi = eightChar[6]; // 月支
  const wuxing: WuxingPercentage = getWuxingPercentage(eightChar);

  // 1. 判断寒热（基于月令和五行比例）
  const winterMonths = ['亥', '子', '丑']; // 冬季月份
  const summerMonths = ['巳', '午', '未']; // 夏季月份

  if (winterMonths.includes(yuezhi)) {
    if (wuxing['火'] < 0.1) results.push('寒'); // 冬季火弱则寒
  } else if (summerMonths.includes(yuezhi)) {
    if (wuxing['水'] < 0.1) results.push('热'); // 夏季水弱则热
  }

  // 2. 判断燥湿（基于月令和五行比例）
  const dryEarthMonths = ['戌', '未']; // 燥土月
  const wetEarthMonths = ['辰', '丑']; // 湿土月
  const waterMonths = ['亥', '子'];   // 水月

  // 燥土月且水弱 -> 燥
  if (dryEarthMonths.includes(yuezhi) && wuxing['水'] < 0.1) {
    results.push('燥');
  }
  // 湿土月且火弱 -> 湿
  else if (wetEarthMonths.includes(yuezhi) && wuxing['火'] < 0.1) {
    results.push('湿');
  }

  // 水月且土弱水旺 -> 湿
  if (waterMonths.includes(yuezhi) && wuxing['土'] < 0.1 && wuxing['水'] > 0.3) {
    results.push('湿');
  }

  // 3. 特殊局判断（三合局/相冲）
  const sanhe = getDizhiSanhe(eightChar);
  const dizhiChong = getDizhiXiangchong(eightChar);

  // 三合水局加强寒/湿
  if (sanhe.includes('申子辰')) {
    if (wuxing['火'] < 0.15 && !results.includes('寒')) results.push('寒');
    if (wuxing['土'] < 0.15 && !results.includes('湿')) results.push('湿');
  }
  // 三合火局加强热/燥
  if (sanhe.includes('寅午戌')) {
    if (wuxing['水'] < 0.15 && !results.includes('热')) results.push('热');
    if (wuxing['水'] < 0.15 && !results.includes('燥')) results.push('燥');
  }

  // 水火冲缓解寒热
  if (dizhiChong.some(chong => ['子午', '巳亥'].includes(chong))) {
    if (results.includes('寒') && wuxing['火'] > 0.15) {
      results.splice(results.indexOf('寒'), 1);
    }
    if (results.includes('热') && wuxing['水'] > 0.15) {
      results.splice(results.indexOf('热'), 1);
    }
  }

  return Array.from(new Set(results)); // 去重后返回
};


/**
 * 获取调候的用神
 * @param reason
 * @returns
 *
 * {
 *   firstYongshen: ['丁', '丙'],  // 首用神
 *   secondYongshen: [],  // 次用神
 *   jishen: ['亥'] // 忌神
 * }
 *
 */
export const getHanReZaoShiYongshenJishen = (
  reason: TiaohouReasonType
): TiaohouYongshenJishenType => {
  // 定义五行对应的天干地支
  const HUO: TianganDizhiChar[] = ['丙', '丁', '巳', '午'];       // 火
  const MU: TianganDizhiChar[] = ['甲', '乙', '寅', '卯'];       // 木
  const SHUI: TianganDizhiChar[] = ['壬', '癸', '亥', '子'];     // 水
  const JIN: TianganDizhiChar[] = ['庚', '辛', '申', '酉'];      // 金
  const ZAOTU: TianganDizhiChar[] = ['未', '戌'];               // 燥土
  const SHITU: TianganDizhiChar[] = ['辰', '丑'];               // 湿土（忌神用）

  // 根据调候原因返回不同的用神组合
  switch(reason) {
    case '寒':
      // 寒局：首取火，次取木生火
      return {
        firstYongshen: HUO,
        secondYongshen: MU,
        jishen: [...SHUI, ...SHITU]  // 忌水增寒、湿土晦火
      };

    case '热':
      // 热局：首取水，次取金生水
      return {
        firstYongshen: SHUI,
        secondYongshen: JIN,
        jishen: [...HUO, ...ZAOTU]  // 忌火增热、燥土耗水
      };

    case '燥':
      // 燥局：需水润局，忌火土
      return {
        firstYongshen: SHUI,
        secondYongshen: [],          // 燥局无第二用神
        jishen: [...HUO, ...ZAOTU, ...SHITU]  // 忌所有火土
      };

    case '湿':
      // 湿局：需火暖局与燥土吸湿
      return {
        firstYongshen: HUO,
        secondYongshen: ZAOTU,
        jishen: [...SHUI, ...JIN, ...SHITU]  // 忌金水助湿
      };

    default:
      // 默认返回空值
      return {
        firstYongshen: [],
        secondYongshen: [],
        jishen: []
      };
  }
};


export type EightCharHanReZaoShiYongshenType = {TiaohouReasonType: }[]


// 1. 定义单个调候项类型
export type TiaohouItem = {
  yongshen: TianganDizhiChar[];
  jishen: TianganDizhiChar[];
};

// 2. 创建映射类型
export type TiaohouYongshenMap = {
  [K in TiaohouReasonType]: TiaohouItem;
};

/**
 * 获取八字的：寒热燥湿的用神
 * @param eightchar
 */
export const getEightCharHanReZaoShiYongshen = (
  eightchar: EightChar
): Partial<TiaohouYongshenMap> => {
  // 初始化空结果对象
  const yongshenJishen: Partial<TiaohouYongshenMap> = {};

  // 获取调候原因
  const reasons = getEightCharHanReZaoShi(eightchar);

  // 只处理实际存在的调候原因
  reasons.forEach(reason => {
    const { firstYongshen, secondYongshen, jishen } =
      getHanReZaoShiYongshenJishen(reason);

    yongshenJishen[reason] = {
      yongshen: [...firstYongshen, ...secondYongshen],
      jishen
    };
  });

  return yongshenJishen;
};
