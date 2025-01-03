// 通用:支撑

import { BaseEdge } from '@antv/g6';
import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';




/**
 * <zh/> 直线样式配置项
 *
 * <en/> Line style properties
 */
export interface LineStyleProps extends BaseEdgeStyleProps {}

type ParsedLineStyleProps = Required<LineStyleProps>;


import type { BaseEdgeStyleProps } from '@antv/g6';
import { mergeOptions } from '@renderer/common/utils/style';

export class CommonSupportEdge extends BaseEdge {
  static defaultStyleProps: Partial<LineStyleProps> = {};

  constructor(options: DisplayObjectConfig<LineStyleProps>) {
    super(mergeOptions({ style: CommonSupportEdge.defaultStyleProps }, options));
  }

  protected getKeyPath(attributes: ParsedLineStyleProps): PathArray {
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes);
    return [
      ['M', sourcePoint[0], sourcePoint[1]],
      ['L', targetPoint[0], targetPoint[1]],
    ];
  }
}
