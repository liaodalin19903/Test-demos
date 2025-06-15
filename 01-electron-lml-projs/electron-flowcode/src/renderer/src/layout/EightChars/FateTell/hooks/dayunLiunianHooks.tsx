// 大运流年
import { JSX, useEffect, useState } from "react";

import { EightCharInfo, DaYunItem, LiuNianItem } from "@shared/@types/eightChar/eightCharInfo";
import { EightChar, EightChar as LTEightChar, Lunar, Solar } from "lunar-typescript";
import { getTianGanDiZhiZhangSheng, calculateDayunNameZhangSheng } from "./zhangshengHooks"
import { calculateDayunNameNaYin } from "./nayinHooks";
import { calculateDayunNameShiShen } from "./shishenHooks";


let dayunLiunians: DaYunItem[] = []

export const getDayunLiunian = (eightCharInfo: EightCharInfo): DaYunItem[] => {

  //console.log('eightCharInfo.birthdaySolar: ', eightCharInfo.birthdaySolar)

  // 做出ec实例
  const eightChar = new LTEightChar(Lunar.fromSolar(Solar.fromDate(new Date(eightCharInfo.birthdaySolar))))

  const yun = eightChar.getYun(eightCharInfo.gender === '女' ? 0 : 1, 1)  // 八字排盘宝使用的是流派2

  // 修改原代码，添加类型注解
  const daYunItems: DaYunItem[] = []; // 显式定义数组类型

  yun.getDaYun(11).forEach(dayun => {
    let dayunLiunianItem: DaYunItem = { // 显式指定对象类型
      "dayunName": dayun.getGanZhi() === '' ? '运前' : dayun.getGanZhi(),
      "liunians": [] // 这里会被正确推断为LiuNianItem[]
    }

    //console.log('dayun.getLiuNian(): ', dayun.getLiuNian())

    dayun.getLiuNian().forEach(liunian => {
      //console.log('liunian.getGanZhi(): ', liunian.getGanZhi(), liunian.getYear())
      dayunLiunianItem.liunians.push({
        "liunianYear": liunian.getYear(),
        "liunianGanzhi": liunian.getGanZhi(),
      })
    })

    daYunItems.push(dayunLiunianItem); // 将处理好的大运添加到结果数组

  })

  return daYunItems
}

export const getZhangshengs = (eightCharInfo: EightCharInfo): string[] => {

  dayunLiunians = getDayunLiunian(eightCharInfo)

  // 获得12长生（11个）
  const dayunZhangsheng: string[] = calculateDayunNameZhangSheng(dayunLiunians, eightCharInfo.eightChar)
  return dayunZhangsheng
}

export const getNayins = (eightCharInfo: EightCharInfo): string[] => {
  const dayunNayin: string[] = calculateDayunNameNaYin(dayunLiunians, eightCharInfo.eightChar)
  return dayunNayin
}

export const getShishens = (eightCharInfo: EightCharInfo): string[] => {
  const shishen: string[] = calculateDayunNameShiShen(dayunLiunians, eightCharInfo.eightChar)
  return shishen
}

export const getDayuns = (): string[] => {
  if (!dayunLiunians || dayunLiunians.length === 0) {
    return [];
  }
  return dayunLiunians.map(item => item.dayunName);
}

// 获取实岁
/**
 * 生成大运年龄数组（实岁）
 * @param dayunLiunians 大运流年数组
 * @returns 包含11个年龄的数组
 */
export const getDayunAges = (): number[] => {


  const ages: number[] = [0]; // 第一个年龄固定为0

  // 计算第二个年龄
  const secondAge = 0 + dayunLiunians[0].liunians.length;
  ages.push(secondAge);

  // 计算剩余9个年龄（从第三个开始，每个增加10）
  for (let i = 2; i < 11; i++) {
    const prevAge = ages[i - 1];
    ages.push(prevAge + 10);
  }

  return ages;
};

/**
 * 生成大运年份数组
 * @param birthdaySolar 阳历生日字符串（格式：YYYY-MM-DD HH:MM:SS）
 * @param dayunLiunians 大运流年数组
 * @returns 包含11个年份的数组
 */
export const getDayunYears = (eightCharInfo: EightCharInfo): number[] => {
  const birthdaySolar = eightCharInfo.birthdaySolar

  if (dayunLiunians.length !== 11) {
    throw new Error("大运数组长度必须为11");
  }

  // 从生日字符串中提取年份
  const birthYear = parseInt(birthdaySolar.split('-')[0], 10);
  if (isNaN(birthYear)) {
    throw new Error("生日格式不正确，无法提取年份");
  }

  const years: number[] = [birthYear]; // 第一个年份是出生年份

  // 计算第二个年份
  const secondYear = birthYear + dayunLiunians[0].liunians.length;
  years.push(secondYear);

  // 计算剩余9个年份（从第三个开始，每个增加10）
  for (let i = 2; i < 11; i++) {
    const prevYear = years[i - 1];
    years.push(prevYear + 10);
  }

  return years;
};

/**
 * 提取所有大运下每个流年的干支信息
 * @param dayunLiunians 大运流年数组
 * @returns 嵌套数组，每个子数组包含对应大运的所有流年干支
 */
export const getLiunianGanzhis = (): string[][] => {

  return dayunLiunians.map(dayun => {
    // 提取当前大运下所有流年的干支信息
    return dayun.liunians.map(liunian => liunian.liunianGanzhi);
  });
};






