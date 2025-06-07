

export interface EightChar {
  [key: string]: string;
}


// 假设这是你的八字数据
const eightChar: EightChar = {
  1: '辛',
  2: '甲',
  3: '辛',
  4: '丁',
  5: '未',
  6: '午',
  7: '未',
  8: '酉'
};

// 计算四柱的十二长生状态（返回数组）
const calculateECZhangSheng = (eightChar: EightChar ) => {
  const riZhuTianGan = eightChar[3]; // 获取日主
  
  const ZhangShengOrder = [
    '长生', '沐浴', '冠带', '临官', 
    '帝旺', '衰', '病', '死', 
    '墓', '绝', '胎', '养'
  ];
  
  const ZhangShengStart = {
    '甲': '亥', '丙': '寅', '戊': '寅', '庚': '巳', '壬': '申',
    '乙': '午', '丁': '酉', '己': '酉', '辛': '子', '癸': '卯'
  };
  
  const isYangGan = ['甲', '丙', '戊', '庚', '壬'].includes(riZhuTianGan);
  const startDiZhi = ZhangShengStart[riZhuTianGan];
  const diZhiOrder = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  
  // 直接返回数组，按年、月、日、时顺序
  return [5, 6, 7, 8].map((position) => {
    const diZhi = eightChar[position];
    const startIndex = diZhiOrder.indexOf(startDiZhi);
    const currentIndex = diZhiOrder.indexOf(diZhi);
    
    const offset = isYangGan
      ? (currentIndex - startIndex + 12) % 12
      : (startIndex - currentIndex + 12) % 12;
      
    return ZhangShengOrder[offset];
  });
};

// 使用示例
const zhangShengResult = calculateECZhangSheng(eightChar);
console.log('四柱十二长生状态:', zhangShengResult);

