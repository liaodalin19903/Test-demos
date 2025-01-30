import React from 'react';
import { Table } from 'antd';

// 定义 columns
export const columns = [
  {
    title: '名称',
    dataIndex: 'properties.Name',
    key: 'Name',
    onCell: (record: DataType) => ({
      children: record.properties?.Name
    })
  },
  {
    title: '描述',
    dataIndex: 'properties.desc',
    key: 'desc',
    onCell: (record: DataType) => ({
      children: 'record.properties?.desc'
    })
  },
  {
    title: '项目ID',
    dataIndex: 'properties.proj_id',
    key: 'proj_id',
    onCell: (record: DataType) => ({
      children: record.properties?.proj_id
    })
  },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    key: 'created_time'
  },
  {
    title: '更新时间',
    dataIndex: 'last_edited_time',
    key: 'last_edited_time'
  }
];


interface DataType {
  key: string,
  created_time: string,
  last_edited_time: string,
  properties: {
    Name: string,
    desc: string,
    proj_id: string
  }
}

// 示例数据
const dataSource: DataType[] = [
  {
    key: '1',
    created_time: '2024-01-01',
    last_edited_time: '2024-01-02',
    properties: {
      Name: '项目1',
      desc: '这是项目1的描述',
      proj_id: 'GP001'
    }
  },
  {
    key: '2',
    created_time: '2024-02-01',
    last_edited_time: '2024-02-02',
    properties: {
      Name: '项目2',
      desc: '这是项目2的描述',
      proj_id: 'GP002'
    }
  }
];

const App = () => {
  return <Table dataSource={dataSource} columns={columns} />;
};

export default App;