import { Solar } from 'lunar-typescript';

/**
 * 更新大运流年数据，标记当前年份
 * @param dayunLiunian 原始大运流年数据
 * @param birthdaySolar 阳历出生日期，格式：YYYY-MM-DD HH:mm:ss
 * @returns 更新后的大运流年数据
 */
function updateDayunLiunian(dayunLiunian: string[][], birthdaySolar: string): string[][] {
  // 解析出生日期
  const [datePart, timePart] = birthdaySolar.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = (timePart || '00:00:00').split(':').map(Number);
  
  const birthSolar = Solar.fromYmdHms(year, month, day, hour, minute, second);
  
  // 获取当前日期
  const now = new Date();
  const currentSolar = Solar.fromYmdHms(
    now.getFullYear(), 
    now.getMonth() + 1, 
    now.getDate(), 
    now.getHours(), 
    now.getMinutes(), 
    now.getSeconds()
  );
  
  // 计算从出生到现在的总年数
  let totalYears = currentSolar.getYear() - birthSolar.getYear();
  
  // 如果当前日期还没过生日，减去1年
  if (
    currentSolar.getMonth() < birthSolar.getMonth() || 
    (currentSolar.getMonth() === birthSolar.getMonth() && currentSolar.getDay() < birthSolar.getDay())
  ) {
    totalYears--;
  }
  
  // 遍历大运流年数组，找到对应的位置
  let count = 0;
  let found = false;
  
  const updatedData = dayunLiunian.map((period, periodIndex) => {
    return period.map((ganzhi, ganzhiIndex) => {
      if (!found && count === totalYears) {
        found = true;
        return `* ${ganzhi}`; // 标记当前年份
      }
      count++;
      return ganzhi;
    });
  });
  
  return updatedData;
}

const dayunLiunian: string[][] = [
    [
        "庚午",
        "辛未",
        "壬申",
        "癸酉",
        "甲戌",
        "乙亥",
        "丙子"
    ],
    [
        "丁丑",
        "戊寅",
        "己卯",
        "庚辰",
        "辛巳",
        "壬午",
        "癸未",
        "甲申",
        "乙酉",
        "丙戌"
    ],
    [
        "丁亥",
        "戊子",
        "己丑",
        "庚寅",
        "辛卯",
        "壬辰",
        "癸巳",
        "甲午",
        "乙未",
        "丙申"
    ],
    [
        "丁酉",
        "戊戌",
        "己亥",
        "庚子",
        "辛丑",
        "壬寅",
        "癸卯",
        "甲辰",
        "乙巳",
        "丙午"
    ],
    [
        "丁未",
        "戊申",
        "己酉",
        "庚戌",
        "辛亥",
        "壬子",
        "癸丑",
        "甲寅",
        "乙卯",
        "丙辰"
    ],
    [
        "丁巳",
        "戊午",
        "己未",
        "庚申",
        "辛酉",
        "壬戌",
        "癸亥",
        "甲子",
        "乙丑",
        "丙寅"
    ],
    [
        "丁卯",
        "戊辰",
        "己巳",
        "庚午",
        "辛未",
        "壬申",
        "癸酉",
        "甲戌",
        "乙亥",
        "丙子"
    ],
    [
        "丁丑",
        "戊寅",
        "己卯",
        "庚辰",
        "辛巳",
        "壬午",
        "癸未",
        "甲申",
        "乙酉",
        "丙戌"
    ],
    [
        "丁亥",
        "戊子",
        "己丑",
        "庚寅",
        "辛卯",
        "壬辰",
        "癸巳",
        "甲午",
        "乙未",
        "丙申"
    ],
    [
        "丁酉",
        "戊戌",
        "己亥",
        "庚子",
        "辛丑",
        "壬寅",
        "癸卯",
        "甲辰",
        "乙巳",
        "丙午"
    ],
    [
        "丁未",
        "戊申",
        "己酉",
        "庚戌",
        "辛亥",
        "壬子",
        "癸丑",
        "甲寅",
        "乙卯",
        "丙辰"
    ]
]

// 假设原始数据和生日
const updatedData = updateDayunLiunian(dayunLiunian, "1990-01-01 00:00:00");
console.log(updatedData); // 输出更新后的数据