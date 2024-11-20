import { createTRPCProxyClient } from '@trpc/client'
import { ipcLink } from 'electron-trpc/renderer'

export const client = createTRPCProxyClient({
  links: [ipcLink()]
})

function App(): JSX.Element {

  return (
    <>
      112233
    </>
  )
}

export default App
