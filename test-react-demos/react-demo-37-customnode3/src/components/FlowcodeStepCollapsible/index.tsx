import React from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Popover } from 'antd';

import './index.css';
import SubList from './SubList/index.tsx';

interface FuncInputParam {
  inputname: string;
  inputdesc?: string;
  inputpathOrType?: string;
}

type FuncOutputParam = {
  outputname?: string;
  outputdesc?: string;
  outputpathOrType?: string;
} | undefined;

interface UnitTest {
  unittestpath: string;
  unittestname: string;
  unittestdesc?: string;
  passed: boolean;
}

export interface FlowcodeStepCollapsibleProps {
  id: string;
  func: {
    funcpath: string;
    funcname: string;
    funcdesc?: string;
  };
  inputs: FuncInputParam[];
  output: FuncOutputParam;
  unittests: UnitTest[];
}

const FlowcodeStepCollapsible: React.FC<FlowcodeStepCollapsibleProps> = (props) => {
  const genExtra = (info?: string) => (
    <div>
      <Popover content={info} mouseEnterDelay={1.0}>
        <PlayCircleOutlined
          onClick={(event) => {
            event.stopPropagation();
          }}
        />
      </Popover>
    </div>
  );

  // 计算单元测试统计信息
  const totalUnittests = props.unittests?.length || 0;
  const passedUnittests = props.unittests?.filter(test => test.passed).length || 0;

  // 方法配置数据
  const funcData = [
    {
      key: 'func',
      ...props.func,
    },
  ];

  // 入参配置数据
  const inputData = props.inputs?.map((item, index) => ({
    key: `input-${index}`,
    ...item,
  })) || [];

  // 出参配置数据
  const outputData = props.output ? [{ key: 'output', ...props.output }] : [];

  // 单元测试数据
  const unittestData = props.unittests?.map((item, index) => ({
    key: `unittest-${index}`,
    ...item,
  })) || [];

  const funcItems: CollapseProps['items'] = [
    {
      key: '1-1',
      label: '方法配置',
      children: (
        <SubList
          initialData={funcData}
        />
      ),
    },
    {
      key: '1-2',
      label: '入参配置',
      children: (
        <SubList
          initialData={inputData}
        />
      ),
    },
    {
      key: '1-3',
      label: '出参配置',
      children: (
        <SubList
          initialData={outputData}
        />
      ),
    },
  ];

  const { funcname, funcdesc } = props.func;
  const labelSuffix = funcdesc ? `${funcname}(${funcdesc})` : funcname;

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: `步骤名：${labelSuffix}`,
      children: (
        <Collapse
          defaultActiveKey={['1']}
          expandIconPosition='start'
          items={funcItems}
        />
      ),
      extra: genExtra('检验方法是否存在'),
    },
    {
      key: '2',
      label: `单元测试: ${passedUnittests}/${totalUnittests}`,
      children: (
        <SubList
          initialData={unittestData}
        />
      ),
      extra: genExtra('运行单元测试'),
    },
  ];

  // 检查所有单元测试是否通过
  const allPassed = props.unittests?.every(test => test.passed) ?? false;

  return (
    <div className="container">
      <Collapse
        size='small'
        items={items}
        style={{
          backgroundColor: allPassed ? '' : '#FDF2D8',
        }}
      />
    </div>
  );
};

export default FlowcodeStepCollapsible;