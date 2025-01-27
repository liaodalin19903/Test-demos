// 生成 modules 的CRUD props



// 配置参考定义的entity

import type { CRUDModalProps } from '@renderer/components/CRUDModal'
import { SMAComboModule } from '@shared/db-entities/SMACombos'

import { smaModuleCreateApi, smaModuleDeleteApi, smaModuleUpdateApi } from '@renderer/common/apis/sma'



import { useEffect } from 'react'
import { useSMAModulesStore, useProjStore } from '@renderer/common/store'



/**
 * 生成props
 * @param
 */
const useGetProps = (type: CRUDModalProps['type'], module?: SMAComboModule): CRUDModalProps => {

  const {
    addModule,
    fetchModules,
    selectedOneSMAModulesGraphCombo,
  } = useSMAModulesStore()
  const { selectedProjMod } = useProjStore()

  const onConfirm = async (formData: unknown) => {
    console.log('接受到回调：', formData as SMAComboModule)
    if(type === 'create') {
      //console.log('点击创建: ', selectedProjMod)

      try {
        await addModule(formData as SMAComboModule, selectedProjMod!.id!)
      } catch (error) {
        console.log('lml：error: ', error)
      }
      await fetchModules(selectedProjMod!.id!)
    } else if(type === 'update') {
      await smaModuleUpdateApi(formData as SMAComboModule)
      await fetchModules(selectedProjMod!.id!)
    } else if(type === 'delete') {
      const projID: number = (formData as SMAComboModule).id!
      await smaModuleDeleteApi(projID)
      await fetchModules(selectedProjMod!.id!)
    }
  }

  console.log('module-lml:', selectedOneSMAModulesGraphCombo)



  let props: CRUDModalProps = {
    type: type,
    name: 'sma模块',
    onConfirm: onConfirm,
    fields: {
      'id': {
        label: 'sma模块ID',
        type: 'number',
        data: module?.id,
        required: false,
        hidden: true
      },
      'parentId': {
        label: '父级模块ID',
        type: 'number',
        data: selectedOneSMAModulesGraphCombo ? selectedOneSMAModulesGraphCombo?.id.split('-')[1] : undefined,
        required: false,
        hidden: selectedOneSMAModulesGraphCombo ? false : true
      },
      'path': {
        label: 'sma模块路径',
        type: 'string',
        placeholder: 'eg. 模块路径',
        required: true,
        data: module?.path
      },
      'moduleName': {
        label: 'sma模块名称',
        type: 'string',
        placeholder: 'eg. 模块名称',
        required: true,
        data: module?.moduleName
      },
      'desc': {
        label: 'sma模块描述',
        type: 'text',
        required: false,
        data: module?.desc
      },
    }
  }

  return props
}

// 生成项目基础配置创建 的props
export const useCreateModuleProps = (): CRUDModalProps => {

  const props: CRUDModalProps = useGetProps('create')
  return props
}

// 生成项目基础配置修改 的props
export const useUpdateModuleProps = (): CRUDModalProps => {

  const { selectedOneSMAModulesGraphCombo } = useSMAModulesStore()

  const props: CRUDModalProps = useGetProps('update', selectedOneSMAModulesGraphCombo)  // TODO: 将 Combo -> Module
  return props
}

export const useDeleteModuleProps = (): CRUDModalProps => {

  const props: CRUDModalProps = useGetProps('delete')
  return props
}
