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
 * 生成大运年龄数组（实岁）
 * @param dayunLiunians 大运流年数组
 * @returns 包含11个年龄的数组
 */
export const getDayunAges = (dayunLiunians: DaYunItem[]): number[] => {
  if (dayunLiunians.length !== 11) {
    throw new Error("大运数组长度必须为11");
  }

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

// 使用示例
const ages = getDayunAges(dayunLiunians);
console.log("大运年龄数组:", ages);
// 输出示例: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]