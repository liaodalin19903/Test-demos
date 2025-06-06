import { Row, Tag } from 'antd';
import React, { useState } from 'react'
export default function App3() {


  let [testDom, setTestDom] = useState(<>111</>)
  const handleClick = () => {
    console.log('111')

    setTestDom(<>222</>)
  };


  return (
    <div>
    <Row>
          <Tag bordered={false}>Tag 1</Tag>
          <Tag bordered={false}>Tag 2</Tag>
          <Tag bordered={false} >
            Tag 3
          </Tag>
          <Tag bordered={false} >
            Tag 4
          </Tag>
    </Row>

    <Row>
          <Tag bordered={false}>Tag 1</Tag>
          <Tag bordered={false}>Tag 2</Tag>
          <Tag bordered={false} style={{ visibility: 'hidden' }}>
            Tag 3
          </Tag>
          <Tag bordered={false} >
            Tag 4
          </Tag>
    </Row>
    </div>
  )
}


