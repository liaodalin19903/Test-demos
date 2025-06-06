import { XFlow, XFlowGraph, Clipboard, Minimap, Control, History } from '@antv/xflow';

import { ConfigDrawer } from '../components/config-drawer/index';
import { Connect } from '../components/connect';
import { Dnd } from '../components/dnd/dnd';
import styles from './index.module.less';
import { InitShape } from '../components/node';
import { DAG_EDGE, DAG_CONNECTOR } from '../components/shape';
import { Toolbar } from '../components/toolbar';

const Index = () => {
  return (
    <XFlow>
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.leftTop}>节点库</div>
            <Dnd />
          </div>
          <div className={styles.center}>
            <div className={styles.toolbar}>
              <Toolbar />
              <History/>
            </div>
            <div className={styles.graph}>
              <XFlowGraph
                pannable
                connectionOptions={{
                  snap: true,
                  allowBlank: false,
                  allowLoop: false,
                  highlight: true,
                  connectionPoint: 'anchor',
                  anchor: 'center',
                  connector: DAG_CONNECTOR,
                  validateMagnet({ magnet }) {
                    return magnet.getAttribute('port-group') !== 'top';
                  },
                }}
                connectionEdgeOptions={{
                  shape: DAG_EDGE,
                  animated: true,
                  zIndex: -1,
                }}
              />
              <InitShape />
              <Clipboard />
              <Connect />
              <div className={styles.controlTool}>
                <Control
                  items={['zoomOut', 'zoomTo', 'zoomIn', 'zoomToFit', 'zoomToOrigin']}
                />
              </div>
            </div>
            <div style={{ position: 'absolute', right: 24, bottom: 72 }}>
              <Minimap simple={false} />
            </div>
          </div>
        </div>
        <ConfigDrawer />
      </div>
    </XFlow>
  );
};

export default Index;
