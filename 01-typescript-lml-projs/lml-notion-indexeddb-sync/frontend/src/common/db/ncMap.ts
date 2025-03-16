// src/common/db/n_c_map.ts
export const notionToCompanyMap: { 
  [key: string]: { 
    notion: { database_id: string }; 
    indexeddb: { database_name: string; store_name: string };
    sync_key: string;
  } 
  } = {
  'company.users': {
    notion: {
      database_id: '1acdeaa8cb4b806a8cfdcef50b72bf89',
    },
    indexeddb: {
      database_name: 'company',
      store_name: 'users',
    },
    sync_key: 'uid',
  },
  'company.orders': {
    notion: {
      database_id: '1acdeaa8cb4b8098a2ace32e51ba6508',
    },
    indexeddb: {
      database_name: 'company',
      store_name: 'orders',
    },
    sync_key: 'oid',
  },
  'company.products': {
    notion: {
      database_id: '1acdeaa8cb4b80cfadf9c5529d78460f',
    },
    indexeddb: {
      database_name: 'company',
      store_name: 'products',
    },
    sync_key: 'pid',
  },
};