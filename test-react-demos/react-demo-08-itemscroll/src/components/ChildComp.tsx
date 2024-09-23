import { forwardRef, useImperativeHandle } from "react";


export interface ChildCompProps {
    list: string[]
}

const ChildComp = forwardRef((props: ChildCompProps, ref) => {
    
    useImperativeHandle(ref, ()=> ({
        // 滑动到指定的item
        scrollToIdx: (index: number) => {
            console.log(index)
        }
    }))

    return ( <>
    <div style={{
        width: '500px',
        height: '400px',
        backgroundColor: 'grey',
        overflow: 'auto'
    }}>
        {
            props.list.map((item, index) => (
                <div 
                key={index}
                style={{
                    backgroundColor: 'white',
                    width: '80px',
                    height: '20px',
                    margin: '8px',
                    display: 'inline-block',
                    float: 'left'
                }}>{item}-id:{index}</div>
            ))
        }
    </div>
    </> );
})

export default ChildComp; 
