import { ExtensionCategory, Graph, register } from '@antv/g6';
import { ReactNode } from '@antv/g6-extension-react';

import { Badge, Flex, Input, Tag, Typography } from 'antd';
import { Collapse, Select } from 'antd';
import type { CollapseProps } from 'antd';
import { Grid, Tag } from 'antd';
import { useEffect, useRef } from 'react';

const { Text } = Typography;

register(ExtensionCategory.NODE, 'react', ReactNode);

export interface CAINodeProps {
    type: 'Class' | 'AbstractClass' | 'Interface',
    CAIName: string, 
    attrs: string[],
    methods: string[]
}

// 这个是CAI的Node（样式）
export const CAINode = (props: CAINodeProps) => {

    const {type, CAIName, attrs, methods} = props 

    const onChange = (key: string | string[]) => {
        console.log(key);
      };

    // 创造属性和方法的展示


    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: '属性',
            children: <div>{
                Object.entries(attrs).map(([, attr]) => (
                    <Tag color="blue" key={attr}>
                        {attr}
                    </Tag>
                ))    
            }</div>
        },
        {
            key: '2',
            label: '方法',
            children: <div>{
                Object.entries(methods).map(([, method]) => (
                    <Tag color="blue" key={method}>
                        {method}
                    </Tag>
                ))    
            }</div>
        },
    ]

    return (
        <Flex 
            style={{
                width: '100%',
                height: '100%',
                background: '#fff',
                padding: 10,
                borderRadius: 5,
                border: '1px solid gray',
            }}
          vertical
        >
            <div
                style={{
                    backgroundColor: 'blue',
                    height: '20px',
                    width: '100%'
                }}
            >
                <Text>
                    {'<<'+type+'>>'}
                </Text>
                <Text>{CAIName}</Text>
            </div>
            <div>
            <Collapse
                defaultActiveKey={['1']}
                onChange={onChange}
                expandIconPosition='end'
                items={items}
            />
            </div>
            
        </Flex>
    )
}

/**
 * 实现、继承、组合、聚合
 */

// 实现
export const CAIEdgeImpl = () => {
    
}

// 继承
export const CAIEdgeInherit = () => {

}

// 组合 
export const CAIEdgeComp = () => {

}

// 聚合
export const CAIEdgeAggre = () => {

}