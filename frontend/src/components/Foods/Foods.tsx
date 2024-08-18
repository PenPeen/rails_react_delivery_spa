import FoodImage from '@/assets/food-image.jpg';
import { DEFAULT_RAILS_LOCALHOST, foodsIndex, REQUEST_STATE } from '@/config/constants';
import { useRequestStatus } from '@/hooks/use_request_status';
import { Food } from '@/type/food';
import ApiClient from '@/utils/api-client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './foods.module.css';
import { Skeleton } from '@mui/material';
import { FoodModal } from '../FoodModal/FoodModal';
import { useModal } from '../Modal/useModal';
import { NewOrderConfirmModal } from '../NewOrderConfirmModal/NewOrderConfirmModal';

export type RestaurantsNames = {
  exist: string;
  new: string;
};

export const Foods: React.FC = () => {
  const { restaurantsId } = useParams();
  const [foods, setFoods] = useState<Food[]>();
  const { requestState, fetching, success } = useRequestStatus();
  const [showFoodModal, handleFoodOpenModal, handleFoodCloseModal] = useModal();
  const [showNewOrderModal, handleOpenNewOrderModal, handleClosenNewOrderModal] = useModal();
  const [selectedFood, setSelectedFood] = useState<Food>();
  const [restaurantsNames, setRestaurantsNames] = useState<RestaurantsNames>();
  const [sales, setSales] = useState(1);
  const resetSales = () => setSales(1);

  useEffect(() => {
    if (!restaurantsId) return;

    fetching();
    const client = new ApiClient();
    client.get(foodsIndex(restaurantsId)).then((data) => {
      success();
      setFoods(data.foods);
    });
  }, []);

  useEffect(() => {
    const body = document.querySelector('body');
    if (body == undefined) return;

    if (showFoodModal) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  }, [showFoodModal]);

  return (
    <>
      <div className={styles.foods__header_wrapper}></div>
      <div className={styles.foods__list}>
        {requestState.status === REQUEST_STATE.LOADING ? (
          <>
            {[...Array(12).keys()].map((i) => (
              <div className={styles.foods__item_wrapper} key={i}>
                <Skeleton variant="rectangular" width={450} height={180} />
              </div>
            ))}
          </>
        ) : (
          foods &&
          foods.map((food) => (
            <div className={styles.foods__item_wrapper} key={food.id}>
              <div
                className={styles.foods__wrapper}
                onClick={() => {
                  setSelectedFood(food);
                  resetSales();
                  handleFoodOpenModal();
                }}
              >
                <div className={styles.foods__detail}>
                  <p className={styles.foods__name}>{food.name}</p>
                  <div className={styles.foods__price}>¥{food.price}</div>
                  <div className={styles.foods__description_wrapper}>
                    <p className={styles.foods__description_subtext}>{food.description}</p>
                  </div>
                </div>
                <img
                  className={styles.foods__image}
                  src={food.url ? `${DEFAULT_RAILS_LOCALHOST}/${food.url}` : FoodImage}
                />
              </div>
            </div>
          ))
        )}
      </div>

      {showFoodModal && (
        <FoodModal
          showModal={showFoodModal}
          handleOpenModal={() => {
            resetSales();
            handleFoodOpenModal();
          }}
          handleCloseModal={handleFoodCloseModal}
          selectedFood={selectedFood!}
          handleOpenNewOrderModal={handleOpenNewOrderModal}
          setRestaurantsNames={setRestaurantsNames}
          sales={sales}
          setSales={setSales}
        />
      )}

      {showNewOrderModal && (
        <NewOrderConfirmModal
          showModal={showNewOrderModal}
          handleOpenModal={handleOpenNewOrderModal}
          handleCloseModal={handleClosenNewOrderModal}
          selectedFood={selectedFood!}
          sales={sales}
          existingResutaurautName={restaurantsNames!.exist}
          newResutaurautName={restaurantsNames!.new}
        />
      )}
    </>
  );
};
