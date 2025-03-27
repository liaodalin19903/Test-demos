import { Flex, Splitter, Typography } from 'antd'
import React from 'react'
import { useEditingFilePath } from './XFlowComp/components/hooks/useEditingFilePath'

import { Left } from './Left/Left'
import { Right } from './Right/Right'

import XFlowComp from './XFlowComp/index'

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);


export default function ProjDesign() {

  const editingFilePath = useEditingFilePath()

  return (
    <div>
      <Splitter
        style={{
          height: 'calc(100vh - 270px)',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Splitter.Panel
          defaultSize={'200'}
          collapsible
        >
          <Left/>
        </Splitter.Panel>
        <Splitter.Panel
          resizable={false}
        >

          {
            editingFilePath ? <XFlowComp/> : <Desc text="请选择fc.json文件" />
          }

        </Splitter.Panel>
        <Splitter.Panel
          defaultSize={'200'}
          collapsible
        >
          {/* <Desc text="Right" /> */}

          <Right></Right>
        </Splitter.Panel>
      </Splitter>
    </div>
  )
}



