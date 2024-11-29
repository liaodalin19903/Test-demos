import { Tabs } from 'antd'

import { tabItems } from './main.tabs'


const tabsStyle:React.CSSProperties = {
  height: '100vh'
}

function Main(): JSX.Element {

  return (
    <div >
      <Tabs tabPosition="left"
        items = {tabItems}
        style={tabsStyle}
      >
      </Tabs>
    </div>
  )
}

export default Main
