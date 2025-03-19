

1、复制组件代码到自己项目

src/components/FlowcodeStepCollapsible/EditableList/index.tsx

2、准备props

举例：src/components/FlowcodeStepCollapsible/index.tsx

```tsx
  const editListType = {
    key: '',
    name: '',
    path: ''
  };
  const editListInitialData = [
    {
      key: 1,
      name: `Edward 1`,
      path: 'aaa/bbb/ccc/'
    }
  ];

  const handleEdit = (record) => {
    console.log('编辑操作回调，记录:', record);
  };

  const handleDelete = (record) => {
    console.log('删除操作回调，记录:', record);
  };

```

3、调用

src/components/FlowcodeStepCollapsible/index.tsx