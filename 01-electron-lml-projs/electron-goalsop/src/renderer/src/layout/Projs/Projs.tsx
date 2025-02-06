
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
    const dataSource = projs.map((proj) => ({
        ...proj,
        key: proj.id
    }));


    const filteredIds = dataSource.filter(item => item.properties.selected.number === 1).map(item => item.id);
    //console.log('filteredIds: ', filteredIds)

    return {
      dataSource: dataSource,
      selectedDatabaseKey: filteredIds[0]
    }
  }, []);


  return (
    <div>
    <Table<NotionDatabase>
        rowSelection={{
          type: 'radio',
          ...rowSelection,
          selectedRowKeys: [data?.selectedDatabaseKey!]
         }}
        columns={columns}
        dataSource={data?.dataSource}
      />
    </div>
  )
}
