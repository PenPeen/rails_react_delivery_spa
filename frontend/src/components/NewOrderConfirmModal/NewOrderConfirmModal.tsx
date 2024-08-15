import Modal from "../Modal/ModalContainer";
import styles from "./new_order_confirm.module.css";

type NewOrderConfirmModalProps = {
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  onClickSubmit: () => void;
  existingResutaurautName: string;
  newResutaurautName: string;
};

export const NewOrderConfirmModal: React.FC<NewOrderConfirmModalProps> = ({
  showModal,
  handleOpenModal,
  handleCloseModal,
  onClickSubmit,
  existingResutaurautName,
  newResutaurautName,
}) => {
  return (
    <>
      <div className={styles.new_order_confirm_modal}>
        <Modal
          showModal={showModal}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
          isCancelButton={false}
          isOkButton={false}
          isOpenButton={false}
        >
          <h3>新規注文を開始しますか？</h3>
          <p>
            {`ご注文に ${existingResutaurautName} の商品が含まれています。
            新規の注文を開始して ${newResutaurautName} の商品を追加しますか？`}
          </p>
          <button
            className={styles.new_order_confirm_modal__new_order_button}
            onClick={onClickSubmit}
          >
            新規注文
          </button>
        </Modal>
      </div>
      )
    </>
  );
};
