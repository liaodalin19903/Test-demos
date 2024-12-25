
import React from 'react'

import { Card, Space } from 'antd'

import SettingsProjBase from './settingsProjBase'


export default function SettingsMain() {

  return (
    <>
      <Card style={{ height: 'calc(100vh - 56px)', borderRadius: '0px' }}>
        <Space direction="vertical" size={16}  style={{ display: 'flex' }} >

          <SettingsProjBase></SettingsProjBase>

        </Space>
      </Card>
    </>
  )
}
