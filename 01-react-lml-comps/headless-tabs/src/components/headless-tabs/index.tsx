import { ReactNode } from 'react';
import { Tabs } from 'antd';
import React, { forwardRef, useImperativeHandle, useState } from 'react';

const { TabPane } = Tabs;

export interface HeadlessTabsProps {
    defaltTabPaneKey?: string,
    tabPaneContents: ReactNode[]
}

const HeadlessTabs = forwardRef((props: HeadlessTabsProps, ref) => {
  
    const defaultKey = props.defaltTabPaneKey ? props.defaltTabPaneKey : '0'
    const tabPaneContents = props.tabPaneContents

    const [activeKey, setActiveKey] = useState(defaultKey);

    // const changeTab = (key: string) => {
    //     setActiveKey(key);
    // };

    // 定义外部可以访问的方法
    useImperativeHandle(ref, () => ({
        setActiveKey: (key: string) => setActiveKey(key),
    }));

    return (
        <div>
            <Tabs 
            renderTabBar={() => <></>}
            activeKey={activeKey}>
                {
                    tabPaneContents.map((item, index) => {
                        return <TabPane tab={"Tab " + index } key={index.toString()}>{item}</TabPane>
                    })
                }
            </Tabs>
        </div>
    );
})

export default HeadlessTabs;