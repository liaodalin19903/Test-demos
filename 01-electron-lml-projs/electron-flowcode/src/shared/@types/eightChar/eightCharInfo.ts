import { GeType } from "./geju";

export type NaYin = {
  "年柱": string,
  "月柱": string,
  "日柱": string,
  "时柱": string,
  "胎息": string,
  "胎元": string,
  "身宫": string,
  "命宫": string,
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


/**
 * eg.
 * {
 *   tianGanShiShen: ['正财', '伤官', '日元', '比肩'],
 *   dizhiShiShen: [...]
 * }
 */
export type Shishen = {
  tianGanShiShen: string[],  // 天干十神
  dizhiShiShen: string[][]   // 地支藏干十神
}

// 定义状态类型
export type EightCharInfo = {
  gender: string;
  birthdaySolar: string;  // eg. 1990-01-01 00:00:00
  editingIndex: number;
  eightChar: EightChar;
  canggan: string[][]; // 地支藏干
  shishen: Shishen; // 十神
  zhangSheng: string[],  // 地支的十二长生
  kongWang: string[],  // 空亡
  dayunLiunians: DaYunItem[],  // 大运流年
  shenqiangruo: number | undefined,  // 身强身弱
  geju: {
    recommend: {  // 程序推荐格局
      m1: GeType[];
      m2: GeType[];
      m3: GeType[];
      m4: GeType[];
      m5_1: GeType[]; // 专旺
      m5_2: GeType[]; // 从弱-从势
      m5_3: GeType[]; // 从弱-从气
      m5_4: GeType[]; // 从化
      m5_5: GeType[]; // 特殊格局
    }
    selected: GeType[]  // 我们选择的格局
  };
};

  // 定义大运流年数据结构
export interface DaYunItem {
    dayunName: string;
    liunians: LiuNianItem[];
  }

export interface LiuNianItem {
    liunianYear: number;
    liunianGanzhi: string;
  }



// 五行与地支对应关系
export const WUXING_DIZHI: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 三合局配置
export const SANHE_JU: Record<string, string[]> = {
  '火': ['寅', '午', '戌'],
  '水': ['申', '子', '辰'],
  '木': ['亥', '卯', '未'],
  '金': ['巳', '酉', '丑'],
  '土': ['辰', '戌', '丑', '未'] // 四库土
};

// 三会局配置
export const SANHUI_JU: Record<string, string[]> = {
  '火': ['巳', '午', '未'],
  '水': ['亥', '子', '丑'],
  '木': ['寅', '卯', '辰'],
  '金': ['申', '酉', '戌']
};

// 辅助函数：根据天干获取五行
export const getWuXingByTianGan = (tianGan: string): string => {
  const map: Record<string, string> = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
  };
  return map[tianGan] || '';
};
