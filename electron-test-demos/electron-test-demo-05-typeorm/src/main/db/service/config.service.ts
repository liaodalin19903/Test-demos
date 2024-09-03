import Database from '../index'
import { ConfigEntities } from '../entities/Config'
import { Repository } from 'typeorm'

const getOSQueryBuilder = async (): Promise<Repository<ConfigEntities>> => {
  return Database.getRepository(ConfigEntities)
}

class OSService {
  // 根据ID查询操作
  static async getConfig(id: string): Promise<unknown> {
    return new Promise((resolve) => {
      async function inquire(): Promise<void> {
        const osQueryBuilder = await getOSQueryBuilder()
        const data = osQueryBuilder.findOne({
          where: {
            id
          }
        })
        resolve(data)
      }
      inquire()
    })
  }

  // 插入数据操作
  static async updateConfig(config: ConfigEntities): Promise<unknown> {
    return new Promise((resolve) => {
      async function inquire(): Promise<void> {
        const osQueryBuilder = await getOSQueryBuilder()
        const existingOS = await osQueryBuilder.findOne({
          where: {
            id: config.id
          }
        })
        // 如果不存在导入，存在就直接返回
        if (!existingOS) {
          osQueryBuilder.save(config).then((saveRes) => {
            console.log('导入OS成功: ', JSON.stringify(saveRes))
            resolve(saveRes)
          })
        } else {
          resolve(existingOS)
        }
      }
      inquire()
    })
  }

  // 根据ID更新数据
  static async updateOS(data: { id: string; locale?: string }): Promise<unknown> {
    const osQueryBuilder = await getOSQueryBuilder()
    const config = await osQueryBuilder.findOne({
      where: {
        id: data.id
      }
    })
    if (config?.id) {
      const item = await osQueryBuilder.save({
        id: config.id,
        title: data?.locale || ''
      })
      return item
    } else {
      return null
    }
  }

  // 根据ID删除数据
  static async removeOS(id: string): Promise<unknown> {
    const osQueryBuilder = await getOSQueryBuilder()
    const deleteResult = await osQueryBuilder.delete(id)
    return deleteResult
  }
}

export default OSService
