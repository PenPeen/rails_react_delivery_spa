import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import styles from './sign-in.module.css';

import { AuthContext } from '@/App';
import { signIn } from '@/utils/auth';
import { SignInParams } from '@/type';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessageOpen, setAlertMessageOpen] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const params: SignInParams = {
      email: email,
      password: password,
    };

    try {
      const res = await signIn(params);

      if (res.status === 200) {
        Cookies.set('_access_token', res.headers['access-token']);
        Cookies.set('_client', res.headers['client']);
        Cookies.set('_uid', res.headers['uid']);

        setIsSignedIn(true);
        setCurrentUser(res.data.user);

        navigate('/');
      } else {
        setAlertMessageOpen(true);
      }
    } catch {
      setAlertMessageOpen(true);
    }
  };

  return (
    <>
      <div className={styles.sign_in}>
        <form className={styles.sign_in_form} noValidate>
          <div className={styles.sign_in_card}>
            <div className={styles.sign_in_card_header}>ログインする</div>
            <div className={styles.sign_in_card_content}>
              <div className={styles.sign_in_form_field}>
                <label>Email</label>
                <input
                  type="email"
                  required
                  className={styles.sign_in_full_width}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
              <div className={styles.sign_in_form_field}>
                <label>Password</label>
                <input
                  type="password"
                  required
                  className={styles.sign_in_full_width}
                  placeholder="At least 6 characters"
                  value={password}
                  autoComplete="current-password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
              <button
                type="submit"
                className={styles.sign_in_submit_button}
                disabled={!email || !password}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <div className={styles.sign_in_center_text}>
                アカウントをお持ちでないですか? &nbsp;
                <Link to="/signup">登録する</Link>
              </div>
            </div>
          </div>
        </form>
        {alertMessageOpen && (
          <div className={styles.sign_in_alert_message}>入力したメールアドレスまたはパスワードは無効です。</div>
        )}
      </div>
    </>
  );
};

export default SignIn;
