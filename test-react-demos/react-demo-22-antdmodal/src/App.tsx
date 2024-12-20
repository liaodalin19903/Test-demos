
import './App.css'
import { Card, Modal, Space,  } from 'antd'

function App() {
  
  const [modal, contextHolder] = Modal.useModal();

  const config = {
    title: 'Use Hook!',
    content: (
      <div>1w2e3rreqdw</div>
    ),
  };

  return (
    <>
     <button onClick={ () => {
      console.log('点击按钮')
      modal.info(config)
     }}>按钮</button>
     {contextHolder}
    </>
  )
}

export default App
