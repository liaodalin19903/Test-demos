
import { Form, Input, InputNumber, Button, Flex } from 'antd'
import { HookAPI } from 'antd/es/modal/useModal';
const { TextArea } = Input;
import React, { ReactNode } from 'react'

import { useMapToFormInitialValues } from './hooks/useMapToFormInitialValues'

/**
 * eg.
 * username:
 */
type ItemKeyType = 'string' | 'number' | 'boolean' | 'text' | 'unchangeable'
interface CUDModalItemFields {
  [key: string] : {
    label: string,
    placeholder?: string,
    type: ItemKeyType,
    required: boolean,
    hidden?: boolean,
    disabled?: boolean,
    data?: unknown  // 更新modal需要此信息进行填充
  }
}

export interface CUDModalProps {
  type: 'create' | 'update' | 'delete',
  name: string,  // eg. 项目
  fields: CUDModalItemFields,  // 字段
  onConfirm: (data: unknown) => void
}

const getTitle: Function = (props: CUDModalProps) => {
  if (props.type === 'create') {
    return '创建: ' + props.name
  } else if(props.type === 'update') {
    return '更新: ' + props.name
  } else if(props.type === 'delete') {
    return '删除: ' + props.name
  }
  return ''
}


type TModalInstance = { destroy: () => void; }

let modalInstance: TModalInstance | undefined= undefined

// 生产表单
const genForm = ( props: CUDModalProps): ReactNode => {

  const  initialValues = useMapToFormInitialValues(props)

  const onFinish = (formData) => {
    props.onConfirm(formData)
    if(modalInstance){
      modalInstance.destroy()
    }
  }

  const onFinishFailed = (formData) => {
    console.log(formData)
  }

  return (
    <Form
      layout='vertical'
      wrapperCol={{ span: 20 }}
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      { Object.entries(props.fields).map(([key, value]) => {

         return <Form.Item
          key={key}
          label={value.label}
          name={key}
          rules={[{required: value.required}]}
          hidden={ value.hidden  }
         >
          {
            value.type === 'string' && <Input key={key + ':' + value.data} disabled={ value.disabled } placeholder={value.placeholder} />
          }
          {
            value.type === 'text' && <TextArea key={key + ':' + value.data} disabled={ value.disabled } placeholder={value.placeholder} />
          }
          {
            value.type === 'number' && <InputNumber key={key + ':' + value.data} disabled={ value.disabled } placeholder={value.placeholder} />
          }
          {
            (value.type !== 'string' && value.type !== 'text' && value.type !== 'number') && <Input key={key + ':' + value.data} disabled={ value.disabled } placeholder={value.placeholder} />
          }
         </Form.Item>
        })
      }

        <Flex align={'flex-start'} justify="end">
          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Flex>

      </Form>
  )
}

// 不是ReactNode, 是一个方法
const CUDModal = (modal: HookAPI, props: CUDModalProps) => {

  const title = getTitle(props)
  const content = genForm(props)

  //console.log('content: ', content)

  const ModalpProps = {
    width: 680,
    title: title,
    content: content,
    closable: true,
    okText: '确定',
    cancelText: '取消',
    footer: null,
  }

  if(props.type === 'create') {
    //console.log('进入CUDModal', modal, ModalpProps)
    modalInstance = modal.info(ModalpProps)
  } else if(props.type === 'update') {
    modalInstance = modal.warning(ModalpProps)
  } else if (props.type === 'delete') {
    modalInstance = modal.error(ModalpProps)
  }
}

export default CUDModal
