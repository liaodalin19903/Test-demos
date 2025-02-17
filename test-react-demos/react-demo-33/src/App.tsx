import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function App() {

  //const mdString = "\n11\n\n\n22\n\n\n```js\n{\n aaa: 111,\n bbb: 222,\n}\n```\n\n"

  const mdString = `
    
    import React from 'react'
    import ReactDOM from 'react-dom'
    import Markdown from 'react-markdown'
    import MyFancyRule from './components/my-fancy-rule.js'

    ReactDOM.render(
      <Markdown
        components={{
          // Use h2s instead of h1s
          h1: 'h2',
          // Use a component instead of hrs
          hr(props) {
            const {node, ...rest} = props
            return <MyFancyRule {...rest} />
          }
        }}
      >
        {markdown}
      </Markdown>,
      document.querySelector('#content')
    )

  `
  
  return (
    <div style={{ backgroundColor: '#ffffff' }}>

      <Markdown remarkPlugins={[remarkGfm]}>{mdString}</Markdown>
    </div>
    
  )
}
