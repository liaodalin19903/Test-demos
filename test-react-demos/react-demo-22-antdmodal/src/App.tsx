
import './App.css'
import { Card, Flex } from 'antd'

function App() {
  

  return (
    <>
     <div style={{ overflow: 'auto', padding: '10px', backgroundColor: 'lightgreen', width: '200px', height: '300px' }} >
      <Flex gap="small" vertical >
        <Card size="small" title="Card title" bordered={false} >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card size="small" title="Card title" bordered={false} >
          <p>Card content</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        <Card size="small" title="Card title" bordered={false} >
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
    </>
  )
}

export default App
