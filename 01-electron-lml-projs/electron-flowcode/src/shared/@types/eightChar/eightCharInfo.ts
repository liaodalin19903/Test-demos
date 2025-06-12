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
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
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
  daYunLiuNian: string[][],  // 大运流年
};
