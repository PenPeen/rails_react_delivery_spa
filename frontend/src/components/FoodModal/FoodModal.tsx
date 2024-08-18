import Modal from '../Modal/ModalContainer';
import styles from './food_modal.module.css';
import OrderHeaderImage from '@/assets/order-header.png';
import { CountDownButton } from '@/components/CountDownButton/CountDownButton';
import { CountUpButton } from '@/components/CountUpButton/CountUpButton';
import ApiClient from '@/utils/api-client';
import { HTTP_STATUS_CODE, lineFoods } from '@/config/constants';
import { Food } from '@/type/food';
import { RestaurantsNames } from '../Foods/Foods';
import { useContext } from 'react';
import { CartContext } from '@/App';

type FoodModalProps = {
  selectedFood: Food;
  showModal: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
  handleOpenNewOrderModal: () => void;
  setRestaurantsNames: React.Dispatch<React.SetStateAction<RestaurantsNames | undefined>>;
  sales: number;
  setSales: React.Dispatch<React.SetStateAction<number>>;
};

export const FoodModal: React.FC<FoodModalProps> = ({
  selectedFood,
  showModal,
  handleOpenModal,
  handleCloseModal,
  handleOpenNewOrderModal,
  setRestaurantsNames,
  sales,
  setSales,
}) => {
  const [, setCount] = useContext(CartContext);
  const modalCloseAndResetSales = () => {
    handleCloseModal();
    setSales(1);
  };

  const countUp = () => {
    setSales((count) => ++count);
  };
  const countDown = () => {
    setSales((count) => --count);
  };

  const countUpIsDisabled = () => sales >= 10;
  const countDownIsDisabled = () => sales <= 1;

  const submitOrder = () => {
    const apiClient = new ApiClient();
    apiClient
      .post(lineFoods, {
        food_id: selectedFood.id,
        count: sales,
      })
      .then((data) => {
        setCount(data.count);
      })
      .catch((e) => {
        if (e.response.status === HTTP_STATUS_CODE.NOT_ACCEPTABLE) {
          setRestaurantsNames({
            exist: e.response.data.existing_restaurant,
            new: e.response.data.new_restaurant,
          });
          handleOpenNewOrderModal();
        } else {
          throw e;
        }
      })
      .finally(() => {
        modalCloseAndResetSales();
      });
  };

  return (
    <>
      {selectedFood && (
        <div className={styles.food_modal}>
          <Modal
            showModal={showModal}
            handleOpenModal={handleOpenModal}
            handleCloseModal={modalCloseAndResetSales}
            isCancelButton={false}
            isOkButton={false}
            isOpenButton={false}
          >
            <img className={styles.food_modal__header_image} src={OrderHeaderImage} alt="order header" />
            <h3>{selectedFood.name}</h3>
            <div>
              <div className={styles.food_modal__description_wrapper}>
                <p className={styles.food_modal__description_subtext}>{selectedFood.description}</p>
              </div>
            </div>
            <div className={styles.food_modal__sales_wrapper}>
              <div className={styles.food_modal__sales_count_wrapper}>
                <CountDownButton size="large" handleClick={countDown} isDisabled={countDownIsDisabled()} />
                <div>{sales}</div>
                <CountUpButton size="large" handleClick={countUp} isDisabled={countUpIsDisabled()} />
              </div>
              <button className={styles.food_modal__order_button} onClick={submitOrder}>
                注文に{sales}個追加する・¥{selectedFood.price * sales}
              </button>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};
