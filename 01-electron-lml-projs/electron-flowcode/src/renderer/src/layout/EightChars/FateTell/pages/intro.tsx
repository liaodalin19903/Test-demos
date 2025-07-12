import { Button, Card, Col, Descriptions, Empty, Modal, Radio, RadioChangeEvent, Row, Select } from 'antd'
import React, { useState } from 'react'
import { InputNumber, Space } from 'antd';
import { Input, Image } from 'antd';
import { Divider, Flex, Tag } from 'antd';
import { TianGanDizhiColor } from '@renderer/common/utils'
import { CheckboxGroupProps } from 'antd/es/checkbox';

/*

getM1Ge
getM2Ge
getM3Ge
getM4Ge

getM5GeZhuanwang
getM5GeCongruoCongshi
getM5GeCongruoCongqi
getM5GeHuaqi
getM5GeQita
*/

import { getM1Ge } from '@renderer/layout/EightChars/FateTell/hooks/needJudge/geJu/m1'
import { getM2Ge } from '@renderer/layout/EightChars/FateTell/hooks/needJudge/geJu/m2'
import { getM3Ge } from '@renderer/layout/EightChars/FateTell/hooks/needJudge/geJu/m3'
import { getM4Ge } from '@renderer/layout/EightChars/FateTell/hooks/needJudge/geJu/m4'
import {
  getM5GeZhuanwang,
  getM5GeCongruoCongshi,
  getM5GeCongruoCongqi,
  getM5GeHuaqi,
  getM5GeQita
 } from '@renderer/layout/EightChars/FateTell/hooks/needJudge/geJu/m5'


import { Typography } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

import {
  genTianGanShishenNode,
  genDizhiCangGanShishenNode,

  genCangGan,
  CangGanShishen,

  getSolarsFromEightChar
 } from '../hooks/eightcharHooks';

import {
  calculateECZhangSheng,
  convertZhangShengStage,
} from '../hooks/zhangshengHooks'

import {
  getNayinWuXingItems,
} from '../hooks/nayinHooks'

import {
  getDayunLiunian
} from '../hooks/dayunLiunianHooks'

// 1. 导入图片
import shierchangshengImg from '@renderer/assets/images/12长生.jpeg'; // 调整相对路径
import { DaYunItem, EightCharInfo, TianganDizhiChar } from '@shared/@types/eightChar/eightCharInfo'
import { Solar } from 'lunar-typescript';
import { DayunLiunianNode } from '../components/DayunLiunianNode';
import { getShenqiangruoScore, getShenqiangruoTitle } from '../hooks/needJudge/shenqiangruo';
import { GeType } from '@shared/@types/eightChar/geju';
import { genFuYiYongshenNode } from '../hooks/needJudge/yongshen/fuyiyongshen';

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
    canggan:[], // 地支藏干
    shishen: {
      tianGanShiShen: [],
      dizhiShiShen: []
    },
    zhangSheng: ['长生', '长生', '长生', '长生'],
    kongWang: ['空亡', '空亡', '空亡', '空亡'],
    dayunLiunians: [],
    shenqiangruo: undefined, // 身强身弱:1~5 从强~从弱
    geju: {
      recommend: {
        m1: [],
        m2: [],
        m3: [],
        m4: [],
        m5_1: [],
        m5_2: [],
        m5_3: [],
        m5_4: [],
        m5_5: []
      },
      selected: [],
      choosen: undefined,
    },
    yongshen: [], // 用神
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

  const updateDizhiCangGan = (canggan: string[][]) => {
    setEightCharInfo(prev => ({
      ...prev,
      canggan: canggan
    }));
  }

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

  const updateDayunLiunian = (dayunLiunians: DaYunItem[]) => {
    setEightCharInfo(prev => ({
      ...prev,
      dayunLiunians: dayunLiunians
    }));
  };

  const updateShenqiangruo = (shenqiangruo: number) => {
    setEightCharInfo(prev => ({
      ...prev,
      shenqiangruo: shenqiangruo
    }));
  };

  const updateGejuRecommend = (
    m1: GeType[],
    m2: GeType[],
    m3: GeType[],
    m4: GeType[],
    m5_1: GeType[],
    m5_2: GeType[],
    m5_3: GeType[],
    m5_4: GeType[],
    m5_5: GeType[],
  ) => {
    setEightCharInfo(prev => ({
      ...prev,
      geju: {
        recommend: {
          m1,
          m2,
          m3,
          m4,
          m5_1,
          m5_2,
          m5_3,
          m5_4,
          m5_5
        },
        selected: [],
        choosen: prev.geju.choosen
      }
    }));
  }

  // 选择格局
  const updateGejuSelected = (selectedGeju: GeType) => {
    setEightCharInfo(prev => {
      const { selected } = prev.geju;
      const isSelected = selected.includes(selectedGeju);

      return {
        ...prev,
        geju: {
          ...prev.geju,
          selected: isSelected
            ? selected.filter(item => item !== selectedGeju)
            : [...selected, selectedGeju]
        }
      };
    });
  };

  // 最终确定格局
  const updateGejuChoosen = (choosenGeju: GeType) => {
    setEightCharInfo(prev => ({
      ...prev,
      geju: {
        ...prev.geju,
        choosen: choosenGeju
      }
    }));
  }

  const updateYongshen = (yongshen: TianganDizhiChar[]) => {
    setEightCharInfo(prev => ({
      ...prev,
      yongshen: yongshen
    }));
  };

  const onBrithYearChange = (birthdaySolar: string | null) => {
    updateBirthdaySolar(birthdaySolar as string)
  };


  const onClickChar = (index: number) => {
    updateEditingIndex(index)

    if(index > 0 && index < 5) {
      setIsModalOpenTianGan(true)
    }else {
      setIsModalOpenDizhi(true)
    }
  };

  const onChooseCharTianGan = (TianGan: string) => {
    // 1~10: 甲~癸
    setIsModalOpenTianGan(false)
    updateChar(eightCharInfo.editingIndex, TianGan)
    updateEditingIndex(0)
  }

  const onChooseCharDizhi = (Dizhi: string) => {
    // 1~12: 子~亥
    setIsModalOpenDizhi(false)
    updateChar(eightCharInfo.editingIndex, Dizhi)
    updateEditingIndex(0)
  }

  // 排盘
  const handleClickPaiPan = () => {

    try {
      // 0.反推阳历时间，弹出modal让选择的出生的时间
      const solars = getSolarsFromEightChar(eightCharInfo.eightChar)
      showSelectSolarModal(solars)

      // 1.更新天干地支十神
      const cg: CangGanShishen = genCangGan(eightCharInfo.eightChar)
      updateTianGanShishen(cg.TianganShishen)
      updateDizhiCangGan(cg.DizhiCanggan)
      updateDiZhiShishen(cg.DizhiShishen)

      // 2.更新天干地支十神的Node
      const tianGanShiShenNode = genTianGanShishenNode(eightCharInfo.eightChar)
      const diZhiShiShenNode = genDizhiCangGanShishenNode(eightCharInfo.eightChar)

      setTianGanShishenNode(tianGanShiShenNode)
      setDizhiShishenNode(diZhiShiShenNode)

      // 3.计算十二长生
      const zhangSheng = calculateECZhangSheng(eightCharInfo.eightChar)
      updateZhangSheng(zhangSheng)

      // 4.大运流年
      const dayunLiunian = getDayunLiunian(eightCharInfo)
      updateDayunLiunian(dayunLiunian)

    } catch (error) {
      /*
        const config = {
          title: '温馨提示',
          content: (
            <div>请选择出生时间</div>
          ),
        };
      modal.warning(config)
      */
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

  // 点击推荐格局按钮
  const handleClickRecommandGeju = () => {
    console.log('点击推荐格局按钮', eightCharInfo.shishen )

    if(eightCharInfo.shishen.dizhiShiShen.length === 0) {
      return
    }

    const m1 = getM1Ge(eightCharInfo.shishen)
    const m2 = getM2Ge(eightCharInfo.eightChar, eightCharInfo.shishen)
    const m3 = getM3Ge(eightCharInfo.eightChar, eightCharInfo.shishen)
    const m4 = getM4Ge(eightCharInfo.eightChar, eightCharInfo.shishen)
    const m5_1 = getM5GeZhuanwang(eightCharInfo.eightChar)
    const m5_2 = getM5GeCongruoCongshi(eightCharInfo.eightChar, eightCharInfo.shishen)
    const m5_3 = getM5GeCongruoCongqi(eightCharInfo.eightChar, eightCharInfo.shishen)
    const m5_4 = getM5GeHuaqi(eightCharInfo.eightChar, eightCharInfo.shishen)
    const m5_5 = getM5GeQita(eightCharInfo.eightChar, eightCharInfo.shishen)

    updateGejuRecommend(m1, m2, m3, m4, m5_1, m5_2, m5_3, m5_4, m5_5)
  }

  // 点击推荐用神
  const handleClickRecommandYongshen = () => {

  }

  // 点击每个格局按钮 (我觉得没有必要设定：因为选取时候是一个实验估计)
  const handleClickGejuButton = (ge: GeType) => {
    updateGejuSelected(ge)
  }

  // 设定格局
  const handleChangeGejuChoosen = (geju: GeType[]) => {

    updateGejuChoosen(geju[0])
  }

  const gejuSelectOptions = [
    {
      label: <span>正八格</span>,
      title: '正八格',
      options: [
        { label: <span>正官格</span>, value: '正官格' },
        { label: <span>七杀格</span>, value: '七杀格' },
        { label: <span>正财格</span>, value: '正财格' },
        { label: <span>偏财格</span>, value: '偏财格' },
        { label: <span>正印格</span>, value: '正印格' },
        { label: <span>偏印格</span>, value: '偏印格' },
        { label: <span>食神格</span>, value: '食神格' },
        { label: <span>伤官格</span>, value: '伤官格' },
      ],
    },
    {
      label: <span>禄刃格</span>,
      title: '禄刃格',
      options: [
        { label: <span>建禄格</span>, value: '建禄格' },
        { label: <span>阳刃格</span>, value: '阳刃格' },
      ],
    },
    {
      label: <span>专旺格</span>,
      title: '专旺格',
      options: [
        { label: <span>曲直格</span>, value: '曲直格' },
        { label: <span>炎上格</span>, value: '炎上格' },
        { label: <span>稼穑格</span>, value: '稼穑格' },
        { label: <span>从革格</span>, value: '从革格' },
        { label: <span>润下格</span>, value: '润下格' },
      ],
    },
    {
      label: <span>从神格</span>,
      title: '从神格',
      options: [
        { label: <span>从财格</span>, value: '从财格' },
        { label: <span>从官格</span>, value: '从官格' },
        { label: <span>从煞格</span>, value: '从煞格' },
        { label: <span>从儿格</span>, value: '从儿格' },
        { label: <span>财官食伤均势格</span>, value: '财官食伤均势格' }
      ],
    },
    {
      label: <span>从气格</span>,
      title: '从气格',
      options: [
        { label: <span>从火气格</span>, value: '从火气格' },
        { label: <span>从木气格</span>, value: '从木气格' },
        { label: <span>从土气格</span>, value: '从土气格' },
        { label: <span>从金气格</span>, value: '从金气格' },
        { label: <span>从水气格</span>, value: '从水气格' },
      ],
    },
    {
      label: <span>化格</span>,
      title: '化格',
      options: [
        { label: <span>化土格</span>, value: '化土格' },
        { label: <span>化木格</span>, value: '化木格' },
        { label: <span>化金格</span>, value: '化金格' },
        { label: <span>化水格</span>, value: '化水格' },
        { label: <span>化火格</span>, value: '化火格' },
      ],
    },
    {
      label: <span>魁罡格</span>,
      title: '魁罡格',
      options: [
        { label: <span>土魁罡格</span>, value: '土魁罡格' },
        { label: <span>庚辰金魁罡格</span>, value: '庚辰金魁罡格' },
        { label: <span>庚戌金魁罡格</span>, value: '庚戌金魁罡格' },
        { label: <span>水魁罡格</span>, value: '水魁罡格' },
      ],
    },
    {
      label: <span>其他格</span>,
      title: '其他格',
      options: [
        { label: <span>金神格</span>, value: '金神格' },
      ],
    },
  ]

  // 设定用神
  const handleChangeYongshenSelect = (yongshen: TianganDizhiChar[]) => {
    updateYongshen(yongshen)
  }

  const yongshenSelectOptions = [
     {
      label: <span>天干</span>,
      title: '天干',
      options: [
        { label: <span>甲</span>, value: '甲' },
        { label: <span>乙</span>, value: '乙' },
        { label: <span>丙</span>, value: '丙' },
        { label: <span>丁</span>, value: '丁' },
        { label: <span>戊</span>, value: '戊' },
        { label: <span>己</span>, value: '己' },
        { label: <span>庚</span>, value: '庚' },
        { label: <span>辛</span>, value: '辛' },
        { label: <span>壬</span>, value: '壬' },
        { label: <span>癸</span>, value: '癸' },
      ],
    },
     {
      label: <span>地支</span>,
      title: '地支',
      options: [
        { label: <span>子</span>, value: '子' },
        { label: <span>丑</span>, value: '丑' },
        { label: <span>寅</span>, value: '寅' },
        { label: <span>卯</span>, value: '卯' },
        { label: <span>辰</span>, value: '辰' },
        { label: <span>巳</span>, value: '巳' },
        { label: <span>午</span>, value: '午' },
        { label: <span>未</span>, value: '未' },
        { label: <span>申</span>, value: '申' },
        { label: <span>酉</span>, value: '酉' },
        { label: <span>戌</span>, value: '戌' },
        { label: <span>亥</span>, value: '亥' },
      ],
    },
  ]

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

          <Col span={16}>
            <Card>
              <Row>
                <Col span={24}>
                  <Card title={getShenqiangruoTitle(eightCharInfo.shenqiangruo)} variant="borderless">
                    <Descriptions layout="vertical" column={2} >
                      <Descriptions.Item label='判断方式1：50为界线法'>
                        大于50:身强；小于50:身弱
                      </Descriptions.Item>
                      <Descriptions.Item label='判断方式2：四柱八字分值法'>
                        小于40:身弱；40~60:中庸；大于60:身强
                      </Descriptions.Item>
                      <Descriptions.Item label='得分'><Text type='warning'>{getShenqiangruoScore(eightCharInfo.eightChar)}</Text></Descriptions.Item>
                      <Descriptions.Item label='选择'>
                      <Radio.Group
                        value={eightCharInfo.shenqiangruo}
                        options={[
                          { value: '从强', label: '从强' },
                          { value: '身强', label: '身强' },
                          { value: '均衡', label: '均衡' },
                          { value: '身弱', label: '身弱' },
                          { value: '从弱', label: '从弱' },
                        ]}
                        onChange={(e) => {updateShenqiangruo(e.target.value)}}
                      />
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Card title={
                    <>
                    取格局: <span style={{ color: 'red' }}>{eightCharInfo.geju.choosen ?? '' }</span>
                    </>
                  } variant="borderless">
                    <Descriptions layout="vertical" column={1} >
                      <Descriptions.Item label="格局选择">
                          <Select
                            mode="multiple"
                            maxCount={1}
                            style={{ width: 200 }}
                            onChange={handleChangeGejuChoosen}
                            options={gejuSelectOptions}
                          />
                      </Descriptions.Item>

                      <Descriptions.Item label="">
                        <Button color="primary" variant="solid" onClick={() => {
                          handleClickRecommandGeju()
                        }}>点击推荐</Button>
                      </Descriptions.Item>

                      {/*  */}
                      <Descriptions.Item label="M1推荐格局(天透地藏)">
                        <Space size='small' direction='horizontal'>

                        {eightCharInfo.geju.recommend.m1.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}
                        </Space>
                      </Descriptions.Item>

                      {/*  */}
                      <Descriptions.Item label="M2推荐格局(四见)">
                        {eightCharInfo.geju.recommend.m2.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}
                      </Descriptions.Item>

                      {/*  */}
                      <Descriptions.Item label="M3推荐格局(阴阳相见)">
                        {eightCharInfo.geju.recommend.m3.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}
                      </Descriptions.Item>

                      {/*  */}
                      <Descriptions.Item label="M4推荐格局(三合三会)">
                        {eightCharInfo.geju.recommend.m4.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}
                      </Descriptions.Item>

                      {/*  */}
                      <Descriptions.Item label="M5推荐格局(特殊格局)">
                        {eightCharInfo.geju.recommend.m5_1.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}

                        {eightCharInfo.geju.recommend.m5_2.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}

                        {eightCharInfo.geju.recommend.m5_3.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}

                        {eightCharInfo.geju.recommend.m5_4.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}

                        {eightCharInfo.geju.recommend.m5_5.map((gejuItem: GeType) => (
                          <Button
                            size='small'
                            key={gejuItem}
                            variant='filled'
                            color={eightCharInfo.geju.selected.includes(gejuItem) ? 'primary' : 'default'}
                            onClick={() => updateGejuSelected(gejuItem)}
                          >
                            {gejuItem}
                          </Button>
                        ))}
                      </Descriptions.Item>

                    </Descriptions>
                  </Card>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <Card
                    title={
                      <>
                        取用神: <span style={{ color: 'red' }}>{eightCharInfo.yongshen?.join('、') ?? ''}</span>
                      </>
                    }
                    variant="borderless"
                  >
                    <Descriptions layout="vertical" column={1} >

                      <Descriptions.Item label="用神选择">
                        <Select
                          mode="multiple"
                          maxCount={3}
                          style={{ width: 200 }}
                          onChange={handleChangeYongshenSelect}
                          options={yongshenSelectOptions}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="">
                        <Button color="primary" variant="solid" onClick={() => {
                          handleClickRecommandYongshen()
                        }}>点击推荐</Button>
                      </Descriptions.Item>

                      <Descriptions.Item label="扶抑用神">
                      {genFuYiYongshenNode(eightCharInfo.eightChar, eightCharInfo.shenqiangruo!)}
                      </Descriptions.Item>

                      <Descriptions.Item label="病药用神">
                      111
                      </Descriptions.Item>
                      <Descriptions.Item label="调候用神">
                      111
                      </Descriptions.Item>

                      <Descriptions.Item label="通关用神">
                      111
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>

        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Card title="纳音五行&命宫身宫" variant="borderless">

              {
                eightCharInfo.birthdaySolar === '' ? <Empty/> :
                <Descriptions layout="vertical" column={4} bordered title="纳音五行" items={getNayinWuXingItems(eightCharInfo)}/>
              }
            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Card title="十二长生" variant="borderless">
              {/* <Row>十二长生</Row> */}
              <Row>
                <Image width={500}  src={shierchangshengImg}  />
                胎0↑ 养1↑ 长生2↑ 沐浴3↑ 冠带4↑ 临官5↑ 帝旺6 衰4↓ 病3↓ 死2↓ 墓1↓ 绝0
              </Row>


            </Card>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={24}>
            <Card title="大运流年" variant="borderless">

              {
                eightCharInfo.birthdaySolar === '' ? <Empty/> :  <DayunLiunianNode eightCharInfo={eightCharInfo} />
              }
            </Card>
          </Col>
        </Row>
      </div>

     {contextHolder}
    </div>
  )
}


