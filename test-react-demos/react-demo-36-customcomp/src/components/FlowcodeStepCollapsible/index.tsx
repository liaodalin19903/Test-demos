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

/**
 * undefined 说明没有返回参数
 */
type FuncOutputParam = {
  outputname?: string,   // 如果是undefined，则说明不是自定义的数据类型
  outputdesc?: string,
  outputpathOrType?: string 
} | undefined

interface UnitTest {
  unittestpath: string,
  unittestname: string,
  unittestdesc?: string,
  passed: boolean,  // 测试是否通过
}


export interface FlowcodeStepCollapsibleProps {
  // 方法位置，方法名称
  func: {
    funcpath: string,
    funcname: string,
    funcdesc?: string,
  },
  // 入参信息
  inputs: FuncInputParam[],
  // 出参信息
  output: FuncOutputParam,
  // 单元测试 (所有单元测试通过，代表完成)
  unittests: UnitTest[],   
}

//#region 准备数据


// 1、方法配置
const funcEditListInitialData: WithKey<FlowcodeStepCollapsibleProps['func']>[] = [
  {
    key: '1',
    funcname: `Edward 1`,
    funcpath: 'aaa/bbb/ccc/',
    funcdesc: '这是方法描述',
  }
];

const handleFuncEdit = (record: WithKey<FlowcodeStepCollapsibleProps['func']>) => {
  console.log('编辑操作回调，记录:', record);
};

const handleFuncDelete = (record: WithKey<FlowcodeStepCollapsibleProps['func']>[]) => {
  console.log('删除操作回调，记录:', record);
};

// 2、入参配置

const inputEditListInitialData: WithKey<FlowcodeStepCollapsibleProps['inputs'][number]>[] = [
  {
    key: '1',
    inputname: `Edward 1`,
    inputpathOrType: 'aaa/bbb/ccc/'
  },
  {
    key: '2',
    inputname: `Edward 2`,
    inputpathOrType: 'aaa/bbb/ccc/'
  },
];

const handleInputEdit = (record: WithKey<FlowcodeStepCollapsibleProps['inputs']>[number]) => {
  console.log('编辑操作回调，记录:', record);
};

const handleInputDelete = (record: WithKey<FlowcodeStepCollapsibleProps['inputs']>[number]) => {
  console.log('删除操作回调，记录:', record);
};


// 3、出参配置

const outputEditListInitialData: WithKey<FlowcodeStepCollapsibleProps['output']>[] = [
  {
    key: '1',
    outputname: `Edward 1`,
    outputpathOrType: 'aaa/bbb/ccc/'
  }
];

const handleOutputEdit = (record: WithKey<FlowcodeStepCollapsibleProps['output']>) => {
  console.log('编辑操作回调，记录:', record);
};

const handleOutputDelete = (record: WithKey<FlowcodeStepCollapsibleProps['output']>) => {
  console.log('删除操作回调，记录:', record);
};

// 4、单元测试

const unittestEditListInitialData: WithKey<FlowcodeStepCollapsibleProps['unittests'][number]>[] = [
  {
    key: '1',
    unittestname: `Edward 1`,
    unittestpath: 'aaa/bbb/ccc/',
    passed: true
  },
  {
    key: '2',
    unittestname: `Edward 2`,
    unittestpath: 'aaa/bbb/ccc/',
    passed: false
  },
];

const handleUnittestEdit = (record: FlowcodeStepCollapsibleProps['unittests'][number]) => {
  console.log('编辑操作回调，记录:', record);
};

const handleUnittestDelete = (record: FlowcodeStepCollapsibleProps['unittests'][number]) => {
  console.log('删除操作回调，记录:', record);
};

//#endregion



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


  const funcItems: CollapseProps['items'] = [
    {
      key: '1-1',
      label: '方法配置',
      children: <div>
        <EditableList  initialData={funcEditListInitialData} onEdit={handleFuncEdit} onDelete={handleFuncDelete} />
      </div>,
    },
    {
      key: '1-2',
      label: '入参配置',
      children: <div>
         <EditableList  initialData={inputEditListInitialData} onEdit={handleInputEdit} onDelete={handleInputDelete} />
      </div>,
    },
    {
      key: '1-3',
      label: '出参配置',
      children: <div>
         <EditableList initialData={outputEditListInitialData} onEdit={handleOutputEdit} onDelete={handleOutputDelete} />
      </div>,
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
          items={funcItems}
        />
      </div>,
      extra: genExtra('检验方法是否存在'),
    },
    {
      key: '2',
      label: '单元测试',
      children: <div>
        <EditableList initialData={unittestEditListInitialData} onEdit={handleUnittestEdit} onDelete={handleUnittestDelete} />
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