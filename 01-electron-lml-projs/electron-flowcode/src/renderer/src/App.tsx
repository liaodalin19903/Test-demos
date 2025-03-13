import { usersApi, userCreateApi } from './common/apis'

function App(): JSX.Element {
  const handleClick = async () => {
    const users = await usersApi()

    console.log(users)
  }

  return (
    <>
      112233
      <button onClick={handleClick}>点击打印users</button>
    </>
  )
}

export default App
