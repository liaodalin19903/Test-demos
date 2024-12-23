export type WindowStatus = 'Minimized' | 'Maximized ' | 'Hidden' | 'VisibleNotMaximized' | undefined


const sta1: WindowStatus = 'Hidden'

const compare = (sta: WindowStatus) => {
  if(sta === 'Hidden') {
    return false 
  }
  return true 
}

compare(sta1)