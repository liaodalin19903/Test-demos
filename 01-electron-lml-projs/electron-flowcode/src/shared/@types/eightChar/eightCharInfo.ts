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
  shishen: Shishen; // 十神
  zhangSheng: string[],  // 地支的十二长生
  kongWang: string[],  // 空亡
  dayunLiunians: DaYunItem[],  // 大运流年
  shenqiangruo: number | undefined,  // 身强身弱
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
