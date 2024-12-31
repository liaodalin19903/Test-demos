// sma modules combo 


import { BaseCombo } from '@antv/g6';
import { Group, Rect } from '@antv/g';

import type { BaseComboStyleProps } from '@antv/g6';

/**
 * 需求：
 * ①圆角
 * ②背景色
 * ③label
 */
export class ExtendBaseCombo extends BaseCombo {
  protected getKeyStyle(attributes: Required<BaseComboStyleProps>) {
    const [width, height] = this.getKeySize(attributes);
    return { ...super.getKeyStyle(attributes), anchor: [0.5, 0.5], width, height };
  }

  // 实现 drawKeyShape 方法
  protected drawKeyShape(attributes: Required<BaseComboStyleProps>, container: Group) {
    return this.upsert('key', Rect, this.getKeyStyle(attributes), container);
  }
}

