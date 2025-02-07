import React, { useEffect } from 'react';
import axios from 'axios'
import { Stack } from '@chakra-ui/react';
import { NotionBlock } from 'notion-blocks-chakra-ui';

export default function App() {
  
  const blocks: any[] = []

  // useEffect(() => {
  //   axios.get('http://localhost:3000/blocks/1').then((res) => {
  //     console.log(res)
  //   })
  // }, [])

  return (
    <>
      <Stack>
        {blocks.map((block) => (
          <NotionBlock key={block.id} block={block} />
        ))}
      </Stack>
    </>
  )
}