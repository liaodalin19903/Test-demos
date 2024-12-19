import styles from './workMain.module.css'

import { Tabs } from 'antd'

import { tabItems } from './workMain.tabs'



function WorkMain(): JSX.Element {
  return (
    <div >
      <Tabs
        className={styles.nopaddingTabs}
        tabPosition="left"
        defaultActiveKey='3'
        items = {tabItems}
      >
      </Tabs>

    </div>
  )
}

export default WorkMain
