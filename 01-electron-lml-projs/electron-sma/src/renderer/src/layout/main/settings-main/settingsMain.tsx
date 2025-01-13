
import React, { useEffect } from 'react'

import { Card, Space } from 'antd'

import SettingsProjBase from './settingsProjBase'
import SettingsProjMod from './settingsProjMod'
import { useProjStore } from '@renderer/common/store'

import {
  projSetSelectApi,
  projModSetSelectApi
} from '@renderer/common/apis'

export default function SettingsMain() {

  useEffect(() => {

    const unSubProj = useProjStore.subscribe(
      (state) => state.selectedProj,
      async (selectedProj, prevSelectedProj) => {
        await projSetSelectApi(selectedProj!.id!)
      }
    )

    const unSubProjMod = useProjStore.subscribe(
      (state) => state.selectedProjMod,
      async (selectedProjMod, prevSelectedProjMod) => {
        await projModSetSelectApi(selectedProjMod!.id!)
      }
    )

    return () => {
      unSubProj();
      unSubProjMod();
    };
  }, [])

  return (
    <>
      <Card style={{ height: 'calc(100vh - 56px)', borderRadius: '0px' }}>
        <Space direction="vertical" size={16}  style={{ display: 'flex' }} >

          <SettingsProjBase></SettingsProjBase>
          <SettingsProjMod></SettingsProjMod>

        </Space>
      </Card>
    </>
  )
}
