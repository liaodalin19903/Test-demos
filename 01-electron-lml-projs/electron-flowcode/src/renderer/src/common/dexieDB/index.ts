import { Dexie, type EntityTable } from 'dexie'
import { ProjSettings, Proj } from '@shared/@types'

// Database declaration
export const db = new Dexie('FlowcodeDatabase') as Dexie & {
  projSettings: EntityTable<ProjSettings, 'id'>
  projs: EntityTable<Proj, 'id'>
}

// 这里是定义版本 以及里面的索引字段（索引可以和表结构的子集）
db.version(1).stores({
  projSettings: '++id, editingFilePath',
  projs: '++id,name,desc,path,isSelected'
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
addTimestampsHook(db.projSettings);
addTimestampsHook(db.projs);

