// 设置：偏好设置

// TODO: 1. 是否应该放在shared 还是应该放在main的api内（也就是说renderer是否可以直接调用）？
// TODO: 2. 弹出设置是否用新的window？

import { preferences } from "@shared/globals"

/**
 * 弹出设置偏好设置窗口
 */
export const showPreferencesSettings = () => {
  preferences.show()
}

/**
 * 获取偏好设置的值
 * @param key eg. 'about.name'
 * @returns
 */
export const getPreferencesValue = ( key:string ) => {
  return preferences.value(key)
}

/**
 * 设置偏好设置的值
 * @param key eg. 'about.name'
 * @param value eg. 'Einstein'
 * @returns
 */
export const setPreferencesValue = ( key:string, value: unknown ) => {
  return preferences.value(key, value)
}

/**
 * 监听Preferences改变
 * @param cb 回调函数
 */
export const onPreferencesSaved = (cb: ()=> {}) => {
  preferences.on('save', (preferences) => {
    console.log(`Preferences were saved.`, JSON.stringify(preferences, null, 4));
    cb()
  })
}

/**
 * 监听Preferences重置
 * @param cb 回调函数
 */
export const onPreferencesReset = (cb: ()=> {}) => {
  // Using a button field with `channel: 'reset'`
  preferences.on('click', (key) => {
    if (key === 'resetButton') {
      cb()
    }
  });
}
