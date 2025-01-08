import styles from './style.module.css'

import HeaderContent from "./header";
import FooterContent from "./footer/footer.tsx";
import SiderContent from "./main/sider";

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
            <SiderContent />
          </Layout>
          <Footer style={footerStyle}><FooterContent/></Footer>
        </Layout>

      </Flex>
    </div>

  )
}

export default LayoutApp
