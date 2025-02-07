import { Stack } from "@chakra-ui/react"
import axios from "axios"
import { NotionBlock } from "notion-blocks-chakra-ui"
import { useEffect } from "react"


function App() {

  let blocks: unknown[] = []

  useEffect(() => {
    
    console.log(111)
    axios.get('http://localhost:3000/blocks/1').then((res) => {
      console.log(JSON.stringify(res.data))

      blocks = res.data.results
    })

  }, [])

  return (
    <>
      {/* <Stack> */}
        {blocks.map((block) => (
          111
        ))
        }

        {/* <NotionBlock key={block.id} block={block} /> */}
      {/* </Stack> */}
    </>
  )
}

export default App
