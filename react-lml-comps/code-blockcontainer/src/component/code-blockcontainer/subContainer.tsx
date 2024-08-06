
import React, { useEffect, useState } from 'react'
import { ChangeEvent } from'react';

export type ItemType = {
    type: "property" | "method",
    value: string,
    selected?: boolean    
}

export type SubContainerProps = {
    height?: number,
    title: string,
    data: ItemType[], // 这个是items
    scrollToIdx?: number // 滚动到具体的index的data数组元素
    selected?: boolean // class是否被选中
    
}

export default function SubContainer (props: SubContainerProps){ 

    const [data, setData] = useState<ItemType[]>(props.data)

    // 滚动
    useEffect(() => {
        if(props.scrollToIdx) {

            const scrollToIdx = props.scrollToIdx 
            
            console.log("滚动ID：", '#item-' + scrollToIdx!.toString())

            scrollTo(scrollToIdx)
        }
    }, [props.scrollToIdx])

    const scrollTo = (scrollToIdx: number) => {
        const container = document.querySelector("#container")
        const div: HTMLDivElement | null = document.querySelector('#item-' + scrollToIdx!.toString())
    
        console.log(container, div)
        if(container) {
            container.scrollTo({
                top: div!.offsetTop,
                behavior: 'smooth'
            });
        }
    }


    // useEffect(() => {
    //     setData(props.data)
    // }, [props.data])

    

    const itemClick = (item: ItemType, index: number) => {
        console.log(item, index)
    }

    const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
        //console.log(e.target.value)
        const searchValue = e.target.value;
        const filteredData = props.data.filter(item => {
            // 假设您要匹配 item 的某个属性，比如 value
            return item.value.toLowerCase().includes(searchValue.toLowerCase());
        });
        // 在这里根据 filteredData 进行后续的处理，比如更新组件状态或重新渲染相关部分
        console.log(filteredData);

        setData(filteredData)
    }



    return (
        <div style={{
            borderRadius: '8px',  
            border: '2px dashed #333', 
            height: props.height ? props.height : ''
            }}>
            <div style={{
                textAlign: 'left',
                height: '40px',
                display: 'flex',
                alignItems: 'center'
                }}>
                <label style={{
                    float: 'left',
                    color: props.selected ? 'green' : '',
                    fontWeight: props.selected ? 'bold' : ''
                    }}>{props.title}
                </label>
                <input 
                style={{float: 'right', marginLeft: 'auto'}} 
                placeholder='搜索:'
                onChange={searchChange}
                ></input>
            </div>
            <div
                id="container"
                style={{
                    overflow: 'auto',
                    height: props.height? props.height - 40 : ''
                }}  
                >
                {data.map((item, index) => (
                    <div 
                        id={ `item-${index}` }
                        key={`${index}-${item.type}-${item.value} `} 
                        style={{ 
                            float: 'left', 
                            display: 'inline-block', 
                            borderRadius: '6px', 
                            border: '2px solid #000', 
                            margin: '8px', 
                            padding:'4px',
                            backgroundColor: item.selected ? '#39fe40': '' 
                        }}
                        onClick={() => {
                            itemClick(item, index)
                        }}
                    >{item.value}</div>
                ))}
            </div>
        </div>
    )
}