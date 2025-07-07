import { getAdjacentCongHaiXing } from './test35'


export type TianGanChar =
  | '甲' | '乙' | '丙' | '丁' | '戊'
  | '己' | '庚' | '辛' | '壬' | '癸';

export type DiZhiChar =
  | '子' | '丑' | '寅' | '卯' | '辰'
  | '巳' | '午' | '未' | '申' | '酉'
  | '戌' | '亥';

export type TianGanDizhiChar = TianGanChar | DiZhiChar;

// 定义五行映射
const tianganWuxing: Record<TianGanChar, string> = {
    '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
    '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
};

const dizhiWuxing: Record<DiZhiChar, string> = {
    '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
    '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
};

// 定义天干五合映射
const wuHeMap: Record<TianGanChar, TianGanChar> = {
    '甲': '己', '乙': '庚', '丙': '辛', '丁': '壬', '戊': '癸',
    '己': '甲', '庚': '乙', '辛': '丙', '壬': '丁', '癸': '戊'
};

// 定义地支六合映射
const liuHeMap: Record<DiZhiChar, DiZhiChar> = {
    '子': '丑', '丑': '子', '寅': '亥', '卯': '戌', '辰': '酉', '巳': '申',
    '午': '未', '未': '午', '申': '巳', '酉': '辰', '戌': '卯', '亥': '寅'
};

// 定义地支三合映射
const sanHeMap: Record<DiZhiChar, [DiZhiChar, DiZhiChar] | null> = {
    '子': ['申', '辰'],
    '丑': ['巳', '酉'],
    '寅': ['午', '戌'],
    '卯': ['亥', '未'],
    '辰': ['子', '申'],
    '巳': ['酉', '丑'],
    '午': ['寅', '戌'],
    '未': ['卯', '亥'],
    '申': ['辰', '子'],
    '酉': ['丑', '巳'],
    '戌': ['午', '寅'],
    '亥': ['未', '卯']
};

export type SolveType = '天干通关' | '天干五合' | '天干克' | 
'地支通关' | '地支六合' | '地支三合' | '地支半合' | '地支克'

export const getCharSolve = (
    relations: TianGanDizhiChar[],
    char: TianGanDizhiChar,
    typeStr: SolveType
): TianGanDizhiChar[] => {
    // 1. 判断relations类型（天干或地支）
    const isTianGan = relations.length > 0 && relations[0] in tianganWuxing;
    const isDiZhi = relations.length > 0 && relations[0] in dizhiWuxing;

    // 处理天干相关解决类型
    if (isTianGan) {
        const tianGanChar = char as TianGanChar;
        
        switch (typeStr) {
            case '天干通关':
                { if (relations.length !== 2) return [];
                const [a, b] = relations as [TianGanChar, TianGanChar];
                const wxA = tianganWuxing[a];
                const wxB = tianganWuxing[b];
                
                // 金木相冲用水通关，水火相冲用木通关
                if ((wxA === '金' && wxB === '木') || (wxA === '木' && wxB === '金')) {
                    return ['壬', '癸'];
                }
                if ((wxA === '水' && wxB === '火') || (wxA === '火' && wxB === '水')) {
                    return ['甲', '乙'];
                }
                return []; }
                
            case '天干五合':
                return wuHeMap[tianGanChar] ? [wuHeMap[tianGanChar]] : [];
                
            case '天干克':
                { const wx = tianganWuxing[tianGanChar];
                let keWx = '';
                
                // 根据五行相克关系确定克制五行
                if (wx === '木') keWx = '金';
                else if (wx === '土') keWx = '木';
                else if (wx === '水') keWx = '土';
                else if (wx === '火') keWx = '水';
                else if (wx === '金') keWx = '火';
                
                // 返回克制五行的所有天干
                return (Object.entries(tianganWuxing) as [TianGanChar, string][])
                    .filter(([_, w]) => w === keWx)
                    .map(([tg]) => tg); }
        }
    }
    
    // 处理地支相关解决类型
    if (isDiZhi) {
        const diZhiChar = char as DiZhiChar;
        
        switch (typeStr) {
            case '地支六合':
                return liuHeMap[diZhiChar] ? [liuHeMap[diZhiChar]] : [];
                
            case '地支三合':
                return sanHeMap[diZhiChar] ? [...sanHeMap[diZhiChar]!] : [];
                
            case '地支半合':
                return sanHeMap[diZhiChar] ? [...sanHeMap[diZhiChar]!] : [];
                
            case '地支克':
                { const wx = dizhiWuxing[diZhiChar];
                
                // 根据五行和地支特性返回克制字符
                if (wx === '水') return ['未', '戌']; // 燥土克水
                if (wx === '火') return ['子', '亥']; // 水克火
                if (wx === '金') return ['巳', '午']; // 火克金
                if (wx === '木') return ['申', '酉']; // 金克木
                if (wx === '土') return ['寅', '卯']; // 木克土
                return []; }
        }
    }
    
    return []; // 不匹配的类型或空relations
};

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




const relations: TianGanDizhiChar[] = ['甲', '庚']
const char: TianGanDizhiChar = '甲'
const typeStr: SolveType = '天干克'

const solves = getCharSolve(relations, char, typeStr)

console.log(solves);

export type CongXingHaiYongshenType = {
  tianganCong: {
    cong1: TianGanDizhiChar,  // 需要抑制的字. eg. 甲庚冲的 甲
    cong1Solve: {
      tongguan: TianGanDizhiChar[],
      he: TianGanDizhiChar[], // 天干五合
      ke: TianGanDizhiChar[], // 天干克
    },
    cong2: TianGanDizhiChar, // 需要抑制的字. eg. 甲庚冲的 庚
    cong2Solve: {
      tongguan: TianGanDizhiChar[],
      he: TianGanDizhiChar[], // 天干五合
      ke: TianGanDizhiChar[], // 天干克
    },
  }[],
  dizhiCong: {
    cong1: TianGanDizhiChar,
    cong1Solve: {
      tongguan: TianGanDizhiChar[],
      liuhe: TianGanDizhiChar[],
      sanhe: TianGanDizhiChar[],
      banhe: TianGanDizhiChar[],
      ke: TianGanDizhiChar[],
    },
    cong2: TianGanDizhiChar,
    cong2Solve: {
      tongguan: TianGanDizhiChar[],
      liuhe: TianGanDizhiChar[],
      sanhe: TianGanDizhiChar[],
      banhe: TianGanDizhiChar[],
      ke: TianGanDizhiChar[],
    }

  }[],
  dizhiHai: {
    hai1: TianGanDizhiChar,
    hai1Solve: {
      tongguan: TianGanDizhiChar[],
      liuhe: TianGanDizhiChar[],
      sanhe: TianGanDizhiChar[],
      banhe: TianGanDizhiChar[],
      ke: TianGanDizhiChar[],
    },
    hai2: TianGanDizhiChar,
    hai2Solve: {
      tongguan: TianGanDizhiChar[],
      liuhe: TianGanDizhiChar[],
      sanhe: TianGanDizhiChar[],
      banhe: TianGanDizhiChar[],
      ke: TianGanDizhiChar[],
    }
  }[],
  dizhiXing: {
    type: '子卯相刑' | '三刑' | '自刑',
    xing1: TianGanDizhiChar,
    xing1Solve: {
      tongguan: TianGanDizhiChar[],
      liuhe: TianGanDizhiChar[],
      sanhe: TianGanDizhiChar[],
      banhe: TianGanDizhiChar[],
      ke: TianGanDizhiChar[],
      cong: TianGanDizhiChar[],
    },
    xing2: TianGanDizhiChar,
    xing2Solve: {
      tongguan: TianGanDizhiChar[],
      liuhe: TianGanDizhiChar[],
      sanhe: TianGanDizhiChar[],
      banhe: TianGanDizhiChar[],
      ke: TianGanDizhiChar[],
      cong: TianGanDizhiChar[],
    },
    xing3: TianGanDizhiChar | undefined,
    xing3Solve: {
      tongguan: TianGanDizhiChar[],
      liuhe: TianGanDizhiChar[],
      sanhe: TianGanDizhiChar[],
      banhe: TianGanDizhiChar[],
      ke: TianGanDizhiChar[],
      cong: TianGanDizhiChar[],
    },
  }[]
}


export type AdjacentCongHaiXing = {
  tiangan: {
    cong: TianGanChar[][]
  },
  dizhi: {
    cong: DiZhiChar[][],
    hai: DiZhiChar[][],
    xing: DiZhiChar[][],
  }
}


// 预定义地支六冲关系
const diZhiChongMap: Record<DiZhiChar, DiZhiChar> = {
  '子': '午', '午': '子',
  '丑': '未', '未': '丑',
  '寅': '申', '申': '寅',
  '卯': '酉', '酉': '卯',
  '辰': '戌', '戌': '辰',
  '巳': '亥', '亥': '巳'
};

// 获取与指定地支相冲的地支
const getDiZhiChong = (dizhi: DiZhiChar): DiZhiChar => {
  return diZhiChongMap[dizhi];
};

export const getCongXingHaiYongshen = (
  eightchar: EightChar
): CongXingHaiYongshenType => {
  // 步骤1：获取八字原局的所有天干地支的作用关系
  // 步骤2：获取相邻的刑冲害
  const adjacentCongHaiXing: AdjacentCongHaiXing = getAdjacentCongHaiXing(eightchar);
  
  const congXingHaiYongshen: CongXingHaiYongshenType = {
    tianganCong: [],
    dizhiCong: [],
    dizhiHai: [],
    dizhiXing: [],
  };

  // 处理天干相冲
  if (adjacentCongHaiXing.tiangan.cong && adjacentCongHaiXing.tiangan.cong.length > 0) {
    adjacentCongHaiXing.tiangan.cong.forEach((tianGanPair) => {
      if (tianGanPair.length === 2) {
        const [cong1, cong2] = tianGanPair as [TianGanChar, TianGanChar];
        
        // 获取第一个相冲字的解决方法
        const cong1Solve = {
          tongguan: getCharSolve([cong1, cong2], cong1, '天干通关'),
          he: getCharSolve([], cong1, '天干五合'),
          ke: getCharSolve([], cong1, '天干克'),
        };
        
        // 获取第二个相冲字的解决方法
        const cong2Solve = {
          tongguan: getCharSolve([cong1, cong2], cong2, '天干通关'),
          he: getCharSolve([], cong2, '天干五合'),
          ke: getCharSolve([], cong2, '天干克'),
        };
        
        congXingHaiYongshen.tianganCong.push({
          cong1,
          cong1Solve,
          cong2,
          cong2Solve,
        });
      }
    });
  }

  // 处理地支相冲
  if (adjacentCongHaiXing.dizhi.cong && adjacentCongHaiXing.dizhi.cong.length > 0) {
    adjacentCongHaiXing.dizhi.cong.forEach((diZhiPair) => {
      if (diZhiPair.length === 2) {
        const [cong1, cong2] = diZhiPair as [DiZhiChar, DiZhiChar];
        
        // 获取第一个相冲地支的解决方法
        const cong1Solve = {
          tongguan: getCharSolve([cong1, cong2], cong1, '地支通关'),
          liuhe: getCharSolve([], cong1, '地支六合'),
          sanhe: getCharSolve([], cong1, '地支三合'),
          banhe: getCharSolve([], cong1, '地支半合'),
          ke: getCharSolve([], cong1, '地支克'),
        };
        
        // 获取第二个相冲地支的解决方法
        const cong2Solve = {
          tongguan: getCharSolve([cong1, cong2], cong2, '地支通关'),
          liuhe: getCharSolve([], cong2, '地支六合'),
          sanhe: getCharSolve([], cong2, '地支三合'),
          banhe: getCharSolve([], cong2, '地支半合'),
          ke: getCharSolve([], cong2, '地支克'),
        };
        
        congXingHaiYongshen.dizhiCong.push({
          cong1,
          cong1Solve,
          cong2,
          cong2Solve,
        });
      }
    });
  }

  // 处理地支相害
  if (adjacentCongHaiXing.dizhi.hai && adjacentCongHaiXing.dizhi.hai.length > 0) {
    adjacentCongHaiXing.dizhi.hai.forEach((diZhiPair) => {
      if (diZhiPair.length === 2) {
        const [hai1, hai2] = diZhiPair as [DiZhiChar, DiZhiChar];
        
        // 获取第一个相害地支的解决方法
        const hai1Solve = {
          tongguan: getCharSolve([hai1, hai2], hai1, '地支通关'),
          liuhe: getCharSolve([], hai1, '地支六合'),
          sanhe: getCharSolve([], hai1, '地支三合'),
          banhe: getCharSolve([], hai1, '地支半合'),
          ke: getCharSolve([], hai1, '地支克'),
        };
        
        // 获取第二个相害地支的解决方法
        const hai2Solve = {
          tongguan: getCharSolve([hai1, hai2], hai2, '地支通关'),
          liuhe: getCharSolve([], hai2, '地支六合'),
          sanhe: getCharSolve([], hai2, '地支三合'),
          banhe: getCharSolve([], hai2, '地支半合'),
          ke: getCharSolve([], hai2, '地支克'),
        };
        
        congXingHaiYongshen.dizhiHai.push({
          hai1,
          hai1Solve,
          hai2,
          hai2Solve,
        });
      }
    });
  }

  // 处理地支相刑
  if (adjacentCongHaiXing.dizhi.xing && adjacentCongHaiXing.dizhi.xing.length > 0) {
    adjacentCongHaiXing.dizhi.xing.forEach((diZhiGroup, index) => {
      // 假设这里已经知道相刑的类型
      let type: '子卯相刑' | '三刑' | '自刑' = '子卯相刑';
      
      // 简单判断相刑类型（实际应用中需要更复杂的逻辑）
      if (diZhiGroup.length === 2 && (diZhiGroup.includes('子') && diZhiGroup.includes('卯'))) {
        type = '子卯相刑';
      } else if (diZhiGroup.length === 3 && (diZhiGroup.includes('寅') && diZhiGroup.includes('巳') && diZhiGroup.includes('申'))) {
        type = '三刑';
      } else if (diZhiGroup.length === 2 && (diZhiGroup.includes('辰') && diZhiGroup.includes('辰'))) {
        type = '自刑';
      }
      
      const xing1 = diZhiGroup[0] as DiZhiChar;
      const xing2 = diZhiGroup[1] as DiZhiChar;
      const xing3 = diZhiGroup.length > 2 ? diZhiGroup[2] as DiZhiChar : undefined;
      
      // 获取第一个相刑地支的解决方法
      const xing1Solve = {
        tongguan: getCharSolve(diZhiGroup, xing1, '地支通关'),
        liuhe: getCharSolve([], xing1, '地支六合'),
        sanhe: getCharSolve([], xing1, '地支三合'),
        banhe: getCharSolve([], xing1, '地支半合'),
        ke: getCharSolve([], xing1, '地支克'),
        cong: xing3 ? [getDiZhiChong(xing1)] : [],
      };
      
      // 获取第二个相刑地支的解决方法
      const xing2Solve = {
        tongguan: getCharSolve(diZhiGroup, xing2, '地支通关'),
        liuhe: getCharSolve([], xing2, '地支六合'),
        sanhe: getCharSolve([], xing2, '地支三合'),
        banhe: getCharSolve([], xing2, '地支半合'),
        ke: getCharSolve([], xing2, '地支克'),
        cong: xing3 ? [getDiZhiChong(xing2)] : [],
      };
      
      // 获取第三个相刑地支的解决方法（如果有）
      const xing3Solve = xing3 ? {
        tongguan: getCharSolve(diZhiGroup, xing3, '地支通关'),
        liuhe: getCharSolve([], xing3, '地支六合'),
        sanhe: getCharSolve([], xing3, '地支三合'),
        banhe: getCharSolve([], xing3, '地支半合'),
        ke: getCharSolve([], xing3, '地支克'),
        cong: [getDiZhiChong(xing3)],
      } : {
        tongguan: [],
        liuhe: [],
        sanhe: [],
        banhe: [],
        ke: [],
        cong: [],
      };
      
      congXingHaiYongshen.dizhiXing.push({
        type,
        xing1,
        xing1Solve,
        xing2,
        xing2Solve,
        xing3,
        xing3Solve,
      });
    });
  }

  return congXingHaiYongshen;
};


const ec: EightChar = {
  1: '己',
  2: '庚',
  3: '甲',
  4: '甲',
  5: '巳',
  6: '丑',
  7: '午',
  8: '子',
}

const res = getCongXingHaiYongshen(ec)
console.log(JSON.stringify(res))