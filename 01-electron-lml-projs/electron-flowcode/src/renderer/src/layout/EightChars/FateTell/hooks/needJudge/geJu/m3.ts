// 方式3：阴阳相见

import { EightChar, Shishen } from "@shared/@types/eightChar/eightCharInfo"
import { GeType } from "@shared/@types/eightChar/geju"


export const intro = [
  '我命名：降低版天透地藏（①我：地支位置要求降低；②地支阴阳属性降低）',
  '数量至少：同阴阳性2个；不同性3个',
  '勉强算是格局'
]

export const getM3Ge = (eightChar: EightChar, shishen: Shishen): GeType[] => {
  const geList: GeType[] = [];

  // 定义十神分组映射（相同五行的十神分组）
  const shenGroups: Record<string, string[]> = {
    '正官': ['正官', '七杀'],
    '七杀': ['正官', '七杀'],
    '正财': ['正财', '偏财'],
    '偏财': ['正财', '偏财'],
    '正印': ['正印', '偏印'],
    '偏印': ['正印', '偏印'],
    '食神': ['食神', '伤官'],
    '伤官': ['食神', '伤官']
  };

  // 检查月干（位置索引2）
  const checkGan = (ganPosition: '2' | '4') => {
    const ganIndex = ganPosition === '2' ? 1 : 3; // 天干十神数组索引（月干=1，时干=3）
    const shen = shishen.tianGanShiShen[ganIndex];

    // 只处理特定十神（排除比肩劫财等）
    if (!shenGroups[shen]) return;

    // 统计相同五行的十神数量（包括自己）
    let count = 1; // 自己已算1个

    // 遍历所有地支藏干（4个地支）
    for (let i = 0; i < 4; i++) {
      const dzShens = shishen.dizhiShiShen[i];
      dzShens.forEach(dzShen => {
        // 检查是否属于同一五行分组
        if (shenGroups[shen].includes(dzShen)) {
          count++;
        }
      });
    }

    // 如果找到至少1个相同五行的地支藏干（总数>=2）
    if (count >= 2) {
      // 将十神转换为格局名称
      const geType = `${shen}格` as GeType;
      geList.push(geType);
    }
  };

  // 检查月干和时干
  checkGan('2'); // 月干
  checkGan('4'); // 时干

  return geList;
};

