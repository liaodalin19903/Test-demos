// 配置参考定义的entity

import type { CRUDModalProps } from '@renderer/components/CRUDModal'
import { Proj } from '@shared/db-entities/Proj'

import { addProj, deleteProj, updateProj } from '@renderer/common/apis/proj'


/**
 * 生成props
 * @param proj
 */
const getProps = (type: CRUDModalProps['type'], fetchProjs: () => Promise<void>, proj?: Proj): CRUDModalProps => {

  const onConfirm = async (formData: unknown) => {
    console.log('接受到回调：', formData as Proj)
    if(type === 'create') {
      console.log('点击创建')
      await addProj(formData as Proj)
      await fetchProjs()
    } else if(type === 'update') {
      await updateProj(formData as Proj)
      await fetchProjs()
    } else if(type === 'delete') {
      const projID: number = (formData as Proj).id!
      await deleteProj(projID)
      await fetchProjs()
    }
  }

  let props: CRUDModalProps = {
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
      'projName': {
        label: '项目名称',
        type: 'string',
        placeholder: 'eg. 项目名称',
        required: true,
        data: proj?.projName
      },
      'desc': {
        label: '项目描述',
        type: 'text',
        required: false,
        data: proj?.desc
      },
    }
  }

  return props
}

// 生成项目基础配置创建 的props
export const useCreateProjBaseProps = (fetchProjs: () => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = getProps('create', fetchProjs)
  return props
}

// 生成项目基础配置修改 的props
export const useUpdateProjBaseProps = (proj: Proj, fetchProjs: () => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = getProps('update', fetchProjs, proj)
  return props
}

export const useDeleteProjBaseProps = (proj: Proj, fetchProjs: () => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = getProps('delete', fetchProjs, proj)
  return props
}
