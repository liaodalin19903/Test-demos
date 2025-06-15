import { useState, useEffect } from 'react';
import { Col, Row, Card, Button } from 'antd';
import { EightCharInfo } from '@shared/@types/eightChar/eightCharInfo';
import { getDayunAges, getDayuns, getDayunYears, getLiunianGanzhis, getNayins, getShishens, getZhangshengs } from '../hooks/dayunLiunianHooks';
import { Solar } from 'lunar-typescript';


{/* 流年展示组件 - 二维数组版本 */}
const LiunianDisplay = ({ liunian, birthdaySolar }) => {

  const updated_liunian = updateDayunLiunian(liunian, birthdaySolar)

  return (
    <Row gutter={8} style={{ flexWrap: 'nowrap', minWidth: 'max-content', marginTop: 12 }}>
      <Col style={{ minWidth: 80, fontWeight: 'bold' }}>流年:</Col>

      {updated_liunian.map((outerItem, outerIndex) => (
        <Col
          key={outerIndex}
          style={{ minWidth: 80, padding: '4px', border: '1px solid #e8e8e8', borderRadius: 4 }}
        >
          {outerItem.map((innerItem, innerIndex) => (
            <Row
              key={innerIndex}
              justify="center"  // 水平居中
              align="middle"    // 垂直居中
              style={{ height: 24, marginBottom: 4 }}
            >
              <div style={{ fontSize: 12, textAlign: 'center' }}>
                <Button
                  size='small'
                  color={innerItem.includes('*') ? "danger" : "default"}
                  variant={innerItem.includes('*') ? "solid" : "filled"}
                >
                  {innerItem}
                </Button>
              </div>
            </Row>
          ))}
        </Col>
      ))}
    </Row>
  );
};


// 改为 React 函数组件（首字母大写）
export const DayunLiunianNode: React.FC<{ eightCharInfo: EightCharInfo }> = ({ eightCharInfo }) => {
  const [dataReady, setDataReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const maxRetries = 10;
    let retries = 0;

    const checkSolarBirthday = () => {
      if (isMounted) {
        if (eightCharInfo.birthdaySolar) {
          setDataReady(true);
          setError(null);
        } else if (retries < maxRetries) {
          retries++;
          setTimeout(checkSolarBirthday, 500);
        } else {
          setError('获取 solarBirthday 超时，请检查数据');
        }
      }
    };

    checkSolarBirthday();

    return () => {
      isMounted = false;
    };
  }, [eightCharInfo]);

  // 加载中状态
  if (!dataReady) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center text-gray-500">
          <i className="fa fa-circle-o-notch fa-spin mr-2"></i>
          <span>加载大运流年数据中...</span>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  // 数据准备好后执行计算
  console.log('数据准备好后执行计算: ', eightCharInfo)
  const zhangsheng = getZhangshengs(eightCharInfo);
  const nayin = getNayins(eightCharInfo);
  const shishen = getShishens(eightCharInfo);
  const dayun = getDayuns();
  const shisui = getDayunAges();
  const years = getDayunYears(eightCharInfo);
  const liunian: string[][] = getLiunianGanzhis()



  return (
    <div
      style={{
        overflow: 'auto',
        width: '100%',
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 4,
      }}
    >
      {/* 长生 - 使用 map 优化代码 */}
      <Row gutter={8} style={{ flexWrap: 'nowrap', minWidth: 'max-content' }}>
        <Col style={{ minWidth: 80, fontWeight: 'bold' }}>长生:</Col>
        {zhangsheng.map((item, index) => (
          <Col key={index} style={{ minWidth: 80, textAlign: 'center' }}>{item}</Col>
        ))}
      </Row>

      {/* 纳音 - 省略重复代码，结构与长生类似 */}
      <Row gutter={8} style={{ flexWrap: 'nowrap', minWidth: 'max-content', marginTop: 12 }}>
        <Col style={{ minWidth: 80, fontWeight: 'bold' }}>纳音:</Col>
        {nayin.map((item, index) => (
          <Col key={index} style={{ minWidth: 80, textAlign: 'center' }}>{item}</Col>
        ))}
      </Row>

      {/* 其他行... 结构类似，省略重复代码 */}

      {/* 十神 - 省略重复代码，结构与长生类似 */}
      <Row gutter={8} style={{ flexWrap: 'nowrap', minWidth: 'max-content', marginTop: 12 }}>
        <Col style={{ minWidth: 80, fontWeight: 'bold' }}>十神:</Col>
        {shishen.map((item, index) => (
          <Col key={index} style={{ minWidth: 80, textAlign: 'center' }}>{item}</Col>
        ))}
      </Row>

      {/* 大运 - 省略重复代码，结构与长生类似 */}
      <Row gutter={8} style={{ flexWrap: 'nowrap', minWidth: 'max-content', marginTop: 12 }}>
        <Col style={{ minWidth: 80, fontWeight: 'bold' }}>大运:</Col>
        {dayun.map((item, index) => (
          <Col key={index} style={{ minWidth: 80, textAlign: 'center' }}>{item}</Col>
        ))}
      </Row>

      {/* 实岁 - 省略重复代码，结构与长生类似 */}
      <Row gutter={8} style={{ flexWrap: 'nowrap', minWidth: 'max-content', marginTop: 12 }}>
        <Col style={{ minWidth: 80, fontWeight: 'bold' }}>实岁:</Col>
        {shisui.map((item, index) => (
          <Col key={index} style={{ minWidth: 80, textAlign: 'center' }}>{item}</Col>
        ))}
      </Row>

      {/* 年份 - 省略重复代码，结构与长生类似 */}
      <Row gutter={8} style={{ flexWrap: 'nowrap', minWidth: 'max-content', marginTop: 12 }}>
        <Col style={{ minWidth: 80, fontWeight: 'bold' }}>年份:</Col>
        {years.map((item, index) => (
          <Col key={index} style={{ minWidth: 80, textAlign: 'center' }}>{item}</Col>
        ))}
      </Row>

      <LiunianDisplay liunian={liunian} birthdaySolar={eightCharInfo.birthdaySolar} />

    </div>
  );
};


/**
 * 更新大运流年数据，标记当前年份
 * @param dayunLiunian 原始大运流年数据
 * @param birthdaySolar 阳历出生日期，格式：YYYY-MM-DD HH:mm:ss
 * @returns 更新后的大运流年数据
 */
function updateDayunLiunian(dayunLiunian: string[][], birthdaySolar: string): string[][] {
  // 解析出生日期
  const [datePart, timePart] = birthdaySolar.split(' ');
  const [year, month, day] = datePart.split('-').map(Number);
  const [hour, minute, second] = (timePart || '00:00:00').split(':').map(Number);

  const birthSolar = Solar.fromYmdHms(year, month, day, hour, minute, second);

  // 获取当前日期
  const now = new Date();
  const currentSolar = Solar.fromYmdHms(
    now.getFullYear(),
    now.getMonth() + 1,
    now.getDate(),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds()
  );

  // 计算从出生到现在的总年数
  let totalYears = currentSolar.getYear() - birthSolar.getYear();

  // 如果当前日期还没过生日，减去1年
  if (
    currentSolar.getMonth() < birthSolar.getMonth() ||
    (currentSolar.getMonth() === birthSolar.getMonth() && currentSolar.getDay() < birthSolar.getDay())
  ) {
    totalYears--;
  }

  // 遍历大运流年数组，找到对应的位置
  let count = 0;
  let found = false;

  const updatedData = dayunLiunian.map((period, periodIndex) => {
    return period.map((ganzhi, ganzhiIndex) => {
      if (!found && count === totalYears) {
        found = true;
        return `*${ganzhi}`; // 标记当前年份
      }
      count++;
      return ganzhi;
    });
  });

  return updatedData;
}


