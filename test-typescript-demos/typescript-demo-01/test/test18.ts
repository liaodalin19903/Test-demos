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

  // 定义大运流年数据结构
export interface DaYunItem {
    dayunName: string;
    liunians: LiuNianItem[];
  }

export interface LiuNianItem {
    liunianYear: number;
    liunianGanzhi: string;
  }

const dayunLiunians: DaYunItem[] = [
  {
    "dayunName": "运前",
    "liunians": [
      {
        liunianYear: 0,
        liunianGanzhi: ""
      },
      {
        liunianYear: 0,
        liunianGanzhi: ""
      },
      {
        liunianYear: 0,
        liunianGanzhi: ""
      },
      {
        liunianYear: 0,
        liunianGanzhi: ""
      },
      {
        liunianYear: 0,
        liunianGanzhi: ""
      },
      {
        liunianYear: 0,
        liunianGanzhi: ""
      },
      {
        liunianYear: 0,
        liunianGanzhi: ""
      },
      {
        liunianYear: 0,
        liunianGanzhi: ""
      },
    ]
  },
    {
    "dayunName": "丙子",
    "liunians": []
  },
    {
    "dayunName": "乙亥",
    "liunians": []
  },
    {
    "dayunName": "甲戌",
    "liunians": []
  },
    {
    "dayunName": "癸酉",
    "liunians": []
  },
    {
    "dayunName": "壬申",
    "liunians": []
  },
    {
    "dayunName": "辛未",
    "liunians": []
  },
    {
    "dayunName": "庚午",
    "liunians": []
  },
    {
    "dayunName": "己巳",
    "liunians": []
  },
    {
    "dayunName": "戊辰",
    "liunians": []
  },
   {
    "dayunName": "丁卯",
    "liunians": []
  },

] 


/**
 * 生成大运年份数组
 * @param birthdaySolar 阳历生日字符串（格式：YYYY-MM-DD HH:MM:SS）
 * @param dayunLiunians 大运流年数组
 * @returns 包含11个年份的数组
 */
export const getDayunYears = (birthdaySolar: string, dayunLiunians: DaYunItem[]): number[] => {
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

// 使用示例
const birthday = "1990-01-01 00:00:00";
const years = getDayunYears(birthday, dayunLiunians);
console.log("大运年份数组:", years);
// 输出示例: [1990, 2000, 2010, 2020, 2030, 2040, 2050, 2060, 2070, 2080, 2090]

