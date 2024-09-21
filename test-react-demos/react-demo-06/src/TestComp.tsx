
interface TestCompProp {
    data: string
}

const TestComp = (props: TestCompProp) => {
    
    // 需要在渲染return之前就做初始化的操作: 请问如下的代码应该在哪个生命周期下执行
    const updatedData = props.data + '_updated'

    return <>
    {
        updatedData
    }

    </>
}