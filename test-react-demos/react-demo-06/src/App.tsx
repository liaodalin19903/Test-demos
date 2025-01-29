
import { useEffect } from 'react';
import './App.css';

import { client } from './common/notionClient'


function App() {


  useEffect(() => {
    const asyncFunc = async() => {
      
    }
    asyncFunc()
    }, [])

  const onClick = async () => {

    // 判断database是否存在
    
    // 创建database
    const res = await client.databases.create({
      parent: {
        page_id: '186deaa8-cb4b-809f-9a1f-fa408a96b195',
        type: 'page_id'
      },
      title: [
        {
          "type": "text",
          "text": {
            'content': 'goalsop_props',
            'link': null 
          }
        }
      ],
      properties: {
        "Name": {
          "title": {}
        },
        "desc": {
            "rich_text": {}
        },
      }
    })

    console.log('res: ', res)
  }  
  

  return (
    <>
    112233

    <button onClick={onClick}>点击创建database</button>
    </>
  );
}

export default App;




