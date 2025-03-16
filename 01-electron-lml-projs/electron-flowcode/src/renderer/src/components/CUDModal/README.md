#### 简介

1）使用CUDModal进行增删改查
2）基于antd Modal 封装

#### 封装参考
https://ant-design.antgroup.com/components/form-cn

先实现基本的文本，boolean，未来有需求再实现更多的。



#### 使用

1、引入：
import CUDModal from '@renderer/components/CUDModal'

2、配置props
Test-demos/01-electron-lml-projs/electron-sma/src/renderer/src/layout/main/settings-main/settingsProjBase/hooks/useProjBaseProps.ts

修改步骤:
1）确保创建引入：数据库entity
import { ProjMod } from '@shared/db-entities/Proj'
2）确保创建并引入CUD的api
import { addProjMod, deleteProjMod, updateProjMod } from '@renderer/common/apis/proj'
3）修改getProps方法
a) 参数
b）方法体:
Proj
addProjApi/updateProjApi/deleteProjApi
fetchProjs
props

```
const getProps = (type: CUDModalProps['type'], fetchProjs: () => Promise<void>, proj?: Proj): CUDModalProps => {

  const onConfirm = async (formData: unknown) => {
    console.log('接受到回调：', formData as Proj)
    if(type === 'create') {
      console.log('点击创建')
      await addProjApi(formData as Proj)
      await fetchProjs()
    } else if(type === 'update') {
      await updateProjApi(formData as Proj)
      await fetchProjs()
    } else if(type === 'delete') {
      const projID: number = (formData as Proj).id!
      await deleteProjApi(projID)
      await fetchProjs()
    }
  }

  let props: CUDModalProps = {
    type: type,
    name: '项目',
    onConfirm: onConfirm,
    fields: {
      'id': {
        label: '项目ID',
        type: 'number',
        data: proj?.id,
        required: false,
        hidden: true
      },
      'projName': {
        label: '项目名称',
        type: 'string',
        placeholder: 'eg. 项目名称',
        required: true,
        data: proj?.projName
      },
      'desc': {
        label: '项目描述',
        type: 'text',
        required: false,
        data: proj?.desc
      },
    }
  }

  return props
}
```
4）useCreateProjBaseProps
5）useUpdateProjBaseProps
6）useDeleteProjBaseProps

3、使用
参见：/Users/markleo/Desktop/Test/Test-demos/01-electron-lml-projs/electron-sma/src/renderer/src/layout/main/work-main/modules/modules-settings/index.tsx

C：
```
import CUDModal from '@renderer/components/CUDModal'

const [modal, contextHolder] = Modal.useModal();
const { projs, selectedProj, fetchProjs, selectProj, fetchProjMods } = useProjStore()

  const handleCreate = () => {
    return <a onClick={()=>{

      const props = useCreateProjBaseProps(fetchProjs)
      CUDModal(modal, props)

    }}>创建</a>
  }
```

U：
D：

