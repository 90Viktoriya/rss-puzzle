import { UserData } from './types';

class Store {
  static setUserData(user: UserData) {
    localStorage.setItem('loginData', JSON.stringify(user));
  }

  static getUserData() {
    JSON.parse(localStorage.getItem('loginData') || '[]');
  }
}

export default Store;
