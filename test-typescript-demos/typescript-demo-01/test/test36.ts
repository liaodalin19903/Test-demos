import { getAdjacentCongHaiXing } from './test35'

export type AdjacentCongHaiXing = {
  tiangan: {
    cong: string[][]
  },
  dizhi: {
    cong: string[][],
    hai: string[][],
    xing: string[][],
  }
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



export type TianGanChar =
  | '甲' | '乙' | '丙' | '丁' | '戊'
  | '己' | '庚' | '辛' | '壬' | '癸';

export type DiZhiChar =
  | '子' | '丑' | '寅' | '卯' | '辰'
  | '巳' | '午' | '未' | '申' | '酉'
  | '戌' | '亥';

export type TianGanDizhiChar = TianGanChar | DiZhiChar;

export type CongXingHaiYongshenType = {
  tianganCong: {
    cong1: TianGanChar,  // 需要抑制的字. eg. 甲庚冲的 甲
    cong1Solve: {
      tongguan: TianGanChar[],
      he: TianGanChar[], // 天干五合
      ke: TianGanChar[], // 天干克
    },
    cong2: TianGanChar, // 需要抑制的字. eg. 甲庚冲的 庚
    cong2Solve: {
      tongguan: TianGanChar[],
      he: TianGanChar[], // 天干五合
      ke: TianGanChar[], // 天干克
    },
  }[] ,
  dizhiCong: {
    cong1: DiZhiChar,
    cong1Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
    },
    cong2: DiZhiChar,
    cong2Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
    }
  }[] ,
  dizhiHai: {
    hai1: DiZhiChar,
    hai1Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
    },
    hai2: DiZhiChar,
    hai2Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
    }
  }[] ,
  dizhiXing: {
    type: '子卯相刑' | '三刑' | '自刑',
    xing1: DiZhiChar,
    xing1Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
      cong: DiZhiChar[],
    },
    xing2: DiZhiChar,
    xing2Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
      cong: DiZhiChar[],
    },
    xing3: DiZhiChar | undefined,
    xing3Solve: {
      tongguan: DiZhiChar[],
      liuhe: DiZhiChar[],
      sanhe: DiZhiChar[],
      banhe: DiZhiChar[],
      ke: DiZhiChar[],
      cong: DiZhiChar[],
    },
  }[] 
}



export const getCongXingHaiYongshen = (
  eightchar: EightChar
): CongXingHaiYongshenType => {
  const adjacentCongHaiXing: AdjacentCongHaiXing = getAdjacentCongHaiXing(eightchar);
  
  // 预定义五行生克关系
  const tianganWuXing: Record<TianGanChar, string> = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
  };

  const dizhiWuXing: Record<DiZhiChar, string> = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
    '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
  };

  // 天干五合映射
  const wuHe: Record<TianGanChar, TianGanChar> = {
    '甲': '己', '乙': '庚', '丙': '辛', '丁': '壬', '戊': '癸',
    '己': '甲', '庚': '乙', '辛': '丙', '壬': '丁', '癸': '戊'
  };

  // 地支六合映射
  const liuHe: Record<DiZhiChar, DiZhiChar> = {
    '子': '丑', '丑': '子', '寅': '亥', '卯': '戌', '辰': '酉', '巳': '申',
    '午': '未', '未': '午', '申': '巳', '酉': '辰', '戌': '卯', '亥': '寅'
  };

  // 三合局映射
  const sanHe: Record<DiZhiChar, [DiZhiChar, DiZhiChar] | null> = {
    '子': null, '丑': null,
    '寅': ['午', '戌'], // 寅午戌
    '卯': null, '辰': null,
    '巳': ['酉', '丑'], // 巳酉丑
    '午': ['寅', '戌'], // 寅午戌
    '未': null, 
    '申': ['子', '辰'], // 申子辰
    '酉': ['巳', '丑'], // 巳酉丑
    '戌': ['寅', '午'], // 寅午戌
    '亥': null
  };

  // 半三合映射
  const banHe: Record<DiZhiChar, DiZhiChar[]> = {
    '子': ['申', '辰'], // 申子/子辰
    '丑': ['巳', '酉'], // 巳丑/丑酉
    '寅': ['午'],       // 寅午
    '卯': [],
    '辰': ['子', '申'], // 申辰/子辰
    '巳': ['酉', '丑'], // 巳酉/巳丑
    '午': ['寅', '戌'], // 寅午/午戌
    '未': [],
    '申': ['子', '辰'], // 申子/申辰
    '酉': ['巳', '丑'], // 巳酉/酉丑
    '戌': ['午'],       // 午戌
    '亥': []
  };

  // 天干相克关系 (金克木，木克土，土克水，水克火，火克金)
  const getKeTiangan = (target: TianGanChar): TianGanChar[] => {
    const targetWuXing = tianganWuXing[target];
    return (Object.entries(tianganWuXing) as [TianGanChar, string][])
      .filter(([_, wx]) => 
        (targetWuXing === '木' && wx === '金') ||
        (targetWuXing === '土' && wx === '木') ||
        (targetWuXing === '水' && wx === '土') ||
        (targetWuXing === '火' && wx === '水') ||
        (targetWuXing === '金' && wx === '火'))
      .map(([tg]) => tg);
  };

  // 地支相克关系
  const getKeDizhi = (target: DiZhiChar): DiZhiChar[] => {
    const targetWuXing = dizhiWuXing[target];
    return (Object.entries(dizhiWuXing) as [DiZhiChar, string][])
      .filter(([_, wx]) => 
        (targetWuXing === '木' && wx === '金') ||
        (targetWuXing === '土' && wx === '木') ||
        (targetWuXing === '水' && wx === '土') ||
        (targetWuXing === '火' && wx === '水') ||
        (targetWuXing === '金' && wx === '火'))
      .map(([dz]) => dz);
  };

  // 通关天干 (根据相生关系)
  const getTongguanTiangan = (a: TianGanChar, b: TianGanChar): TianGanChar[] => {
    const wxA = tianganWuXing[a];
    const wxB = tianganWuXing[b];
    
    if ((wxA === '金' && wxB === '木') || (wxA === '木' && wxB === '金')) 
      return ['壬', '癸']; // 水通关
    if ((wxA === '水' && wxB === '火') || (wxA === '火' && wxB === '水')) 
      return ['甲', '乙']; // 木通关
    return [];
  };

  // 通关地支
  const getTongguanDizhi = (a: DiZhiChar, b: DiZhiChar): DiZhiChar[] => {
    const wxA = dizhiWuXing[a];
    const wxB = dizhiWuXing[b];
    
    if ((wxA === '金' && wxB === '木') || (wxA === '木' && wxB === '金')) 
      return ['子', '亥']; // 水通关
    if ((wxA === '水' && wxB === '火') || (wxA === '火' && wxB === 'water')) 
      return ['寅', '卯']; // 木通关
    return [];
  };

  // 处理天干冲
  const tianganCong: CongXingHaiYongshenType['tianganCong'] = [];
  (adjacentCongHaiXing as AdjacentCongHaiXing).tiangan.cong.forEach(([a, b]) => {
    tianganCong.push({
      cong1: a as TianGanChar,
      cong1Solve: {
        tongguan: getTongguanTiangan(a as TianGanChar, b as TianGanChar),
        he: [wuHe[a]], // 五合
        ke: getKeTiangan(a as TianGanChar) // 克
      },
      cong2: b as TianGanChar,
      cong2Solve: {
        tongguan: getTongguanTiangan(b as TianGanChar, a as TianGanChar),
        he: [wuHe[b]], // 五合
        ke: getKeTiangan(b as TianGanChar) // 克
      }
    });
  });

  // 处理地支冲
  const dizhiCong: CongXingHaiYongshenType['dizhiCong'] = [];
  adjacentCongHaiXing.dizhi.cong.forEach(([a, b]) => {
    dizhiCong.push({
      cong1: a as DiZhiChar,
      cong1Solve: {
        tongguan: getTongguanDizhi(a as DiZhiChar, b as DiZhiChar),
        liuhe: [liuHe[a]], // 六合
        sanhe: sanHe[a] ? [sanHe[a]![0], a, sanHe[a]![1]] : [],
        banhe: banHe[a] || [],
        ke: getKeDizhi(a as DiZhiChar)
      },
      cong2: b as DiZhiChar,
      cong2Solve: {
        tongguan: getTongguanDizhi(b as DiZhiChar, a as DiZhiChar),
        liuhe: [liuHe[b]], // 六合
        sanhe: sanHe[b] ? [sanHe[b]![0], b, sanHe[b]![1]] : [],
        banhe: banHe[b] || [],
        ke: getKeDizhi(b as DiZhiChar)
      }
    });
  });

  // 处理地支害
  const dizhiHai: CongXingHaiYongshenType['dizhiHai'] = [];
  adjacentCongHaiXing.dizhi.hai.forEach(([a, b]) => {
    dizhiHai.push({
      hai1: a,
      hai1Solve: {
        tongguan: [],
        liuhe: [liuHe[a]],
        sanhe: sanHe[a] ? [sanHe[a]![0], a, sanHe[a]![1]] : [],
        banhe: banHe[a] || [],
        ke: getKeDizhi(a)
      },
      hai2: b,
      hai2Solve: {
        tongguan: [],
        liuhe: [liuHe[b]],
        sanhe: sanHe[b] ? [sanHe[b]![0], b, sanHe[b]![1]] : [],
        banhe: banHe[b] || [],
        ke: getKeDizhi(b)
      }
    });
  });

  // 处理地支刑
  const dizhiXing: CongXingHaiYongshenType['dizhiXing'] = [];
  adjacentCongHaiXing.dizhi.xing.forEach(entry => {
    if (entry.type === '自刑') {
      dizhiXing.push({
        type: '自刑',
        xing1: entry.dizhis[0],
        xing1Solve: {
          tongguan: [],
          liuhe: [liuHe[entry.dizhis[0]]],
          sanhe: sanHe[entry.dizhis[0]] ? [sanHe[entry.dizhis[0]]![0], entry.dizhis[0], sanHe[entry.dizhis[0]]![1]] : [],
          banhe: banHe[entry.dizhis[0]] || [],
          ke: getKeDizhi(entry.dizhis[0]),
          cong: [] // 自刑无冲
        },
        xing2: entry.dizhis[0], // 自刑重复同一个地支
        xing2Solve: { /* 同xing1Solve */ },
        xing3: undefined,
        xing3Solve: { /* 空 */ }
      });
    } else {
      // 子卯刑或三刑
      const [dz1, dz2, dz3] = entry.dizhis;
      dizhiXing.push({
        type: entry.type,
        xing1: dz1,
        xing1Solve: {
          tongguan: [],
          liuhe: [liuHe[dz1]],
          sanhe: sanHe[dz1] ? [sanHe[dz1]![0], dz1, sanHe[dz1]![1]] : [],
          banhe: banHe[dz1] || [],
          ke: getKeDizhi(dz1),
          cong: [] // 实际应用中可能需要特殊处理
        },
        xing2: dz2,
        xing2Solve: { /* 类似xing1 */ },
        xing3: entry.type === '三刑' ? dz3 : undefined,
        xing3Solve: entry.type === '三刑' ? { /* 类似xing1 */ } : { /* 空 */ }
      });
    }
  });

  return {
    tianganCong,
    dizhiCong,
    dizhiHai,
    dizhiXing
  };
};