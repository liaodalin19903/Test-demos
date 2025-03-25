import React, { useEffect, useState } from 'react';
import { Button, Form, Typography, Input, Divider, FormListFieldData, FormInstance } from 'antd';
import { useGraphStore, useGraphEvent } from '@antv/xflow';
import { Drawer as AntdDrawer, Space } from 'antd';
import { ExecStepNodeType, ExecStepNodeDataType } from '../node';

const { TextArea } = Input;

// 类型断言
const Drawer = AntdDrawer as unknown as React.ComponentType<any>;



interface MultiParamCompProps {
  form: FormInstance;
  data: ExecStepNodeDataType;
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

const MultiParamComp: React.FC<MultiParamCompProps> = ({ form, data }) => {

  const [formData, setFormData] = useState(data);

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
          rules={[{ required: false, message: 'Missing typeOrPath' }]}
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
                    rules={[{ required: false, message: 'Missing passed' }]}
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


    </Form>
  );
};

const ConfigDrawer = () => {

  const [form] = Form.useForm();
  const updateNode = useGraphStore((state) => state.updateNode);
  const [open, setOpen] = useState(false);
  const [nodeData, setNodeData] = useState<ExecStepNodeType>();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onSave = () => {

    form.validateFields().then(( data ) => {

      const tmpData = data as ExecStepNodeDataType
      if (data.unittests === undefined || data.unittests.length === 0) {
        tmpData.status = 'success'; // 如果没有单元测试，默认状态为 'success'
      } else {
        const allPassed = data.unittests.every(unittest => unittest.passed);
        tmpData.status = allPassed ? 'success' : 'failed';
      }

      updateNode(nodeData?.id as string, {
        data: tmpData as ExecStepNodeDataType,
      });

      onClose();
    });
  };

  useGraphEvent('node:click', ({ node }) => {
    const id = node.id
    const data = node.data as ExecStepNodeDataType;
    setOpen(true);
    setNodeData({ data, id });
    form.setFieldsValue(data);
  });

  useGraphEvent('blank:click', () => {
    onClose();
  });


  return (
    <Drawer
        width={300}
        open={open}
        title="节点信息"
        destroyOnClose
        mask={false}
        onClose={onClose}
        footer={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={onSave} type="primary">
              保存
            </Button>
          </Space>
        }
      >

    {nodeData ? (
      <MultiParamComp form={form} data={nodeData.data} />
    ) : null}

      </Drawer>
  );
};



export default ConfigDrawer;
