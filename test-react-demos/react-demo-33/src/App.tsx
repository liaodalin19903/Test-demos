import React from 'react'
import Markdown from 'react-markdown'

export default function App() {

  const mdString = "\n11\n\n\n22\n\n\n```json\n{\n aaa: 111,\n bbb: 222,\n}\n```\n\n"
  
  return (
    <Markdown >{mdString}</Markdown>
  )
}
