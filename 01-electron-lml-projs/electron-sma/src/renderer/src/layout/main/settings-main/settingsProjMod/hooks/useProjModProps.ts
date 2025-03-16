// 配置参考定义的entity

import type { CRUDModalProps } from '@renderer/components/CRUDModal'
import { ProjMod } from '@shared/db-entities/Proj'

import { addProjMod, deleteProjMod, updateProjMod } from '@renderer/common/apis/proj'
import { useProjStore } from '@renderer/common/store'


/**
 * 生成props
 * @param type 类型： 创建/更新/删除 -> 会显示不同的modal
 * @param fetchProjMods 回调函数，比如创建/修改/删除之后，重新进行刷新获取store
 * @param projMod
 * @returns
 */
const useGetProps = (type: CRUDModalProps['type'], fetchProjMods: (projId: number) => Promise<void>, projMod?: ProjMod): CRUDModalProps => {

  const { selectedProj } = useProjStore()

  const onConfirm = async (formData: unknown) => {
    console.log('接受到回调：', formData as ProjMod)
    if(type === 'create') {
      console.log('点击创建')
      await addProjMod(formData as ProjMod, selectedProj!.id!)
      await fetchProjMods((formData as ProjMod).proj.id!)
    } else if(type === 'update') {
      await updateProjMod(formData as ProjMod)
      console.log('(formData as ProjMod).proj: ', (formData as ProjMod).proj)
      await fetchProjMods((formData as ProjMod).proj.id!)
    } else if(type === 'delete') {
      const projModId: number = (formData as ProjMod).id!
      await deleteProjMod(projModId)
      await fetchProjMods((formData as ProjMod).proj.id!)
    }
  }

  let props: CRUDModalProps = {
    type: type,
    name: '项目模块',
    onConfirm: onConfirm,
    fields: {
      'id': {
        label: '项目模块ID',
        type: 'number',
        data: projMod?.id,
        required: false,
        hidden: true
      },
      'proj': {
        label: '所属项目',
        type: 'unchangeable',
        data: selectedProj ? selectedProj!.id : undefined,
        required: true,
        disabled: true
      },
      'modName': {
        label: '项目模块名称',
        type: 'string',
        placeholder: 'eg. 项目模块名称',
        required: true,
        disabled: (projMod?.isMain === true) ? true : false,
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

//===========================

// 新增
export const useCreateProjModProps = (fetchProjMods: (projId: number) => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = useGetProps('create', fetchProjMods)
  console.log(props)
  return props
}

// 修改
export const useUpdateProjModProps = (projMod: ProjMod, fetchProjMods: (projId: number) => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = useGetProps('update', fetchProjMods, projMod)
  return props
}
// 删除
export const useDeleteProjModProps = (projMod: ProjMod, fetchProjMods: (projId: number) => Promise<void>): CRUDModalProps => {

  const props: CRUDModalProps = useGetProps('delete', fetchProjMods, projMod)
  return props
}
