import { NotionDatabase} from '@shared/@types'
import { TableProps } from "antd";


export const columns = [
  {
    title: '名称',
    dataIndex: ['properties', 'Name'],
    key: 'Name',
    onCell: (record: NotionDatabase, index? :number) => ({
      children: 'asdsadsa'
      //children: record.properties.Name.title[0].plain_text
      //children: record.created_by.object
    })
  },
  // {
  //   title: '描述',
  //   dataIndex: ['properties', 'desc'],
  //   key: 'desc',
  //   onCell: (record: NotionDatabase, index? :number) => ({
  //     children: record.properties.desc.rich_text
  //   })
  // },
  // {
  //   title: 'Goalsop项目ID',
  //   dataIndex: ['properties', 'goalsop_proj_id'],
  //   key: 'goalsop_proj_id',
  //   onCell: (record: NotionDatabase, index? :number) => ({
  //     children: record.properties.goalsop_proj_id.rich_text
  //   })
  // },
  {
    title: '创建时间',
    dataIndex: 'created_time',
    key: 'created_time',
  },
  {
    title: '更新时间',
    dataIndex: 'last_edited_time',
    key: 'last_edited_time',
  },
]

// rowSelection object indicates the need for row selection
export const rowSelection: TableProps<NotionDatabase>['rowSelection'] = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: NotionDatabase[]) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: (record: NotionDatabase) => ({
    // disabled: record.name === 'Disabled User', // Column configuration not to be checked
    // name: record.name,
  }),
};

