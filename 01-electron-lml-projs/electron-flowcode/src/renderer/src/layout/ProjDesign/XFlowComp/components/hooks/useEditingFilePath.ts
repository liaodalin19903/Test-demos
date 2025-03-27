import { db } from "@renderer/common/dexieDB";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useState } from "react";

// 自定义 Hook 用于监听 editingFilePath 变化
export const useEditingFilePathChange = (callback: (newPath: string | undefined) => void) => {
  const projSettings = useLiveQuery(() => db.projSettings.toArray(), []);
  const [prevEditingFilePath, setPrevEditingFilePath] = useState<string | undefined>(undefined);

  useEffect(() => {
      if (projSettings && projSettings.length > 0) {
          const currentEditingFilePath = projSettings[0].editingFilePath;
          if (currentEditingFilePath !== prevEditingFilePath) {
              callback(currentEditingFilePath);
              setPrevEditingFilePath(currentEditingFilePath);
          }
      }
  }, [projSettings, prevEditingFilePath, callback]);
};


export const useEditingFilePath = () => {
  const projSettings = useLiveQuery(() => db.projSettings.toArray(), []);
  const [editingFilePath, setEditingFilePath] = useState<string | undefined>(undefined);

  useEffect(() => {
      if (projSettings && projSettings.length > 0) {
          const currentEditingFilePath = projSettings[0].editingFilePath;
          setEditingFilePath(currentEditingFilePath);
      }
  })

  return editingFilePath
}
