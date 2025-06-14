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



/**
 * 计算天干地支组合的纳音
 * @param tianGan 天干
 * @param diZhi 地支
 * @returns 对应的纳音
 */
export const getNaYin = (tianGan: string, diZhi: string): string => {
  // 六十甲子纳音表（简化版）
  const naYinTable: Record<string, string> = {
    // 甲子旬
    "甲子": "海中金", "乙丑": "海中金", "丙寅": "炉中火", "丁卯": "炉中火", 
    "戊辰": "大林木", "己巳": "大林木", "庚午": "路旁土", "辛未": "路旁土", 
    "壬申": "剑锋金", "癸酉": "剑锋金",
    
    // 甲戌旬
    "甲戌": "山头火", "乙亥": "山头火", "丙子": "涧下水", "丁丑": "涧下水", 
    "戊寅": "城头土", "己卯": "城头土", "庚辰": "白蜡金", "辛巳": "白蜡金", 
    "壬午": "杨柳木", "癸未": "杨柳木",
    
    // 甲申旬
    "甲申": "泉中水", "乙酉": "泉中水", "丙戌": "屋上土", "丁亥": "屋上土", 
    "戊子": "霹雳火", "己丑": "霹雳火", "庚寅": "松柏木", "辛卯": "松柏木", 
    "壬辰": "长流水", "癸巳": "长流水",
    
    // 甲午旬
    "甲午": "沙中金", "乙未": "沙中金", "丙申": "山下火", "丁酉": "山下火", 
    "戊戌": "平地木", "己亥": "平地木", "庚子": "壁上土", "辛丑": "壁上土", 
    "壬寅": "金箔金", "癸卯": "金箔金",
    
    // 甲辰旬
    "甲辰": "覆灯火", "乙巳": "覆灯火", "丙午": "天河水", "丁未": "天河水", 
    "戊申": "大驿土", "己酉": "大驿土", "庚戌": "钗钏金", "辛亥": "钗钏金", 
    "壬子": "桑柘木", "癸丑": "桑柘木",
    
    // 甲寅旬
    "甲寅": "大溪水", "乙卯": "大溪水", "丙辰": "沙中土", "丁巳": "沙中土", 
    "戊午": "天上火", "己未": "天上火", "庚申": "石榴木", "辛酉": "石榴木", 
    "壬戌": "大海水", "癸亥": "大海水",
  };
  
  return naYinTable[tianGan + diZhi] || "未知纳音";
};

/**
 * 计算大运名称的纳音（每个大运对应一个纳音）
 * @param dayunLiunians 大运流年数组
 * @param eightChar 八字信息
 * @returns 包含每个大运名称纳音的数组
 */
export const calculateDayunNameNaYin = (
  dayunLiunians: DaYunItem[], 
  eightChar: EightChar
): string[] => {
  // 计算结果数组
  return dayunLiunians.map(dayun => {
    let tianGan: string, diZhi: string;
    
    // 处理大运名称
    if (dayun.dayunName === '运前') {
      // 运前使用月柱的天干和地支
      tianGan = eightChar[2]; // 月干
      diZhi = eightChar[6];   // 月支
    } else {
      // 正常大运名称（如"癸巳"），分解为天干和地支
      tianGan = dayun.dayunName.charAt(0);
      diZhi = dayun.dayunName.charAt(1);
    }
    
    // 计算并返回纳音
    return getNaYin(tianGan, diZhi);
  });
};

const dayunLiunians: DaYunItem[] = [
  {
    "dayunName": "运前",
    "liunians": []
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

const eightChar = {
  1: '己',
  2: '丁',
  3: '甲',
  4: '甲',
  5: '巳',
  6: '丑',
  7: '午',
  8: '子' 
}


// 使用示例
const results = calculateDayunNameNaYin(dayunLiunians, eightChar);
console.log("大运名称的纳音:", results);
// 输出示例: ['长流水', '沙中金', '山下火', ...]（共11个）