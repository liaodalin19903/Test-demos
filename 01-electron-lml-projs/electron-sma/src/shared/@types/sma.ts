// SMA相关interface

import { smaModulesWithCodefuncsAndEdgesApi } from "@renderer/common/apis";

//import { SMA_EDGE_TYPE } from "@shared/constants/std-sma";


export type SMAComboModuleWithCodefuncsAndEdge = Awaited<ReturnType< typeof smaModulesWithCodefuncsAndEdgesApi >>[number];




