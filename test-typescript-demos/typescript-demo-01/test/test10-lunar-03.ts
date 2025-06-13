import { Solar } from 'lunar-typescript'; // 假设这是你使用的农历转换库

// 定义五行元素类型
type Element = '甲' | '乙' | '丙' | '丁' | '戊' | '己' | '庚' | '辛' | '壬' | '癸';

// 定义月令类型
type Month = '寅' | '卯' | '辰' | '巳' | '午' | '未' | '申' | '酉' | '戌' | '亥' | '子' | '丑';

// 定义司令配置
interface SilingConfig {
  element: Element;
  days: number;
}

// 定义月令司令配置
const SILING_CONFIG: Record<Month, SilingConfig[]> = {
  '寅': [
    { element: '戊', days: 7 },
    { element: '丙', days: 7 },
    { element: '甲', days: 16 }
  ],
  '卯': [
    { element: '甲', days: 10 },
    { element: '乙', days: 20 }
  ],
  '辰': [
    { element: '乙', days: 9 },
    { element: '癸', days: 3 },
    { element: '戊', days: 18 }
  ],
  '巳': [
    { element: '戊', days: 5 },
    { element: '庚', days: 9 },
    { element: '丙', days: 16 }
  ],
  '午': [
    { element: '丁', days: 20 },
    { element: '己', days: 9 },
    { element: '丁', days: 11 } // 这里似乎有重复，按照原文保留
  ],
  '未': [
    { element: '丁', days: 9 },
    { element: '乙', days: 3 },
    { element: '己', days: 18 }
  ],
  '申': [
    { element: '戊', days: 10 }, // 原文为"戊己十日"，这里简化为戊10日
    { element: '壬', days: 3 },
    { element: '庚', days: 17 }
  ],
  '酉': [
    { element: '庚', days: 10 },
    { element: '辛', days: 20 }
  ],
  '戌': [
    { element: '辛', days: 9 },
    { element: '丁', days: 3 },
    { element: '戊', days: 18 }
  ],
  '亥': [
    { element: '戊', days: 7 },
    { element: '甲', days: 5 },
    { element: '壬', days: 18 }
  ],
  '子': [
    { element: '壬', days: 10 },
    { element: '癸', days: 20 }
  ],
  '丑': [
    { element: '癸', days: 9 },
    { element: '辛', days: 3 },
    { element: '己', days: 18 }
  ]
};

/**
 * 根据八字计算月令司令
 * @param year 年
 * @param month 月 (1-12)
 * @param day 日
 * @returns 司令元素
 */
function calculateSiling(year: number, month: number, day: number): Element {
  // 转换为农历月份和日期
  const solar = Solar.fromYmdHms(year, month, day, 0, 0, 0);
  const lunar = solar.getLunar();
  
  // 获取农历月份和日期
  const lunarMonth = lunar.getMonthInChinese() as Month;
  const lunarDay = lunar.getDay();
  
  // 查找该月的司令配置
  const silingConfig = SILING_CONFIG[lunarMonth];
  
  // 计算当前日期对应的司令
  let dayCount = 0;
  for (const config of silingConfig) {
    dayCount += config.days;
    if (lunarDay <= dayCount) {
      return config.element;
    }
  }
  
  // 默认返回最后一个司令（通常不会执行到这里）
  return silingConfig[silingConfig.length - 1].element;
}

// 使用示例
const year = 1990;
const month = 1;
const day = 29;
const siling = calculateSiling(year, month, day);
console.log(`农历${year}年${month}月${day}日的月令司令是: ${siling}`);
