import { EightChar, Lunar, Solar } from "lunar-typescript";

// 定义状态类型
export type EightCharInfo = {
  gender: string;
  birthdaySolar: string;  // eg. 1990-01-01 00:00:00
  editingIndex: number;
  eightChar: {
    1: string;  // 年干
    2: string;  // 月干
    3: string;  // 日干
    4: string;  // 时干
    5: string;  // 年支
    6: string;  // 月支
    7: string;  // 日支
    8: string;  // 时支
  };
  shishen: {
    tianGanShiShen: string[]; // 显式声明为字符串数组
    dizhiShiShen: string[][];   // 显式声明为字符串数组
  };
  zhangSheng: string[],  // 地支的十二长生
  kongWang: string[],  // 空亡
  daYunLiuNian: string[][],  // 大运流年
};

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

const getNaYinInfo = (eghtCharInfo: EightCharInfo): NaYin => { 

}

// 


// 如下是通过EightChar实例查找纳音和纳音的五行的方式，我想要把逻辑生成在：getNaYinInfo里面。
const ec = EightChar.fromLunar(Lunar.fromSolar(Solar.fromYmdHms(eghtCharInfo.birthdaySolar)));

console.log(ec.getYearNaYin())
console.log(ec.getMonthNaYin())
console.log(ec.getDayNaYin())
console.log(ec.getTimeNaYin())

console.log(ec.getTaiXiNaYin())
console.log(ec.getTaiYuanNaYin())
console.log(ec.getMingGongNaYin())
console.log(ec.getShenGongNaYin())

console.log(ec.getTaiXi())
console.log(ec.getTaiYuan())
console.log(ec.getMingGong())
console.log(ec.getShenGong())


/*
返回的格式如下：

{
"年柱": '甲子 天上火',
"月柱": '甲子 天上火',
"日柱": '甲子 天上火',
"时柱": '甲子 天上火',
"胎息": '甲子 天上火',
"胎元": '甲子 天上火',
"身宫": '甲子 天上火',
"命宫": '甲子 天上火',
}

*/ 






