// sma modules combo 


import { BaseCombo } from '@antv/g6';
import { Group, Rect } from '@antv/g';

import type { BaseComboStyleProps } from '@antv/g6';

import type { DisplayObjectConfig, RectStyleProps as GRectStyleProps } from '@antv/g';
import { Rect as GRect, Group } from '@antv/g';
import { subStyleProps } from '../../utils/prefix';




/**
 * <zh/> 矩形组合样式配置项
 *
 * <en/> Rect combo style props
 */
export interface SMAModulesComboStyleProps extends BaseComboStyleProps {}

/**
 * 需求：
 * ①圆角
 * ②背景色
 * ③label
 */
export class SMAModulesCombo extends BaseCombo {
  protected getKeyStyle(attributes: Required<SMAModulesComboStyleProps>) {
    const [width, height] = this.getKeySize(attributes);
    return { 
      ...super.getKeyStyle(attributes), 
      anchor: [0.5, 0.5],
      width, 
      height, 
      fill: 'red',

     };
  }

  // 实现 drawKeyShape 方法
  protected drawKeyShape(attributes: Required<SMAModulesComboStyleProps>, container: Group) {
    return this.upsert('key', Rect, this.getKeyStyle(attributes), container);
  }
}

