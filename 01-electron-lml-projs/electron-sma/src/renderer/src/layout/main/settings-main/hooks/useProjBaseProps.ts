// 配置参考定义的entity
// import { Proj } from '@shared/db-entities/Proj';

import type { CRUDModalProps } from '@renderer/components/CRUDModal'
import { Proj } from '@shared/db-entities/Proj'


// 生成项目基础配置 的props
export const useProjBaseProps = (): CRUDModalProps => {

  const onConfirm = (formData: unknown) => {

    console.log('接受到回调：', formData as Proj)
  }

  const props: CRUDModalProps = {
    type: 'create',
    name: '项目',
    onConfirm: onConfirm,
    fields: {
      'projName': {
        label: '项目名称',
        type: 'string',
        placeholder: 'eg. 项目名称',
        required: true
      },
      'desc': {
        label: '项目描述',
        type: 'text',
        required: false
      }
    }
  }

  return props
}
