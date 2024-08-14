import React, { PropsWithChildren, useEffect } from "react";
import ModalPresentational from "./ModalPresentational";
import styles from "./modal.module.css";

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
  isScrollable?: boolean;
  handleOK?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const body = document.querySelector("body");

const Modal: React.FC<ModalProps & PropsWithChildren> = ({
  showModal,
  handleOpenModal,
  handleCloseModal,
  openLabel = "Open Modal",
  cancelLabel = "CANCEL",
  okLabel = "OK",
  children,
  isOpenButton = true,
  isCloseButton = true,
  isCancelButton = true,
  isOkButton = true,
  isScrollable = false,
  handleOK = () => {},
}) => {
  useEffect(() => {
    if (body == undefined || isScrollable) return;

    if (showModal) {
      body.className = styles.o_modal__body_lock;
    } else {
      body.className = "";
    }
  }, [isScrollable, showModal]);

  return (
    <>
      <ModalPresentational
        showModal={showModal}
        handleOpenModal={handleOpenModal}
        handleCloseModal={handleCloseModal}
        openLabel={openLabel}
        cancelLabel={cancelLabel}
        okLabel={okLabel}
        children={children}
        isOpenButton={isOpenButton}
        isCloseButton={isCloseButton}
        isCancelButton={isCancelButton}
        isOkButton={isOkButton}
        isScrollable={isScrollable}
        handleOK={handleOK}
      />
    </>
  );
};

export default Modal;
