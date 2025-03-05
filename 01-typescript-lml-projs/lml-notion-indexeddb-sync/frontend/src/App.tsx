import './App.css'

import axios from 'axios';
import { db, updateUser } from './common/db'
import { Users, Products, Orders } from './entities/company'; 
function App() {
  // 添加用户数据
  const addUser = async () => {

    const user: Users = { username: 'Jhon', age: 23 }
    await db.users.add(user)
    console.log('User added')
  }

  // 添加订单数据
  const addOrder = async () => {

    const order:Orders = { content: '茄子x2, 菜板x1', uid: '1001' }
    await db.orders.add(order)
    console.log('Order added')
  }

  // 添加产品数据
  const addProduct = async () => {

    const product: Products = { name: '茄子', price: 100 }
    await db.products.add(product)
    console.log('Product added')
  }

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
          last_update_time: user.last_update_time || new Date().toISOString(),
        },
      };

      const response = await axios.post('http://localhost:3000/sync_c2n', syncData);
      console.log('Sync to Notion successful', response.data);
    } catch (error) {
      console.error('Sync to Notion failed', error);
    }
  };

  return (
    <>

      <button onClick={addUser}>Add User</button>
      <button onClick={addOrder}>Add Order</button>
      <button onClick={addProduct}>Add Product</button>
      <button onClick={modifyUser}>Modify User</button>
      <button onClick={syncToNotion}>Sync to Notion</button>
    </>
  )
}

export default App