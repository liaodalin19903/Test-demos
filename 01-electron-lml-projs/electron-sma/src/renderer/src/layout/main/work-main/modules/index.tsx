import { Flex } from 'antd'
import styles from './index.module.css'

import ModulesMain from './modules-main'
import ModulesSettings from './modules-settings'

function Modules(): JSX.Element {

  return (
    <div className={styles.container}>
      <Flex vertical={false}>
        <div className={styles.main}>
          <ModulesMain/>


        </div>
        <div className={styles.sidebar}>
          <ModulesSettings />
        </div>
      </Flex>
    </div>
  )
}

export default Modules
