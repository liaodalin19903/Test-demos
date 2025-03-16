import Dexie from 'dexie'
import { Users, Products, Orders, SyncInfo } from '../../entities/company'; // 引入User实体类

// 创建数据库和仓库
export const db = new Dexie('company') as Dexie & {
  users: Dexie.Table<Users, 'uid'>,
  orders: Dexie.Table<Orders, 'oid'>,
  products: Dexie.Table<Products, 'pid'>,
  syncinfo: Dexie.Table<SyncInfo, 'id'>,
}
db.version(1).stores({
  syncinfo: '++id, database_id, store_name, store_key, sync_date',
  users: '++uid, username, age, create_time, update_time',
  orders: '++oid, content, create_time, update_time',
  products: '++pid, name, create_time, update_time'
})

// 为每个表添加钩子函数
function addTimestampsHook(table: Dexie.Table<any, any>) {
  // 插入前钩子
  table.hook('creating', (primKey, obj, transaction) => {
    const now = new Date().toISOString();
    obj.create_time = now;
    obj.update_time = now;
  });

  // 更新前钩子
  table.hook('updating', (modifications, primKey, obj, transaction) => {
    const now = new Date().toISOString();
    return { ...modifications, update_time: now };
  });
}

// 为每个表应用钩子
addTimestampsHook(db.users);
addTimestampsHook(db.orders);
addTimestampsHook(db.products);


// 添加 updateUser 方法
export const updateUser = async (userId: number, updatedUser: Partial<Users>) => {
  try {
    await db.users.update(userId, updatedUser);
    console.log('User updated');
  } catch (error) {
    console.error('Error updating user:', error);
  }
};