
import styles from "./index.module.css"

import { Flex } from 'antd'



function Arch(): JSX.Element {

  const showModal = () => {
    console.log('show modal')
  }

  return (
    <div className={styles.container}>
      <Flex vertical={false}>
        <div className={styles.main}>主区域

          <button onClick={showModal}>点击展示</button>
        </div>
        <div className={styles.sidebar}>右侧栏</div>
      </Flex>
    </div>
  )
}

export default Arch
