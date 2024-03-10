import { BaseComponent } from '../components/baseComponent';
import { loginForm } from './loginForm';
import store from '../store/store';
import { startPage } from './startPage';
import { PageType } from './types';

const pageWrapper = new BaseComponent({ className: 'page_wrapper' });

function loadPage(page?: PageType) {
  pageWrapper.removeAllChild();
  if (page === 'start') pageWrapper.append(startPage(loadPage));
  if (page === 'login') pageWrapper.append(loginForm(loadPage));
}

loadPage(store.checkUserData() ? 'start' : 'login');

export default pageWrapper;
