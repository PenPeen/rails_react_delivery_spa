import { useEffect } from "react";

import MainCoverImage from "@/assets/main-cover-image.png";
import RestaurantDefaultImage from "@/assets/restaurant-default-image.jpg";
import ApiClient from "@/utils/api-client";
import { restaurantsIndex } from "@/config/constants/request_path_constants";
import styles from "./restaurants.module.css";
import { useRequestStatus } from "@/hooks/use_request_status";
import { Link } from "react-router-dom";
import { REQUEST_STATE } from "@/config/constants/request_state_constants";
import { Skeleton } from "@mui/material";

const MainLogo = "./logo.svg";

export const Restaurants = () => {
  const { state, fetching, success } = useRequestStatus();

  useEffect(() => {
    fetching();

    const client = new ApiClient();
    client.get(restaurantsIndex).then((data) => {
      success(data.restaurants);
    });
  }, []);

  return (
    <div className={styles.restaurants}>
      <div>
        <img
          className={styles.restaurants__main_logo}
          src={MainLogo}
          alt='main logo'
        />
      </div>
      <div className={styles.restaurants__main_cover_image_wrapper}>
        <img
          className={styles.restaurants__main_cover}
          src={MainCoverImage}
          alt='main cover'
        />
      </div>
      <div className={styles.restaurants__contents_list}>
        {state.status === REQUEST_STATE.LOADING ? (
          <>
            <Skeleton variant='rectangular' width={450} height={300} />
            <Skeleton variant='rectangular' width={450} height={300} />
            <Skeleton variant='rectangular' width={450} height={300} />
          </>
        ) : (
          state.restaurants.map((restaurant, index) => (
            <Link
              to={`/restaurants/${restaurant.id}/foods`}
              key={index}
              className={styles.restaurants__content_link}
            >
              <div className={styles.restaurants__contents_wrapper}>
                <img
                  className={styles.restaurants__contents_image}
                  src={restaurant.image_url || RestaurantDefaultImage}
                />
                <p className={styles.restaurants__contents_main_text}>
                  {restaurant.name}
                </p>
                <p
                  className={styles.restaurants__contents_sub_text}
                >{`配送料：${restaurant.fee}円 ${restaurant.time_required}分`}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
