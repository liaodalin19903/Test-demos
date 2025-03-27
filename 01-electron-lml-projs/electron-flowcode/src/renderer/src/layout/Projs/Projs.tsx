
import { db } from '@renderer/common/dexieDB'
import { useLiveQuery } from 'dexie-react-hooks'
import React from 'react'

import { genColumns, rowSelection } from './tableData'
import { Proj} from '@shared/@types'
import { Button, Table } from 'antd'

import { Modal } from 'antd'
import CUDModal from '@renderer/components/CUDModal'
import { useCreateProjProps, useUpdateProjProps, useDeleteProjProps } from './hooks/useCUDProps'

export default function Projs() {

  const [modal, contextHolder] = Modal.useModal();

  const data = useLiveQuery(async () => {
    const projs = await db.projs.toArray();
    // 为 projs 数组中的每个元素添加 key 属性
    const dataSource = projs.map((proj) => ({
        ...proj,
        key: proj.id
    }));

    const filteredIds = dataSource.filter(item => item.isSelected).map(item => item.id);

    //console.log('filteredIds: ', filteredIds)
    return {
      dataSource: dataSource,
      selectedDatabaseKey: filteredIds[0]
    }
  }, []);

  const handleCreate = () => {
    const props = useCreateProjProps()
    CUDModal(modal, props)
  }

  const handleEdit = (proj: Proj) => {
    console.log('handleEdit: ', proj)
    const props = useUpdateProjProps(proj)
    console.log('props: ', props)
    CUDModal(modal, props)
  }

  const handleDelete = (proj: Proj) => {

    const props = useDeleteProjProps(proj)
    CUDModal(modal, props)
  }


  return (
    <div>
    <Table<Proj>
        rowSelection={{
          type: 'radio',
          ...rowSelection,
          selectedRowKeys: [data?.selectedDatabaseKey!]
         }}
        columns={genColumns(handleEdit, handleDelete)}
        dataSource={data?.dataSource}
        scroll={{ x: '100%' }}
        style={{ width: '100%' }}
      />

    <Button type='primary' onClick={handleCreate}>创建项目</Button>
    {contextHolder}
    </div>
  )
}
