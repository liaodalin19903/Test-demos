import React, { Ref, useRef } from 'react'
import { Space, Typography } from 'antd';
import SubContainer, { SubContainerProps }  from './subContainer'

import { SubContainerImperativeRef } from './subContainer'

const { Text, Link } = Typography;

export type CodeBlockContainerProps = {
  data: SubContainerProps[],  // ①用于存放代码文件根属性和根方法，②用于存放类和类的属性和方法
  fileName: string,  // 文件名
  width?: number,  // 组件宽度
}

export default function Index(props: CodeBlockContainerProps) {

  const ctlChildRefs = useRef<SubContainerImperativeRef[]>([]); // 多个子组件用数组装

  const classNames: string[] = props.data.map(item => item.className)
  
  const classClickHandler = (item: string, index:number) => {
    console.log(item, index)
  }

  // 滚动到指定的class
  const scrollToClass = () => {
    
  }

  // 在特定的class内，滚动到指定的item
  const scrollToItemInClass = (index: number) => {
    if(ctlChildRefs  && ctlChildRefs.current) {
      ctlChildRefs.current[index].scrollToItem(index)  // 滚动到特定的子组件容器的item
    }
  }

  return (
    <div>

      <div id="container" style={{ 
        width: props.width ? props.width : '' 
        }}>
        <div>
          <label id='title'>{props.fileName}</label>
        </div>
        
        <div id='classContainer' 
          style={{ textAlign: 'left' }}
        >
          {
            classNames.map((item, index) => (
              <div
                style={{ display: 'inline-block' }}
                key = {index} 
                onClick={() => {
                  classClickHandler(item, index)
                }}
              ><Text code>{item}</Text></div>
            ))
          }
        </div>

        <div>
          {
            props.data.map((item, index) => (
              <div  key={index}>
                <SubContainer {...item}  ref={ctlChildRefs[index]}>
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
