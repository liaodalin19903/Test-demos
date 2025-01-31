// 选中的项目

import { db } from "@renderer/common/db"
import { NotionDatabase } from "@shared/@types"
import { useLiveQuery } from "dexie-react-hooks"

export const useSelectedProj = (): NotionDatabase | undefined => {
  const result = useLiveQuery(async () => {
    const databases: NotionDatabase[] = await db.databases.toArray();
    // 使用 find 方法查找第一个 selected 为 true 的 database
    return databases.find((database) => database.properties.selected);
  }, []);

  // 返回查询结果
  return result;
};
