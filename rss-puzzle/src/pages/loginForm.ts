import { BaseComponent } from '../components/baseComponent';
import './loginForm.css';

export const loginForm = () => {
  const btn = new BaseComponent({ tag: 'button', textContent: 'Login', className: 'loginForm_button' });
  const firstNameInput = new BaseComponent({
    tag: 'input',
    type: 'text',
    id: 'fname',
    required: '1',
    className: 'loginForm_input'
  });
  const lastNameInput = new BaseComponent({
    tag: 'input',
    type: 'text',
    id: 'lname',
    required: '1',
    className: 'loginForm_input'
  });
  return new BaseComponent(
    { tag: 'form', className: 'loginForm_wrapper' },
    new BaseComponent({ tag: 'h1', textContent: 'Please enter your name!', className: 'loginForm_header' }),
    new BaseComponent(
      { tag: 'div', className: 'loginForm_FirstName' },
      new BaseComponent({ tag: 'label', textContent: 'First name:', className: 'loginForm_label' }),
      firstNameInput
    ),
    new BaseComponent(
      { tag: 'div', className: 'loginForm_Surname' },
      new BaseComponent({ tag: 'label', textContent: 'Surname:', className: 'loginForm_label' }),
      lastNameInput
    ),
    btn
  );
};
export default loginForm;
