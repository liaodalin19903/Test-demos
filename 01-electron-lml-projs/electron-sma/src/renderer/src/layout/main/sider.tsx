import { Tabs } from "antd";
import styles from './sider.module.css'

import WorkMain from './work-main/workMain'
import SettingsMain from "./settings-main/settingsMain";

import {
  SettingOutlined,
  FormOutlined
 } from "@ant-design/icons";

function Sider(): JSX.Element {

  const items = [
    { key: "0", label: '设置', children: <SettingsMain/>, icon: <SettingOutlined />},
    { key: "1", label: '工作', children: <WorkMain/>, icon: <FormOutlined />},

  ]

  return (

    <div >
      <Tabs
        className={styles.leftSiderTabs}
        defaultActiveKey="1"
        tabPosition="left"
        size="small"
        items={items}
      />
    </div>
  )
}

export default Sider
