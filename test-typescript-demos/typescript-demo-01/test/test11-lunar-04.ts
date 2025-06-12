import { EightChar as LTEightChar, Lunar, Solar } from "lunar-typescript";

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


/**
 * 获取八字相关的纳音信息
 * @param eghtCharInfo 八字信息对象
 * @returns 包含各柱纳音信息的对象
 */
const getNaYinInfo = (birthdaySolar: string): NaYin => {
  try {

    // 日期时间字符串
    const datetimeStr = birthdaySolar;

    // 分割日期和时间部分
    const [datePart, timePart] = datetimeStr.split(' ');

    // 分割日期部分
    const [year, month, day] = datePart.split('-').map(Number);

    // 分割时间部分
    const [hour, minute, second] = timePart.split(':').map(Number);

    // 将阳历日期字符串转换为八字实例
    const ec = LTEightChar.fromLunar(
      Lunar.fromSolar(
        Solar.fromYmdHms(year, month, day, hour, minute, second)
      )
    );
    
    // 构建并返回包含各柱纳音信息的对象
    return {
      "年柱": `${ec.getYearGan()}${ec.getYearZhi()} ${ec.getYearNaYin()}`,
      "月柱": `${ec.getMonthGan()}${ec.getMonthZhi()} ${ec.getMonthNaYin()}`,
      "日柱": `${ec.getDayGan()}${ec.getDayZhi()} ${ec.getDayNaYin()}`,
      "时柱": `${ec.getTimeGan()}${ec.getTimeZhi()} ${ec.getTimeNaYin()}`,
      "胎息": `${ec.getTaiXi()} ${ec.getTaiXiNaYin()}`,
      "胎元": `${ec.getTaiYuan()} ${ec.getTaiYuanNaYin()}`,
      "身宫": `${ec.getShenGong()} ${ec.getShenGongNaYin()}`,
      "命宫": `${ec.getMingGong()} ${ec.getMingGongNaYin()}`
    };
  } catch (error) {
    console.error("获取八字纳音信息时出错:", error);
    // 返回默认值或抛出错误
    return {
      "年柱": "",
      "月柱": "",
      "日柱": "",
      "时柱": "",
      "胎息": "",
      "胎元": "",
      "身宫": "",
      "命宫": ""
    };
  }
};

export default getNaYinInfo;


console.log(getNaYinInfo('1990-01-29 00:00:00'))