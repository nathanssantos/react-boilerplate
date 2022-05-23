import { makeAutoObservable } from 'mobx';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import type { AxiosResponse } from 'axios';
import RootStore from './rootStore';
import api from '../services/api';

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

  setStatus = (
    name: 'authenticateStatus' | 'getMeStatus',
    status: FetchStatus,
  ) => {
    this[name] = status;
  };

  authenticate = async (payload: {
    email: string;
    password: string;
  }): Promise<StoreActionResponse> => {
    try {
      this.setStatus('authenticateStatus', 'fetching');

      const { email, password } = payload;

      const response = await api.post('/users/nathanssantos', {
        email,
        password,
      });

      const { status, data } = response as Omit<AxiosResponse, 'data'> & {
        data: {
          access_token: string;
          user: User;
        };
      };

      if (status !== 200 || !data?.access_token || !data?.user) {
        this.setStatus('authenticateStatus', 'error');

        return {
          status: response?.status || 400,
        };
      }

      Cookies.set('reacttsboilerplate.token', data.access_token, {
        expires: 7,
      });

      api.defaults.headers.common['Authorization'] = data.access_token;

      this.user = data.user;
      this.setStatus('authenticateStatus', 'success');

      return { status };
    } catch (error) {
      console.warn(error);

      this.setStatus('authenticateStatus', 'error');

      return {
        status: 400,
      };
    }
  };

  getMe = async (): Promise<StoreActionResponse> => {
    try {
      this.setStatus('getMeStatus', 'fetching');

      const response = await api.get('/users/nathanssantos');

      const { status, data } = response as Omit<AxiosResponse, 'data'> & {
        data: User;
      };

      if (status !== 200 || !data) {
        this.setStatus('getMeStatus', 'error');

        return {
          status: response?.status || 400,
        };
      }

      this.user = data;
      this.setStatus('getMeStatus', 'success');

      return { status };
    } catch (error) {
      console.warn(error);

      this.setStatus('getMeStatus', 'error');

      return {
        status: 400,
      };
    }
  };

  unauthenticate = () => {
    api.defaults.headers.common['Authorization'] = '';
    Cookies.remove('reacttsboilerplate.token');
    this.reset();
  };

  reset = () => {
    this.user = null;
    this.authenticateStatus = 'idle';
    this.getMeStatus = 'idle';
  };
}
