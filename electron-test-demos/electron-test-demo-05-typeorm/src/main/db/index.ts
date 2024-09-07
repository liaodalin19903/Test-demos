import { join } from 'path'
import { DataSource } from 'typeorm'
import { ConfigEntities } from './entities/Config'

// 生产环境：如果不存在还需要创建
//const dataBasePath = join(app.getPath('appData'), app.getName(), `./Data/electron_app_db.sqlite`)
// 开发环境：
const dataBasePath = join(__dirname, 'electron_app_db.sqlite')

console.log('DataBase init path: ', dataBasePath)
const DataBase = new DataSource({
  type: 'better-sqlite3',
  entities: [ConfigEntities], // 后续新建表的实体
  database: dataBasePath, // 数据库地址
  synchronize: true, // 自动同步表
  logging: ['error'],
  /*
      1. 这里是 better-sqlite3 的 二进制文件，在 rebuild 后生成，然后指向该文件；
      2. 后续在打包也需要 copy 至打包后的文件夹中，并且路径访问需要跟以下一致
  */
  nativeBinding: join(__dirname, './better_sqlite3.node')
})

export default DataBase
