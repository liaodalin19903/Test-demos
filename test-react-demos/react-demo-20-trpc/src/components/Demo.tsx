
import { trpc } from '../02-client/client'

const Demo = () => {

  const userQuery = trpc.userList.useQuery();

  const handle = () => {
    console.log('clicked button')
    console.log('userQuery.data:', userQuery.data)  // but this is undefined
  }

  return (
    <>
      <div>Demo</div>
      { userQuery.data }

      <button onClick={handle}>click</button>
    </>
  )
}

export default Demo