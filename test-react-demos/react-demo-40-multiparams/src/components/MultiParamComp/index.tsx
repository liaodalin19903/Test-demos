import React, { useState } from 'react';
import { Button, Form, Typography, Input, Divider, FormListFieldData } from 'antd';

export interface ExecStepNodeDataType {
  label: string;
  status: string;
  desc?: string;
  inputs: {
    name: string;
    typeOrPath: string;
    customType?: string;
    desc?: string;
  }[];
  output: {
    typeOrPath: string;
    customType?: string;
    desc?: string;
  };
  unittests: {
    path: string;
    name: string;
    passed: boolean;
    desc?: string;
  }[];
}

interface MultiParamCompProps {
  data: ExecStepNodeDataType;
  onDataChange: (updatedData: ExecStepNodeDataType) => void;
}


function omit(obj, key: string) {
  const newObj = { ...obj };

  delete newObj[key];

  return newObj;
}

const getUniqueKey = (field: FormListFieldData) => {
  // 使用 field.name 或自定义
  return field.name + `input_${Date.now()}` + Math.random();
};

const MultiParamComp: React.FC<MultiParamCompProps> = ({ data, onDataChange }) => {
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(data);

  const handleSave = () => {
    form.validateFields().then((values) => {
      setFormData(values);
      onDataChange(values);
    });
  };

  return (
    <Form form={form} initialValues={formData} layout="vertical">
      <Divider style={{ borderColor: '#7cb305' }}>步骤信息</Divider>
      <div style={{ marginBottom: 16, border: '1px dashed #ccc', padding: '20px', backgroundColor: 'wheat' }}>
        {/* 1. Label and Desc */}
        <Form.Item
          name="label"
          label="Label"
          rules={[{ required: true, message: 'Missing label' }]}
        >
          <Input placeholder="Label" />
        </Form.Item>
        <Form.Item
          name="desc"
          label="Description"
          rules={[{ required: true, message: 'Missing description' }]}
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
      </div>

      <Divider style={{ borderColor: '#7cb305' }}>入参</Divider>
      {/* 2. Inputs */}
      <Form.List name="inputs">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => {
              // 生成唯一 key（使用 field.name 或自定义）
              //const uniqueKey = field.name || `input_${Date.now()}`;

              

              return (
                <div key={getUniqueKey(field)} style={{ marginBottom: 16, border: '1px dashed #ccc', padding: '20px', backgroundColor: 'wheat' }}>
                  <Form.Item
                    key={getUniqueKey(field)}
                    {...omit(field, 'key')}
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: 'Missing name' }]}
                    label="Name"
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    key={getUniqueKey(field)}
                    {...omit(field, 'key')}
                    name={[field.name, 'typeOrPath']}
                    rules={[{ required: true, message: 'Missing typeOrPath' }]}
                    label="Type or Path"
                  >
                    <Input placeholder="Type or Path" />
                  </Form.Item>
                  <Form.Item
                    key={getUniqueKey(field)}
                    {...omit(field, 'key')}
                    name={[field.name, 'customType']}
                    label="Custom Type"
                  >
                    <Input placeholder="Custom Type" />
                  </Form.Item>
                  <Form.Item
                    key={getUniqueKey(field)}
                    {...omit(field, 'key')}
                    name={[field.name, 'desc']}
                    label="Description"
                  >
                    <Input.TextArea placeholder="Description" />
                  </Form.Item>
                  <Button type="link" onClick={() => remove(field.name)}>
                    Remove
                  </Button>
                </div>
              );
            })}
            <Button type="dashed" onClick={() => add()} block>
              + Add Input
            </Button>
          </>
        )}
      </Form.List>

      <Divider style={{ borderColor: '#7cb305' }}>出参</Divider>
      {/* 3. Output */}
      <div style={{ marginBottom: 16, border: '1px dashed #ccc', padding: '20px', backgroundColor: 'wheat' }}>
        <Form.Item
          name={['output', 'typeOrPath']}
          label="Output Type or Path"
          rules={[{ required: true, message: 'Missing typeOrPath' }]}
        >
          <Input placeholder="Type or Path" />
        </Form.Item>
        <Form.Item
          name={['output', 'customType']}
          label="Output Custom Type"
        >
          <Input placeholder="Custom Type" />
        </Form.Item>
        <Form.Item
          name={['output', 'desc']}
          label="Output Description"
        >
          <Input.TextArea placeholder="Description" />
        </Form.Item>
      </div>
      
      <Divider style={{ borderColor: '#7cb305' }}>单元测试</Divider>
      {/* 4. Unittests */}
      <Form.List name="unittests">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => {
              // 生成唯一 key（使用 field.name 或自定义）

              return (
                <div key={getUniqueKey(field)} style={{ marginBottom: 16, border: '1px dashed #ccc', padding: '20px', backgroundColor: 'wheat' }}>
                  <Form.Item
                    key={getUniqueKey(field)}
                    {...omit(field, 'key')}
                    name={[field.name, 'path']}
                    rules={[{ required: true, message: 'Missing path' }]}
                    label="Path"
                  >
                    <Input placeholder="Path" />
                  </Form.Item>
                  <Form.Item
                    key={getUniqueKey(field)}
                    {...omit(field, 'key')}
                    name={[field.name, 'name']}
                    rules={[{ required: true, message: 'Missing name' }]}
                    label="Name"
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                  <Form.Item
                    key={getUniqueKey(field)}
                    {...omit(field, 'key')}
                    name={[field.name, 'passed']}
                    rules={[{ required: true, message: 'Missing passed' }]}
                    label="Passed"
                    valuePropName="checked"
                  >
                    <Input type="checkbox" />
                  </Form.Item>
                  <Form.Item
                    key={getUniqueKey(field)}
                    {...omit(field, 'key')}
                    name={[field.name, 'desc']}
                    label="Description"
                  >
                    <Input.TextArea placeholder="Description" />
                  </Form.Item>
                  <Button type="link" onClick={() => remove(field.name)}>
                    Remove
                  </Button>
                </div>
              );
            })}
            <Button type="dashed" onClick={() => add()} block>
              + Add Unittest
            </Button>
          </>
        )}
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>

      <Button type="primary" onClick={handleSave}>
        Save
      </Button>
    </Form>
  );
};

export default MultiParamComp;