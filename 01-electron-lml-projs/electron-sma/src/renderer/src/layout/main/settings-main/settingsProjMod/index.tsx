import React from 'react'

import { Card, Modal, Space, Popover,  Radio, RadioChangeEvent, Button, Row, Col } from 'antd'
import CRUDModal from '@renderer/components/CRUDModal'
import { useStore } from '@renderer/common/store';

import { useCreateProjModProps, useUpdateProjModProps, useDeleteProjModProps } from './hooks/useProjModProps'

import { ProjMod } from '@shared/db-entities/Proj'


export default function SettingsProjMod() {



  const [modal, contextHolder] = Modal.useModal();
  const { projMods, selectedProj, selectedProjMod, selectProjMod, fetchProjMods } = useStore()

  const handleCreate = () => {
    return <a onClick={()=>{

      if(!selectedProj) {
        modal.error({
          title: '请注意',
          content: '请先选择项目，才能创建项目模块'
        })
      } else {
        const props = useCreateProjModProps(fetchProjMods, selectedProj)
        CRUDModal(modal, props)
      }
    }}>创建</a>
  }

  const handleUpdate = (projMod: ProjMod) => {

    const props = useUpdateProjModProps(projMod, fetchProjMods)
    CRUDModal(modal, props)
  }

  const handleDelete = (projMod: ProjMod) => {

    const props = useDeleteProjModProps(projMod, fetchProjMods)
    CRUDModal(modal, props)
  }

  const handleSelect = async (e: RadioChangeEvent) => {
    selectProjMod(e.target.value)
  }

  return (
    <>
    <Card size="small" title='项目模块设置' extra={handleCreate()} style={{ width: 300 }}>
      <Radio.Group
          style={{ width:'100%' }}
          onChange={handleSelect}
          value={selectedProjMod?.id}
        >
          <Space style={{ width:'100%' }} direction="vertical">
            { projMods.map((projMod) => (
              <Row key={projMod.id} >
                <Col style={{ display:'flex', alignItems: 'center' }} span={ 15 }>
                  <Radio value={projMod.id}>
                    <Popover
                      trigger="hover"
                      placement='topLeft'
                      title='项目描述'
                      content={projMod.desc}
                    >{projMod.modName}
                    </Popover>
                  </Radio>
                </Col>
                <Col span={4}>
                  <Button
                    //type='link'
                    size='small'
                    color="primary"
                    variant="filled"
                    onClick={ () => {
                      handleUpdate(projMod)
                  } }>修改</Button>
                </Col>
                <Col span={1}></Col>
                <Col span={4}>
                  <Button
                      //type='link'
                      size='small'
                      color="danger"
                      variant="filled"
                      onClick={ () => {
                        handleDelete(projMod)
                    } }>删除</Button>
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
