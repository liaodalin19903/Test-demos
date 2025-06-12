import { EightCharInfo, NaYin } from '@shared/@types/eightChar/eightCharInfo';
import { DescriptionsProps } from 'antd';

import { EightChar as LTEightChar, Lunar, Solar } from "lunar-typescript";


/**
 * 获取八字相关的纳音信息
 * @param eghtCharInfo 八字信息对象
 * @returns 包含各柱纳音信息的对象
 */
const getNaYinInfo = (birthdaySolar: string): NaYin => {
  try {

    // 日期时间字符串
    const datetimeStr = birthdaySolar;

    // 分割日期和时间部分
    const [datePart, timePart] = datetimeStr.split(' ');

    // 分割日期部分
    const [year, month, day] = datePart.split('-').map(Number);

    // 分割时间部分
    const [hour, minute, second] = timePart.split(':').map(Number);

    // 将阳历日期字符串转换为八字实例
    const ec = LTEightChar.fromLunar(
      Lunar.fromSolar(
        Solar.fromYmdHms(year, month, day, hour, minute, second)
      )
    );

    // 构建并返回包含各柱纳音信息的对象
    return {
      "年柱": `${ec.getYearGan()}${ec.getYearZhi()} ${ec.getYearNaYin()}`,
      "月柱": `${ec.getMonthGan()}${ec.getMonthZhi()} ${ec.getMonthNaYin()}`,
      "日柱": `${ec.getDayGan()}${ec.getDayZhi()} ${ec.getDayNaYin()}`,
      "时柱": `${ec.getTimeGan()}${ec.getTimeZhi()} ${ec.getTimeNaYin()}`,
      "胎息": `${ec.getTaiXi()} ${ec.getTaiXiNaYin()}`,
      "胎元": `${ec.getTaiYuan()} ${ec.getTaiYuanNaYin()}`,
      "身宫": `${ec.getShenGong()} ${ec.getShenGongNaYin()}`,
      "命宫": `${ec.getMingGong()} ${ec.getMingGongNaYin()}`
    };
  } catch (error) {
    console.error("获取八字纳音信息时出错:", error);
    // 返回默认值或抛出错误
    return {
      "年柱": "",
      "月柱": "",
      "日柱": "",
      "时柱": "",
      "胎息": "",
      "胎元": "",
      "身宫": "",
      "命宫": ""
    };
  }
};


/**
 * 获取纳音五行展示的<Description/>的items
 */
export const getNayinWuXingItems = (eightCharInfo: EightCharInfo): DescriptionsProps['items']  => {

  // 步骤1：获取纳音五行
  const nayinInfo = getNaYinInfo(eightCharInfo.birthdaySolar)

  // 步骤2：生成<Description/>的items
  const items: DescriptionsProps['items'] = [
  {
    key: '1',
    label: '年柱',
    children: 'Zhou Maomao',
  },
  {
    key: '2',
    label: '月柱',
    children: '1810000000',
  },
  {
    key: '3',
    label: '日柱',
    children: 'Hangzhou, Zhejiang',
  },
  {
    key: '4',
    label: '时柱',
    span: 2,
    children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
  }]

  return items

}
