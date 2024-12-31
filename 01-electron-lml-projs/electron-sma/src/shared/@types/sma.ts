// SMA相关interface

import { SMA_RELATIONS_TITLE } from "@shared/constants/std-sma";


export interface COMMON_SUPPORT_EDGE_DATA {
  title: SMA_RELATIONS_TITLE.COMMON_SUPPORT,  // 用作label
  desc?: string, // 用作label
  edgeCb? : (data: Omit<COMMON_SUPPORT_EDGE_DATA, 'edgeCb'>) => void
}






