import store from '../store/store';
import { BaseComponent } from '../components/baseComponent';
import './startPage.css';
import { PageType } from './types';

function getGreeting() {
  const data = store.getUserData();
  return `${data.firstName} ${data.lastName}`;
}

const greeting = () =>
  new BaseComponent(
    {
      tag: 'div',
      textContent: 'Welcome, ',
      className: 'startPage_description'
    },
    new BaseComponent({
      tag: 'span',
      textContent: getGreeting(),
      className: 'startPage_name'
    })
  );
export const startPage = (changePage: (page: PageType) => void) =>
  new BaseComponent(
    { tag: 'form', className: 'startPage_wrapper' },
    greeting(),
    new BaseComponent({ tag: 'h1', textContent: 'RSS Puzzle', className: 'startPage_header' }),
    new BaseComponent({
      tag: 'div',
      textContent: 'Logout',
      className: 'startPage_button-logout',
      onclick: () => {
        store.setUserData(null);
        changePage('login');
      }
    }),
    new BaseComponent({
      tag: 'div',
      textContent: 'RSS Puzzle is an interactive mini-game aimed at enhancing English language skills.',
      className: 'startPage_description'
    }),
    new BaseComponent({
      tag: 'div',
      textContent:
        'Assemble sentences from jumbled words. Click on words, collect phrases. Words can be drag and drop.',
      className: 'startPage_description'
    }),
    new BaseComponent({
      tag: 'div',
      textContent:
        'The game integrates various levels of difficulty, hint options, and a unique puzzle-like experience with artwork.',
      className: 'startPage_description'
    })
  );
export default startPage;
