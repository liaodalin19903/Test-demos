import React from 'react';
import type { TableProps } from 'antd';
import { Checkbox, Table, Typography } from 'antd';

import './index.css';

interface IndexProps<T> {
  initialData: T[];
}

const Index = <T extends { key: React.Key }>({ initialData }: IndexProps<T>) => {
  const generateColumns = () => {
    const columns = [];
    for (const key in initialData[0]) {
      if (key === 'key') continue;

      if (key !== 'passed') {
        columns.push({
          title: key,
          dataIndex: key,
        });
      } else {
        columns.push({
          title: key,
          dataIndex: key,
          render: (value: boolean) => <Checkbox checked={value} disabled />,
        });
      }
    }
    return columns;
  };

  const columns = generateColumns();

  return (
    <Table<T>
      className="editable-table"
      bordered
      dataSource={initialData}
      columns={columns}
      rowClassName="editable-row"
      pagination={false}
      scroll={{ x: '100%' }}
      style={{ width: '100%' }}
    />
  );
};

export default Index;