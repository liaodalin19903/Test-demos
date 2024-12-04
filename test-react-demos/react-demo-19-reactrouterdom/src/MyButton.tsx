import { ConfigProvider, Button } from "antd";

type MyTagProps = {
    children: string,
    onClick: () => void 
}

const theme = {
    token: {
        /* 全局状态 */
        borderRadiusSM: 0,
        lineWidth: 0,
        colorFillSecondary: 'lightgreen'
    },
    components: {
    Tag: {
        /* 这里是你的组件 token */
        defaultBg: '#43ced6'
    },
    },
}

function MyButton(props: MyTagProps) {
    return ( 

        <ConfigProvider
            theme={theme}
            >
            <Button onClick={props.onClick}>{props.children}</Button>
        </ConfigProvider>
     );
}

export default MyButton 