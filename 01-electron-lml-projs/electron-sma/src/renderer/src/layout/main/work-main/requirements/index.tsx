import { Flex } from 'antd'
import styles from './index.module.css'

function Requirements(): JSX.Element {

  return (
    <div className={styles.container}>
      <Flex vertical={false}>
        <div className={styles.main}>
          modules


        </div>
        <div className={styles.sidebar}>右侧栏</div>
      </Flex>
    </div>
  )
}

export default Requirements
