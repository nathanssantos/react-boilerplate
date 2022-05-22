import AuthStore from './authStore';

export default class RootStore {
  authStore = {} as AuthStore;

  constructor() {
    this.authStore = new AuthStore(this);
  }
}
