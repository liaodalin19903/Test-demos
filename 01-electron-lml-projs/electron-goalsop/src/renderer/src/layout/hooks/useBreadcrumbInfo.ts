// 对layout的管理 helper

export type BreadcrumbPathInfo = string[]

/**
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
