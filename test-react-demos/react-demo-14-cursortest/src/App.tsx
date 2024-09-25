import React, { useState } from 'react';
import { Button } from 'antd';
import CUDataModal from './components/CUDataModal';

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState<'create' | 'update'>('create');
  const [initialValues, setInitialValues] = useState<any>(null);

  const fields = [
    { name: 'name', label: 'Name', type: 'text', rules: [{ required: true, message: 'Please input the name!' }] },
    { name: 'age', label: 'Age', type: 'text', rules: [{ required: true, message: 'Please input the age!' }] },
    // 可以根据需要添加更多字段
  ];

  const handleCreate = () => {
    setMode('create');
    setInitialValues(null);
    setModalVisible(true);
  };

  const handleUpdate = () => {
    setMode('update');
    setInitialValues({ name: 'John Doe', age: 30 });
    setModalVisible(true);
  };

  const handleSubmit = (values: any) => {
    console.log('Submitted values:', values);
  };

  return (
    <div>
      <Button type="primary" onClick={handleCreate}>
        Create Data
      </Button>
      <Button type="default" onClick={handleUpdate} style={{ marginLeft: 8 }}>
        Update Data
      </Button>
      <CUDataModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleSubmit}
        mode={mode}
        fields={fields}
        initialValues={initialValues}
      />
    </div>
  );
};

export default App;
