

import React, { useEffect, useState } from 'react'

import { Card, Modal, Space, Popover, Checkbox, Radio, RadioChangeEvent } from 'antd'
import CRUDModal, { CRUDModalProps } from '@renderer/components/CRUDModal'

import { useGetProjBaseProps } from './hooks/useProjBaseProps'
import { useStore } from '@renderer/common/store'


export default function SettingsProjBase() {

  const [modal, contextHolder] = Modal.useModal();
  const { projs, selectedProj, selectProj } = useStore()

  const handleButton = ( buttonName: string = '保存') => {
    return <a onClick={()=>{

      const props = useGetProjBaseProps()
      CRUDModal(modal, props)

    }}>{buttonName}</a>
  }

  const handleSelect = (e: RadioChangeEvent) => {
    selectProj(e.target.value)
  }

  return (
    <>
    {/* 项目 */}
      <Card size="small" title='项目基础设置' extra={handleButton('新增')} style={{ width: 300 }}>
        <Radio.Group
          onChange={handleSelect}
          value={selectedProj?.id}
        >
          <Space direction="vertical">
            { projs.map((proj) => (
              <Radio key={proj.id} value={proj.id}>
                <Popover
                  trigger="hover"
                  placement='topLeft'
                  title='项目描述'
                  content={proj.desc}
                >{proj.projName}
                </Popover>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Card>
      {contextHolder}
    </>
  )
}
