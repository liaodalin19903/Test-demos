import React from 'react';
import CUDataModal from './components/CUDataModal/CUDataModal';
import { useDataModal } from './components/CUDataModal/useDataModal';  

const App: React.FC = () => {
  const { isOpen, data: modalData, openModal, closeModal } = useDataModal();

  const fields = [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      rules: [{ required: true, message: 'Name is required' }],
    },
  ];

  const handleCreate = () => {
    openModal({
      data: {
        initialValues: null,
        mode: 'create',
        fields: fields,
        onCallBack: (values: unknown) => {  
          console.log(values);
        },
      },
      isOpen: true
    });
  };

  const handleUpdate = () => {
    openModal({
      data: {
        initialValues: { name: 'John Doe', age: 30 },
        mode: 'update',
        fields: fields,
        onCallBack: (values: unknown) => {  
          console.log(values);
        },
      },
      isOpen: true
    } );
  };

  return (
    <div>
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleUpdate}>Update</button>
      
      {isOpen && modalData && (
        <CUDataModal
          open={isOpen}
          onClose={closeModal}
          mode={modalData.mode}
          initialValues={modalData.initialValues} 
          fields={modalData.fields} 
          onCallBack={modalData.onCallBack}
          ></CUDataModal>
      )}
    </div>
  );
};

export default App;
