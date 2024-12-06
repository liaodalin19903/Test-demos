
import { Button, Flex } from "antd"
import FooterTagButton from "./footerButton"

function Footer(): JSX.Element {

  const handClick = (winName: string) => {
    console.log(112233, winName)

  }

  return (
    <div >
      <Flex vertical={false}>
        <div style={{ width: '38px' }}>图</div>

        <div style={{
          // @ts-ignore
          WebkitAppRegion: 'no-drag'
          }}>
          <FooterTagButton onClick={() => {
            handClick('win1')
          }}>WIN1</FooterTagButton>
          <FooterTagButton onClick={() => {
            handClick('win2')
          }}>WIN2</FooterTagButton>
          <FooterTagButton onClick={() => {
            handClick('win3')
          }}>WIN3</FooterTagButton>

        </div>
      </Flex>
    </div>
  )
}

export default Footer
