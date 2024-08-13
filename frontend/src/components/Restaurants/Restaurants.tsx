import { useEffect } from "react";

import MainCoverImage from "@/assets/main-cover-image.png";
import ApiClient from "@/utils/api-client";
import { restaurantsIndex } from "@/config/constants/request_path_constants";
import styles from "./restaurants.module.css";

const MainLogo = "./logo.svg";

export const Restaurants = () => {
  useEffect(() => {
    const client = new ApiClient();
    client.get(restaurantsIndex).then((data) => console.log(data));
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
    </div>
  );
};
