

// src/shared/constants/index.js

// 应用程序的常量
export const APP_NAME = 'My Electron App';
export const APP_VERSION = '1.0.0';  // 是否可以基于package.json 来获取

// API 相关常量
export const API_BASE_URL = 'https://api.example.com';
export const TIMEOUT = 5000; // 请求超时时间（毫秒）

// 窗口相关常量
export const WINDOW_WIDTH = 800;
export const WINDOW_HEIGHT = 600;

// 任务栏位置常量
export const TASKBAR_POSITIONS = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};

// UI 相关常量
export const MAIN_COLOUR = '#60a965'  // 从G6 色板：greens，选择自右到左第4个
export const MAIN_COLOUR2 = '#87c27e' // 从G6 色板：greens，选择自右到左第5个
export const MAIN_COLOUR3 = '#add7a1' // 从G6 色板：greens，选择自右到左第6个
export const MAIN_COLOUR4 = '#cee8c3' // 从G6 色板：greens，选择自右到左第7个
export const MAIN_COLOUR5 = '#e8f4e2' // 从G6 色板：greens，选择自右到左第8个


export const UI_MESSAGES = {
  SUCCESS: '操作成功',
  ERROR: '发生错误，请重试',
  LOADING: '加载中...',
};

// 其他常量
export const DEFAULT_LANGUAGE = 'zh_CN';
