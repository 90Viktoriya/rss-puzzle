import { BaseComponent } from '../components/baseComponent';
import './loginForm.css';

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
function markInvalidInput() {
  if (lastNameInput.checkSiblings()) lastNameInput.addClass('loginForm_input-invalid');
  else lastNameInput.removeClass('loginForm_input-invalid');
  if (firstNameInput.checkSiblings()) firstNameInput.addClass('loginForm_input-invalid');
  else firstNameInput.removeClass('loginForm_input-invalid');
}

function checkInputs() {
  const lName = document.getElementById('lname');
  const fName = document.getElementById('fname');
  firstNameInput.removeSiblings();
  lastNameInput.removeSiblings();
  const upperFirst = /^[A-Z]{1}/gm;
  const justLetter = /^[a-zA-Z-]+$/gm;
  if (lName instanceof HTMLInputElement) {
    if (!lName.value.match(upperFirst))
      lastNameInput.after(
        new BaseComponent({ tag: 'div', textContent: 'First letter must be in uppercase', className: 'loginForm_info' })
      );
    if (!lName.value.match(justLetter))
      lastNameInput.after(
        new BaseComponent({
          tag: 'div',
          textContent: 'Please enter just English alphabet letters and the hyphen ("-") symbol',
          className: 'loginForm_info'
        })
      );
    if (lName.value.length < 4)
      lastNameInput.after(
        new BaseComponent({
          tag: 'div',
          textContent: 'Please enter minimum of 4 characters',
          className: 'loginForm_info'
        })
      );
  }
  if (fName instanceof HTMLInputElement) {
    if (!fName.value.match(upperFirst))
      firstNameInput.after(
        new BaseComponent({ tag: 'div', textContent: 'First letter must be in uppercase', className: 'loginForm_info' })
      );
    if (!fName.value.match(justLetter))
      firstNameInput.after(
        new BaseComponent({
          tag: 'div',
          textContent: 'Please enter just English alphabet letters and the hyphen ("-") symbol',
          className: 'loginForm_info'
        })
      );
    if (fName.value.length < 3)
      firstNameInput.after(
        new BaseComponent({
          tag: 'div',
          textContent: 'Please enter minimum of 3 characters',
          className: 'loginForm_info'
        })
      );
  }
  markInvalidInput();
}
const btn = new BaseComponent({
  tag: 'div',
  textContent: 'Login',
  className: 'loginForm_button',
  onclick: () => {
    checkInputs();
  }
});
export const loginForm = () =>
  new BaseComponent(
    { tag: 'form', className: 'loginForm_wrapper' },
    new BaseComponent({ tag: 'h1', textContent: 'Please enter your name!', className: 'loginForm_header' }),
    new BaseComponent(
      { tag: 'div', className: 'loginForm_FirstName' },
      new BaseComponent({ tag: 'label', textContent: 'First name:', className: 'loginForm_label' }),
      new BaseComponent({ tag: 'div', className: 'loginForm_inputWrapper' }, firstNameInput)
    ),
    new BaseComponent(
      { tag: 'div', className: 'loginForm_Surname' },
      new BaseComponent({ tag: 'label', textContent: 'Surname:', className: 'loginForm_label' }),
      new BaseComponent({ tag: 'div', className: 'loginForm_inputWrapper' }, lastNameInput)
    ),
    btn
  );
export default loginForm;
