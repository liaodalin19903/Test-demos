import React, { useState } from 'react';
import type { TableProps } from 'antd';
import { Button, Checkbox, Form, Input, InputNumber, Popconfirm, Space, Table, Typography } from 'antd';

import './index.css';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text' | 'checkbox';
  record: any;
  index: number;
  form: Form.Instance; // 新增form属性
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  form, // 接收form实例
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? (
    <InputNumber />
  ) : inputType === 'text' ? (
    <Input />
  ) : inputType === 'checkbox' ? (
    <Checkbox checked={form.getFieldValue(dataIndex) || false} onChange={(e) => form.setFieldsValue({ [dataIndex]: e.target.checked })} />
  ) : null;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

interface IndexProps<T> {
  initialData: T[];
  onEdit: (record: T) => void;
  onDelete: (record: T) => void;
}

const Index = <T extends { key: React.Key }>({ initialData, onEdit, onDelete }: IndexProps<T>) => {
  const [form] = Form.useForm();
  const [data, setData] = useState(initialData);
  const [editingKey, setEditingKey] = useState<React.Key>('');

  const isEditing = (record: T) => record.key === editingKey;

  const handleEdit = (record: T) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const handleCancel = () => {
    setEditingKey('');
  };

  const handleSave = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as T;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        onEdit(row);
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        onEdit(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = (record: T) => {
    onDelete(record);
  };

  const generateColumns = () => {
    const columns = [];
    for (const key in initialData[0]) {
      if (key === 'key') continue;

      if (key !== 'passed') {
        columns.push({
          title: key,
          dataIndex: key,
          editable: true,
        });
      } else {
        columns.push({
          title: key,
          dataIndex: key,
          editable: true,
          render: (value: boolean) => <Checkbox checked={value} disabled />,
        });
      }
    }
    columns.push({
      title: 'operation',
      dataIndex: 'operation',
      render: (_: any, record: T) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link onClick={() => handleSave(record.key)} style={{ marginInlineEnd: 8 }}>
              保存
            </Typography.Link>
            <Popconfirm title="确定要取消吗?" onConfirm={handleCancel}>
              <a>取消</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Space>
              <Button
                size='small'
                variant="filled"
                onClick={() => handleEdit(record)}
              >
                编辑
              </Button>
              <Popconfirm title="确定要删除吗?" onConfirm={() => handleDelete(record)}>
                <Button
                  size='small'
                  color="danger"
                  variant="filled">
                  删除
                </Button>
              </Popconfirm>
            </Space>
          </>
        );
      },
    });
    return columns;
  };

  const columns = generateColumns();

  const mergedColumns: TableProps<T>['columns'] = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: T) => ({
        record,
        inputType: col.dataIndex === 'passed' ? 'checkbox' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        form, // 传递form实例
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table<T>
        className="editable-table"
        components={{
          body: { cell: EditableCell },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={false}
        scroll={{ x: '100%' }}
        style={{ width: '100%' }}
      />
    </Form>
  );
};

export default Index;