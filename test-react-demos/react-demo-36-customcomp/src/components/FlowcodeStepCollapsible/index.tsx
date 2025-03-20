import React, { useState } from 'react';
import { PlayCircleOutlined, SettingOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Popover } from 'antd';

import './index.css'

import EditableList from '../EditableList/index.tsx';

type WithKey<T, K = string> = T & { key: K };

interface FuncInputParam {
  inputname: string,
  inputdesc?: string,
  inputpathOrType?: string,
}

type FuncOutputParam = {
  outputname?: string,
  outputdesc?: string,
  outputpathOrType?: string 
} | undefined

interface UnitTest {
  unittestpath: string,
  unittestname: string,
  unittestdesc?: string,
  passed: boolean,
}


export interface FlowcodeStepCollapsibleProps {
  id: string,
  onEdit: (id: string, newData: FlowcodeStepCollapsibleProps) => void,
  onDelete: (id: string) => void,
  func: {
    funcpath: string,
    funcname: string,
    funcdesc?: string,
  },
  inputs: FuncInputParam[],
  output: FuncOutputParam,
  unittests: UnitTest[],   
}

const FlowcodeStepCollapsible: React.FC<FlowcodeStepCollapsibleProps> = (props) => {

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

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

  // 方法配置数据
  const funcData: WithKey<FlowcodeStepCollapsibleProps['func']>[] = [
    {
      key: 'func',
      ...props.func
    }
  ];

  // 入参配置数据（修复空值处理）
  const inputData: WithKey<FlowcodeStepCollapsibleProps['inputs'][number]>[] = 
    props.inputs?.map((item, index) => ({ key: `input-${index}`, ...item })) || [];

  // 出参配置数据
  const outputData: WithKey<FlowcodeStepCollapsibleProps['output']>[] = 
    props.output ? [{
      key: 'output',
      ...props.output
    }] : [];

  // 单元测试数据（修复空值处理）
  const unittestData: WithKey<FlowcodeStepCollapsibleProps['unittests'][number]>[] = 
    props.unittests?.map((item, index) => ({ key: `unittest-${index}`, ...item })) || [];

  const funcItems: CollapseProps['items'] = [
    {
      key: '1-1',
      label: '方法配置',
      children: (
        <EditableList 
          initialData={funcData}
          onEdit={(record) => handleFuncEdit(record)}
          onDelete={(record) => handleFuncDelete(record)}
        />
      ),
    },
    {
      key: '1-2',
      label: '入参配置',
      children: (
        <EditableList 
          initialData={inputData}
          onEdit={(record) => handleInputEdit(record)}
          onDelete={(record) => handleInputDelete(record)}
        />
      ),
    },
    {
      key: '1-3',
      label: '出参配置',
      children: (
        <EditableList 
          initialData={outputData}
          onEdit={(record) => handleOutputEdit(record)}
          onDelete={(record) => handleOutputDelete(record)}
        />
      ),
    },
  ];

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: '方法名：',
      children: (
        <Collapse
          defaultActiveKey={['1']}
          onChange={onChange}
          expandIconPosition='start'
          items={funcItems}
        />
      ),
      extra: genExtra('检验方法是否存在'),
    },
    {
      key: '2',
      label: '单元测试',
      children: (
        <EditableList 
          initialData={unittestData}
          onEdit={(record) => handleUnittestEdit(record)}
          onDelete={(record) => handleUnittestDelete(record)}
        />
      ),
      extra: genExtra('运行单元测试'),
    }
  ]

  // 回调函数定义
  const handleFuncEdit = (record: WithKey<FlowcodeStepCollapsibleProps['func']>) => {
    props.onEdit(props.id, {
      ...props,
      func: {
        ...props.func,
        ...record
      }
    });
  };

  const handleFuncDelete = (record: WithKey<FlowcodeStepCollapsibleProps['func']>[]) => {
    props.onDelete(props.id);
  };

  const handleInputEdit = (record: WithKey<FlowcodeStepCollapsibleProps['inputs'][number]>) => {
    const updatedInputs = props.inputs.map(item => 
      item.inputname === record.inputname ? record : item
    );
    props.onEdit(props.id, {
      ...props,
      inputs: updatedInputs
    });
  };

  const handleInputDelete = (record: WithKey<FlowcodeStepCollapsibleProps['inputs'][number]>) => {
    const updatedInputs = props.inputs.filter(item => 
      item.inputname !== record.inputname
    );
    props.onEdit(props.id, {
      ...props,
      inputs: updatedInputs
    });
  };

  const handleOutputEdit = (record: WithKey<FlowcodeStepCollapsibleProps['output']>) => {
    props.onEdit(props.id, {
      ...props,
      output: record
    });
  };

  const handleOutputDelete = (record: WithKey<FlowcodeStepCollapsibleProps['output']>) => {
    props.onEdit(props.id, {
      ...props,
      output: undefined
    });
  };

  const handleUnittestEdit = (record: FlowcodeStepCollapsibleProps['unittests'][number]) => {
    const updatedUnittests = props.unittests.map(item => 
      item.unittestname === record.unittestname ? record : item
    );
    props.onEdit(props.id, {
      ...props,
      unittests: updatedUnittests
    });
  };

  const handleUnittestDelete = (record: FlowcodeStepCollapsibleProps['unittests'][number]) => {
    const updatedUnittests = props.unittests.filter(item => 
      item.unittestname !== record.unittestname
    );
    props.onEdit(props.id, {
      ...props,
      unittests: updatedUnittests
    });
  };

  return (
    <div className='container'>
      <Collapse
        items={items}
      />
    </div>
  );
};

export default FlowcodeStepCollapsible;