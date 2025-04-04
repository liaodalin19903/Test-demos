import { useGraphStore, useGraphEvent } from '@antv/xflow';
import { Drawer as AntdDrawer, Space, Button, Form, Input } from 'antd';
import { useState } from 'react';

// 类型断言
const Drawer = AntdDrawer as unknown as React.ComponentType<any>;

interface NodeData {
  id: string;
  label?: string;
  status?: 'default' | 'running' | 'success' | 'failed';
}

const ConfigDrawer = () => {
  const [form] = Form.useForm();
  const updateNode = useGraphStore((state) => state.updateNode);
  const [open, setOpen] = useState(false);
  const [nodeData, setNodeData] = useState<NodeData>();

  const onClose = () => {
    setOpen(false);
    form.resetFields();
  };

  const onSave = () => {
    form.validateFields().then(({ label }) => {
      updateNode(nodeData?.id as string, {
        data: {
          ...nodeData,
          label,
        },
      });
      onClose();
    });
  };

  useGraphEvent('node:click', ({ node }) => {
    console.log('node信息：', node)
    const { data, id } = node;

    console.log('data: ', data)

    setOpen(true);
    setNodeData({ ...data, id });
    form.setFieldsValue(data);
  });

  useGraphEvent('blank:click', () => {
    onClose();
  });

  return (
    <>
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
        <Form form={form} layout="vertical" requiredMark={false} autoComplete="off">
          <Form.Item
            name="label"
            label="节点名"
            rules={[{ required: true, message: '请填写节点名称' }]}
          >
            <Input placeholder="请填写节点名称" />
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
};

export { ConfigDrawer };