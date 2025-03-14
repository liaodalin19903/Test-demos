import { Flex, Splitter, Typography } from 'antd'
import React from 'react'

const Desc: React.FC<Readonly<{ text?: string | number }>> = (props) => (
  <Flex justify="center" align="center" style={{ height: '100%' }}>
    <Typography.Title type="secondary" level={5} style={{ whiteSpace: 'nowrap' }}>
      {props.text}
    </Typography.Title>
  </Flex>
);


export default function ProjDesign() {
  return (
    <div>
      1234
      <Splitter
        //onResize={setSizes}
        style={{
          height: 'calc(100vh - 270px)',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
        }}
      >
        <Splitter.Panel
          defaultSize={'200'}
          collapsible
        >
          <Desc text="Left" />
        </Splitter.Panel>
        <Splitter.Panel
          resizable={false}
        >
          <Desc text="Main" />
        </Splitter.Panel>
        <Splitter.Panel
          defaultSize={'200'}
          collapsible
        >
          <Desc text="Right" />
        </Splitter.Panel>
      </Splitter>
    </div>
  )
}



