// 病药用神：只取下面的1、2：3、4、5我们放到其他两种
/**
 * 1、某种五行过旺或过衰
 * 2、干支之间严重的刑、冲、克[x：冲的力量比克大]、害
 * 3、寒暖燥湿润失调（需：调候）【x】
 * 4、两种相克五行交战不通（需：通关）【x】
 * 5、日主过弱或过强【x】
 */

import { DizhiChar, TianganChar, TianganDizhiChar } from "@shared/@types/eightChar/eightCharInfo";

import { dizhiCanggan, EightChar, monthCoefficients, wuxingMap, Wuxing, WuxingPercentage } from "@shared/@types/eightChar/eightCharInfo";

import { AdjacentCongHaiXing, getAdjacentCongHaiXing, getCharSolve, getWuxingPercentage } from "../../tianganDizhiRoles/utils";




/**
 * 方式1：某种五行过旺或过衰
 * @param eightchar
 * @param congWuxing
 * @returns
 */
/**
 * 获取五行旺衰用审
 * @param eightchar 八字信息
 * @param congWuxing 是否从五行
 * @returns 天干地支字符数组
 */
export const getWuxingWangshuaiYongshen = (
  eightchar: EightChar,
  congWuxing: boolean
): TianganDizhiChar[] => {
  // 1. 获取五行占比并找到最旺的五行
  const wuxingPercentage = getWuxingPercentage(eightchar);
  let maxElement: keyof WuxingPercentage = '木';
  let maxPercentage = 0;

  (Object.keys(wuxingPercentage) as (keyof WuxingPercentage)[]).forEach(element => {
    if (wuxingPercentage[element] > maxPercentage) {
      maxPercentage = wuxingPercentage[element];
      maxElement = element;
    }
  });

  // 2. 定义五行生克关系
  const wuxingRelations = {
    '木': {
      sheng: ['木', '水'], // 生扶木的五行（木本身和生木的水）
      kexiehao: ['火', '金', '土'] // 克泄耗木的五行（火泄木，金克木，土耗木）
    },
    '火': {
      sheng: ['火', '木'],
      kexiehao: ['土', '水', '金']
    },
    '土': {
      sheng: ['土', '火'],
      kexiehao: ['金', '木', '水']
    },
    '金': {
      sheng: ['金', '土'],
      kexiehao: ['水', '火', '木']
    },
    '水': {
      sheng: ['水', '金'],
      kexiehao: ['木', '土', '火']
    }
  };

  // 3. 根据congWuxing决定使用生扶还是克泄耗的五行
  const targetElements = congWuxing
    ? wuxingRelations[maxElement].sheng
    : wuxingRelations[maxElement].kexiehao;

  // 4. 遍历八字，找出符合目标五行的字
  const result: TianganDizhiChar[] = [];

  // 处理天干（位置1-4）
  for (let i = 1; i <= 4; i++) {
    const gan = eightchar[i as keyof EightChar] as string;
    const element = wuxingMap[gan];
    if (element && targetElements.includes(element)) {
      result.push(gan as TianganChar);
    }
  }

  // 处理地支（位置5-8）
  for (let i = 5; i <= 8; i++) {
    const zhi = eightchar[i as keyof EightChar] as string;
    // 获取地支的本气（主气）五行
    const canggan = dizhiCanggan[zhi];
    if (canggan && canggan.length > 0) {
      const mainGan = canggan[0][0]; // 取第一个藏干作为本气
      const element = wuxingMap[mainGan];
      if (element && targetElements.includes(element)) {
        result.push(zhi as DizhiChar);
      }
    }
  }

  return result;
};


export type CongXingHaiYongshenType = {
  tianganCong: {
    cong1: TianganChar,  // 需要抑制的字. eg. 甲庚冲的 甲
    cong1Solve: {
      tongguan: TianganChar[],
      he: TianganChar[], // 天干五合
      ke: TianganChar[], // 天干克
    },
    cong2: TianganChar, // 需要抑制的字. eg. 甲庚冲的 庚
    cong2Solve: {
      tongguan: TianganChar[],
      he: TianganChar[], // 天干五合
      ke: TianganChar[], // 天干克
    },
  }[],
  dizhiCong: {
    cong1: DizhiChar,
    cong1Solve: {
      tongguan: DizhiChar[],
      liuhe: DizhiChar[],
      sanhe: DizhiChar[],
      banhe: DizhiChar[],
      ke: DizhiChar[],
    },
    cong2: DizhiChar,
    cong2Solve: {
      tongguan: DizhiChar[],
      liuhe: DizhiChar[],
      sanhe: DizhiChar[],
      banhe: DizhiChar[],
      ke: DizhiChar[],
    }

  }[],
  dizhiHai: {
    hai1: DizhiChar,
    hai1Solve: {
      tongguan: DizhiChar[],
      liuhe: DizhiChar[],
      sanhe: DizhiChar[],
      banhe: DizhiChar[],
      ke: DizhiChar[],
    },
    hai2: DizhiChar,
    hai2Solve: {
      tongguan: DizhiChar[],
      liuhe: DizhiChar[],
      sanhe: DizhiChar[],
      banhe: DizhiChar[],
      ke: DizhiChar[],
    }
  }[],
  dizhiXing: {
    type: '子卯相刑' | '三刑' | '自刑',
    xing1: DizhiChar,
    xing1Solve: {
      tongguan: DizhiChar[],
      liuhe: DizhiChar[],
      sanhe: DizhiChar[],
      banhe: DizhiChar[],
      ke: DizhiChar[],
      cong: DizhiChar[],
    },
    xing2: DizhiChar,
    xing2Solve: {
      tongguan: DizhiChar[],
      liuhe: DizhiChar[],
      sanhe: DizhiChar[],
      banhe: DizhiChar[],
      ke: DizhiChar[],
      cong: DizhiChar[],
    },
    xing3: DizhiChar | undefined,
    xing3Solve: {
      tongguan: DizhiChar[],
      liuhe: DizhiChar[],
      sanhe: DizhiChar[],
      banhe: DizhiChar[],
      ke: DizhiChar[],
      cong: DizhiChar[],
    },
  }[]
}

// 预定义地支六冲关系
const diZhiChongMap: Record<DizhiChar, DizhiChar> = {
  '子': '午', '午': '子',
  '丑': '未', '未': '丑',
  '寅': '申', '申': '寅',
  '卯': '酉', '酉': '卯',
  '辰': '戌', '戌': '辰',
  '巳': '亥', '亥': '巳'
};

// 获取与指定地支相冲的地支
const getDiZhiChong = (dizhi: DizhiChar): DizhiChar => {
  return diZhiChongMap[dizhi];
};

// 获取：冲刑害的推荐用神
export const getCongXingHaiYongshen = (
  eightchar: EightChar
): CongXingHaiYongshenType => {
  // 步骤1：获取八字原局的所有天干地支的作用关系
  // 步骤2：获取相邻的刑冲害
  const adjacentCongHaiXing: AdjacentCongHaiXing = getAdjacentCongHaiXing(eightchar);

  const congXingHaiYongshen: CongXingHaiYongshenType = {
    tianganCong: [],
    dizhiCong: [],
    dizhiHai: [],
    dizhiXing: [],
  };

  // 处理天干相冲
  if (adjacentCongHaiXing.tiangan.cong && adjacentCongHaiXing.tiangan.cong.length > 0) {
    adjacentCongHaiXing.tiangan.cong.forEach((tianGanPair) => {
      if (tianGanPair.length === 2) {
        const [cong1, cong2] = tianGanPair as [TianganChar, TianganChar];

        // 获取第一个相冲字的解决方法
        const cong1Solve = {
          tongguan: getCharSolve([cong1, cong2], cong1, '天干通关'),
          he: getCharSolve([cong1, cong2], cong1, '天干五合'),
          ke: getCharSolve([cong1, cong2], cong1, '天干克'),
        };

        // 获取第二个相冲字的解决方法
        const cong2Solve = {
          tongguan: getCharSolve([cong1, cong2], cong2, '天干通关'),
          he: getCharSolve([cong1, cong2], cong2, '天干五合'),
          ke: getCharSolve([cong1, cong2], cong2, '天干克'),
        };

        congXingHaiYongshen.tianganCong.push({
          cong1,
          // @ts-ignore
          cong1Solve,
          cong2,
          // @ts-ignore
          cong2Solve,
        });
      }
    });
  }

  // 处理地支相冲
  if (adjacentCongHaiXing.dizhi.cong && adjacentCongHaiXing.dizhi.cong.length > 0) {
    adjacentCongHaiXing.dizhi.cong.forEach((diZhiPair) => {
      if (diZhiPair.length === 2) {
        const [cong1, cong2] = diZhiPair as [DizhiChar, DizhiChar];

        // 获取第一个相冲地支的解决方法
        const cong1Solve = {
          tongguan: getCharSolve([cong1, cong2], cong1, '地支通关'),
          liuhe: getCharSolve([cong1, cong2], cong1, '地支六合'),
          sanhe: getCharSolve([cong1, cong2], cong1, '地支三合'),
          banhe: getCharSolve([cong1, cong2], cong1, '地支半合'),
          ke: getCharSolve([cong1, cong2], cong1, '地支克'),
        };

        // 获取第二个相冲地支的解决方法
        const cong2Solve = {
          tongguan: getCharSolve([cong1, cong2], cong2, '地支通关'),
          liuhe: getCharSolve([cong1, cong2], cong2, '地支六合'),
          sanhe: getCharSolve([cong1, cong2], cong2, '地支三合'),
          banhe: getCharSolve([cong1, cong2], cong2, '地支半合'),
          ke: getCharSolve([cong1, cong2], cong2, '地支克'),
        };

        congXingHaiYongshen.dizhiCong.push({
          cong1,
          // @ts-ignore
          cong1Solve,
          cong2,
          // @ts-ignore
          cong2Solve,
        });
      }
    });
  }

  // 处理地支相害
  if (adjacentCongHaiXing.dizhi.hai && adjacentCongHaiXing.dizhi.hai.length > 0) {
    adjacentCongHaiXing.dizhi.hai.forEach((diZhiPair) => {
      if (diZhiPair.length === 2) {
        const [hai1, hai2] = diZhiPair as [DizhiChar, DizhiChar];

        // 获取第一个相害地支的解决方法
        const hai1Solve = {
          tongguan: getCharSolve([hai1, hai2], hai1, '地支通关'),
          liuhe: getCharSolve([hai1, hai2], hai1, '地支六合'),
          sanhe: getCharSolve([hai1, hai2], hai1, '地支三合'),
          banhe: getCharSolve([hai1, hai2], hai1, '地支半合'),
          ke: getCharSolve([hai1, hai2], hai1, '地支克'),
        };

        // 获取第二个相害地支的解决方法
        const hai2Solve = {
          tongguan: getCharSolve([hai1, hai2], hai2, '地支通关'),
          liuhe: getCharSolve([hai1, hai2], hai2, '地支六合'),
          sanhe: getCharSolve([hai1, hai2], hai2, '地支三合'),
          banhe: getCharSolve([hai1, hai2], hai2, '地支半合'),
          ke: getCharSolve([hai1, hai2], hai2, '地支克'),
        };


        congXingHaiYongshen.dizhiHai.push({
          hai1,
          // @ts-ignore
          hai1Solve,
          hai2,
          // @ts-ignore
          hai2Solve,
        });
      }
    });
  }

  // 修改处理地支相刑的部分
  if (adjacentCongHaiXing.dizhi.xing && adjacentCongHaiXing.dizhi.xing.length > 0) {
    adjacentCongHaiXing.dizhi.xing.forEach((diZhiGroup) => {
      // 判断相刑类型
      let type: '子卯相刑' | '三刑' | '自刑' = '自刑';

      // 三刑判断：丑戌未 或 寅巳申
      if (diZhiGroup.length === 3) {
        if (diZhiGroup.includes('丑') && diZhiGroup.includes('戌') && diZhiGroup.includes('未')) {
          type = '三刑';
        } else if (diZhiGroup.includes('寅') && diZhiGroup.includes('巳') && diZhiGroup.includes('申')) {
          type = '三刑';
        }
      }
      // 子卯相刑：两个地支且是子和卯
      else if (diZhiGroup.length === 2 && diZhiGroup.includes('子') && diZhiGroup.includes('卯')) {
        type = '子卯相刑';
      }
      // 自刑：两个相同的地支，且属于自刑类型（辰、午、酉、亥）
      else if (diZhiGroup.length === 2 && diZhiGroup[0] === diZhiGroup[1] && ['辰', '午', '酉', '亥'].includes(diZhiGroup[0])) {
        type = '自刑';
      }

      const xing1 = diZhiGroup[0] as DizhiChar;
      const xing2 = diZhiGroup[1] as DizhiChar;
      const xing3 = diZhiGroup.length > 2 ? diZhiGroup[2] as DizhiChar : undefined;

      // 获取解决方案的辅助函数
      const getSolutions = (char: DizhiChar) => ({
        tongguan: getCharSolve(diZhiGroup, char, '地支通关'),
        liuhe: getCharSolve(diZhiGroup, char, '地支六合'),
        sanhe: getCharSolve(diZhiGroup, char, '地支三合'),
        banhe: getCharSolve(diZhiGroup, char, '地支半合'),
        ke: getCharSolve(diZhiGroup, char, '地支克'),
        cong: [getDiZhiChong(char)],
      });

      // 创建条目
      const entry = {
        type,
        xing1,
        xing1Solve: getSolutions(xing1),
        xing2,
        xing2Solve: getSolutions(xing2),
        xing3: undefined as DizhiChar | undefined,
        xing3Solve: {
          tongguan: [],
          liuhe: [],
          sanhe: [],
          banhe: [],
          ke: [],
          cong: []
        }
      };

      // 如果是三刑，设置第三个地支及其解决方法
      if (type === '三刑' && xing3) {
        entry.xing3 = xing3;
        // @ts-ignore
        entry.xing3Solve = getSolutions(xing3);
      }
      // @ts-ignore
      congXingHaiYongshen.dizhiXing.push(entry);
    });
  }

  return congXingHaiYongshen
}

// 生成病药用神的节点
import { Collapse, Checkbox, CheckboxOptionType } from 'antd';
const { Panel } = Collapse;

// 生成病药用神的节点
export const genBingyaoYongshenNode = (eightChar: EightChar): JSX.Element => {
  const chongxinghai = getCongXingHaiYongshen(eightChar);

  // 将解决方案转换为复选框选项
  const convertToOptions = (items: string[]): CheckboxOptionType[] => {
    return items.map(item => ({ label: item, value: item }));
  };

  // 渲染天干相冲解决方案
  const renderTianganCong = () => {
    if (chongxinghai.tianganCong.length === 0) return null;

    return (
      <div>
        <h3>天干相冲解决方案</h3>
        {chongxinghai.tianganCong.map((cong, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{cong.cong1}冲{cong.cong2}</h4>

            <Collapse defaultActiveKey={['0']}>
              <Panel header={`${cong.cong1}的解决方案`} key="0">
                <div style={{ marginBottom: '10px' }}>
                  <strong>通关:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong1Solve.tongguan)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>合:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong1Solve.he)} />
                </div>
                <div>
                  <strong>克:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong1Solve.ke)} />
                </div>
              </Panel>

              <Panel header={`${cong.cong2}的解决方案`} key="1">
                <div style={{ marginBottom: '10px' }}>
                  <strong>通关:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong2Solve.tongguan)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>合:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong2Solve.he)} />
                </div>
                <div>
                  <strong>克:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong2Solve.ke)} />
                </div>
              </Panel>
            </Collapse>
          </div>
        ))}
      </div>
    );
  };

  // 渲染地支相冲解决方案
  const renderDizhiCong = () => {
    if (chongxinghai.dizhiCong.length === 0) return null;

    return (
      <div>
        <h3>地支相冲解决方案</h3>
        {chongxinghai.dizhiCong.map((cong, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{cong.cong1}冲{cong.cong2}</h4>

            <Collapse defaultActiveKey={['0']}>
              <Panel header={`${cong.cong1}的解决方案`} key="0">
                <div style={{ marginBottom: '10px' }}>
                  <strong>通关:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong1Solve.tongguan)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>六合:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong1Solve.liuhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>三合:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong1Solve.sanhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>半合:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong1Solve.banhe)} />
                </div>
                <div>
                  <strong>克:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong1Solve.ke)} />
                </div>
              </Panel>

              <Panel header={`${cong.cong2}的解决方案`} key="1">
                <div style={{ marginBottom: '10px' }}>
                  <strong>通关:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong2Solve.tongguan)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>六合:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong2Solve.liuhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>三合:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong2Solve.sanhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>半合:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong2Solve.banhe)} />
                </div>
                <div>
                  <strong>克:</strong>
                  <Checkbox.Group options={convertToOptions(cong.cong2Solve.ke)} />
                </div>
              </Panel>
            </Collapse>
          </div>
        ))}
      </div>
    );
  };

  // 渲染地支相害解决方案
  const renderDizhiHai = () => {
    if (chongxinghai.dizhiHai.length === 0) return null;

    return (
      <div>
        <h3>地支相害解决方案</h3>
        {chongxinghai.dizhiHai.map((hai, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{hai.hai1}害{hai.hai2}</h4>

            <Collapse defaultActiveKey={['0']}>
              <Panel header={`${hai.hai1}的解决方案`} key="0">
                <div style={{ marginBottom: '10px' }}>
                  <strong>通关:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai1Solve.tongguan)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>六合:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai1Solve.liuhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>三合:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai1Solve.sanhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>半合:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai1Solve.banhe)} />
                </div>
                <div>
                  <strong>克:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai1Solve.ke)} />
                </div>
              </Panel>

              <Panel header={`${hai.hai2}的解决方案`} key="1">
                <div style={{ marginBottom: '10px' }}>
                  <strong>通关:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai2Solve.tongguan)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>六合:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai2Solve.liuhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>三合:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai2Solve.sanhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>半合:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai2Solve.banhe)} />
                </div>
                <div>
                  <strong>克:</strong>
                  <Checkbox.Group options={convertToOptions(hai.hai2Solve.ke)} />
                </div>
              </Panel>
            </Collapse>
          </div>
        ))}
      </div>
    );
  };

  // 渲染地支相刑解决方案
  const renderDizhiXing = () => {
    if (chongxinghai.dizhiXing.length === 0) return null;

    return (
      <div>
        <h3>地支相刑解决方案</h3>
        {chongxinghai.dizhiXing.map((xing, index) => (
          <div key={index} style={{ marginBottom: '20px' }}>
            <h4>{xing.type}: {xing.xing1}刑{xing.xing2}{xing.xing3 ? `刑${xing.xing3}` : ''}</h4>

            <Collapse defaultActiveKey={['0']}>
              <Panel header={`${xing.xing1}的解决方案`} key="0">
                <div style={{ marginBottom: '10px' }}>
                  <strong>通关:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing1Solve.tongguan)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>六合:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing1Solve.liuhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>三合:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing1Solve.sanhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>半合:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing1Solve.banhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>克:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing1Solve.ke)} />
                </div>
                <div>
                  <strong>冲:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing1Solve.cong)} />
                </div>
              </Panel>

              <Panel header={`${xing.xing2}的解决方案`} key="1">
                <div style={{ marginBottom: '10px' }}>
                  <strong>通关:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing2Solve.tongguan)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>六合:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing2Solve.liuhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>三合:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing2Solve.sanhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>半合:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing2Solve.banhe)} />
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>克:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing2Solve.ke)} />
                </div>
                <div>
                  <strong>冲:</strong>
                  <Checkbox.Group options={convertToOptions(xing.xing2Solve.cong)} />
                </div>
              </Panel>

              {xing.xing3 && (
                <Panel header={`${xing.xing3}的解决方案`} key="2">
                  <div style={{ marginBottom: '10px' }}>
                    <strong>通关:</strong>
                    <Checkbox.Group options={convertToOptions(xing.xing3Solve.tongguan)} />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>六合:</strong>
                    <Checkbox.Group options={convertToOptions(xing.xing3Solve.liuhe)} />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>三合:</strong>
                    <Checkbox.Group options={convertToOptions(xing.xing3Solve.sanhe)} />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>半合:</strong>
                    <Checkbox.Group options={convertToOptions(xing.xing3Solve.banhe)} />
                  </div>
                  <div style={{ marginBottom: '10px' }}>
                    <strong>克:</strong>
                    <Checkbox.Group options={convertToOptions(xing.xing3Solve.ke)} />
                  </div>
                  <div>
                    <strong>冲:</strong>
                    <Checkbox.Group options={convertToOptions(xing.xing3Solve.cong)} />
                  </div>
                </Panel>
              )}
            </Collapse>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderTianganCong()}
      {renderDizhiCong()}
      {renderDizhiHai()}
      {renderDizhiXing()}
    </div>
  );
};
