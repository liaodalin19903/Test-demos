import styles from './style.module.css'

import HeaderContent from "./header";
import FooterContent from "./footer";
import MainContent from "./main";

import { Flex, Layout } from "antd";

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
  backgroundColor: '#0958d9'
};

const siderStyle: React.CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
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
  // width: '100vh',
  height: '100vh',
};

function LayoutApp(): JSX.Element {

  return (
    <div className={styles.container}>
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}><HeaderContent/></Header>
          <Content style={contentStyle}><MainContent/></Content>
          <Footer style={footerStyle}><FooterContent/></Footer>
        </Layout>
      </Flex>
    </div>

  )
}

export default LayoutApp
