import { Row, Space, Tag } from "antd";
import { Solar, Lunar, EightChar as LTEightChar } from "lunar-typescript";

import { TianGanDizhiColor } from '@renderer/common/utils'
import { DaYunItem } from "@shared/@types/eightChar/eightCharInfo";

export const CANG_GAN_MAP: Record<string, string[]> = {
  '子': ['癸'],
  '丑': ['己', '癸', '辛'],
  '寅': ['甲', '丙', '戊'],
  '卯': ['乙'],
  '辰': ['戊', '乙', '癸'],
  '巳': ['丙', '戊', '庚'],
  '午': ['丁', '己'],
  '未': ['己', '丁', '乙'],
  '申': ['庚', '壬', '戊'],
  '酉': ['辛'],
  '戌': ['戊', '辛', '丁'],
  '亥': ['壬', '甲']
};

// 天干五行属性
const TIAN_GAN_WU_XING: Record<string, string> = {
  '甲': '木', '乙': '木',
  '丙': '火', '丁': '火',
  '戊': '土', '己': '土',
  '庚': '金', '辛': '金',
  '壬': '水', '癸': '水'
};

// 地支五行属性
const DI_ZHI_WU_XING: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
  '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
  '戌': '土', '亥': '水'
};

// 十神关系表（以日元为键，其他天干为值）
const SHI_SHEN_RELATION: Record<string, Record<string, string>> = {
  '甲': { '甲': '比肩', '乙': '劫财', '丙': '食神', '丁': '伤官',
         '戊': '偏财', '己': '正财', '庚': '七杀', '辛': '正官',
         '壬': '偏印', '癸': '正印' },
  '乙': { '甲': '劫财', '乙': '比肩', '丙': '伤官', '丁': '食神',
         '戊': '正财', '己': '偏财', '庚': '正官', '辛': '七杀',
         '壬': '正印', '癸': '偏印' },
  '丙': { '甲': '偏印', '乙': '正印', '丙': '比肩', '丁': '劫财',
         '戊': '食神', '己': '伤官', '庚': '偏财', '辛': '正财',
         '壬': '七杀', '癸': '正官' },
  '丁': { '甲': '正印', '乙': '偏印', '丙': '劫财', '丁': '比肩',
         '戊': '伤官', '己': '食神', '庚': '正财', '辛': '偏财',
         '壬': '正官', '癸': '七杀' },
  '戊': { '甲': '七杀', '乙': '正官', '丙': '偏印', '丁': '正印',
         '戊': '比肩', '己': '劫财', '庚': '食神', '辛': '伤官',
         '壬': '偏财', '癸': '正财' },
  '己': { '甲': '正官', '乙': '七杀', '丙': '正印', '丁': '偏印',
         '戊': '劫财', '己': '比肩', '庚': '伤官', '辛': '食神',
         '壬': '正财', '癸': '偏财' },
  '庚': { '甲': '偏财', '乙': '正财', '丙': '七杀', '丁': '正官',
         '戊': '偏印', '己': '正印', '庚': '比肩', '辛': '劫财',
         '壬': '食神', '癸': '伤官' },
  '辛': { '甲': '正财', '乙': '偏财', '丙': '正官', '丁': '七杀',
         '戊': '正印', '己': '偏印', '庚': '劫财', '辛': '比肩',
         '壬': '伤官', '癸': '食神' },
  '壬': { '甲': '食神', '乙': '伤官', '丙': '偏财', '丁': '正财',
         '戊': '七杀', '己': '正官', '庚': '偏印', '辛': '正印',
         '壬': '比肩', '癸': '劫财' },
  '癸': { '甲': '伤官', '乙': '食神', '丙': '正财', '丁': '偏财',
         '戊': '正官', '己': '七杀', '庚': '正印', '辛': '偏印',
         '壬': '劫财', '癸': '比肩' }
};

/**
 * 从1开始
 * eg.
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
 */
export interface EightChar {
  [key: string]: string;
}


export interface CangGanShishen {
  TianganShishen: string[];
  DizhiCanggan: string[][];
  DizhiShishen: string[][];
}

// 生成地支藏干的展示节点
export const genCangGan = (eightChar: EightChar): CangGanShishen => {
  // 提取天干 (1-4) 和地支 (5-8)
  const tianGan = [eightChar['1'], eightChar['2'], eightChar['3'], eightChar['4']];
  const diZhi = [eightChar['5'], eightChar['6'], eightChar['7'], eightChar['8']];

  // 确定日元（第三柱天干）
  const riYuan = tianGan[2];

  // 计算天干对应的十神
  const tianGanShishen = tianGan.map((gan, index) =>
    index === 2 ? '日元' : SHI_SHEN_RELATION[riYuan][gan]
  );

  // 计算地支藏干及其十神
  const dizhiCangGan = diZhi.map(diZhiChar =>
    CANG_GAN_MAP[diZhiChar] || []
  );

  const dizhiShishen = dizhiCangGan.map(cangGans =>
    cangGans.map(gan => SHI_SHEN_RELATION[riYuan][gan])
  );

  return {
    TianganShishen: tianGanShishen,
    DizhiCanggan: dizhiCangGan,
    DizhiShishen: dizhiShishen
  };
};

export const genTianGanShishenNode = (eightChar: EightChar) => {

   // 步骤1：通过八字 算出天干和地支的藏干
  const cg: CangGanShishen = genCangGan(eightChar)

  const tianganNode =
  (
    <Row>
    <Tag bordered={false} style={{ width: '48px', textAlign: 'center' }}>{cg.TianganShishen[0]}</Tag>
    <Tag bordered={false} style={{ width: '48px', textAlign: 'center' }}>{cg.TianganShishen[1]}</Tag>
    <Tag bordered={false} style={{ width: '48px', textAlign: 'center' }}>{cg.TianganShishen[2]}</Tag>
    <Tag bordered={false} style={{ width: '48px', textAlign: 'center' }}>{cg.TianganShishen[3]}</Tag>
    </Row>
  )

  return tianganNode

}

// 通过藏干，获取到颜色
export const getCangGanColor = (canggan: string) => {
  const color = TianGanDizhiColor(canggan[0])
  return color
}

export const genDizhiCangGanShishenNode = (eightChar: EightChar) => {
  // 步骤1：通过八字 算出天干和地支的藏干
  const cg: CangGanShishen = genCangGan(eightChar)

  // 步骤2：生成地支藏干节点
  const dizhiNode = (
    <Space direction="vertical" size={8}>
      <Row>
      <Tag bordered={false} color={getCangGanColor(cg.DizhiCanggan[0][0])} style={{ fontSize: '10px', width: '48px' }}>{cg.DizhiCanggan[0][0]} {cg.DizhiShishen[0][0]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[1][0] ? getCangGanColor(cg.DizhiCanggan[1][0]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[1][0] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[1][0]} {cg.DizhiShishen[1][0]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[2][0] ? getCangGanColor(cg.DizhiCanggan[2][0]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[2][0] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[2][0]} {cg.DizhiShishen[2][0]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[3][0] ? getCangGanColor(cg.DizhiCanggan[3][0]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[3][0] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[3][0]} {cg.DizhiShishen[3][0]}</Tag>
      </Row>

      <Row>
      <Tag bordered={false} color={getCangGanColor(cg.DizhiCanggan[0][1])} style={{ fontSize: '10px', width: '48px' }}>{cg.DizhiCanggan[0][1]} {cg.DizhiShishen[0][1]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[1][1] ? getCangGanColor(cg.DizhiCanggan[1][1]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[1][1] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[1][1]} {cg.DizhiShishen[1][1]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[2][1] ? getCangGanColor(cg.DizhiCanggan[2][1]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[2][1] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[2][1]} {cg.DizhiShishen[2][1]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[3][1] ? getCangGanColor(cg.DizhiCanggan[3][1]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[3][1] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[3][1]} {cg.DizhiShishen[3][1]}</Tag>
      </Row>

      <Row>
      <Tag bordered={false} color={getCangGanColor(cg.DizhiCanggan[0][2])} style={{ fontSize: '10px', width: '48px' }}>{cg.DizhiCanggan[0][2]} {cg.DizhiShishen[0][2]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[1][2] ? getCangGanColor(cg.DizhiCanggan[1][2]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[1][2] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[1][2]} {cg.DizhiShishen[1][2]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[2][2] ? getCangGanColor(cg.DizhiCanggan[2][2]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[2][2] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[2][2]} {cg.DizhiShishen[2][2]}</Tag>
      <Tag bordered={false} color={cg.DizhiCanggan[3][2] ? getCangGanColor(cg.DizhiCanggan[3][2]) : ''} style={{ fontSize: '10px', width: '48px', visibility: cg.DizhiCanggan[3][2] ? 'visible' : 'hidden' }}>{cg.DizhiCanggan[3][2]} {cg.DizhiShishen[3][2]}</Tag>
      </Row>
    </Space>
  )
  return dizhiNode
}




/**
 * 从八字中获取阳历信息
 * @param {EightChar} eightChar - 八字对象
 * @returns {Solar[]} - 阳历信息数组 (1800~今)
 */
export function getSolarsFromEightChar(eightChar: EightChar): Solar[] {

  const solars = Solar.fromBaZi(eightChar[1] + eightChar[5], eightChar[2] + eightChar[6], eightChar[3] + eightChar[7], eightChar[4] + eightChar[8], 2, 1800)

  return solars
}
