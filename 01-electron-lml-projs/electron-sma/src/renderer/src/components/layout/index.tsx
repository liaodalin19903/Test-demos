import styles from './style.module.css'

import HeaderContent from "./header";
import FooterContent from "./footer/footer";
import MainContent from "./main/main";
import SiderContent from "./sider";

import { Flex, Layout } from "antd";

import { MAIN_COLOUR5 } from '@shared/constants'

const { Header, Footer, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 28,
  padding: 0,  // 避免HeaderContent 不占满
  lineHeight: '28px',
  backgroundColor: '#4096ff',
  // @ts-ignore
  WebkitAppRegion: 'drag'
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  //backgroundColor: '#0958d9'
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  width: '20px',
  flex: '0 0 20px',
  minWidth: '20px',
  maxWidth: '20px',
  lineHeight: '38px',
  color: '#fff',
  backgroundColor: '#1677ff',
};

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#4096ff',
  height: 28,
  lineHeight: '28px',
  padding: 0,
  // @ts-ignore
  WebkitAppRegion: 'drag'
};

const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  height: '100vh',
};

function LayoutApp(): JSX.Element {

  return (
    <div className={styles.container}>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}><HeaderContent/></Header>
          <Layout>
            <Sider width="38px" style={siderStyle}>
              <SiderContent />
            </Sider>
            <Content style={contentStyle}><MainContent/></Content>
          </Layout>
          <Footer style={footerStyle}><FooterContent/></Footer>
        </Layout>

      </Flex>
    </div>

  )
}

export default LayoutApp
