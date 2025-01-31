import { Table } from 'antd';

type DataSourceItem = typeof dataSource[number];

// 定义 columns
export const columns = [
  {
    title: '名称',
    dataIndex: ['properties', 'Name', 'title', 'plain_text'],
    key: 'Name',
    onCell: (record: DataSourceItem, index? :number) => ({
      children: record.properties.Name.title[0].plain_text
    })
  },

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



// 示例数据
const dataSource = [
  {
      "object": "page",
      "id": "18adeaa8-cb4b-8068-94b6-ca75a2096bfe",
      "created_time": "2025-01-29T08:11:00.000Z",
      "last_edited_time": "2025-01-30T08:09:00.000Z",
      "created_by": {
          "object": "user",
          "id": "ccbde935-1e61-4dbd-acb7-6d3fd5740558"
      },
      "last_edited_by": {
          "object": "user",
          "id": "ccbde935-1e61-4dbd-acb7-6d3fd5740558"
      },
      "cover": null,
      "icon": null,
      "parent": {
          "type": "database_id",
          "database_id": "18adeaa8-cb4b-8052-a124-d52a5b0b6aed"
      },
      "archived": false,
      "in_trash": false,
      "properties": {
          "selected": {
              "id": "NKfq",
              "type": "number",
              "number": 1
          },
          "desc": {
              "id": "NLFS",
              "type": "rich_text",
              "rich_text": []
          },
          "proj_id": {
              "id": "PyCW",
              "type": "rich_text",
              "rich_text": [
                  {
                      "type": "text",
                      "text": {
                          "content": "18adeaa8cb4b807b8401c53bc4c3af7d",
                          "link": null
                      },
                      "annotations": {
                          "bold": false,
                          "italic": false,
                          "strikethrough": false,
                          "underline": false,
                          "code": false,
                          "color": "default"
                      },
                      "plain_text": "18adeaa8cb4b807b8401c53bc4c3af7d",
                      "href": null
                  }
              ]
          },
          "Name": {
              "id": "title",
              "type": "title",
              "title": [
                  {
                      "type": "text",
                      "text": {
                          "content": "proj_test01",
                          "link": null
                      },
                      "annotations": {
                          "bold": false,
                          "italic": false,
                          "strikethrough": false,
                          "underline": false,
                          "code": false,
                          "color": "default"
                      },
                      "plain_text": "proj_test01",
                      "href": null
                  }
              ]
          }
      },
      "public_url": null,
      "key": "18adeaa8-cb4b-8068-94b6-ca75a2096bfe"
  }
]

const App = () => {
  return <Table dataSource={dataSource} columns={columns} />;
};

export default App;