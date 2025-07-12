// 扶抑用神：平衡日主的强弱

import { EightChar, ShenqiangruoType, TianganDizhiChar, TianganChar, DizhiChar, getTianganWuxing, shengMap, keMap, wuxingTiangan, wuxingDizhi, Wuxing, wetEarthDizhi } from '@shared/@types/eightChar/eightCharInfo'
import { Checkbox, CheckboxOptionType } from 'antd'



export type FuYongshenType = {
  tiangan: {
    sheng: TianganChar[],
    zhu: TianganChar[]
  }
  dizhi: {
    sheng: DizhiChar[],
    zhu: DizhiChar[]
  }
}

export type YiYongshenType = {
  tiangan: {
    ke: TianganChar[],
    xie: TianganChar[]
    hao: TianganChar[]
  }
  dizhi: {
    ke: DizhiChar[],
    xie: DizhiChar[],
    hao: DizhiChar[]
  }
}


export type FuYiYongshenType = FuYongshenType | YiYongshenType | undefined  // undefined 就代表没有扶抑用神


// 获取生助日主的用神（扶用神）
const getFuYongshen = (wuxing: Wuxing): FuYongshenType => {
  // 生我者（印）
  const shengWoMap: Record<Wuxing, Wuxing> = {
    '木': '水', // 水生木
    '火': '木', // 木生火
    '土': '火', // 火生土
    '金': '土', // 土生金
    '水': '金'  // 金生水
  };

  // 同我者（比劫）
  const sameWuxing = wuxing;

  // 特殊处理：木日主时，湿土（丑、辰）也能生助
  const shengDizhi = wuxing === '木'
    ? [...wuxingDizhi[shengWoMap[wuxing]], ...wetEarthDizhi]
    : wuxingDizhi[shengWoMap[wuxing]] || [];

  return {
    tiangan: {
      sheng: wuxingTiangan[shengWoMap[wuxing]] || [],
      zhu: wuxingTiangan[sameWuxing] || []
    },
    dizhi: {
      sheng: shengDizhi,
      zhu: wuxingDizhi[sameWuxing] || []
    }
  };
};

// 获取抑制日主的用神（抑用神）
const getYiYongshen = (wuxing: Wuxing): YiYongshenType => {
  // 克我者（官杀）
  const keWoMap: Record<Wuxing, Wuxing> = {
    '木': '金', // 金克木
    '火': '水', // 水克火
    '土': '木', // 木克土
    '金': '火', // 火克金
    '水': '土'  // 土克水
  };

  // 我生者（食伤）
  const woShengMap = shengMap;

  // 我克者（财）
  const woKeMap = keMap;

  return {
    tiangan: {
      ke: wuxingTiangan[keWoMap[wuxing]] || [],
      xie: wuxingTiangan[woShengMap[wuxing]] || [],
      hao: wuxingTiangan[woKeMap[wuxing]] || []
    },
    dizhi: {
      ke: wuxingDizhi[keWoMap[wuxing]] || [],
      xie: wuxingDizhi[woShengMap[wuxing]] || [],
      hao: wuxingDizhi[woKeMap[wuxing]] || []
    }
  };
};

/**
 *
 * @param eightchar 八字
 * @param shenQiangruo 身强弱的类型
 * @returns
 */
export const getFuyiYongshen = (
  eightchar: EightChar,
  shenQiangruo: ShenqiangruoType
): FuYiYongshenType => {
  if (shenQiangruo === '均衡') {
    return undefined;
  }

  // 获取日元（日干）
  const riyuan = eightchar[3] as TianganChar;
  const riyuanWuxing = getTianganWuxing(riyuan);

  // 处理扶用神情况（从强、身弱）
  if (shenQiangruo === '从强' || shenQiangruo === '身弱') {
    return getFuYongshen(riyuanWuxing);
  }

  // 处理抑用神情况（身强、从弱）
  if (shenQiangruo === '身强' || shenQiangruo === '从弱') {
    return getYiYongshen(riyuanWuxing);
  }

  return undefined;
};


export const genFuYiYongshenNode = (
  eightChar: EightChar,
  shenQiangruo: ShenqiangruoType
): JSX.Element => {

  if (shenQiangruo === undefined) {
    return <div>请选择身强弱</div>
  }

  const fuyiYongshen = getFuyiYongshen(eightChar, shenQiangruo);

  // 处理均衡情况
  if (shenQiangruo === '均衡') {
    return <span>无</span>;
  }

  // 处理抑用神情况（身强或从弱）
  if (shenQiangruo === '身强' || shenQiangruo === '从弱') {
    const yiYongshen = fuyiYongshen as YiYongshenType;

    // 合并天干地支的克、泄、耗选项
    const keAll = [...yiYongshen.tiangan.ke, ...yiYongshen.dizhi.ke];
    const xieAll = [...yiYongshen.tiangan.xie, ...yiYongshen.dizhi.xie];
    const haoAll = [...yiYongshen.tiangan.hao, ...yiYongshen.dizhi.hao];

    // 转换为Checkbox选项
    const keOptions: CheckboxOptionType[] = keAll.map(char => ({
      label: char,
      value: char
    }));

    const xieOptions: CheckboxOptionType[] = xieAll.map(char => ({
      label: char,
      value: char
    }));

    const haoOptions: CheckboxOptionType[] = haoAll.map(char => ({
      label: char,
      value: char
    }));

    return (
      <div>
        <div>
          <strong>克：</strong>
          <Checkbox.Group options={keOptions} />
        </div>
        <div>
          <strong>泄：</strong>
          <Checkbox.Group options={xieOptions} />
        </div>
        <div>
          <strong>耗：</strong>
          <Checkbox.Group options={haoOptions} />
        </div>
      </div>
    );
  }

  // 处理扶用神情况（身弱或从强）
  if (shenQiangruo === '身弱' || shenQiangruo === '从强') {
    const fuYongshen = fuyiYongshen as FuYongshenType;

    // 合并天干地支的生、助选项
    const shengAll = [...fuYongshen.tiangan.sheng, ...fuYongshen.dizhi.sheng];
    const zhuAll = [...fuYongshen.tiangan.zhu, ...fuYongshen.dizhi.zhu];

    // 转换为Checkbox选项
    const shengOptions: CheckboxOptionType[] = shengAll.map(char => ({
      label: char,
      value: char
    }));

    const zhuOptions: CheckboxOptionType[] = zhuAll.map(char => ({
      label: char,
      value: char
    }));

    return (
      <div>
        <div>
          <strong>生：</strong>
          <Checkbox.Group options={shengOptions} />
        </div>
        <div>
          <strong>助：</strong>
          <Checkbox.Group options={zhuOptions} />
        </div>
      </div>
    );
  }

  // 默认情况
  return <span>无</span>;
};




