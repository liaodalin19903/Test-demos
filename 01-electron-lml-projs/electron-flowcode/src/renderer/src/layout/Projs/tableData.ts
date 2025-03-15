import { Proj} from '@shared/@types'
import { TableProps } from "antd";

import { updateProjApi } from '@renderer/common/apis/projApi.dexie'
import { db } from '@renderer/common/dexieDB';

export const columns = [
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
    title: '路径',
    key: 'path',
    dataIndex: 'path',
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
]

// rowSelection object indicates the need for row selection
export const rowSelection: TableProps<Proj>['rowSelection'] = {
  onChange: async (selectedRowKeys: React.Key[], selectedRows: Proj[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);

    if (selectedRows.length === 0) {
      return
    }

    // 1、设置所有数据不选中
    await db.projs.toArray().then((projs) => {
      const updates = projs.map((proj) => ({
        key: proj.id,
        changes:{isSelected: false,}
      }));

      return db.projs.bulkUpdate(updates);
    });


    // 2、更新选中项的数据
    const proj = {
      ...selectedRows[0],
      isSelected: true
    }

    // 排除 key 属性
    // @ts-ignore
    const { key, ...newProj } = proj;

    await updateProjApi(newProj)

  },
  getCheckboxProps: (record: Proj) => ({
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
    // name: record.name,
  }),
};

