import { ConfigEntities } from '../entities/Config'

// 定义服务对象标识
export const IConfig = Symbol.for('IConfig')

export interface IConfig {
  getConfig(id: string): Promise<unknown>
  updateConfig(config: ConfigEntities): Promise<unknown>
  removeConfig(id: string): Promise<unknown>
}
