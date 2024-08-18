import ApiClient from "@/utils/api-client";
import Modal from "@/components/Modal/ModalContainer";
import styles from "./new_order_confirm.module.css";
import { lineFoodsReplace } from "@/config/constants";
import { Food } from "@/type/food";
import { useContext } from "react";
import { CartContext } from "@/App";

type NewOrderConfirmModalProps = {
  selectedFood: Food;
  sales: number;
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  existingResutaurautName: string;
  newResutaurautName: string;
};

export const NewOrderConfirmModal: React.FC<NewOrderConfirmModalProps> = ({
  selectedFood,
  sales,
  showModal,
  handleOpenModal,
  handleCloseModal,
  existingResutaurautName,
  newResutaurautName,
}) => {
  const [, setCount] = useContext(CartContext);

  const confirmedOrder = () => {
    const apiClient = new ApiClient();
    apiClient
      .put(lineFoodsReplace, {
        food_id: selectedFood!.id,
        count: sales,
      })
      .then((data) => {
        setCount(data.count);
      })
      .catch((e) => {
        throw e;
      })
      .finally(() => {
        handleCloseModal();
      });
  };

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
            onClick={confirmedOrder}
          >
            新規注文
          </button>
        </Modal>
      </div>
      )
    </>
  );
};
