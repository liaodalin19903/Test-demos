import { Button, Card, Col, Modal, Radio, Row } from 'antd'
import React, { useState } from 'react'
import { InputNumber, Space } from 'antd';
import { Input } from 'antd';
import { Divider, Flex, Tag } from 'antd';
import { TianGanDizhiColor } from '@renderer/common/utils'
import { CheckboxGroupProps } from 'antd/es/checkbox';

import { genTianGanShishenNode, genDizhiCangGanShishenNode } from './hooks/eightcharHooks';

// 定义状态类型
export type EightCharInfo = {
  sex: string;
  year: number;
  editingIndex: number;
  eightChar: {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
  };
  shishen: {
    tianGanShiShen: string[]; // 显式声明为字符串数组
    dizhiShiShen: string[][];   // 显式声明为字符串数组
  };
};
export default function index() {

  const [isModalOpenTianGan, setIsModalOpenTianGan] = useState(false);
  const [isModalOpenDizhi, setIsModalOpenDizhi] = useState(false);

  const [eightCharInfo, setEightCharInfo] = useState<EightCharInfo>({
    sex: '男',
    year: 1900,
    editingIndex: 0,
    eightChar: {
      1: '甲',
      2: '甲',
      3: '甲',
      4: '甲',
      5: '子',
      6: '子',
      7: '子',
      8: '子'
    },
    shishen: {
      tianGanShiShen: [],
      dizhiShiShen: []
    }
  })

  const [tianGanShishenNode, setTianGanShishenNode] = useState(
    <Row>
      <Tag bordered={false} style={{ width: '48px', textAlign: 'center' }}>年柱</Tag>
      <Tag bordered={false} style={{ width: '48px', textAlign: 'center' }}>月柱</Tag>
      <Tag bordered={false} style={{ width: '48px', textAlign: 'center' }}>日柱</Tag>
      <Tag bordered={false} style={{ width: '48px', textAlign: 'center' }}>时柱</Tag>
    </Row>
  )
  const [diZhiShishenNode, setDizhiShishenNode] = useState(
    <Space direction="vertical" size={8}>
      <Row>
      <Tag bordered={false} style={{ fontSize: '10px', width: '48px' }}>子 藏干</Tag>
      <Tag bordered={false} style={{ fontSize: '10px', width: '48px' }}>子 藏干</Tag>
      <Tag bordered={false} style={{ fontSize: '10px', width: '48px' }}>子 藏干</Tag>
      <Tag bordered={false} style={{ fontSize: '10px', width: '48px' }}>子 藏干</Tag>
      </Row>
    </Space>
  )

   const sexOptions: CheckboxGroupProps<string>['options'] = [
    { label: '男', value: '男' },
    { label: '女', value: '女' },
  ];

  const updateSex = (sex: string) => {
    setEightCharInfo(prev => ({
      ...prev,
      sex: sex
    }));
  }

  const updateBirthYear = (year: number) => {
    setEightCharInfo(prev => ({
      ...prev,
      updateBirthYear: year
    }));
  };
  const updateEditingIndex = (index: number) => {
    setEightCharInfo(prev => ({
      ...prev,
      editingIndex: index
    }));
  };

  const updateChar = (key, value) => {
    setEightCharInfo(prev => ({
      ...prev,
      eightChar: {
        ...prev.eightChar,
        [key]: value
      }
    }));
  };

  const updateTianGanShishen = (tianGanShishen: string[]) => {
    setEightCharInfo(prev => ({
      ...prev,
      shishen: {
        ...prev.shishen,
        tianGanShiShen: tianGanShishen
      }
    }));
  };

  const updateDiZhiShishen = (dizhiShishen: string[][]) => {
    setEightCharInfo(prev => ({
      ...prev,
      shishen: {
        ...prev.shishen,
        dizhiShiShen: dizhiShishen
      }
    }));
  };
  const onBrithYearChange = (value: number | null) => {
    console.log('changed', value);
    updateBirthYear(value as number)
  };

  const onClickChar = (index: number) => {
    console.log('clicked', index);
    updateEditingIndex(index)

    if(index > 0 && index < 5) {
      setIsModalOpenTianGan(true)
    }else {
      setIsModalOpenDizhi(true)
    }
  };

  const onChooseCharTianGan = (TianGan: string) => {
    console.log('TianGan:', TianGan)
    // 1~10: 甲~癸
    setIsModalOpenTianGan(false)
    updateChar(eightCharInfo.editingIndex, TianGan)
    updateEditingIndex(0)
  }

  const onChooseCharDizhi = (Dizhi: string) => {
    console.log('Dizhi:', Dizhi)
    // 1~12: 子~亥
    setIsModalOpenDizhi(false)
    updateChar(eightCharInfo.editingIndex, Dizhi)
    updateEditingIndex(0)
  }

  const handleClickPaiPan = () => {
    console.log('点击排盘')

    const tianGanShiShenNode = genTianGanShishenNode(eightCharInfo.eightChar)
    const diZhiShiShenNode = genDizhiCangGanShishenNode(eightCharInfo.eightChar)

    setTianGanShishenNode(tianGanShiShenNode)
    setDizhiShishenNode(diZhiShiShenNode)
  }



  return (
    <div>

      <div>
        {/* 选择天干 */}
        <Modal
          title="选择天干"
          open={isModalOpenTianGan}
          onCancel={() => setIsModalOpenTianGan(false)}
          onOk={() => setIsModalOpenTianGan(false)}
        >
          <Space direction="vertical" size={8}>

            <Row>
              <Tag key={1} color="green" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('甲')}}>甲</Tag>
              <Tag key={2} color="red" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('丙')}}>丙</Tag>
              <Tag key={3} color="orange" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('戊')}}>戊</Tag>
              <Tag key={4} color="geekblue" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('庚')}}>庚</Tag>
              <Tag key={5} color="#7e7e7e" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('壬')}}>壬</Tag>
            </Row>

            <Row>
              <Tag key={6} color="green" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('乙')}}>乙</Tag>
              <Tag key={7} color="red" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('丁')}}>丁</Tag>
              <Tag key={8} color="orange" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('己')}}>己</Tag>
              <Tag key={9} color="geekblue" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('辛')}}>辛</Tag>
              <Tag key={10} color="#7e7e7e" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharTianGan('癸')}}>癸</Tag>
            </Row>

          </Space>

        </Modal>

        {/* 选择地支 */}
        <Modal
          title="选择地支"
          open={isModalOpenDizhi}
          onCancel={() => setIsModalOpenDizhi(false)}
          onOk={() => setIsModalOpenDizhi(false)}
        >
          <Space direction="vertical" size={8}>
            <Row>
              <Tag key={1} color="#7e7e7e" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('子')}}>子</Tag>
              <Tag key={2} color="green" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('寅')}}>寅</Tag>
              <Tag key={3} color="orange" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('辰')}}>辰</Tag>
              <Tag key={4} color="red" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('午')}}>午</Tag>
              <Tag key={5} color="geekblue" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('申')}}>申</Tag>
              <Tag key={6} color="orange" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('戌')}}>戌</Tag>
            </Row>

            <Row>
              <Tag key={7} color="orange" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('丑')}}>丑</Tag>
              <Tag key={8} color="green" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('卯')}}>卯</Tag>
              <Tag key={9} color="red" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('巳')}}>巳</Tag>
              <Tag key={10} color="orange" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('未')}}>未</Tag>
              <Tag key={11} color="geekblue" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('酉')}}>酉</Tag>
              <Tag key={12} color="#7e7e7e" bordered={true} style={{ width: '40px',height: '40px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onChooseCharDizhi('亥')}}>亥</Tag>
            </Row>
          </Space>

        </Modal>
      </div>

      <div>
         <Row gutter={16}>
          <Col span={8}>
            <Card title="八字信息" variant="borderless">

              <Space direction='vertical' size={8}>
              <Row>性别：<Radio.Group block options={sexOptions} defaultValue="男" onChange={(e) => {updateSex(e.target.value)}} /></Row>
              <Row>出生年：<InputNumber size="small" defaultValue={1900} onChange={onBrithYearChange}></InputNumber> <Button color="primary" variant="filled" size='small' onClick={() => {handleClickPaiPan()}} >排盘</Button></Row>
              <Row><br></br></Row>
              <Row>
                <Col>
                <Space direction="vertical" size={8}>
                  {tianGanShishenNode}

                  {/* 天干 */}
                  <Row>
                  <Tag key={1} color={TianGanDizhiColor(eightCharInfo.eightChar[1])} bordered={true} style={{ width: '48px',height: '48px', fontSize: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onClickChar(1)}}>{eightCharInfo.eightChar[1]}</Tag>
                  <Tag key={2} color={TianGanDizhiColor(eightCharInfo.eightChar[2])} bordered={true} style={{ width: '48px',height: '48px', fontSize: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onClickChar(2)}}>{eightCharInfo.eightChar[2]}</Tag>
                  <Tag key={3} color={TianGanDizhiColor(eightCharInfo.eightChar[3])} bordered={true} style={{ width: '48px',height: '48px', fontSize: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onClickChar(3)}}>{eightCharInfo.eightChar[3]}</Tag>
                  <Tag key={4} color={TianGanDizhiColor(eightCharInfo.eightChar[4])} bordered={true} style={{ width: '48px',height: '48px', fontSize: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onClickChar(4)}}>{eightCharInfo.eightChar[4]}</Tag>
                  </Row>

                  {/* 地支 */}
                  <Row>
                  <Tag key={5} color={TianGanDizhiColor(eightCharInfo.eightChar[5])} bordered={true} style={{ width: '48px',height: '48px', fontSize: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onClickChar(5)}}>{eightCharInfo.eightChar[5]}</Tag>
                  <Tag key={6} color={TianGanDizhiColor(eightCharInfo.eightChar[6])} bordered={true} style={{ width: '48px',height: '48px', fontSize: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onClickChar(6)}}>{eightCharInfo.eightChar[6]}</Tag>
                  <Tag key={7} color={TianGanDizhiColor(eightCharInfo.eightChar[7])} bordered={true} style={{ width: '48px',height: '48px', fontSize: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onClickChar(7)}}>{eightCharInfo.eightChar[7]}</Tag>
                  <Tag key={8} color={TianGanDizhiColor(eightCharInfo.eightChar[8])} bordered={true} style={{ width: '48px',height: '48px', fontSize: '16px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => {onClickChar(8)}}>{eightCharInfo.eightChar[8]}</Tag>
                  </Row>

                  {diZhiShishenNode}
                  </Space>
                </Col>
              </Row>
              </Space>

            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" variant="borderless">
              Card content
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Card title" variant="borderless">
              Card content
            </Card>
          </Col>
        </Row>
      </div>


    </div>
  )
}


