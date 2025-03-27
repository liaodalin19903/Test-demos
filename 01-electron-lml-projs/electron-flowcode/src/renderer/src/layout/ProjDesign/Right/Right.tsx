import React from 'react'
import { Descriptions } from 'antd';
import type { DescriptionsProps } from 'antd';


import { useEditingFilePath } from '../XFlowComp/components/hooks/useEditingFilePath'

const genFileItems = (editingFilePath: string | undefined): DescriptionsProps['items'] =>  (
  [
    {
      key: '1',
      label: '文件地址',
      children: editingFilePath,
    },
    /*
    {
      key: '2',
      label: 'Telephone',
      children: '1810000000',
    },
    {
      key: '3',
      label: 'Live',
      children: 'Hangzhou, Zhejiang',
    },
    {
      key: '4',
      label: 'Remark',
      children: 'empty',
    },
    {
      key: '5',
      label: 'Address',
      children: 'No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China',
    },
    */
  ]
)
const Right = () => {

  const editingFilePath = useEditingFilePath()

  return (
    <div style={{ padding: '16px' }}>
      <Descriptions title="文件信息" items={genFileItems(editingFilePath)} />

    </div>
  )
}

export { Right }
