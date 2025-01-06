// 通用:支撑

import { BaseEdge } from '@antv/g6';
import type { DisplayObjectConfig } from '@antv/g';
import type { PathArray } from '@antv/util';

import type { BaseEdgeStyleProps, LoopStyleProps, Point } from '@antv/g6';
import { mergeOptions } from '@antv/g6/lib/utils/style';
import { aStarSearch } from '@antv/g6/lib/utils/router/shortest-path';
import { orth } from '@antv/g6/lib/utils/router/orth';
import { getPolylineLoopPath, getPolylinePath } from '@antv/g6/lib/utils/edge';
import { getBBoxHeight, getBBoxWidth, getNodeBBox } from '@antv/g6/lib/utils/bbox';
import { subStyleProps } from '@antv/g6/lib/utils/prefix';
import { PolylineRouter } from '@antv/g6/lib/types';



/**
 * <zh/> 直线样式配置项
 *
 * <en/> Line style properties
 */
export interface CommonSupportEdgeStyleProps extends BaseEdgeStyleProps {
    /**
   * <zh/> 圆角半径
   *
   * <en/> The radius of the rounded corner
   * @defaultValue 0
   */
    radius?: number;
    /**
     * <zh/> 控制点数组
     *
     * <en/> Control point array
     */
    controlPoints?: Point[];
    /**
     * <zh/> 是否启用路由，默认开启且 controlPoints 会自动计入
     *
     * <en/> Whether to enable routing, it is enabled by default and controlPoints will be automatically included
     * @defaultValue false
     */
    router?: PolylineRouter;
}

type ParsedLineStyleProps = Required<CommonSupportEdgeStyleProps>;



export class CommonSupportEdge extends BaseEdge {
  static defaultStyleProps: Partial<CommonSupportEdgeStyleProps> = {

    controlPoints: [],

    radius: 2,
    stroke: '#8b9baf',
    endArrow: true,
    labelText: '支撑',
    labelFill: '#8b9baf',
    labelFontWeight: 600,
    //#region labelBackground以及相关的属性不生效
    labelBackground: true,
    labelBackgroundFill: '#f8f8f8',
    labelBackgroundOpacity: 1,
    labelBackgroundLineWidth: 3,
    labelBackgroundStroke: '#8b9baf',
    //#endregion
    labelPadding: [1, 10],
    labelBackgroundRadius: 4,
    router: {
      type: 'orth',
    },
  };

  constructor(options: DisplayObjectConfig<CommonSupportEdgeStyleProps>) {
    super(mergeOptions({ style: CommonSupportEdge.defaultStyleProps }, options));
  }

  protected getControlPoints(attributes: ParsedLineStyleProps): Point[] {
    const { router } = attributes;
    const { sourceNode, targetNode } = this;
    const [sourcePoint, targetPoint] = this.getEndpoints(attributes, false);

    let controlPoints: Point[] = [];

    if (!router) {
      controlPoints = attributes.controlPoints;
    } else {
      if (router.type === 'shortest-path') {
        const nodes = this.context.element!.getNodes();
        controlPoints = aStarSearch(sourceNode, targetNode, nodes, router);

        if (!controlPoints.length) {
          controlPoints = orth(sourcePoint, targetPoint, sourceNode, targetNode, attributes.controlPoints, {
            padding: router.offset,
          });
        }
      } else if (router.type === 'orth') {
        controlPoints = orth(sourcePoint, targetPoint, sourceNode, targetNode, attributes.controlPoints, router);
      }
    }

    return controlPoints;
  }

  protected getPoints(attributes: ParsedLineStyleProps): Point[] {
    const controlPoints = this.getControlPoints(attributes);

    const [newSourcePoint, newTargetPoint] = this.getEndpoints(attributes, true, controlPoints);
    return [newSourcePoint, ...controlPoints, newTargetPoint];
  }

  protected getKeyPath(attributes: ParsedLineStyleProps): PathArray {
    const points = this.getPoints(attributes);

    return getPolylinePath(points, attributes.radius);
  }

  protected getLoopPath(attributes: ParsedLineStyleProps): PathArray {
    const { sourcePort: sourcePortKey, targetPort: targetPortKey, radius } = attributes;
    const node = this.sourceNode;

    const bbox = getNodeBBox(node);
    // 默认转折点距离为 bbox 的最大宽高的 1/4
    // Default distance of the turning point is 1/4 of the maximum width and height of the bbox
    const defaultDist = Math.max(getBBoxWidth(bbox), getBBoxHeight(bbox)) / 4;

    const {
      placement,
      clockwise,
      dist = defaultDist,
    } = subStyleProps<Required<LoopStyleProps>>(this.getGraphicStyle(attributes), 'loop');

    return getPolylineLoopPath(node, radius, placement, clockwise, dist, sourcePortKey, targetPortKey);
  }
}
