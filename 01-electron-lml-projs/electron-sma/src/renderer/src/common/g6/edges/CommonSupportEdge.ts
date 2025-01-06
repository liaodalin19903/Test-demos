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
  // 我：如果只配置样式，可以配置在defaultStyleProps中
  static defaultStyleProps: Partial<LineStyleProps> = {
    lineWidth: 3,
    //radius: 20,
    badgeBackgroundRadius: 20,
    stroke: '#8b9baf',
    endArrow: true,
    labelText: '支撑',
    labelFill: '#8b9baf',
    labelFontWeight: 600,
    labelBackground: true,
    labelBackgroundFill: '#f8f8f8',
    labelBackgroundOpacity: 1,
    labelBackgroundLineWidth: 3,
    labelBackgroundStroke: '#8b9baf',
    labelPadding: [1, 10],
    labelBackgroundRadius: 4,
  };

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
