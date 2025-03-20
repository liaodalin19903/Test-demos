import React from 'react';
import { PlayCircleOutlined } from '@ant-design/icons';
import type { CollapseProps } from 'antd';
import { Collapse, Popover } from 'antd';

import './index.css';
import EditableList from '../EditableList/index.tsx';

type WithKey<T, K = string> = T & { key: K };

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
  onEdit: (id: string, newData: FlowcodeStepCollapsibleProps) => void;
  onDelete: (id: string) => void;
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

  // 计算单元测试统计信息
  const totalUnittests = props.unittests?.length || 0;
  const passedUnittests = props.unittests?.filter(test => test.passed).length || 0;

  // 回调函数定义
  const handleFuncEdit = (record: WithKey<FlowcodeStepCollapsibleProps['func']>) => {
    props.onEdit(props.id, {
      ...props,
      func: {
        ...props.func,
        ...record,
      },
    });
  };

  const handleFuncDelete = (record: WithKey<FlowcodeStepCollapsibleProps['func']>) => {
    props.onDelete(props.id);
  };

  const handleInputEdit = (record: WithKey<FlowcodeStepCollapsibleProps['inputs'][number]>) => {
    const updatedInputs = props.inputs.map(item =>
      item.inputname === record.inputname ? record : item
    );
    props.onEdit(props.id, {
      ...props,
      inputs: updatedInputs,
    });
  };

  const handleInputDelete = (record: WithKey<FlowcodeStepCollapsibleProps['inputs'][number]>) => {
    const updatedInputs = props.inputs.filter(item =>
      item.inputname !== record.inputname
    );
    props.onEdit(props.id, {
      ...props,
      inputs: updatedInputs,
    });
  };

  const handleOutputEdit = (record: WithKey<FlowcodeStepCollapsibleProps['output']>) => {
    props.onEdit(props.id, {
      ...props,
      output: record,
    });
  };

  const handleOutputDelete = (record: WithKey<FlowcodeStepCollapsibleProps['output']>) => {
    props.onEdit(props.id, {
      ...props,
      output: undefined,
    });
  };

  const handleUnittestEdit = (record: FlowcodeStepCollapsibleProps['unittests'][number]) => {
    const updatedUnittests = props.unittests.map(item =>
      item.unittestname === record.unittestname ? record : item
    );
    props.onEdit(props.id, {
      ...props,
      unittests: updatedUnittests,
    });
  };

  const handleUnittestDelete = (record: FlowcodeStepCollapsibleProps['unittests'][number]) => {
    const updatedUnittests = props.unittests.filter(item =>
      item.unittestname !== record.unittestname
    );
    props.onEdit(props.id, {
      ...props,
      unittests: updatedUnittests,
    });
  };

  // 方法配置数据
  const funcData: WithKey<FlowcodeStepCollapsibleProps['func']>[] = [
    {
      key: 'func',
      ...props.func,
    },
  ];

  // 入参配置数据
  const inputData: WithKey<FlowcodeStepCollapsibleProps['inputs'][number]>[] =
    props.inputs?.map((item, index) => ({
      key: `input-${index}`,
      ...item,
    })) || [];

  // 出参配置数据
  const outputData: WithKey<FlowcodeStepCollapsibleProps['output']>[] =
    props.output ? [{ key: 'output', ...props.output }] : [];

  // 单元测试数据
  const unittestData: WithKey<FlowcodeStepCollapsibleProps['unittests'][number]>[] =
    props.unittests?.map((item, index) => ({
      key: `unittest-${index}`,
      ...item,
    })) || [];

  const funcItems: CollapseProps['items'] = [
    {
      key: '1-1',
      label: '方法配置',
      children: (
        <EditableList
          initialData={funcData}
          onEdit={handleFuncEdit}
          onDelete={handleFuncDelete}
        />
      ),
    },
    {
      key: '1-2',
      label: '入参配置',
      children: (
        <EditableList
          initialData={inputData}
          onEdit={handleInputEdit}
          onDelete={handleInputDelete}
        />
      ),
    },
    {
      key: '1-3',
      label: '出参配置',
      children: (
        <EditableList
          initialData={outputData}
          onEdit={handleOutputEdit}
          onDelete={handleOutputDelete}
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
          onChange={onChange}
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
        <EditableList
          initialData={unittestData}
          onEdit={handleUnittestEdit}
          onDelete={handleUnittestDelete}
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