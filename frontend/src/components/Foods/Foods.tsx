import FoodImage from "@/assets/food-image.jpg";
import { foodsIndex, REQUEST_STATE } from "@/config/constants";
import { useRequestStatus } from "@/hooks/use_request_status";
import { Food } from "@/type/food";
import ApiClient from "@/utils/api-client";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./foods.module.css";
import { Skeleton } from "@mui/material";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { FoodModal } from "../FoodModal/FoodModal";
import { ParentContext } from "@/App";
import { useModal } from "../Modal/useModal";

const MainLogo = `${import.meta.env.BASE_URL}logo.svg`;

export const Foods: React.FC = () => {
  const { restaurantsId } = useParams();
  const [foods, setFoods] = useState<Food[]>();
  const { state, fetching, success } = useRequestStatus();
  const [showModal, handleOpenModal, handleCloseModal] = useModal();
  const [, setSelectedFood] = useContext(ParentContext);

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
    const body = document.querySelector("body");
    if (body == undefined) return;

    if (showModal) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "";
    }
  }, [showModal]);

  return (
    <>
      <div className={styles.foods__header_wrapper}>
        <Link to='/restaurants'>
          <img
            className={styles.foods__main_logo}
            src={MainLogo}
            alt='main logo'
          />
        </Link>
        <div className={styles.foods_bag_icon_wrapper}>
          <Link to='/orders'>
            <LocalMallIcon
              className={styles.foods__bag_icon}
              fontSize='large'
            />
          </Link>
        </div>
      </div>
      <div className={styles.foods__list}>
        {state.status === REQUEST_STATE.LOADING ? (
          <>
            {[...Array(12).keys()].map((i) => (
              <div className={styles.foods__item_wrapper} key={i}>
                <Skeleton variant='rectangular' width={450} height={180} />
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
                  handleOpenModal();
                }}
              >
                <div className={styles.foods__detail}>
                  {food.name}
                  <div className={styles.foods__description_wrapper}>
                    <p className={styles.foods__description_subtext}>
                      {food.description}
                    </p>
                  </div>
                  <div className={styles.foods__price}>¥{food.price}</div>
                </div>
                <img className={styles.foods__image} src={FoodImage} />
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <FoodModal
          showModal={showModal}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};
