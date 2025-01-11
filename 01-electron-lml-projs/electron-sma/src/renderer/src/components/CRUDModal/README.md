#### 简介

1）使用CRUDModal进行增删改查
2）基于antd Modal 封装

#### 封装参考
https://ant-design.antgroup.com/components/form-cn

先实现基本的文本，boolean，未来有需求再实现更多的。



#### 使用

1、引入：
import CRUDModal from '@renderer/components/CRUDModal'

2、配置props
Test-demos/01-electron-lml-projs/electron-sma/src/renderer/src/layout/main/settings-main/settingsProjBase/hooks/useProjBaseProps.ts



3、启动
参见：/Users/markleo/Desktop/Test/Test-demos/01-electron-lml-projs/electron-sma/src/renderer/src/layout/main/work-main/modules/modules-settings/index.tsx

import CRUDModal from '@renderer/components/CRUDModal'

const [modal, contextHolder] = Modal.useModal();
const { projs, selectedProj, fetchProjs, selectProj, fetchProjMods } = useStore()




  const handleCreate = () => {
    return <a onClick={()=>{

      const props = useCreateProjBaseProps(fetchProjs)
      CRUDModal(modal, props)

    }}>创建</a>
  }




