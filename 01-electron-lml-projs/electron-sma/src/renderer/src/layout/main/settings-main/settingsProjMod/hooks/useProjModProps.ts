// 配置参考定义的entity
// import { Proj } from '@shared/db-entities/ProjMod';

import type { CRUDModalProps } from '@renderer/components/CRUDModal'
import { ProjMod } from '@shared/db-entities/Proj'

import { addProjMod, deleteProjMod, updateProjMod } from '@renderer/common/apis/proj'


/**
 * 生成props
 * @param type 类型： 创建/更新/删除 -> 会显示不同的modal
 * @param fetchProjMods 回调函数，比如创建/修改/删除之后，重新进行刷新获取store
 * @param projMod
 * @returns
 */
const getProps = (type: CRUDModalProps['type'], fetchProjMods: (projId: number) => Promise<void>, projMod?: ProjMod): CRUDModalProps => {

  const onConfirm = async (formData: unknown) => {
    console.log('接受到回调：', formData as ProjMod)
    if(type === 'create') {
      console.log('点击创建')
      await addProjMod(
        (formData as ProjMod),
        (formData as ProjMod).proj.id!
      )
      await fetchProjMods((formData as ProjMod).proj.id!)
    } else if(type === 'update') {
      await updateProjMod(formData as ProjMod)
      await fetchProjMods((formData as ProjMod).proj.id!)
    } else if(type === 'delete') {
      const projModId: number = (formData as ProjMod).id!
      await deleteProjMod(projModId)
      await fetchProjMods((formData as ProjMod).proj.id!)
    }
  }

  let props: CRUDModalProps = {
    type: type,
    name: '项目',
    onConfirm: onConfirm,
    fields: {
      'id': {
        label: '项目模块ID',
        type: 'number',
        data: projMod?.id,
        required: false
      },
      'projName': {
        label: '项目模块名称',
        type: 'string',
        placeholder: 'eg. 项目模块名称',
        required: true,
        data: projMod?.modName
      },
      'desc': {
        label: '项目模块描述',
        type: 'text',
        required: false,
        data: projMod?.desc
      },
    }
  }

  return props
}

// 生成项目Mod 配置创建 的props
export const useCreateProjModProps = (fetchProjMods: (projId: number) => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = getProps('create', fetchProjMods)
  return props
}

// 生成项目Mod 配置修改 的props
export const useUpdateProjModProps = (projMod: ProjMod, fetchProjMods: (projId: number) => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = getProps('update', fetchProjMods, projMod)
  return props
}

export const useDeleteProjModProps = (projMod: ProjMod, fetchProjMods: (projId: number) => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = getProps('delete', fetchProjMods, projMod)
  return props
}
