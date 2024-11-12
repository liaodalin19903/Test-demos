export type IpcRequest = {
  body: unknown
  headers: unknown
  method: string
  url: string
}

export type IpcResponse = {
  body: unknown
  headers: unknown
  status: number
}

export interface IElectronAPI {
  node: () => string
  chrome: () => string
  electron: () => string
  trpc: (req: IpcRequest) => Promise<IpcResponse>
}

declare global {
  interface Window {
    api: IElectronAPI
  }
}
