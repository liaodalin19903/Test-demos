import React, { useEffect, useState } from 'react';
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Button, Flex, Layout, Menu, Tag, theme } from 'antd';

import { useBreadcrumbContetInfo, useBreadcrumbPathInfo } from './hooks/useBreadcrumbInfo'

import { db } from '@renderer/common/db'
import { useLiveQuery } from 'dexie-react-hooks';
import { GoalsopSettings } from '@shared/@types';
import { useSelectedProj } from './hooks/useSelectedProj';


const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('项目管理', '1', <PieChartOutlined />),
  getItem('项目设计', '2', <DesktopOutlined />),
  getItem('User', 'sub1', <UserOutlined />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <FileOutlined />),
];

const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedProj = useSelectedProj()

  //#region 生命周期
  useEffect(() => {

  }, [])
  //#endregion

  //#region 选中的左侧栏

  const noSettings = useLiveQuery(async () => {
    const count = await db.settings.count();
    return count === 0;
  }, []);

  const settings: GoalsopSettings | undefined = useLiveQuery(async () => {

    const count = await db.settings.count()
    if (count === 0) {
      return undefined
    }else {
      const setttingsArr =  await db.settings.toArray()
      return setttingsArr[0]
    }

  })

  const onSelectMenu = (e) => {

    // 判断是否有第一行
    if(noSettings) {
      const newSettings: GoalsopSettings = {
        selectedNavMenuKey: e.key
      }
      db.settings.add(newSettings)
    } else {

      const newSettings = {
        ...settings,
        selectedNavMenuKey: e.key
      };

      db.settings.update(settings, newSettings)
    }

  }

  const breadcrumbPathInfo = useBreadcrumbPathInfo(settings ? settings?.selectedNavMenuKey: undefined)

  const ContentComp = useBreadcrumbContetInfo(settings ? settings?.selectedNavMenuKey: undefined)

  // 将 breadcrumbPathInfo 转换为符合 items 属性要求的格式
  const breadcrumbItems = breadcrumbPathInfo.map((path, index) => ({
      title: path
  }));

  //#endregion

  const test = () => {

  }



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
        <Header style={{ padding: 0, background: colorBgContainer }} >

            <Flex style={{ height: '100%', marginLeft: '10px' }}
              justify='flex-start'
              align='center'
              gap="small"
              >
              <Tag color="#108ee9">选中项目: {selectedProj?.properties?.Name.title[0].plain_text}</Tag>
              <Button>同步数据</Button>
              <Button onClick={test}>测试</Button>
            </Flex>

        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={breadcrumbItems}
          >
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              height: 'calc(100% - 70px)'
            }}
          >
            {ContentComp}
          </div>
        </Content>
        <Footer style={{ backgroundColor: 'lightblue', textAlign: 'center' }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
    </div>
  );
};

export default Main;


