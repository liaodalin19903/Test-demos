import { Stack } from "@chakra-ui/react"
import axios from "axios"
import { NotionBlock } from "notion-blocks-chakra-ui"
import { useEffect, useState } from "react"


function App() {

  //let blocks: unknown[] = []
  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    
    console.log(111)
    axios.get('http://localhost:3000/blocks/1').then((res) => {
      console.log(JSON.stringify(res.data.results))  // 这里有数据
      
      const blocksRes = res.data.results

      console.log(typeof blocksRes)  // 打印的是：object
      setBlocks(res.data.results)
    })

  }, [])

  return (
    <>
        {blocks.map((block) => (
          123
        ))
        }
    </>
  )
}

export default App
