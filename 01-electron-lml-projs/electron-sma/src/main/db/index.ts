
import { join } from 'path'
import { DataSource } from 'typeorm'
import { app } from 'electron'

import { ConfigEntities } from '@shared/db-entities/Config'
import { Proj, ProjMod } from './../../shared/db-entities/Proj'

const entities = [Proj, ProjMod, ConfigEntities]


// 直接是生产环境：如果不存在还需要创建 （better-sqlite3会自动创建，所以不必此代码）
const dataBasePath = join(app.getPath('appData'), app.getName(), `./Data/electron_app_db.sqlite`)

console.log('dataBase init path: ', dataBasePath)
const dataBase = new DataSource({
  type: 'better-sqlite3',
  entities: entities, // 后续新建表的实体
  database: dataBasePath, // 数据库地址
  synchronize: true, // 自动同步表
  logging: ['error'],
  /*
      1. 这里是 better-sqlite3 的 二进制文件，在 rebuild 后生成，然后指向该文件；
      2. 后续在打包也需要 copy 至打包后的文件夹中，并且路径访问需要跟以下一致
  */
  nativeBinding: join(
    __dirname,
    '../../node_modules/better-sqlite3/build/Release/better_sqlite3.node'
  ) // 运行时候，此文件是out/index.js，因此是对于此的相对路径到node_modules/better-sqlite3/build/Release/better_sqlite3.node
})

export default dataBase
