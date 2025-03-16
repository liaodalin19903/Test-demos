// sync/syncUtils.ts

import axios from 'axios';
import { SyncInfo } from './index';
import { db } from '../db'; // 假设你已经有一个 db 实例

// 获取 syncinfo 数据
export const getSyncInfo = async (store_name: string): Promise<SyncInfo | null> => {
  if (!isValidKey(store_name)) {
    console.error('无效的 store_name:', store_name);
    return null;
  }

  try {
    const syncInfo = await db.syncinfo.get(store_name);
    return syncInfo;
  } catch (error) {
    console.error('获取 syncinfo 数据失败:', error);
    return null;
  }
};

// 验证键是否有效
const isValidKey = (key: string): boolean => {
  return typeof key === 'string' && key.trim().length > 0;
};

// 更新 syncinfo 数据
export const updateSyncInfo = async (syncInfo: SyncInfo): Promise<void> => {
  try {
    await db.syncinfo.put(syncInfo);
  } catch (error) {
    console.error('更新 syncinfo 数据失败:', error);
  }
};

// 获取 Notion 数据库中的页面
export const getNotionPages = async (database_id: string, last_updated_time: string): Promise<any[]> => {
  try {
    const filter = JSON.stringify({
      "timestamp": "last_edited_time",
      "last_edited_time": {
        "on_or_before": last_updated_time
      }
    });

    const response = await axios.get('http://localhost:3000/getdbpages', { params: { database_id, filter } });
    return response.data;
  } catch (error) {
    console.error('获取 Notion 数据失败:', error);
    return [];
  }
};

// 获取本地 indexedDB 中的数据
// 获取本地 indexedDB 中的数据
export const getLocalData = async (store_name: string, updated_time: string): Promise<any[]> => {
  try {
    console.log('getLocalData: ', store_name);

    // 确保 store_name 是一个有效的字符串
    if (!isValidKey(store_name)) {
      console.error('无效的 store_name:', store_name);
      return [];
    }

    // 使用 dexie.js 的 transaction 方法
    const results: any[] = await db.transaction('readonly', store_name, async () => {
      const store = db.table(store_name);

      const results: any[] = [];
      await store.where('update_time').aboveOrEqual(updated_time).each((value) => {
        results.push(value);
      });

      return results;
    });

    return results;
  } catch (error) {
    console.error('获取本地数据失败:', error);
    return [];
  }
};


// 同步 Notion 到本地
export const syncNotionToLocal = async (notionPages: any[], store_name: string, store_key: string): Promise<void> => {
  for (const page of notionPages) {
    const key = page.properties.key.title[0].plain_text;
    const value = JSON.parse(page.properties.value.rich_text[0].plain_text);

    try {
      await db[store_name].put(value);
      console.log(`同步 Notion 页面 ${key} 到本地成功`);
    } catch (error) {
      console.error(`同步 Notion 页面 ${key} 到本地失败:`, error);
    }
  }
};

// 同步本地到 Notion
export const syncLocalToNotion = async (localData: unknown[], database_id: string, store_key: string): Promise<void> => {
  for (const data of localData) {
    const key = data[store_key];

    try {
      const syncData = {
        database_id,
        key,
        value: data 
      };

      console.log('syncData: ', syncData)
      // console.log('localData: ', localData)

      const response = await axios.post('http://localhost:3000/sync_c2n', syncData);
      console.log(`同步本地数据 ${key} 到 Notion 成功`, response.data);
    } catch (error) {
      console.error(`同步本地数据 ${key} 到 Notion 失败:`, error);
    }
  }
};