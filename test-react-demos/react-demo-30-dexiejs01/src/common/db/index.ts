import { Dexie, type EntityTable } from 'dexie';
import { Friend } from '../../entities/Friend';

// Database declaration  
export const db = new Dexie('FriendDatabase') as Dexie & {
  friends: EntityTable<Friend, 'id'>;
};

db.version(1).stores({
  friends: '++id, age',
});


