import React from 'react'


export interface TabItem {
  key: string,
  label: string,
  children: JSX.Element
}

import Requirements from './requirements'
import APIs from './apis'
import Archs from './architectures'
import Modules from './modules'
import Classes from './classes'



export const tabItems: TabItem[] = [
  {
    key: '0',
    label: "需求",
    children: Requirements()
  },
  {
    key: '1',
    label: "API",
    children: APIs()
  },
  {
    key: '2',
    label: "架构",
    children: Archs()
  },
  {
    key: '3',
    label: "模块",
    children: Modules()
  },
  {
    key: '4',
    label: "类",
    children: Classes()
  },
]
