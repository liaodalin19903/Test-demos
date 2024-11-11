import Database from '../index'
import { ConfigEntities } from '../entities/Config'
import { Repository } from 'typeorm'
import { injectable, inject } from 'inversify'
import 'reflect-metadata'
import { IConfig } from '../interfaces'

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
  async insertConfig(config: ConfigEntities): Promise<ConfigEntities> {
    return new Promise(async (resolve) => {
      const osQueryBuilder = await getConfigQueryBuilder();
      const existingOS = await osQueryBuilder.findOne({
        where: {
          id: config.id
        }
      })
      // 如果不存在导入，存在就直接返回
      if (!existingOS) {
          osQueryBuilder.save(config)
              .then((saveRes) => {
                  console.log("导入Config成功: ", JSON.stringify(saveRes))
                  resolve(saveRes)
              })
      } else {
          resolve(existingOS)
      }
    })
  }

  // 根据ID更新数据
  async updateConfig(data: {
      id: string;
      locale?: string;
  }) {
      const configQueryBuilder = await getConfigQueryBuilder();
      const config = await configQueryBuilder.findOne({
          where: {
              id: data.id
          }
      });
      if (config?.id) {
          const item = await configQueryBuilder.save({
              id: config.id,
              title: data?.locale || "",
          })
          return item;
      } else {
          return null
      }
  }

  // 根据ID删除数据
  async removeConfig(id: string): Promise<unknown> {
    const configQueryBuilder = await getConfigQueryBuilder()
    const deleteResult = await configQueryBuilder.delete(id)
    return deleteResult
  }
}
