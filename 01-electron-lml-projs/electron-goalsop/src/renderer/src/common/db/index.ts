import { Dexie, type EntityTable } from 'dexie';
import { GoalsopSettings, NotionDatabase, NotionDatabaseDetail } from '@shared/@types';

// Database declaration
export const db = new Dexie('GoalsopDatabase') as Dexie & {
  settings: EntityTable<GoalsopSettings, 'id'>;
  databases: EntityTable<NotionDatabase, 'id'>;
  databaseDetail: EntityTable<NotionDatabaseDetail, 'id'>
};

// 这里是定义版本 以及里面的索引字段（索引可以和表结构的子集）
db.version(1).stores({
  settings: '++id',
  databases: '++id',
  databaseDetail: 'id',
});
