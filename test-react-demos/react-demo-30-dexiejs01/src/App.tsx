
import { useState } from 'react';
import './App.css'

import Dexie from 'dexie'

function App() {

  const [db, setDb] = useState<Dexie>()

  // 创建数据库
  const handleCreateDB = async () => {
    try {
      const db = new Dexie('myDatabase');

      db.version(1).stores({
        users: '++id, name, email'
      });

      // 打开数据库
      await db.open();

      setDb(db)

      console.log("数据库创建成功");
    } catch (error) {
      console.error("数据库创建失败:", error);
    }
  };

  const handleAddData = async () => {

  }

  return (
    <>
      <button onClick={handleCreateDB}>点击创建数据库以及stores</button>

      <button onClick={handleAddData}>添加数据</button>
    </>
  )
}

export default App
