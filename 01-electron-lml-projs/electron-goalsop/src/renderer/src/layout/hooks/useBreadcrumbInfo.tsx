// 对layout的管理 helper
import ProjDesign from "@renderer/layout/ProjDesign/ProjDesign"
import Projs from "@renderer/layout/Projs/Projs"
import React from 'react'


export type BreadcrumbPathInfo = string[]

/**
 *  获取path
 *  @key 传入的左侧栏的选项的id
 */
export const useBreadcrumbPathInfo = (key: string | undefined) => {
  if (key === '1') {
    return ['项目', '项目管理']
  }
  else if(key === '2') {
    return ['项目', '项目设计']
  }
  else {
    return ['项目', '项目管理']
  }
}

/**
 * 获取内容组件
 * @param key 传入的左侧栏的选项的id
 */
export const useBreadcrumbContetInfo = (key: string | undefined): JSX.Element => {
  if (key === '1') {
    return <Projs></Projs>
  }
  else if(key === '2') {
    return <ProjDesign></ProjDesign>
  }
  else {
    return <></>
  }
}
