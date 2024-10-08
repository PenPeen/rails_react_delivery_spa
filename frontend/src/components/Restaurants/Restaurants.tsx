import { useContext, useEffect, useState } from 'react';

import MainCoverImage from '@/assets/main-cover-image.png';
import ApiClient from '@/utils/api-client';
import { restaurantsIndex, REQUEST_STATE, DEFAULT_RAILS_LOCALHOST, defaultRestaurantImage } from '@/config/constants';
import styles from './restaurants.module.css';
import { Link } from 'react-router-dom';
import { Skeleton } from '@mui/material';
import { Restaurant } from '@/type/restaurant';
import { RequestContext } from '@/App';

export const Restaurants = () => {
  const { requestState, loading, success } = useContext(RequestContext);
  const [restaurants, setRestaurants] = useState<Restaurant[]>();

  useEffect(() => {
    loading();

    const client = new ApiClient();
    client.get(restaurantsIndex).then((res) => {
      setRestaurants(res.data.restaurants);
      success();
    });
  }, []);

  return (
    <div className={styles.restaurants}>
      <div className={styles.restaurants__main_cover_image_wrapper}>
        <img className={styles.restaurants__main_cover} src={MainCoverImage} alt="main cover" />
      </div>
      <div className={styles.restaurants__contents_list}>
        {requestState.status === REQUEST_STATE.LOADING ? (
          <>
            <Skeleton variant="rectangular" width={450} height={300} />
            <Skeleton variant="rectangular" width={450} height={300} />
            <Skeleton variant="rectangular" width={450} height={300} />
          </>
        ) : (
          restaurants &&
          restaurants.map((restaurant, index) => (
            <Link to={`/restaurants/${restaurant.id}/foods`} key={index} className={styles.restaurants__content_link}>
              <div className={styles.restaurants__contents_wrapper}>
                <img
                  className={styles.restaurants__contents_image}
                  src={restaurant.url ? `${DEFAULT_RAILS_LOCALHOST}/${restaurant.url}` : defaultRestaurantImage}
                />
                <p className={styles.restaurants__contents_main_text}>{restaurant.name}</p>
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
