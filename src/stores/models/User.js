import { makeObservable, observable } from 'mobx';

export default class User {
  id = null;
  name = null;
  email = null;
  image = null;

  constructor(newUser) {
    makeObservable(this, {
      id: observable,
      name: observable,
      email: observable,
      image: observable,
    });

    if (newUser == null || newUser.id == null) {
      throw new Error('Invalid user constructor');
    }

    const { id, name, email, image } = newUser;

    this.id = id;
    this.name = name || '';
    this.email = email || '';
    this.image = image || '';
  }

  static fromApi({ id, name, email, image } = {}) {
    return new User({
      id,
      name,
      email,
      image,
    });
  }
}
