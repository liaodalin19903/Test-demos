import React from 'react'

import SubContainer from './subContainer'

type CodeBlockContainerProps = {
  data1: number,
  cb1: () => void 
}

export default function index(props: CodeBlockContainerProps) {

  const clickButton = () => {
    console.log('输出父组件传入的数据：data1 = ', props.data1)

    props.cb1()
  }
  
  return (
    <div>

      <button onClick={clickButton} >点击按钮</button>
    </div>
  )
}
