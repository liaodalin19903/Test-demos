// 通关用神

import { EightChar, TianganDizhiChar, Wuxing } from "@shared/@types/eightChar/eightCharInfo";
import { getWuxingTongguanChar } from "../../tianganDizhiRoles/utils";

// 我：需要传入两种冲突的五行，然后给出结果
export const getEightCharTongguanYongshen = (
  wuxing1: Wuxing,
  wuxing2: Wuxing
): TianganDizhiChar[] => {

  const tongguanYongshen: TianganDizhiChar[] = getWuxingTongguanChar(wuxing1, wuxing2)
  return tongguanYongshen
};


