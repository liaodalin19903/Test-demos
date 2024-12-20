// 配置参考定义的entity
// import { Proj } from '@shared/db-entities/Proj';

import type { CRUDModalProps } from '@renderer/components/CRUDModal'



// 生成项目基础配置 的props
export const useProjBaseProps = (): CRUDModalProps => {

  const onConfirm = () => {

  }

  const props: CRUDModalProps = {
    type: 'create',
    name: '项目',
    onConfirm: onConfirm,
    fields: {
      'projName': {
        type: 'string',
        required: true
      },
      'desc': {
        type: 'text',
        required: false
      }
    }
  }

  return props
}
