import store from '../store/store';
import { BaseComponent } from '../components/baseComponent';
import './startPage.css';
import { PageType } from './types';

export const startPage = (changePage: (page: PageType) => void) =>
  new BaseComponent(
    { tag: 'form', className: 'startPage_wrapper' },
    new BaseComponent({ tag: 'h1', textContent: 'Welcome!', className: 'startPage_header' }),
    new BaseComponent({
      tag: 'div',
      textContent: 'Logout',
      className: 'startPage_button-logout',
      onclick: () => {
        store.setUserData(null);
        changePage('login');
      }
    })
  );
export default startPage;
