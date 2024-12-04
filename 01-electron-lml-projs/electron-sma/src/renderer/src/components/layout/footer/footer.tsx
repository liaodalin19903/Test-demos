
import { Button, Flex } from "antd"
import FooterTagButton from "./footerButton"

function Footer(): JSX.Element {

  const handClick = () => {
    console.log(112233)
  }

  return (
    <div >
      <Flex vertical={false}>
        <div style={{ width: '38px' }}>图</div>

        <div style={{
          // @ts-ignore
          WebkitAppRegion: 'no-drag'
          }}>
          <FooterTagButton onClick={handClick}>WIN1</FooterTagButton>
          <FooterTagButton onClick={handClick}>WIN2</FooterTagButton>
          <FooterTagButton onClick={handClick}>WIN3</FooterTagButton>

        </div>
      </Flex>
    </div>
  )
}

export default Footer
