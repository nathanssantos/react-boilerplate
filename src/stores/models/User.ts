import { makeAutoObservable } from 'mobx';

export default class User {
  id: number | null = null;
  name: string | null = null;
  email: string | null = null;

  constructor(newUser: User) {
    makeAutoObservable(this);

    if (!newUser.id || typeof newUser.id !== 'number') {
      throw new Error('Invalid user constructor');
    }

    const { id, name, email } = newUser;

    this.id = id;
    this.name = name || '';
    this.email = email || '';
  }
}
