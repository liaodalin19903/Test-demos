
import { Modal, Form, Input } from 'antd'
import { HookAPI } from 'antd/es/modal/useModal';
const { TextArea } = Input;
import React, { ReactNode } from 'react'



/**
 * eg.
 * username:
 */
type ItemKeyType = 'string' | 'number' | 'boolean' | 'text'
interface CRUDModalItemFields {
  [key: string] : {
    type: ItemKeyType,
    required: boolean,
    data?: unknown  // 更新modal需要此信息进行填充
  }
}

export interface CRUDModalProps {
  type: 'create' | 'update' | 'delete',
  name: string,  // eg. 项目
  fields: CRUDModalItemFields,  // 字段
  onConfirm: (data: unknown) => void,
  onCancel?: () => void,

}

const getTitle: Function = (props: CRUDModalProps) => {
  if (props.type === 'create') {
    return '创建: ' + props.name
  } else if(props.type === 'update') {
    return '更新: ' + props.name
  } else if(props.type === 'delete') {
    return '删除: ' + props.name
  }
  return ''
}

// 生产表单
const genForm = (props: CRUDModalProps): ReactNode => {

  return (
    <Form
      layout='vertical'
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
    >
      { Object.entries(props.fields).map(([key, value]) => {

         return <Form.Item
          key={key}
          label={key}
          name={key}
          rules={[{required: value.required}]}
         >
          <Input key={key + ':' + value.data} value={value.data as string}/>
         </Form.Item>
        })
      }
    </Form>
  )
}

// 不是ReactNode, 是一个方法
const CRUDModal = (modal: HookAPI, props: CRUDModalProps) => {

  const title = getTitle(props)
  const content = genForm(props)

  const ModalpProps = {
    width: 560,
    title: title,
    content: content,
    onOk: props.onConfirm,
    onCancel: props.onCancel
  }


  if(props.type === 'create') {
    console.log('进入CRUDModal', modal, ModalpProps)
    modal.info(ModalpProps)
  } else if(props.type === 'update') {
    modal.warning(ModalpProps)
  } else if (props.type === 'delete') {
    modal.error(ModalpProps)
  }
}

export default CRUDModal
