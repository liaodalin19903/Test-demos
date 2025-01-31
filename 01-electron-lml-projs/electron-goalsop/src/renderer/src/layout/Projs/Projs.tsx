
import { db } from '@renderer/common/db'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'

import { columns, rowSelection } from './tableData'
import { NotionDatabase} from '@shared/@types'
import { Table } from 'antd'

export default function Projs() {


  const data = useLiveQuery(async () => {
    const projs = await db.databases.toArray();
    // 为 projs 数组中的每个元素添加 key 属性
    const updatedProjs = projs.map((proj) => ({
        ...proj,
        key: proj.id
    }));

    console.log('updatedProjs: ', updatedProjs)

    return updatedProjs;
  }, []);


  return (
    <div>
    <Table<NotionDatabase>
        rowSelection={{ type: 'radio', ...rowSelection }}
        columns={columns}
        dataSource={data}
      />
    </div>
  )
}
