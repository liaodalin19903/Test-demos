import { XFlow, XFlowGraph, Background, Control, History } from '@antv/xflow';
import React, { useState } from 'react';
import { useHistory } from '@antv/xflow';
import InitData from './InitData';
import './index.css';

export default function XFlowComp() {
  return (
    <div className="xflow-container">
      <XFlow>
        {/* 将按钮和 history 控制逻辑移到 XFlow 内部 */}
        <History/>
        <HistoryControls />
        <div className="xflow-control-content-graph">
          <InitData />
          <XFlowGraph />
          <Background color="#F2F7FA" />
        </div>
        <div style={{ position: 'absolute', right: 24, bottom: 24 }}>
          <Control
            items={['zoomOut', 'zoomTo', 'zoomIn', 'zoomToFit', 'zoomToOrigin']}
            direction="horizontal"
            placement="top"
          />
        </div>
      </XFlow>
    </div>
  );
}

// 嵌套在 XFlow 内部的 HistoryControls 组件
function HistoryControls() {
  const { redo, undo, canRedo, canUndo } = useHistory();

  const onUndo = () => {
    console.log('onUndo');
    console.log(canRedo, canUndo);
    if (canUndo) undo();
  };

  const onRedo = () => {
    console.log('onRedo');
    if (canRedo) redo();
  };

  return (
    <div>
      History: 
      <button onClick={onUndo} >
        撤销
      </button>
      <button onClick={onRedo} >
        重做
      </button>
    </div>
  );
}