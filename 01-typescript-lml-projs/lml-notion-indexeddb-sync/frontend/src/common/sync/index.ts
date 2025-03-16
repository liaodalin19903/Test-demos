// sync/index.ts

import { getSyncInfo, updateSyncInfo, getNotionPages, getLocalData, syncNotionToLocal, syncLocalToNotion } from './syncUtils'
import { notionToCompanyMap } from '../db/ncMap';

export interface SyncInfo {
  database_id: string;
  store_name: string;
  store_key: string;
  date: string;
  content: {
    n2c: number[];
    c2n: number[];
  };
}

// 执行同步
export const executeSync = async (stores: { storeName: string, storeKey: string }[]): Promise<void> => {
  for (const { storeName, storeKey } of stores) {
    if (!isValidKey(storeName) || !isValidKey(storeKey)) {
      console.error('无效的 storeName 或 storeKey:', storeName, storeKey);
      continue;
    }

    const syncInfo = await getSyncInfo(storeName);

    if (syncInfo) {
      // 步骤2
      const last_updated_time = syncInfo.date;
      const notionPages = await getNotionPages(syncInfo.database_id, last_updated_time);
      const localData = await getLocalData(storeName, last_updated_time);

      const n2c = notionPages.map(page => parseInt(page.properties.key.title[0].plain_text));
      const c2n = localData.map(data => parseInt(data[storeKey]));

      syncInfo.content.n2c = [...new Set([...syncInfo.content.n2c, ...n2c])];
      syncInfo.content.c2n = [...new Set([...syncInfo.content.c2n, ...c2n])];

      await syncNotionToLocal(notionPages, storeName, storeKey);
      await syncLocalToNotion(localData, syncInfo.database_id, storeKey);

      syncInfo.date = new Date().toISOString();
      await updateSyncInfo(syncInfo);
    } else {
      // 步骤3
      // 从 ncMap.ts 获取 database_id
      const mapKey = `company.${storeName}`;
      const mapping = notionToCompanyMap[mapKey];

      if (!mapping) {
        console.error('未找到对应的映射:', mapKey);
        continue;
      }

      const newSyncInfo: SyncInfo = {
        database_id: mapping.notion.database_id,
        store_name: storeName,
        store_key: storeKey,
        date: '1970-01-01T00:00:00Z',
        content: {
          n2c: [],
          c2n: []
        }
      };

      const notionPages = await getNotionPages(newSyncInfo.database_id, newSyncInfo.date);
      const localData = await getLocalData(storeName, newSyncInfo.date);

      const n2c = notionPages.map(page => parseInt(page.properties.key.title[0].plain_text));
      const c2n = localData.map(data => parseInt(data[storeKey]));

      console.log('notionPages: ', notionPages)
      console.log('localData:', localData)

      await syncNotionToLocal(notionPages, storeName, storeKey);  // 同步 n2c
      await syncLocalToNotion(localData, newSyncInfo.database_id, storeKey);  // 同步 c2n

      newSyncInfo.date = new Date().toISOString();
      newSyncInfo.content.n2c = n2c;
      newSyncInfo.content.c2n = c2n;

      await updateSyncInfo(newSyncInfo);
    }
  }
};

// 验证键是否有效
const isValidKey = (key: string): boolean => {
  return typeof key === 'string' && key.trim().length > 0;
};

// 示例调用
export const syncData = async (stores: { storeName: string, storeKey: string }[]): Promise<void> => {
  try {
    await executeSync(stores);
    console.log('Sync completed');
  } catch (error) {
    console.error('Sync failed', error);
  }
};