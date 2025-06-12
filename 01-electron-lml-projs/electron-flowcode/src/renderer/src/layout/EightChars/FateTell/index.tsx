import { Button, Card, Col, Descriptions, Modal, Radio, RadioChangeEvent, Row } from 'antd'
import React, { useState } from 'react'
import { InputNumber, Space } from 'antd';
import { Input, Image } from 'antd';
import { Divider, Flex, Tag } from 'antd';
import { TianGanDizhiColor } from '@renderer/common/utils'
import { CheckboxGroupProps } from 'antd/es/checkbox';

import {
  genTianGanShishenNode,
  genDizhiCangGanShishenNode,
  calculateECZhangSheng,
  genCangGan,
  CangGan,
  convertZhangShengStage,
  getSolarsFromEightChar
 } from './hooks/eightcharHooks';

// 1. 导入图片
import shierchangshengImg from '@renderer/assets/images/12长生.jpeg'; // 调整相对路径
import { EightCharInfo } from '@shared/@types/eightChar/eightCharInfo'
import { Solar } from 'lunar-typescript';

export default function index() {

  const [modal, contextHolder] = Modal.useModal();

  const [isModalOpenTianGan, setIsModalOpenTianGan] = useState(false);
  const [isModalOpenDizhi, setIsModalOpenDizhi] = useState(false);

  const [eightCharInfo, setEightCharInfo] = useState<EightCharInfo>({
    gender: '男',
    birthdaySolar: '', // 阳历生日
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
    },
    zhangSheng: ['长生', '长生', '长生', '长生'],
    kongWang: ['空亡', '空亡', '空亡', '空亡'],
    daYunLiuNian: []
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

  const updateGender = (gender: string) => {
    setEightCharInfo(prev => ({
      ...prev,
      gender: gender
    }));
  }

  const updateBirthdaySolar = (birthdaySolar: string) => {
    setEightCharInfo(prev => ({
      ...prev,
      birthdaySolar: birthdaySolar
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

  const updateZhangSheng = (zhangSheng: string[]) => {
    setEightCharInfo(prev => ({
      ...prev,
      zhangSheng
    }));
  };

  const onBrithYearChange = (birthdaySolar: string | null) => {
    updateBirthdaySolar(birthdaySolar as string)
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

    try {
      // 0.反推阳历时间，弹出modal让选择的出生的时间
      const solars = getSolarsFromEightChar(eightCharInfo.eightChar)
      showSelectSolarModal(solars)

      // 1.更新天干地支十神
      const cg: CangGan = genCangGan(eightCharInfo.eightChar)
      updateTianGanShishen(cg.TianGanCangGan)
      updateDiZhiShishen(cg.DizhiCangGan)

      // 2.更新天干地支十神的Node
      const tianGanShiShenNode = genTianGanShishenNode(eightCharInfo.eightChar)
      const diZhiShiShenNode = genDizhiCangGanShishenNode(eightCharInfo.eightChar)

      setTianGanShishenNode(tianGanShiShenNode)
      setDizhiShishenNode(diZhiShiShenNode)

      // 3.计算十二长生
      const zhangSheng = calculateECZhangSheng(eightCharInfo.eightChar)
      updateZhangSheng(zhangSheng)
    } catch (error) {
        const config = {
          title: '温馨提示',
          content: (
            <div>请选择八字</div>
          ),
        };
      modal.warning(config)
    }

  }

  // 展示选择出生的阳历时间
  const showSelectSolarModal = (solars: Solar[]) => {

    const style: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    };

    const option = solars.map(solar => {
      return {
        label: solar.toYmdHms(),
        value: solar.toYmdHms()
      }
    })

    const onChangeSolar = (e: RadioChangeEvent) => {
      console.log('选中阳历:', e.target.value)
      updateBirthdaySolar(e.target.value)
      modalInstance.destroy()
    }

    const modalInstance = modal.confirm({
      title: '选择出生的阳历时间',
      content: (
        <div>
          <Radio.Group
            style={style}
            defaultValue={solars.at(-1)?.toYmdHms()}
            onChange={onChangeSolar}
            options={option}
          />
        </div>
      ),
      onOk: () => {
        updateBirthdaySolar(solars.at(-1)?.toYmdHms() as string)
      }
    })
  }

  const zhangShengNode = (
    <Row>
      <Tag bordered={false} style={{ textAlign: 'center', width: '48px' }}>{convertZhangShengStage(eightCharInfo.zhangSheng[0])}</Tag>
      <Tag bordered={false} style={{ textAlign: 'center', width: '48px' }}>{convertZhangShengStage(eightCharInfo.zhangSheng[1])}</Tag>
      <Tag bordered={false} style={{ textAlign: 'center', width: '48px' }}>{convertZhangShengStage(eightCharInfo.zhangSheng[2])}</Tag>
      <Tag bordered={false} style={{ textAlign: 'center', width: '48px' }}>{convertZhangShengStage(eightCharInfo.zhangSheng[3])}</Tag>
    </Row>
  )


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
              <Row>性别：<Radio.Group block options={sexOptions} defaultValue="男" onChange={(e) => {updateGender(e.target.value)}} /> <Button color="primary" variant="filled" size='small' onClick={() => {handleClickPaiPan()}} >排盘</Button> </Row>
              {/* <Row>出生年：<InputNumber size="small" defaultValue={1900} onChange={onBrithYearChange}></InputNumber> </Row> */}
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

                  {zhangShengNode}
                  </Space>
                </Col>
              </Row>
              </Space>

            </Card>
          </Col>
          <Col span={8}>
            <Card title="十二长生" variant="borderless">
              {/* <Row>十二长生</Row> */}
              <Row>
                <Image width={500}  src={shierchangshengImg}  />
                胎0↑ 养1↑ 长生2↑ 沐浴3↑ 冠带4↑ 临官5↑ 帝旺6 衰4↓ 病3↓ 死2↓ 墓1↓ 绝0
              </Row>


            </Card>
          </Col>
          <Col span={8}>
            <Card title="纳音五行&命宫身宫" variant="borderless">
              <Descriptions title="纳音五行" items={getNayinWuXingItems()}/>

            </Card>
          </Col>
        </Row>
      </div>

     {contextHolder}
    </div>
  )
}


