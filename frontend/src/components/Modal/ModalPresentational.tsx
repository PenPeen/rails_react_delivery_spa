import React, { PropsWithChildren } from "react";
import ReactModal from "react-modal";
import closeLogo from "@/assets/close.svg";
import { ModalProps } from "./ModalContainer";
import { Button } from "@/components/Button/Button";
import styles from "./modal.module.css";

interface ModalPresentationalProps extends ModalProps {
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const ModalPresentational: React.FC<
  ModalPresentationalProps & PropsWithChildren
> = ({
  openLabel = "Open Modal",
  cancelLabel = "CANCEL",
  okLabel = "OK",
  children,
  isOpenButton = true,
  isCloseButton = true,
  isCancelButton = true,
  isOkButton = true,
  handleOK = () => {},
  showModal,
  handleOpenModal,
  handleCloseModal,
}) => {
  return (
    <div className={styles.o_modal}>
      {isOpenButton && (
        <span className={styles.o_modal__ok_button}>
          <Button primary handleClick={handleOpenModal} label={openLabel} />
        </span>
      )}
      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        contentLabel='Modal'
        className={styles.o_modal__contents}
        overlayClassName={{
          base: styles.o_modal__overlay,
          afterOpen: styles.o_modal__overlay__open,
          beforeClose: styles.o_modal__overlay__before_open,
        }}
        ariaHideApp={false}
      >
        {isCloseButton && (
          <button
            type='button'
            className={styles.o_modal__close_button}
            onClick={handleCloseModal}
          >
            <img src={closeLogo} alt='close button' height={16} width={16} />
          </button>
        )}

        {children}

        {(isCancelButton || isOkButton) && (
          <div className={styles.o_modal__button_wrapper}>
            {isCancelButton && (
              <span className={styles.o_modal__cancel_button}>
                <Button handleClick={handleCloseModal} label={cancelLabel} />
              </span>
            )}
            {isOkButton && (
              <span className={styles.o_modal__ok_button}>
                <Button primary handleClick={handleOK} label={okLabel} />
              </span>
            )}
          </div>
        )}
      </ReactModal>
    </div>
  );
};

export default ModalPresentational;
