import React, { PropsWithChildren } from "react";
import ModalPresentational from "./ModalPresentational";

export interface ModalProps {
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
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
  return (
    <>
      <ModalPresentational {...props} />
    </>
  );
};

export default Modal;
