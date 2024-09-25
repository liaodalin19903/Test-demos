# CUDataModal 组件使用说明

## 概述

CUDataModal 是一个用于创建和更新数据的模态框组件。它可以根据不同的模式（创建或更新）展示相应的界面，并处理数据操作。

## 安装依赖

```bash
pnpm install @ant-design/icons antd
```

## 使用方法

1. 在父组件中导入 CUDataModal 和相关的 hook：

```typescript
import CUDataModal from './path/to/CUDataModal';
import { useDataModal } from './path/to/useDataModal';
```

2. 在父组件中使用 useDataModal hook 来管理模态框的状态：

```typescript
const { modalData, openModal, closeModal } = useDataModal();
```

3. 在 JSX 中使用 CUDataModal 组件：

```typescript
<CUDataModal
  isOpen={modalData.isOpen}
  onClose={closeModal}
  mode={modalData.mode}
  initialValues={modalData.initialValues}
/>
```

## 属性说明

- `isOpen`: 控制模态框是否显示
- `onClose`: 关闭模态框的回调函数
- `mode`: 模态框的模式（'create' 或 'update'）
- `initialValues`: 用于填充表单的初始值

## 示例

以下是在 App.tsx 中使用 CUDataModal 的完整示例：

```typescript
import React from 'react';
import CUDataModal from './components/CUDataModal';
import { useDataModal } from './components/CUDataModal/useDataModal';

function App() {
  const { modalData, openModal, closeModal } = useDataModal();

  return (
    <div>
      <button onClick={() => openModal('create')}>创建新数据</button>
      <button onClick={() => openModal('update', existingData)}>更新数据</button>

      <CUDataModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        mode={modalData.mode}
        initialValues={modalData.initialValues}
      />
    </div>
  );
}

export default App;
```

## 注意事项

- 使用 `openModal` 函数来打开模态框，第一个参数指定模式（'create' 或 'update'），第二个参数（可选）用于传递初始值。
- `closeModal` 函数用于关闭模态框。
- `modalData` 对象包含了模态框的当前状态，包括是否打开、模式和初始值。

通过这种方式，CUDataModal 组件可以灵活地处理数据的创建和更新操作，同时保持了良好的状态管理。
```

这个文档更准确地反映了 CUDataModal 在 App.tsx 中的实际使用方式，包括了 useDataModal hook 的使用，这对于理解和使用该组件非常重要。