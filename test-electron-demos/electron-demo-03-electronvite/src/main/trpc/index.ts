const { createTRPCServer } = require('electron-trpc')
import { type Users } from '@shared/@types'

// 创建一个简单的数据库模拟对象（这里只是示例，实际可替换为真实数据库）

const database: { users: Users } = {
  users: [
    { id: 1, name: 'John', email: 'john@example.com' },
    { id: 2, name: 'Jane', email: 'jane@example.com' }
  ]
}

// 创建TRPC服务器
export const trpcServer = createTRPCServer({
  // 定义查询（Query）方法
  queries: {
    getUsers: () => database.users
  },
  // 定义变更（Mutation）方法
  mutations: {
    addUser: (input) => {
      const newUser = {
        id: database.users.length + 1,
        name: input.name,
        email: input.email
      }
      database.users.push(newUser)
      return newUser
    }
  }
})
