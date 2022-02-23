import AuthStore from './AuthStore';

export default class RootStore {
  /** @type {import('./AuthStore').default} */
  authStore = null;

  init() {
    this.authStore = new AuthStore();
  }
}
