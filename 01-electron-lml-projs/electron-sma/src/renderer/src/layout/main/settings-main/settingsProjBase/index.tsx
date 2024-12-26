

import React from 'react'

import { Card, Modal, Space, Popover,  Radio, RadioChangeEvent, Button, Row, Col } from 'antd'
import CRUDModal from '@renderer/components/CRUDModal'

import { useCreateProjBaseProps, useUpdateProjBaseProps } from './hooks/useProjBaseProps'
import { useStore } from '@renderer/common/store'
import { Proj } from '@shared/db-entities/Proj'


export default function SettingsProjBase() {

  const [modal, contextHolder] = Modal.useModal();
  const { projs, selectedProj, fetchProjs, selectProj } = useStore()

  const handleCreate = () => {
    return <a onClick={()=>{

      const props = useCreateProjBaseProps(fetchProjs)
      CRUDModal(modal, props)

    }}>创建</a>
  }

  const handleUpdate = (proj: Proj) => {

    const props = useUpdateProjBaseProps(proj, fetchProjs)
    CRUDModal(modal, props)
  }

  const handleSelect = (e: RadioChangeEvent) => {
    selectProj(e.target.value)
  }

  return (
    <>
    {/* 项目 */}
      <Card size="small" title='项目基础设置' extra={handleCreate()} style={{ width: 300 }}>
        <Radio.Group
          style={{ width:'100%' }}
          onChange={handleSelect}
          value={selectedProj?.id}
        >
          <Space style={{ width:'100%' }} direction="vertical">
            { projs.map((proj) => (
              <Row key={proj.id} >
                <Col style={{ display:'flex', alignItems: 'center' }} span={ 20 }>
                  <Radio value={proj.id}>
                    <Popover
                      trigger="hover"
                      placement='topLeft'
                      title='项目描述'
                      content={proj.desc}
                    >{proj.projName}
                    </Popover>
                  </Radio>
                </Col>
                <Col span={4}>
                  <Button type='link' onClick={ () => {
                    handleUpdate(proj)
                  } }>修改</Button>
                </Col>
              </Row>
            ))}
          </Space>
        </Radio.Group>
      </Card>
      {contextHolder}
    </>
  )
}