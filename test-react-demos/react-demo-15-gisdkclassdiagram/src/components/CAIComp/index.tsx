import { GISDK } from '@antv/gi-sdk/es';
import React from 'react';
//import ReactDOM from 'react-dom';
import { myAssetPackage } from './gi-assets';
import { config } from './config';

export const CAIComp: React.FC = () => {
  const assets = [myAssetPackage];

  return (
    <GISDK
      className="my-graph-application"
      config={config}
      assets={assets}
      initialGlobalState={{ panel: false, sider: true, currentNode: null }}
    />
  );
};

//ReactDOM.render(<CAIComp />, document.getElementById('root'));
