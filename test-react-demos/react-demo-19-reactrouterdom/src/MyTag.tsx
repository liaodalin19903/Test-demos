import { ConfigProvider, Tag } from "antd";
import { useState } from "react";

type MyTagProps = {
    children: string,
    onClick: () => void 
}

const theme = {
    token: {
        /* 全局状态 */
        borderRadiusSM: 0,
        lineWidth: 0,
        colorPrimary: 'red',
        
    },
    components: {
        Tag: {
            
            /* 这里是你的组件 token */
            defaultBg: '#43ced6',
            CheckableTag: {
                defaultBg: '#43ced6',
            }
        }
    },
}

function MyTag(props: MyTagProps) {

    const [checked, setChecked] = useState(false)
    return ( 

        <ConfigProvider
            theme={theme}
            >
            <Tag.CheckableTag 
                checked={checked}
                onClick={() => {
                    props.onClick()
                    setChecked(!checked)
                }}>
                    {props.children}
            </Tag.CheckableTag>
        </ConfigProvider>
     );
}

export default MyTag 