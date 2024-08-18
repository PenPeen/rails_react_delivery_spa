import styles from "./header.module.css";
import { Link } from "react-router-dom";
import CartIcon from "@/assets/shopping-cart.svg";
import { useContext, useEffect } from "react";
import ApiClient from "@/utils/api-client";
import { lineFoodsCount } from "@/config/constants";
import { useRequestStatus } from "@/hooks/use_request_status";
import { CartContext } from "@/App";

type User = {
  name: string;
};

type Navigation = {
  text: string;
  url: string;
};

type Navigations = Navigation[];

export interface HeaderProps {
  title?: string;
  logoUrl?: string;
  user?: User;
  navigations?: Navigations;
  isDark?: boolean;
  isFixed?: boolean;
  onLogin?: () => void;
  onLogout?: () => void;
}

export const Header = ({
  title,
  logoUrl,
  navigations,
  isDark = false,
  isFixed = false,
}: HeaderProps) => {
  const [count, setCount] = useContext(CartContext);
  const { fetching, success } = useRequestStatus();

  useEffect(() => {
    fetching();
    const client = new ApiClient();
    client.get(lineFoodsCount).then((data) => {
      success();
      setCount(data.count);
    });
  }, []);

  const mode = [styles.o_header];
  if (isFixed) {
    mode.push(styles.o_header__fixed);
  }
  if (isDark) {
    mode.push(styles.o_header__dark);
  }

  return (
    <header className={mode.join(" ")}>
      <div>
        <div className={styles.o_header__left_contents}>
          <Link to='/' className={styles.o_header__top_link}>
            {logoUrl && (
              <img className={styles.o_header__logo} src={logoUrl} alt='logo' />
            )}
            {title && <h1 className={styles.o_header__title}>{title}</h1>}
          </Link>
          {navigations ? (
            <nav className={styles.o_header__navigation}>
              <ul className={styles.o_header__navigation_ul}>
                {navigations.map((navigation) => {
                  return (
                    <li>
                      <a href={navigation.url}>{navigation.text}</a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <div className={styles.o_header__right_contents}>
          <div className={styles.o_header__navigation_icon_wrapper}>
            <Link to='/orders'>
              <img
                src={CartIcon}
                alt='Cart'
                className={styles.o_header__navigation_icon}
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
