import { UserData } from './types';

class Store {
  static setUserData(user: UserData | null) {
    if (user === null) localStorage.removeItem('loginData');
    else localStorage.setItem('loginData', JSON.stringify(user));
  }

  static checkUserData() {
    return localStorage.getItem('loginData');
  }

  static getUserData() {
    return JSON.parse(localStorage.getItem('loginData') || '[]');
  }
}

export default Store;
