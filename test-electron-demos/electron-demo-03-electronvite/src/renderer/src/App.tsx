<<<<<<< HEAD
import { createTRPCClient } from 'electron-trpc'

import { type Users } from '@shared/@types'

function App(): JSX.Element {
  // 创建TRPC客户端
  const trpcClient = createTRPCClient({
    // 发送请求到主进程的通道名称
    requestChannel: 'trpc-request',
    // 接收主进程回复的通道名称
    responseChannel: 'trpc-response'
  })

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handleClick = () => {
    // 示例：调用查询方法获取用户列表
    trpcClient.queries.getUsers().then((users: Users) => {
      console.log('获取到的用户列表：', users)
    })
=======
import { getUsers, addUser } from './common/apis'

function App(): JSX.Element {

  const handleClick = async() => {
    const users = await getUsers()
    console.log(users)
>>>>>>> 83f4439af9494fe4224fced5c3c8c148314d435a
  }

  return (
    <>
<<<<<<< HEAD
      112233
      <button onClick={handleClick}>获取用户列表</button>
=======
     112233

     <button onClick={handleClick}>点击打印users</button>
>>>>>>> 83f4439af9494fe4224fced5c3c8c148314d435a
    </>
  )
}

export default App
