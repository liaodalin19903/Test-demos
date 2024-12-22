
import React from 'react'

import { Card, Modal, Space,  } from 'antd'
import CRUDModal, { CRUDModalProps } from '@renderer/components/CRUDModal'

import { useProjBaseProps } from './hooks/useProjBaseProps'

const titleList: string[] = [
  '项目基础设置',
  '项目模块设置'
]

export default function SettingsMain() {

  const [modal, contextHolder] = Modal.useModal();

  const handleSave = (title: typeof titleList[number]) => {
    if (title === '项目基础设置') {

      const props = useProjBaseProps()
      CRUDModal(modal, props)

    } else if (title === '项目模块设置') {

    }
  }

  const handleButton = (title: typeof titleList[number], buttonName: string = '保存') => {
    return <a onClick={()=>{handleSave(title)}}>{buttonName}</a>
  }

  return (
    <>
      <Card style={{ height: 'calc(100vh - 56px)', borderRadius: '0px' }}>
        <Space direction="vertical" size={16}  style={{ display: 'flex' }} >
          <Card size="small" title={titleList[0]} extra={handleButton(titleList[0], '新增')} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
            
          </Card>
          <Card size="small" title={titleList[1]} extra={handleButton(titleList[1])} style={{ width: 300 }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </Space>
      </Card>
      {contextHolder}
    </>
  )
}
