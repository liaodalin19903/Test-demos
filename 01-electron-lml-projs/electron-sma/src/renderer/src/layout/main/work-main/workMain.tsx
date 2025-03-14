import styles from './workMain.module.css'

import { Modal, Tabs } from 'antd'

import { tabItems } from './workMain.tabs'
import { useEffect } from 'react'
import { useProjStore } from '@renderer/common/store';



function WorkMain(): JSX.Element {

  const [modal, contextHolder] = Modal.useModal();
  const { selectedProjMod } = useProjStore()

  useEffect(() => {
    let timeoutId;
    const handleTimeout = () => {
      if (!selectedProjMod) {
        modal.error({
          title: '注意',
          content: '请进入设置配置好：项目模块'
        });
      }
    };
    timeoutId = setTimeout(handleTimeout, 1000);

    return () => {
      // 组件卸载时清除定时器
      clearTimeout(timeoutId);
    };
  }, [selectedProjMod]);

  return (
    <div >
      <Tabs
        className={styles.nopaddingTabs}
        tabPosition="left"
        defaultActiveKey='3'
        items = {tabItems}
      >
      </Tabs>
    {contextHolder}
    </div>
  )
}

export default WorkMain
