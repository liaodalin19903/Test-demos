
import { Button, Flex } from "antd"
import FooterTagButton from "./FooterButton"

import { showWindow, hideWindow, getAllWinNameStatus, smaModulesWithCodefuncsAndCommonSupportsApi } from "@renderer/common/apis"
import { useEffect, useState } from "react"
import { WINDOW_NAMES, EVENTS } from "@shared/constants";
import { useProjStore } from "@renderer/common/store";

type TShowWinStates = {
  [key: string]: boolean
}

function Footer(): JSX.Element {

  const { selectedProjMod } = useProjStore()

  const [showWinStates, setShowWinStates] = useState<TShowWinStates>({
    'WIN1': false,
    'WIN2': false,
    'WIN3': false
  });

  const updateShowState = async () => {
    // 1）获取-组织：窗口状态数据
    const showStates = await getAllWinNameStatus()
    // 2）更新  进而=>FooterButton状态
    setShowWinStates(showStates)
  }

  const handClick = async(winName: string) => {

    // 步骤1：显示/隐藏窗口
    if (showWinStates[winName]) {
      hideWindow(winName);
    } else {
      showWindow(winName);
    }

    // 步骤2：更新TagButton状态
    setTimeout(async ()=>{
      updateShowState()
    }, 100);

  };

  const handleClickTest = async () => {
    console.log('点击了测试按钮')

    //console.log('selectedProj: ', selectedProj)

    const res = await smaModulesWithCodefuncsAndCommonSupportsApi(selectedProjMod!.id!)

    console.log(res)
  }

  useEffect(() => {
    console.log('订阅事件')

    window.api.onEvent(EVENTS.EVENT_FOOTERBUTTON_UPDATE_STATUS, (event, data) => {
      console.log('收到事件', event, data)

      // 更新状态
      setTimeout(async ()=>{
        updateShowState()
      }, 100);
    })

  }, [])

  return (
    <div >
      <Flex vertical={false}>
        <div style={{ width: '38px' }}>图</div>

        <div style={{
          // @ts-ignore
          WebkitAppRegion: 'no-drag'
          }}>
          <FooterTagButton checked={showWinStates[WINDOW_NAMES.WIN1]} onClick={() => {
            handClick(WINDOW_NAMES.WIN1)
          }}>WIN1</FooterTagButton>
          <FooterTagButton checked={showWinStates[WINDOW_NAMES.WIN2]} onClick={() => {
            handClick(WINDOW_NAMES.WIN2)
          }}>WIN2</FooterTagButton>
          <FooterTagButton checked={showWinStates[WINDOW_NAMES.WIN3]} onClick={() => {
            handClick(WINDOW_NAMES.WIN3)
          }}>WIN3</FooterTagButton>
          <FooterTagButton checked={false} onClick={handleClickTest}>点击测试</FooterTagButton>
        </div>
      </Flex>
    </div>
  )
}

export default Footer
