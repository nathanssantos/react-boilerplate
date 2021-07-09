import AuthStore from './authStore';

export default class RootStore {
  authStore = null;
  init() {
    this.authStore = new AuthStore();
  }
}
