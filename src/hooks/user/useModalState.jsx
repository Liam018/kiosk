import { useState } from 'react';

const useModalState = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  return { isModalOpen, setIsModalOpen, selectedUser, setSelectedUser };
};

export default useModalState;