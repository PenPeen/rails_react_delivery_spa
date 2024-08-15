import Modal from "../Modal/ModalContainer";
import styles from "./foods.module.css";
import OrderHeaderImage from "@/assets/order-header.png";
import { useContext, useState } from "react";
import { ParentContext } from "@/App";
import { CountDownButton } from "@/components/CountDownButton/CountDownButton";
import { CountUpButton } from "@/components/CountUpButton/CountUpButton";

type FoodModalProps = {
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
};

export const FoodModal: React.FC<FoodModalProps> = ({
  showModal,
  handleOpenModal,
  handleCloseModal,
}) => {
  const [selectedFood] = useContext(ParentContext);
  const [sales, setSales] = useState(1);

  const countUp = () => {
    setSales((count) => ++count);
  };
  const countDown = () => {
    setSales((count) => --count);
  };

  const countUpIsDisabled = () => sales >= 10;
  const countDownIsDisabled = () => sales <= 1;

  const submitOrder = () => {
    // TODO: オーダーアクション
  };

  return (
    <>
      {selectedFood && (
        <div className={styles.food_modal}>
          <Modal
            showModal={showModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            isCancelButton={false}
            isOkButton={false}
            isOpenButton={false}
          >
            <img
              className={styles.food_modal__header_image}
              src={OrderHeaderImage}
              alt='order header'
            />
            <h3>{selectedFood.name}</h3>
            <div>
              <div className={styles.food_modal__description_wrapper}>
                <p className={styles.food_modal__description_subtext}>
                  {selectedFood.description}
                </p>
              </div>
            </div>
            <div className={styles.food_modal__sales_wrapper}>
              <div className={styles.food_modal__sales_count_wrapper}>
                <CountDownButton
                  size='large'
                  handleClick={countDown}
                  isDisabled={countDownIsDisabled()}
                />
                <div>{sales}</div>
                <CountUpButton
                  size='large'
                  handleClick={countUp}
                  isDisabled={countUpIsDisabled()}
                />
              </div>
              <button
                className={styles.food_modal__order_button}
                onClick={submitOrder}
              >
                注文に{sales}個追加する・¥{selectedFood.price * sales}
              </button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};
