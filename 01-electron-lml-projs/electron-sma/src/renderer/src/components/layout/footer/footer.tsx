
import { Flex } from "antd"
import FooterTagButton from "./footerButton"

import { showWindow, hideWindow } from "@renderer/common/apis"
import { useState } from "react"

function Footer(): JSX.Element {

  const [showWinStates, setShowWinStates] = useState({
    win1: false,
    win2: false,
    win3: false
  });

  const handClick = (winName: string) => {
    setShowWinStates(prevStates => {
        const updatedStates = {
          ...prevStates,
            [winName]:!prevStates[winName]
        };
        if (updatedStates[winName]) {
          showWindow(winName);
        } else {
          hideWindow(winName);
        }
        return updatedStates;
    });
};

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
