import { DaYunItem, EightChar, EightCharInfo, NaYin } from '@shared/@types/eightChar/eightCharInfo';
import { DescriptionsProps, Space, Typography } from 'antd';
const { Paragraph, Text } = Typography;
import { naYinTable } from '@shared/@types/eightChar/nayin';

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
    //console.error("获取八字纳音信息时出错:", error);
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
    children:
    <Space direction="vertical">
      <Text>{nayinInfo.年柱.split(' ')[0]}</Text>
      <Text code={true}>{nayinInfo.年柱.split(' ')[1]}</Text>
    </Space>,
  },
  {
    key: '2',
    label: '月柱',
    children:
     <Space direction="vertical">
      <Text>{nayinInfo.年柱.split(' ')[0]}</Text>
      <Text code={true}>{nayinInfo.年柱.split(' ')[1]}</Text>
    </Space>,
  },
  {
    key: '3',
    label: '日柱',
    children:
     <Space direction="vertical">
      <Text>{nayinInfo.日柱.split(' ')[0]}</Text>
      <Text code={true}>{nayinInfo.日柱.split(' ')[1]}</Text>
    </Space>,
  },
  {
    key: '4',
    label: '时柱',
    children:
     <Space direction="vertical">
      <Text>{nayinInfo.时柱.split(' ')[0]}</Text>
      <Text code={true}>{nayinInfo.时柱.split(' ')[1]}</Text>
    </Space>,
  },
  {
    key: '5',
    label: '胎息',
    children:
     <Space direction="vertical">
      <Text>{nayinInfo.胎息.split(' ')[0]}</Text>
      <Text code={true}>{nayinInfo.胎息.split(' ')[1]}</Text>
    </Space>,
  },
  {
    key: '6',
    label: '胎元',
    children:
     <Space direction="vertical">
      <Text>{nayinInfo.胎元.split(' ')[0]}</Text>
      <Text code={true}>{nayinInfo.胎元.split(' ')[1]}</Text>
    </Space>,
  },
  {
    key: '7',
    label: '命宫',
    children:
     <Space direction="vertical">
      <Text>{nayinInfo.命宫.split(' ')[0]}</Text>
      <Text code={true}>{nayinInfo.命宫.split(' ')[1]}</Text>
    </Space>,
  },
  {
    key: '8',
    label: '身宫',
    children:
     <Space direction="vertical">
      <Text>{nayinInfo.身宫.split(' ')[0]}</Text>
      <Text code={true}>{nayinInfo.身宫.split(' ')[1]}</Text>
    </Space>,
  },
]

  return items
}

/**
 * 计算天干地支组合的纳音
 * @param tianGan 天干
 * @param diZhi 地支
 * @returns 对应的纳音
 */
export const getNaYin = (tianGan: string, diZhi: string): string => {
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


