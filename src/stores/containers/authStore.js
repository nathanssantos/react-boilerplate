/* eslint-disable react-hooks/rules-of-hooks */
import { action, flow, computed, makeObservable, observable } from 'mobx';
import { getEnv } from 'mobx-easy';
import { toast } from 'react-toastify';

import { useLocalStorage } from '../../hooks';

import { User } from '../models';

import {
  SYSTEM_INSTABILITY,
  INVALID_EMAIL_OR_PASSWORD,
} from '../../constants/Messages';

export default class AuthStore {
  user = null;
  status = 'unauthenticated';

  constructor() {
    makeObservable(this, {
      user: observable,
      status: observable,

      isAuthenticated: computed,

      setUser: action.bound,
      unauthenticate: action.bound,

      authenticate: flow,
    });
  }

  get isAuthenticated() {
    return this.status === 'authenticated';
  }

  setUser(user) {
    this.user = User.fromApi(user);
  }

  unauthenticate() {
    this.status = 'unauthenticated';
    this.user = null;
    getEnv().defaults.headers.common.Authorization = null;
  }

  *authenticate(payload) {
    try {
      // const { email, password, token } = payload;
      const [, setToken] = useLocalStorage('token');

      // let response = null;
      // if (token) {
      //   response = yield getEnv().post(`/auth`, { token });
      // } else {
      //   response = yield getEnv().post(`/auth`, { email, password });
      // }

      // Mock
      const response = {
        status: 200,
        data: {
          user: {
            id: 1,
          },
          token: 'TOKEN',
        },
      };
      // End Mock

      if (response?.status === 401) {
        toast(INVALID_EMAIL_OR_PASSWORD);
        return false;
      }

      if (response?.status !== 200) {
        toast(SYSTEM_INSTABILITY);
        return false;
      }

      if (response?.data?.token && response?.data?.user) {
        const { token, user } = response.data;

        setToken(token);
        this.setUser(user);

        this.status = 'authenticated';

        return true;
      }

      this.unauthenticate();
      return false;
    } catch (error) {
      toast(SYSTEM_INSTABILITY);

      console.log('authStore authenticate ERROR:', error);

      this.unauthenticate();
      return false;
    }
  }
}
