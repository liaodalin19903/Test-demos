  // 定义大运流年数据结构
export interface DaYunItem {
    dayunName: string;
    liunians: LiuNianItem[];
  }

export interface LiuNianItem {
    liunianYear: number;
    liunianGanzhi: string;
  }


/**
 * 提取所有大运下每个流年的干支信息
 * @param dayunLiunians 大运流年数组
 * @returns 嵌套数组，每个子数组包含对应大运的所有流年干支
 */
export const extractLiunianGanzhi = (dayunLiunians: DaYunItem[]): string[][] => {
  return dayunLiunians.map(dayun => {
    // 提取当前大运下所有流年的干支信息
    return dayun.liunians.map(liunian => liunian.liunianGanzhi);
  });
};

const dayunLiunians: DaYunItem[] = [
  {
    "dayunName": "运前",
    "liunians": [
      {
        liunianYear: 0,
        liunianGanzhi: "己巳"
      },
      {
        liunianYear: 0,
        liunianGanzhi: "庚午"
      },
      {
        liunianYear: 0,
        liunianGanzhi: "辛未"
      },
      {
        liunianYear: 0,
        liunianGanzhi: "壬申"
      },
      {
        liunianYear: 0,
        liunianGanzhi: "癸酉"
      },
      {
        liunianYear: 0,
        liunianGanzhi: "甲戌"
      },
      {
        liunianYear: 0,
        liunianGanzhi: "乙亥"
      },
      {
        liunianYear: 0,
        liunianGanzhi: "丙子"
      },
    ]
  },
    {
    "dayunName": "丙子",
    "liunians": [
      {
        liunianYear: 0,
        liunianGanzhi: "丁丑"
      },
      {
        liunianYear: 0,
        liunianGanzhi: "戊寅"
      }
    ]
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
    "liunians": [
      {
        liunianYear: 0,
        liunianGanzhi: "丁未"
      }
    ]
  },

] 


// 使用示例
const liunianGanzhiList = extractLiunianGanzhi(dayunLiunians);
console.log("所有流年的干支信息:", liunianGanzhiList);
// 输出示例:
// [
//   ['己巳', '庚午', '辛未', '壬申', '癸酉', '甲戌', '乙亥', '丙子', '丁丑', '戊寅'], 
//   ['丁丑', '戊寅', '己卯', '庚辰', '辛巳', '壬午', '癸未', '甲申', '乙酉', '丙戌'],
//   // ... 其他大运的流年干支
// ]