import styles from './main.module.css'

import { Tabs } from 'antd'

import { tabItems } from './main.tabs'


const tabsStyle:React.CSSProperties = {
  height: '100vh'
}

function Main(): JSX.Element {

  return (
    <div >

      <Tabs
        className={styles.nopaddingTabs}
        tabPosition="left"
        defaultActiveKey='1'
        items = {tabItems}
        style={tabsStyle}
      >
      </Tabs>

    </div>
  )
}

export default Main
