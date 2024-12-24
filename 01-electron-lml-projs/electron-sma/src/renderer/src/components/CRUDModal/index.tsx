
import { Form, Input, InputNumber, Button, Flex } from 'antd'
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
    label: string,
    placeholder?: string,
    type: ItemKeyType,
    required: boolean,
    data?: unknown  // 更新modal需要此信息进行填充
  }
}

export interface CRUDModalProps {
  type: 'create' | 'update' | 'delete',
  name: string,  // eg. 项目
  fields: CRUDModalItemFields,  // 字段
  onConfirm: (data: unknown) => void
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
const genForm = (modal: HookAPI, props: CRUDModalProps): ReactNode => {

  const onFinish = (formData) => {
    props.onConfirm(formData)
  }

  return (
    <Form
      layout='vertical'
      wrapperCol={{ span: 20 }}
      onFinish={onFinish}
    >
      { Object.entries(props.fields).map(([key, value]) => {

         return <Form.Item
          key={key}
          label={value.label}
          name={key}
          rules={[{required: value.required}]}
         >
          {
            value.type === 'string' && <Input key={key + ':' + value.data} value={value.data as string} placeholder={value.placeholder} />
          }
          {
            value.type === 'text' && <TextArea key={key + ':' + value.data} value={value.data as string} placeholder={value.placeholder} />
          }
          {
            value.type === 'number' && <InputNumber key={key + ':' + value.data} value={value.data as number} placeholder={value.placeholder} />
          }
          {
            (value.type !== 'string' && value.type !== 'text' && value.type !== 'number') && <Input key={key + ':' + value.data} value={value.data as string} placeholder={value.placeholder} />
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
const CRUDModal = (modal: HookAPI, props: CRUDModalProps) => {

  const title = getTitle(props)
  const content = genForm(modal, props)

  const ModalpProps = {
    width: 680,
    title: title,
    content: content,
    closable: true,
    okText: '确定',
    cancelText: '取消',
    footer: null,
    // onOk: props.onConfirm,
    // onCancel: props.onCancel
  }


  if(props.type === 'create') {
    //console.log('进入CRUDModal', modal, ModalpProps)
    modal.info(ModalpProps)
  } else if(props.type === 'update') {
    modal.warning(ModalpProps)
  } else if (props.type === 'delete') {
    modal.error(ModalpProps)
  }
}

export default CRUDModal
