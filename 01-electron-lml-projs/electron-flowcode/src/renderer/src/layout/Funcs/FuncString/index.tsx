import { Button, Card, Flex, Input, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React, { useState } from 'react'

import { multilineToOneLine, oneLineToMultiline } from './util'

export default function index() {
  const [textA, setTextA] = useState<string>('');
  const [textB, setTextB] = useState<string>('');

  const handleClickAConvert = () => {
    // 将 textA 转换为单行文本并赋值给 textB
    const singleLineText = multilineToOneLine(textA);
    setTextB(singleLineText);
  }

  const handleClickBConvert = () => {
    // 将 textB 转换为多行文本并赋值给 textA
    const multilineText = oneLineToMultiline(textB);
    setTextA(multilineText);
  }


  return (
    <Flex gap="middle">
      <Space direction='vertical'>
        <TextArea
        placeholder="(a: number, b: number) => {
        return a + b
}
        "
        rows={4} size='large' allowClear
        style={{width: 400}}
        value={textA}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTextA(event.target.value);
        }}
        />
        <Space>
          <Button color='blue' size='small' variant="filled" onClick={handleClickAConvert} >转换</Button>
          <Button size='small' variant="filled" >复制</Button>
        </Space>
      </Space>

      <Space direction='vertical'>
        <TextArea rows={4} size='large' allowClear
        style={{width: 400}}
        value={textB}
        onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
          setTextB(event.target.value);
        }}
        />
        <Space >
          <Button color='blue' size='small' variant="filled" onClick={handleClickBConvert} >转换</Button>
          <Button size='small' variant="filled" >复制</Button>
        </Space>
      </Space>
    </Flex>
  )
}
