
import styles from "./index.module.css"

import { Flex } from 'antd'

const mainStyle: React.CSSProperties = {
  backgroundColor: '#eee',
  width: '100%',
  height: 'calc(100vh - 56px)',
};

const sidebarStyle: React.CSSProperties = {
  backgroundColor: '#ddd',
  width: '400px',
  height: 'calc(100vh - 56px)',
};

function APIs(): JSX.Element {

  const showModal = () => {
    console.log('show modal')
  }

  return (
    <div className={styles.container}>
      <Flex vertical={false}>
        <div style={mainStyle}>主区域

          <button onClick={showModal}>点击展示</button>
        </div>
        <div style={sidebarStyle}>右侧栏</div>
      </Flex>
    </div>
  )
}

export default APIs
