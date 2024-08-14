import Modal from "../Modal/ModalContainer";
import styled from "./foods.module.css";
import OrderHeaderImage from "@/assets/order-header.png";
import { useContext } from "react";
import { ParentContext } from "@/App";

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

  return (
    <>
      {selectedFood && (
        <div className={styled.food_modal}>
          <Modal
            showModal={showModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={handleCloseModal}
            isCancelButton={false}
            isOkButton={false}
            isOpenButton={false}
          >
            <img
              className={styled.food_modal__header_image}
              src={OrderHeaderImage}
              alt='order header'
            />
            <h3>{selectedFood.name}</h3>
            <div>
              <div className={styled.food_modal__description_wrapper}>
                <p className={styled.food_modal__description_subtext}>
                  {selectedFood.description}
                </p>
              </div>
            </div>
            <div>数量</div>
          </Modal>
        </div>
      )}
    </>
  );
};
