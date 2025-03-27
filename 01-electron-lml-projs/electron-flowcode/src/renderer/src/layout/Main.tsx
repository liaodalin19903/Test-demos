import React, { useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import { useBreadcrumbContetInfo, useBreadcrumbPathInfo } from './hooks/useBreadcrumbInfo';

import { db } from '@renderer/common/dexieDB';
import { useLiveQuery } from 'dexie-react-hooks';
import { ProjSettings } from '@shared/@types';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('项目管理', '1', <PieChartOutlined />),
  getItem('项目设计', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5')
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />)
];

const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG }
  } = theme.useToken();

  const noSettings = useLiveQuery(async () => {
    const count = await db.projSettings.count();
    return count === 0;
  }, []);

  const settings: ProjSettings | undefined = useLiveQuery(async () => {
    const count = await db.projSettings.count();
    if (count === 0) {
      return undefined;
    } else {
      const setttingsArr = await db.projSettings.toArray();
      return setttingsArr[0];
    }
  });

  const onSelectMenu = (e) => {
    // 判断是否有第一行
    if (noSettings) {
      const newSettings: ProjSettings = {
        selectedNavMenuKey: e.key,
      };
      db.projSettings.add(newSettings);
    } else {
      const newSettings = {
        ...settings,
        selectedNavMenuKey: e.key
      };

      db.projSettings.update(settings, newSettings);
    }
  };

  const breadcrumbPathInfo = useBreadcrumbPathInfo(
    settings ? settings?.selectedNavMenuKey : undefined
  );

  const ContentComp = useBreadcrumbContetInfo(settings ? settings?.selectedNavMenuKey : undefined);

  // 将 breadcrumbPathInfo 转换为 items 格式
  const breadcrumbItems = breadcrumbPathInfo.map((path, index) => ({
    key: index,
    title: path
  }));

  const buttomButtonTest = () => {
    console.log('buttom button test');

  };

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['2']}
            mode="inline"
            items={items}
            onSelect={onSelectMenu}
          />
        </Sider>
        <Layout>
          <Header style={{ padding: 0, background: colorBgContainer }}></Header>
          <Content style={{ margin: '0 16px' }}>
            {/* 使用 items 属性 */}
            <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
            <div
              style={{
                padding: 24,
                minHeight: 360,
                background: colorBgContainer,
                borderRadius: borderRadiusLG
              }}
            >
              {ContentComp}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Ant UED
            <button onClick={buttomButtonTest}>测试</button>
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

export default Main;
