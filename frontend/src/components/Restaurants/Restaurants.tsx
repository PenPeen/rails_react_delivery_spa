import { useEffect, useState } from "react";

import MainCoverImage from "@/assets/main-cover-image.png";
import RestaurantDefaultImage from "@/assets/restaurant-default-image.jpg";
import ApiClient from "@/utils/api-client";
import { restaurantsIndex, REQUEST_STATE } from "@/config/constants";
import styles from "./restaurants.module.css";
import { useRequestStatus } from "@/hooks/use_request_status";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { Restaurant } from "@/type/restaurant";

export const Restaurants = () => {
  const { state, fetching, success } = useRequestStatus();
  const [restaurants, setRestaurants] = useState<Restaurant[]>();

  useEffect(() => {
    fetching();

    const client = new ApiClient();
    client.get(restaurantsIndex).then((data) => {
      setRestaurants(data.restaurants);
      success();
    });
  }, []);

  return (
    <div className={styles.restaurants}>
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
          restaurants &&
          restaurants.map((restaurant, index) => (
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
