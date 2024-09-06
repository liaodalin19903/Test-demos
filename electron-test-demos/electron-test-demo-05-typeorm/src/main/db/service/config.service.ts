import Database from '../index'
import { ConfigEntities } from '../entities/Config'
import { Repository } from 'typeorm'
import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import { IConfig } from '../interfaces/interfaces'

const getConfigQueryBuilder = async (): Promise<Repository<ConfigEntities>> => {
  return Database.getRepository(ConfigEntities)
}

@injectable()
export class ConfigService implements IConfig {
  // 根据ID查询操作
  async getConfig(id: string): Promise<unknown> {
    const osQueryBuilder = await getConfigQueryBuilder()
    const data = osQueryBuilder.findOne({
      where: {
        id
      }
    })
    return data
  }

  // 插入数据操作
  async updateConfig(config: ConfigEntities): Promise<unknown> {
    const osQueryBuilder = await getConfigQueryBuilder()
    const existingOS = await osQueryBuilder.findOne({
      where: {
        id: config.id
      }
    })
    return existingOS
  }

  // 根据ID删除数据
  async removeConfig(id: string): Promise<unknown> {
    const osQueryBuilder = await getConfigQueryBuilder()
    const deleteResult = await osQueryBuilder.delete(id)
    return deleteResult
  }
}


