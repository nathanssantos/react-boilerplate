import { makeAutoObservable } from 'mobx';
import { getEnv } from 'mobx-easy';

import User from '../models/User';

export default class AuthStore {
  /**
   * @type {?import('../models/User').default}
   */
  user = null;

  /**
   * @type {'pending' | 'authenticated' | 'unauthenticated'}
   */
  status = 'unauthenticated';

  constructor() {
    makeAutoObservable(this);
  }

  get isAuthenticated() {
    return this.status === 'authenticated';
  }

  get isFetching() {
    return this.status === 'pending';
  }

  authenticate = async (payload) => {
    try {
      const { email, password, mock } = payload;

      if (mock) {
        console.log({ email, password });
        this.status = 'authenticated';
        return true;
      }

      this.status = 'pending';

      const response = await getEnv().post('/auth', { email, password });

      const { data, status } = response;

      if (status !== 200 || !data) {
        this.unauthenticate();
        return {
          error: {
            status,
            // message: ""
          },
        };
      }

      this.user = new User(data);

      this.status = 'authenticated';

      return true;
    } catch (error) {
      this.unauthenticate();

      return {
        error,
      };
    }
  };

  unauthenticate() {
    this.status = 'unauthenticated';
    this.user = null;
  }
}
