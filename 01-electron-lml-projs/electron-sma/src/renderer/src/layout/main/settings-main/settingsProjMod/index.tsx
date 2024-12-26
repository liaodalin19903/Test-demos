import React from 'react'

import { Card, Modal, Space, Popover,  Radio, RadioChangeEvent, Button, Row, Col } from 'antd'
import CRUDModal from '@renderer/components/CRUDModal'
import { useStore } from '@renderer/common/store';

import { useCreateProjModProps, useUpdateProjModProps, useDeleteProjModProps } from './hooks/useProjModProps'

import { ProjMod } from '@shared/db-entities/Proj'

export default function SettingsProjMod() {

  const [modal, contextHolder] = Modal.useModal();
  const { projMods, selectedProjMod, selectProjMod, fetchProjMods } = useStore()

  const handleCreate = () => {
    return <a onClick={()=>{

      const props = useCreateProjModProps(fetchProjMods)
      CRUDModal(modal, props)

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

    // 触发ProjMod的获取
    await fetchProjMods(e.target.value)
  }

  return (
    <Card size="small" title='项目模块设置' extra={handleCreate()} style={{ width: 300 }}>

    </Card>
  )
}
