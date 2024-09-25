import { useState } from 'react';
import { Field } from './CUDataModal';

export interface DataModalState {
  isOpen: boolean;
  data: {
    initialValues: unknown | null | object;
    mode: 'create' | 'update';
    fields: Field[];
    onCallBack: (values: unknown) => void;
  } | null;
}

export const useDataModal = () => {
  const [modalState, setModalState] = useState<DataModalState>({
    isOpen: false,
    data: null,
  });

  const openModal = (data: DataModalState) => {
    setModalState(data);
  };

  const closeModal = () => {
    setModalState({ 
      isOpen: false, 
      data: null 
    });
  };

  return {
    isOpen: modalState.isOpen,
    data: modalState.data,
    openModal,
    closeModal,
  };
};