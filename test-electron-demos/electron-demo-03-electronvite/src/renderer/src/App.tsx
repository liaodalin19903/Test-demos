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
  }

  return (
    <>
      112233
      <button onClick={handleClick}>获取用户列表</button>
    </>
  )
}

export default App
