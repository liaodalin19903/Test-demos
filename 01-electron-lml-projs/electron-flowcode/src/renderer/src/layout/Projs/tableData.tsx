import { Proj } from '@shared/@types';
import { Space, TableProps } from "antd";
import { updateProjApi, deleteProjApi } from '@renderer/common/apis/projApi.dexie';
import { db } from '@renderer/common/dexieDB';
import { Button } from 'antd';

export const genColumns = (handleEdit, handleDelete) => {

  return [
    {
      title: '名称',
      key: 'projName',
      dataIndex: 'projName',
    },
    {
      title: '描述',
      key: 'desc',
      dataIndex: 'desc',
    },
    {
      title: '项目路径',
      key: 'projPath',
      dataIndex: 'projPath',
    },
    {
      title: '项目代码路径',
      key: 'codePath',
      dataIndex: 'codePath',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record: Proj) =>
      (
        <div>
          <Space direction='vertical'>
            <Button size='small' color="default" variant="filled" onClick={() => handleEdit(record)}>编辑</Button>
            <Button size='small' color="danger" variant="filled" onClick={() => handleDelete(record)}>删除</Button>
          </Space>
        </div>
      )
    }
  ];
}

// rowSelection object indicates the need for row selection
export const rowSelection: TableProps<Proj>['rowSelection'] = {
  onChange: async (selectedRowKeys: React.Key[], selectedRows: Proj[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

    if (selectedRows.length === 0) {
      return;
    }

    // 1、设置所有数据不选中
    await db.projs.toArray().then((projs) => {
      const updates = projs.map((proj) => ({
        key: proj.id,
        changes: { isSelected: 0 },
      }));

      return db.projs.bulkUpdate(updates);
    });

    // 2、更新选中项的数据
    const proj = {
      ...selectedRows[0],
      isSelected: 1,
    };

    // 排除 key 属性
    // @ts-ignore
    const { key, ...newProj } = proj;

    await updateProjApi(newProj as Proj); // 类型断言确保兼容性
  },
  getCheckboxProps: (record: Proj) => ({
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
    // name: record.name,
  }),
};

