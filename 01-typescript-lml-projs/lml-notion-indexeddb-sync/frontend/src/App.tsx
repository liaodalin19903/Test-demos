// App.tsx
import './App.css';
import axios from 'axios';
import { db, updateUser } from './common/db';
import { Users, Products, Orders } from './entities/company';
import { syncData } from './common/sync';

function App() {
  // 添加用户数据
  const addUser = async () => {
    const user: Users = { username: 'Jhon', age: 23 };
    await db.users.add(user);
    console.log('User added');
  };

  // 添加订单数据
  const addOrder = async () => {
    const order: Orders = { content: '茄子x2, 菜板x1', uid: '1001' };
    await db.orders.add(order);
    console.log('Order added');
  };

  // 添加产品数据
  const addProduct = async () => {
    const product: Products = { name: '茄子', price: 100 };
    await db.products.add(product);
    console.log('Product added');
  };

  // 修改用户数据
  const modifyUser = async () => {
    const userId = 3; // 假设我们要修改 id 为 1 的用户
    const updatedUser: Partial<Users> = { username: 'Jane', age: 25 };
    await updateUser(userId, updatedUser);
    console.log('User modified');
  };

  // 同步数据到 Notion
  const syncToNotion = async () => {
    try {
      // 假设我们要同步 id 为 1 的用户
      const userId = 6;
      const user = await db.users.get(userId);

      if (!user) {
        console.error('User not found');
        return;
      }

      const syncData = {
        database_id: '1acdeaa8cb4b806a8cfdcef50b72bf89', // 替换为你的 Notion 数据库 ID
        key: userId.toString(),
        value: {
          id: userId.toString(),
          name: user.username,
          age: user.age,
          created_time: user.created_time || new Date().toISOString(),
          update_time: user.update_time || new Date().toISOString(),
        },
      };

      const response = await axios.post('http://localhost:3000/sync_c2n', syncData);
      console.log('Sync to Notion successful', response.data);
    } catch (error) {
      console.error('Sync to Notion failed', error);
    }
  };

  // 从 Notion 获取数据
  const getDataFromNotion = async () => {
    try {
      const params = {
        database_id: '1acdeaa8cb4b806a8cfdcef50b72bf89', // 替换为你的 Notion 数据库 ID
        key: '6', // 替换为你想要查询的 key
      };

      const response = await axios.get('http://localhost:3000/getdata_n2c', { params });
      console.log('Data from Notion:', response.data);
    } catch (error) {
      console.error('Failed to get data from Notion', error);
    }
  };

  // 执行同步
  const executeSync = async () => {
    // 示例调用
    const stores = [{
      storeName:'users',
      storeKey:'uid'
    },
    {
      storeName:'orders',
      storeKey:'oid'
    },
    {
      storeName:'products',
      storeKey:'pid'
    }
  ];

    syncData(stores).then(() => {
      console.log('Sync completed');
    }).catch((error) => {
      console.error('Sync failed', error);
    });

  };

  // 获取数据库页面
  const fetchDbPages = async () => {
    try {
      const database_id = '1acdeaa8cb4b8098a2ace32e51ba6508'; // 替换为你的 Notion 数据库 ID
      const filter = JSON.stringify({
        "timestamp": "last_edited_time",
        "last_edited_time": {
          "on_or_before": "2025-03-07"
        }
      });

      const response = await axios.get('http://localhost:3000/getdbpages', { params: { database_id, filter } });
      console.log('Database pages:', response.data);
    } catch (error) {
      console.error('Failed to fetch database pages', error);
    }
  };

  return (
    <>
      <button onClick={addUser}>Add User</button>
      <button onClick={addOrder}>Add Order</button>
      <button onClick={addProduct}>Add Product</button>
      <button onClick={modifyUser}>Modify User</button>
      <button onClick={syncToNotion}>Sync One User to Notion</button>
      <button onClick={getDataFromNotion}>Get Data from Notion</button>
      <button onClick={executeSync}>Execute Multi Sync</button>
      <button onClick={fetchDbPages}>Fetch Database Pages</button> {/* 新增按钮 */}
    </>
  );
}

export default App;