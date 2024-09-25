import React, { useEffect } from 'react';
import { Modal, Form, Button, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { Rule } from 'antd/es/form';

export interface Field {
  name: string;
  label: string;
  type: string;
  rules?: unknown[];
}

interface CUDataModalProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'update';
  initialValues: unknown | null | object;
  fields: Field[];
  onCallBack: (values: unknown) => void;
}




const CUDataModal: React.FC<CUDataModalProps> = ({ open, onClose, onCallBack, mode, fields, initialValues }) => {
  const [form] = useForm();

  useEffect(() => {
    if (form) {
      form.resetFields();
    }
  }, [form]);

  useEffect(() => {
    if (mode === 'update' && initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [mode, initialValues, form]);

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onCallBack(values);
        onClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      open={open}
      title={mode === 'create' ? 'Create Data' : 'Update Data'}
      onCancel={onClose}
      centered
      // 删除 className 和 style 属性
      footer={[
        <Button key="back" onClick={onClose}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Confirm
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            rules={field.rules as Rule[]}
          >
            {field.type === 'text' && <Input />}
            {/* 可以根据需要添加更多类型的输入框 */}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default CUDataModal;