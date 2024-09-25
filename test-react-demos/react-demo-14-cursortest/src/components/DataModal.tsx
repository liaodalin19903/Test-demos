import React, { useEffect } from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { FormInstance } from 'antd/lib/form';

interface Field {
  name: string;
  label: string;
  type: string;
  rules?: any[];
}

interface DataModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: any) => void;
  mode: 'create' | 'update';
  fields: Field[];
  initialValues?: any;
}

const DataModal: React.FC<DataModalProps> = ({ visible, onClose, onSubmit, mode, fields, initialValues }) => {
  const [form] = Form.useForm();

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
        onSubmit(values);
        onClose();
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal
      visible={visible}
      title={mode === 'create' ? 'Create Data' : 'Update Data'}
      onCancel={onClose}
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
            rules={field.rules}
          >
            {field.type === 'text' && <Input />}
            {/* 可以根据需要添加更多类型的输入框 */}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default DataModal;