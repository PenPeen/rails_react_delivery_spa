import { useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return [showModal, handleOpenModal, handleCloseModal] as const;
};
