import React from 'react'

import SubContainer, { SubContainerProps }  from './subContainer'


export type CodeBlockContainerProps = {
  data: SubContainerProps[],  // ①用于存放代码文件根属性和根方法，②用于存放类和类的属性和方法
  title: string,  // 文件名
  width?: number,  // 组件宽度
}

export default function index(props: CodeBlockContainerProps) {

  // const clickButton = () => {
  //   console.log('输出父组件传入的数据：data1 = ', props.data)

  // }
  
  return (
    <div>

      <div id="container" style={{ 
        width: props.width ? props.width : '' 
        }}>
        <div style={{backgroundColor: '#eee'}}>
          <label id='title'>{props.title}</label>
        </div>
        
        <div id='classContainer'>
        </div>

        <div>
          {
            props.data.map((item, index) => (
              <div  key={index}>
                <SubContainer {...item}>
                </SubContainer>
              </div>
            ))
          }

        </div>
      </div>

      {/* <button onClick={clickButton} >点击按钮</button> */}
    </div>
  )
}
