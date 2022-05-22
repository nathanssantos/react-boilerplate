import { makeAutoObservable } from 'mobx';
import RootStore from './rootStore';
import User from '../models/User';
import api from '../../services/api';

export default class AuthStore {
  rootStore: RootStore;
  user: User | null = null;
  status: FetchStatus = 'idle';

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  get isAuthenticated() {
    return !!this.user?.id;
  }

  get isFetching() {
    return this.status === 'fetching';
  }

  authenticate = async (payload: {
    email: string;
    password: string;
  }): Promise<StoreActionResponse> => {
    try {
      const { email, password } = payload;

      this.status = 'fetching';

      const response = await api.post('/auth', { email, password });

      const { data, status } = response;

      if (status !== 200 || !data) {
        this.unauthenticate();

        return {
          status,
        };
      }

      this.user = new User(data);

      this.status = 'success';

      return { status };
    } catch (error) {
      console.warn(error);

      this.unauthenticate();

      return {
        status: 400,
      };
    }
  };

  unauthenticate() {
    this.status = 'idle';
    this.user = null;
  }
}
