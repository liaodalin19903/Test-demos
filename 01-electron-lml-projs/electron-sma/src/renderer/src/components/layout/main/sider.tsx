import { Tabs } from "antd";
import styles from './sider.module.css'

import WorkMain from './work-main/workMain'

import {
  SettingOutlined,
  FormOutlined
 } from "@ant-design/icons";

function Sider(): JSX.Element {

  const items = [
    { key: "0", label: '设置', children: `项目设置-内容`, icon: <SettingOutlined />},
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
