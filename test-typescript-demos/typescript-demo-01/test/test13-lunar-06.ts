import { Solar, Lunar, EightChar } from "lunar-typescript";

// const ec: EightChar = EightChar.fromLunar(new Lunar(2023, 1, 1, 1, 1, 1))

//const s1 = Solar.fromBaZi('己巳', '丁丑', '甲午', '甲子', 1, 1800)

//console.log(s1)


const s2 = Solar.fromBaZi('辛未', '甲午', '辛未', '丁酉', 2, 1800)

console.log(s2[1].toYmdHms())

// const bazi = EightChar.fromLunar(Lunar.fromSolar(s2[1]))
// console.log(bazi.getTimeGan(), bazi.getTimeZhi())
