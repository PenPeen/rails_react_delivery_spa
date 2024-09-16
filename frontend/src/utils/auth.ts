import { SignInParams, SignUpParams } from '@/type';
import Cookies from 'js-cookie';
import ApiClient from './api-client';
import { login } from '@/config/constants';

export const signUp = (params: SignUpParams) => {
  const client = new ApiClient();
  return client.post('auth', params);
};

export const signIn = (params: SignInParams) => {
  const client = new ApiClient();
  return client.post(login, params);
};

export const signOut = () => {
  const client = new ApiClient();
  return client.delete('auth/sign_out', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};

export const getCurrentUser = () => {
  const client = new ApiClient();

  if (!Cookies.get('_access_token') || !Cookies.get('_client') || !Cookies.get('_uid')) return;
  return client.get('/auth/sessions', {
    headers: {
      'access-token': Cookies.get('_access_token'),
      client: Cookies.get('_client'),
      uid: Cookies.get('_uid'),
    },
  });
};
