import { ConfigProvider, Tag } from "antd";
import { useState } from "react";
import { MAIN_COLOUR } from '@shared/constants'

type MyTagProps = {
    checked: boolean,
    children: string,
    onClick: () => void
}

const theme = {
  token: {
    /* 全局状态 */
    borderRadiusSM: 0,
    lineWidth: 0,
    colorPrimary: MAIN_COLOUR,
  },
  components: {
    Tag: {
      /* 这里是你的组件 token */
      defaultBg: '#43ced6',
      defaultColor: '#ffffff',
      CheckableTag: {
          defaultBg: '#43ced6',
      }
    }
  },
}

function FooterTagButton(props: MyTagProps) {

  return (
      <ConfigProvider
          theme={theme}
          >
          <Tag.CheckableTag
              checked={props.checked}
              onClick={() => {
                  props.onClick()
              }}>
                  {props.children}
          </Tag.CheckableTag>
      </ConfigProvider>
    );
}

export default FooterTagButton
