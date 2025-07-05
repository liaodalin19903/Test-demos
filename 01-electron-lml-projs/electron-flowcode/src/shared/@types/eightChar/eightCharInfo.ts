import { GeType } from "./geju";

export type TianGanChar =
  | '甲' | '乙' | '丙' | '丁' | '戊'
  | '己' | '庚' | '辛' | '壬' | '癸';

export type DiZhiChar =
  | '子' | '丑' | '寅' | '卯' | '辰'
  | '巳' | '午' | '未' | '申' | '酉'
  | '戌' | '亥';

export type TianGanDizhiChar = TianGanChar | DiZhiChar;
export type Wuxing = '木' | '火' | '土' | '金' | '水';

export type NaYin = {
  "年柱": string,
  "月柱": string,
  "日柱": string,
  "时柱": string,
  "胎息": string,
  "胎元": string,
  "身宫": string,
  "命宫": string,
}


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


/**
 * eg.
 * {
 *   tianGanShiShen: ['正财', '伤官', '日元', '比肩'],
 *   dizhiShiShen: [...]
 * }
 */
export type Shishen = {
  tianGanShiShen: string[],  // 天干十神
  dizhiShiShen: string[][]   // 地支藏干十神
}

// 定义状态类型
export type EightCharInfo = {
  gender: string;
  birthdaySolar: string;  // eg. 1990-01-01 00:00:00
  editingIndex: number;
  eightChar: EightChar;
  canggan: string[][]; // 地支藏干
  shishen: Shishen; // 十神
  zhangSheng: string[],  // 地支的十二长生
  kongWang: string[],  // 空亡
  dayunLiunians: DaYunItem[],  // 大运流年
  shenqiangruo: number | undefined,  // 身强身弱
  geju: {
    recommend: {  // 程序推荐格局
      m1: GeType[];
      m2: GeType[];
      m3: GeType[];
      m4: GeType[];
      m5_1: GeType[]; // 专旺
      m5_2: GeType[]; // 从弱-从势
      m5_3: GeType[]; // 从弱-从气
      m5_4: GeType[]; // 从化
      m5_5: GeType[]; // 特殊格局
    }
    selected: GeType[]  // 我们选择的格局
  };
};

  // 定义大运流年数据结构
export interface DaYunItem {
    dayunName: string;
    liunians: LiuNianItem[];
  }

export interface LiuNianItem {
    liunianYear: number;
    liunianGanzhi: string;
  }



// 五行与地支对应关系
export const WUXING_DIZHI: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 三合局配置
export const SANHE_JU: Record<string, string[]> = {
  '火': ['寅', '午', '戌'],
  '水': ['申', '子', '辰'],
  '木': ['亥', '卯', '未'],
  '金': ['巳', '酉', '丑'],
  '土': ['辰', '戌', '丑', '未'] // 四库土
};

// 三会局配置
export const SANHUI_JU: Record<string, string[]> = {
  '火': ['巳', '午', '未'],
  '水': ['亥', '子', '丑'],
  '木': ['寅', '卯', '辰'],
  '金': ['申', '酉', '戌']
};

// 辅助函数：根据天干获取五行
export const getWuXingByTianGan = (tianGan: string): string => {
  const map: Record<string, string> = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
  };
  return map[tianGan] || '';
};

// 天干五行映射
export const wuxingMap: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支藏干分数表
export const dizhiCanggan: Record<string, [string, number][]> = {
  '子': [['癸', 100]],
  '丑': [['己', 60], ['癸', 30], ['辛', 10]],
  '寅': [['甲', 60], ['丙', 30], ['戊', 10]],
  '卯': [['乙', 100]],
  '辰': [['戊', 60], ['乙', 30], ['癸', 10]],
  '巳': [['丙', 60], ['戊', 30], ['庚', 10]],
  '午': [['丁', 70], ['己', 30]],
  '未': [['己', 60], ['丁', 30], ['乙', 10]],
  '申': [['庚', 60], ['壬', 30], ['戊', 10]],
  '酉': [['辛', 100]],
  '戌': [['戊', 60], ['辛', 30], ['丁', 10]],
  '亥': [['壬', 70], ['甲', 30]]
};

// 月支对应的五行旺度系数表
export const monthCoefficients: Record<string, Record<string, number>> = {
  '寅': { '木': 1.571, '火': 1.548, '土': 0.924, '金': 0.716, '水': 0.862 },
  '卯': { '木': 2.000, '火': 1.414, '土': 0.500, '金': 0.707, '水': 1.000 },
  '辰': { '木': 1.166, '火': 1.074, '土': 1.421, '金': 1.161, '水': 0.800 },
  '巳': { '木': 0.862, '火': 1.571, '土': 1.548, '金': 0.924, '水': 0.716 },
  '午': { '木': 0.912, '火': 1.700, '土': 1.590, '金': 0.774, '水': 0.645 },
  '未': { '木': 0.924, '火': 1.341, '土': 1.674, '金': 1.069, '水': 0.612 },
  '申': { '木': 0.795, '火': 0.674, '土': 1.012, '金': 1.641, '水': 1.498 },
  '酉': { '木': 0.500, '火': 0.707, '土': 1.000, '金': 2.000, '水': 1.414 },
  '戌': { '木': 0.674, '火': 1.012, '土': 1.641, '金': 1.498, '水': 0.795 },
  '亥': { '木': 1.590, '火': 0.774, '土': 0.645, '金': 0.912, '水': 1.700 },
  '子': { '木': 1.414, '火': 0.500, '土': 0.707, '金': 1.000, '水': 2.000 },
  '丑': { '木': 0.898, '火': 0.821, '土': 1.512, '金': 1.348, '水': 1.041 }
};

export type WuxingPercentage = {
  '金': number;
  '木': number;
  '水': number;
  '火': number;
  '土': number;
};


/**
 * 天干地支作用
 */
// 天干作用
export type TianganXiangchong = '甲庚冲' | '乙辛冲' | '丙壬冲' | '丁癸冲'

export type TianganWuhe = '甲己合' | '乙庚合' | '丙辛合' | '丁壬合' | '戊癸合'

// 地支作用
export type DizhiSanhui = '寅卯辰三会木' | '巳午未三会火' | '申酉戌三会金' | '亥子丑三会水'

export type DizhiSanhe = '申子辰三合水' | '亥卯未三合木' | '寅午戌三合火' | '巳酉丑三合金'

export type DizhiBanhe = DizhiBanheShui | DizhiBanheMu | DizhiBanheHuo | DizhiBanheJin

export type DizhiBanheShui = '申子半合水' | '子辰半合水' | '申辰半合水'

export type DizhiBanheMu = '亥卯半合木' | '卯未半合木' | '亥未半合木'

export type DizhiBanheHuo = '寅午半合火' | '午戌半合火' | '寅戌半合火'

export type DizhiBanheJin = '巳酉半合金' | '酉丑半合金' | '巳丑半合金'

export type DizhiAnhe = '寅丑暗合' | '亥午暗合' | '卯申暗合' | '巳酉暗合' | '子巳暗合' | '寅午暗合'

export type DizhiLiuhe = '子丑合化土' | '寅亥合化木' | '卯戌合化火' | '辰酉合化金' | '巳申合化水' | '午未合化火/土' // 天干透出的是火：就合化为火 天干透出的是土：就合化为土

export type DizhiXiangcong = '子午冲' | '丑未冲' | '寅申冲' | '卯酉冲' | '辰戌冲' | '巳亥冲'

export type DizhiXianghai = '子未相害' | '丑午相害' | '寅巳相害' | '卯辰相害' | '申亥相害' | '酉戌相害'

export type DizhiXing = '子卯相刑' | '寅巳申三刑' | '丑戌未三刑' | '辰辰自刑' | '午午自刑' | '酉酉自刑' | '亥亥自刑'

export type DizhiXiangpo = '子酉相破' | '丑辰相破' | '寅亥相破' | '卯午相破' | '巳申相破' | '未戌相破'


