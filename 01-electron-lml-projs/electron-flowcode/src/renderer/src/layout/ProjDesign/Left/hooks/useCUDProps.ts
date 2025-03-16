
// 配置参考定义的entity

import type { CUDModalProps } from '@renderer/components/CUDModal'
//import { FlowcodeCreateSchema } from '@shared/@types'
interface FlowcodeCreateSchema {
  path: string,
  filename: string
}

import { addFlowcodeFileApi} from '@renderer/common/apis/dirApi'


/**
 * 生成props
 * @param flowcodeCreateData
 */
const getProps = (type: CUDModalProps['type'], path: string, flowcodeCreateData?: FlowcodeCreateSchema): CUDModalProps => {

  const onConfirm = async (formData: unknown) => {
    console.log('接受到回调：', formData as FlowcodeCreateSchema)
    if(type === 'create') {
      console.log('点击创建')
      console.log('formData: ', formData)
      await addFlowcodeFileApi(formData as FlowcodeCreateSchema)
    }
  }

  let props: CUDModalProps = {
    type: type,
    name: '项目',
    onConfirm: onConfirm,
    fields: {
      'path': {
        label: '位置',
        type: 'string',
        placeholder: 'eg. "/Users/markleo/Downloads"',
        required: true,
        data: path,
        hidden: true
      },
      'filename': {
        label: 'flowcode文件名称（必须以 .fc.json 结尾）',
        type: 'string',
        required: false,
        data: flowcodeCreateData?.filename,
        placeholder: 'eg. createuser.fc.json'
      },
    }
  }

  return props
}

// 生成项目基础配置创建 的props
export const useCreateFlowcodeFileProps = (path: string): CUDModalProps => {

  const props: CUDModalProps = getProps('create', path)
  return props
}

