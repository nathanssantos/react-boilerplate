import { makeObservable, observable } from 'mobx';

/**
 * @typedef UserConstructor
 * @property {number} id
 * @property {string} [name]
 * @property {string} [email]
 */
export default class User {
  /**
   * @type {number}
   */
  id = null;

  /**
   * @type {?string}
   */
  name = null;

  /**
   * @type {?string}
   */
  email = null;

  /**
   * @param {UserConstructor} newUser
   * @throws {Error}
   * @memberof User
   */
  constructor(newUser) {
    makeObservable(this, {
      id: observable,
      name: observable,
      email: observable,
    });

    if (newUser == null || newUser.id == null) {
      throw new Error('Invalid user constructor');
    }

    const { id, name, email } = newUser;

    this.id = id;
    this.name = name || '';
    this.email = email || '';
  }
}
