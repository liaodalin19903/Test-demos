
// 大运流年 

import { EightChar, Lunar, Solar } from "lunar-typescript";


const s1 = Solar.fromBaZi('己巳', '丁丑', '甲午', '甲子', 1, 1800).at(-1)

const bazi = EightChar.fromLunar(Lunar.fromSolar(s1!))

const yun = bazi.getYun(1,2)
console.log(yun.getStartYear(), yun.getStartMonth(), yun.getStartDay(), yun.getStartHour())

//console.log(yun.getDaYun()[0].getLiuNian()[0].getGanZhi())
//console.log(yun.getDaYun()[0].getGanZhi())

//console.log(yun.getDaYun()[9].getLiuNian().length)

console.log(yun.getDaYun(11)[0].getGanZhi())