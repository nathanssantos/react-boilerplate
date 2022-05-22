import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import RootStore from './rootStore';
import User from '../models/User';
import api from '../../services/api';

export default class AuthStore {
  rootStore: RootStore;
  user: User | null = null;
  authenticateStatus: FetchStatus = 'idle';
  getMeStatus: FetchStatus = 'idle';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;

    api.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        if (error?.response?.status === 401) {
          this.unauthenticate();
        }
        return error;
      },
    );

    if (Cookies.get('reacttsboilerplate.token')?.length) this.getMe();
  }

  get isAuthenticated() {
    return !!Cookies.get('reacttsboilerplate.token')?.length && !!this.user?.id;
  }

  authenticate = async (payload: {
    email: string;
    password: string;
  }): Promise<StoreActionResponse> => {
    try {
      this.authenticateStatus = 'fetching';

      const { email, password } = payload;

      const response = await api.post('/auth/login', { email, password });

      const { status, data } = response as Omit<AxiosResponse, 'data'> & {
        data: {
          access_token: string;
          user: User;
        };
      };

      if (status !== 200 || !data?.access_token || !data?.user) {
        this.authenticateStatus = 'error';

        return {
          status: response?.status || 400,
        };
      }

      Cookies.set('reacttsboilerplate.token', data.access_token, {
        expires: 7,
      });

      api.defaults.headers.common['Authorization'] = data.access_token;

      this.user = data.user;
      this.authenticateStatus = 'success';

      return { status };
    } catch (error) {
      console.warn(error);

      this.authenticateStatus = 'error';

      return {
        status: 400,
      };
    }
  };

  getMe = async (): Promise<StoreActionResponse> => {
    try {
      this.getMeStatus = 'fetching';

      const response = await api.get('/auth/me');

      const { status, data } = response as Omit<AxiosResponse, 'data'> & {
        data: User;
      };

      if (status !== 200 || !data) {
        this.getMeStatus = 'error';

        return {
          status: response?.status || 400,
        };
      }

      this.user = data;
      this.getMeStatus = 'success';

      return { status };
    } catch (error) {
      console.warn(error);

      this.getMeStatus = 'error';

      return {
        status: 400,
      };
    }
  };

  unauthenticate() {
    api.defaults.headers.common['Authorization'] = '';
    Cookies.remove('reacttsboilerplate.token');
    this.user = null;
  }
}
