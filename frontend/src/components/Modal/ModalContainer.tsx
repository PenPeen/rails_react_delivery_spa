import React, { PropsWithChildren } from "react";
import { useModal } from "./useModal";
import ModalPresentational from "./ModalPresentational";

export interface ModalProps {
  openLabel?: string;
  cancelLabel?: string;
  okLabel?: string;
  isOpenButton?: boolean;
  isCloseButton?: boolean;
  isCancelButton?: boolean;
  isOkButton?: boolean;
  handleOK?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Modal: React.FC<ModalProps & PropsWithChildren> = (props) => {
  const [showModal, handleOpenModal, handleCloseModal] = useModal();

  return (
    <>
      <ModalPresentational
        {...props}
        showModal={showModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
};

export default Modal;
