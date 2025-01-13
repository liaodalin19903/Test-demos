// 主进程中全局变量

declare global {
  namespace NodeJS {
    interface Global {
      isAppQuitting: boolean;
    }
  }
}

export {};

