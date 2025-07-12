// 身强身弱

import { EightCharInfo, EightChar, ShenqiangruoType } from "@shared/@types/eightChar/eightCharInfo";
import { shengMap, wuXingMap } from "@shared/@types/eightChar/wuxing";

/**
 * 通过八字计分
 * 年干：8分 月干：12分 日干       时干：12分
 * 年支：4分 月支：40分 日支：12分  时支：12分
 * 规则：只有生我（印星）和同我（比劫）才加分
 * @param eightChar 八字对象
 * @returns 总得分
 *
 * 判断强弱
  方法一：50为界线法
  总分超过50代表命主身强。
  总分低于50代表命主身弱。

  方法二：四柱八字分值法
  得分60以上为身强。
  得分40以下为身弱。
  得分在40—60之间为中庸。
 */
export const getShenqiangruoScore = (eightChar: EightChar): number => {
  // 位置对应的分数权重
  const positionScores: Record<number, number> = {
    1: 8,   // 年干
    2: 12,  // 月干
    4: 12,  // 时干
    5: 4,   // 年支
    6: 40,  // 月支
    7: 12,  // 日支
    8: 12   // 时支
  };

  // 获取日元的五行属性
  const riYuan = eightChar[3]; // 日干（日元）
  const riYuanWuXing = wuXingMap[riYuan];

  let totalScore = 0;

  // 遍历需要计分的位置（跳过日干位置3）
  const positions: (keyof EightChar)[] = [1, 2, 4, 5, 6, 7, 8];
  for (const position of positions) {
    const element = eightChar[position];
    const elementWuXing = wuXingMap[element];

    // 检查是否应该加分
    if (elementWuXing === riYuanWuXing) {
      // 同我（比劫）: 相同五行
      totalScore += positionScores[position];
    } else if (shengMap[elementWuXing] === riYuanWuXing) {
      // 生我（印星）: 生助日元
      totalScore += positionScores[position];
    }
    // 其他情况（我生、我克、克我）不加分
  }

  return totalScore;
};


export const getShenqiangruoTitle = (shengqiangruo: ShenqiangruoType | undefined) => {
  if (shengqiangruo === '从强') {
    return '身强身弱'+'(从强)';
  } else if (shengqiangruo === '身强') {
    return '身强身弱'+'(身强)';
  } else if (shengqiangruo === '均衡') {
    return '身强身弱'+'(均衡)';
  } else if (shengqiangruo === '身弱') {
    return '身强身弱'+'(身弱)';
  } else if (shengqiangruo === '从弱') {
    return '身强身弱'+'(从弱)';
  }else {
    return '身强身弱';
  }
}

