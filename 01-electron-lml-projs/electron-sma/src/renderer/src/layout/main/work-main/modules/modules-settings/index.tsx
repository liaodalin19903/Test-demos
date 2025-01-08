import React from 'react'
import { Card, Flex } from 'antd';

// 模块设置

export default function ModulesSettings() {
  return (
    <div style={{ overflow: 'auto', padding: '10px', height: 'calc(100vh - 56px)' }} >
      <Flex gap="small" vertical >
        <Card size="small" title="模块信息" bordered={false} >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card size="small" title="条件搜索🔍" bordered={false} >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card size="small" title="增加模块" bordered={false} >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card size="small" title="Card title" bordered={false} >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
      </Flex>
    </div>
  )
}
