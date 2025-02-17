// test.ts
import {Solar, EightChar} from 'lunar-typescript';
// import {Solar, Lunar, HolidayUtil} from 'lunar-typescript';
 
//const solar = Solar.fromYmd(1986, 5, 29);


const date = new Date('1990-01-29 00:00:01')
console.log('date: ', date)

const solar = Solar.fromDate(date);

const ec = EightChar.fromLunar(solar.getLunar());
ec.setSect(1)

console.log('eightChar: ', ec.getYear(), ec.getMonth(), ec.getDay(), ec.getTime())

//console.log('大运:', ec.getYun(1, 1))


console.log('大运:', ec.getYun(1, 2).getDaYun())


console.log(
  '起运:', 
  ec.getYun(1, 1).getStartYear(),
  ec.getYun(1, 1).getStartMonth(), 
  ec.getYun(1, 1).getStartDay(),
  ec.getYun(1, 1).getStartHour())

console.log('起运的阳历: ', ec.getYun(1,1).getStartSolar())
