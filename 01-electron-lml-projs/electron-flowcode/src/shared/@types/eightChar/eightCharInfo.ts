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

// 定义状态类型
export type EightCharInfo = {
  gender: string;
  birthdaySolar: string;  // eg. 1990-01-01 00:00:00
  editingIndex: number;
  eightChar: EightChar;
  shishen: {
    tianGanShiShen: string[]; // 显式声明为字符串数组
    dizhiShiShen: string[][];   // 显式声明为字符串数组
  };
  zhangSheng: string[],  // 地支的十二长生
  kongWang: string[],  // 空亡
  dayunLiunians: DaYunItem[],  // 大运流年
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
