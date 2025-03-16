// 配置参考定义的entity

import type { CUDModalProps } from '@renderer/components/CUDModal'
import { Proj } from '@shared/@types'

import { addProjApi, deleteProjApi, updateProjApi } from '@renderer/common/apis/projApi.dexie'


/**
 * 生成props
 * @param proj
 */
const getProps = (type: CUDModalProps['type'], proj?: Proj): CUDModalProps => {

  const onConfirm = async (formData: unknown) => {
    console.log('接受到回调：', formData as Proj)
    if(type === 'create') {
      console.log('点击创建')
      await addProjApi(formData as Proj)
    } else if(type === 'update') {
      await updateProjApi(formData as Proj)
    } else if(type === 'delete') {
      const projID: number = (formData as Proj).id!
      await deleteProjApi(projID)
    }
  }

  let props: CUDModalProps = {
    type: type,
    name: '项目',
    onConfirm: onConfirm,
    fields: {
      'id': {
        label: '项目ID',
        type: 'number',
        data: proj?.id,
        required: false,
        hidden: true
      },
      'isSelected': {
        label: '是否选中',
        type: 'number',
        data: proj?.isSelected,
        required: false,
        hidden: true
      },
      'projName': {
        label: '项目名称',
        type: 'string',
        placeholder: 'eg. 项目名称',
        required: true,
        data: proj?.name
      },
      'desc': {
        label: '项目描述',
        type: 'text',
        required: false,
        data: proj?.desc
      },
      'path': {
        label: '项目路径（绝对路径）',
        type: 'string',
        required: true,
        data: proj?.path
      },
    }
  }

  return props
}

// 生成项目基础配置创建 的props
export const useCreateProjProps = (): CUDModalProps => {

  const props: CUDModalProps = getProps('create')
  return props
}

// 生成项目基础配置修改 的props
export const useUpdateProjProps = (proj: Proj): CUDModalProps => {

  const props: CUDModalProps = getProps('update', proj)
  return props
}

export const useDeleteProjProps = (proj: Proj): CUDModalProps => {

  const props: CUDModalProps = getProps('delete', proj)
  return props
}
