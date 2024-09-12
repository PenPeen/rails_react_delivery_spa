import styles from './header.module.css';
import { Link } from 'react-router-dom';
import CartIcon from '@/assets/shopping-cart.svg';
import { useContext, useEffect } from 'react';
import ApiClient from '@/utils/api-client';
import { lineFoodsCount, REQUEST_STATE } from '@/config/constants';
import { AuthContext, CartContext, RequestContext } from '@/App';
import { Badge } from '@/components/Badge/Badge';
import { Button } from '@/components/Button/Button';
import { signOut } from '@/utils/auth';
import Cookies from 'js-cookie';

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

export const Header = ({ title, logoUrl, navigations, isDark = false, isFixed = false }: HeaderProps) => {
  const { cartCount, setCartCount } = useContext(CartContext);
  const { requestState, loading, success } = useContext(RequestContext);
  const { isSignedIn, setIsSignedIn } = useContext(AuthContext);

  useEffect(() => {
    loading();
    const client = new ApiClient();
    client.get(lineFoodsCount).then((res) => {
      success();
      setCartCount(res.data.count);
    });
  }, []);

  const mode = [styles.o_header];
  if (isFixed) {
    mode.push(styles.o_header__fixed);
  }
  if (isDark) {
    mode.push(styles.o_header__dark);
  }

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();
      const res = await signOut();

      if (res.data.success === true) {
        const cookiesToDelete = ['_access_token', '_client', '_uid'];
        cookiesToDelete.forEach((cookie) => Cookies.remove(cookie));

        setIsSignedIn(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header className={mode.join(' ')}>
      <div>
        <div className={styles.o_header__left_contents}>
          <Link to="/" className={styles.o_header__top_link}>
            {logoUrl && <img className={styles.o_header__logo} src={logoUrl} alt="logo" />}
            {title && <h1 className={styles.o_header__title}>{title}</h1>}
          </Link>
          {navigations ? (
            <nav className={styles.o_header__navigation}>
              <ul className={styles.o_header__navigation_ul}>
                {navigations.map((navigation) => {
                  return (
                    <li>
                      <Link to={navigation.url}>{navigation.text}</Link>
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
            <Link to="/orders">
              <div className={styles.o_header__orders_link}>
                <img src={CartIcon} alt="Cart" className={styles.o_header__navigation_icon} />
                {requestState.status === REQUEST_STATE.OK && cartCount !== 0 && (
                  <Badge type="success" label={cartCount.toString()} />
                )}
              </div>
            </Link>
          </div>
          <div className={styles.o_header__login_contents}>
            {requestState.status === REQUEST_STATE.OK &&
              (isSignedIn ? (
                <Button size="small" type="neutral" handleClick={() => handleSignOut}>
                  サインアウト
                </Button>
              ) : (
                <>
                  <Button size="small" type="neutral">
                    <Link to="/signin">ログイン</Link>
                  </Button>
                  <Button size="small" type="danger" isSolid>
                    <Link to="/signup">登録する</Link>
                  </Button>
                </>
              ))}
          </div>
        </div>
      </div>
    </header>
  );
};
