import React, { useState } from 'react';
import { PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Popover } from 'antd';

import './index.css'

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

interface FuncInputParam {
  inputName: string,
  inputDesc: string,
  type: string,  // ① number, string, boolean, object, array 等等 或者 ② 自定义类型（需要填写下面path）
  customTypePath?: string,
}

/**
 * undefined 说明没有返回参数
 */
type FuncOutputParam = {
  type: string, // ① number, string, boolean, object, array 等等 或者 ② 自定义类型（需要填写下面path）
  customTypePath?: string 
} | undefined

interface UnitTest {
  testPath: string,
  testName: string,
  passed: boolean,  // 测试通过
  testDesc?: string,
}


export interface FlowcodeStepCollapsibleProps {
  // 方法位置，方法名称
  func: {
    funcPath: string,
    funcName: string,
    funcDesc?: string,
  },
  // 入参信息
  funcInputParams: FuncInputParam[],
  // 出参信息
  funcOutputParam: FuncOutputParam,
  // 单元测试 (所有单元测试通过，代表完成)
  unitTests: UnitTest[],   
}

const FlowcodeStepCollapsible: React.FC<FlowcodeStepCollapsibleProps> = (props: FlowcodeStepCollapsibleProps | undefined) => {

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  const genExtra = (info?: string) => (
    <div>
      <Popover content={info} mouseEnterDelay={1.0}>
        <PlayCircleOutlined
          onClick={(event) => {
            // If you don't want click extra trigger collapse, you can prevent this:
            event.stopPropagation();
          }}
        />
      </Popover>
    </div>
  );

  const contentItems: CollapseProps['items'] = [
    {
      key: '1-1',
      label: '方法配置',
      children: <div>{text}</div>,
    },
    {
      key: '1-2',
      label: '入参配置',
      children: <div>{text}</div>,
    },
    {
      key: '1-3',
      label: '出参配置',
      children: <div>{text}</div>,
    },
  ];

  const unittestItems: CollapseProps['items'] = [
    {
      key: '2-1',
      label: '测试场景1',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '2-2',
      label: '测试场景2',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
    {
      key: '2-3',
      label: '测试场景3',
      children: <div>{text}</div>,
      extra: genExtra(),
    },
  ];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '方法名：',
      children: <div>
        <Collapse
          defaultActiveKey={['1']}
          onChange={onChange}
          expandIconPosition='start'
          items={contentItems}
        />
      </div>,
      extra: genExtra('检验方法是否存在'),
    },
    {
      key: '2',
      label: '单元测试',
      children: <div>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition='start'
        items={unittestItems}
      />
    </div>,
      extra: genExtra('运行单元测试'),
    }
  ]

  

  return (
    <div className='container'>
      <Collapse
        items={items}
      />
    </div>
  );
};

export default FlowcodeStepCollapsible;