import { BaseComponent } from '../components/baseComponent';
import store from '../store/store';
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
  let result = true;
  if (lastNameInput.checkSiblings()) {
    lastNameInput.addClass('loginForm_input-invalid');
    result = false;
  } else lastNameInput.removeClass('loginForm_input-invalid');
  if (firstNameInput.checkSiblings()) {
    firstNameInput.addClass('loginForm_input-invalid');
    result = false;
  } else firstNameInput.removeClass('loginForm_input-invalid');
  return result;
}
function checkValues(value: string, child: BaseComponent, length: number) {
  const upperFirst = /^[A-Z]{1}/gm;
  const justLetter = /^[a-zA-Z-]+$/gm;
  if (!value.match(upperFirst))
    child.after(
      new BaseComponent({ tag: 'div', textContent: 'First letter must be in uppercase', className: 'loginForm_info' })
    );
  if (!value.match(justLetter))
    child.after(
      new BaseComponent({
        tag: 'div',
        textContent: 'Please enter just English alphabet letters and the hyphen ("-") symbol',
        className: 'loginForm_info'
      })
    );
  if (value.length < length)
    child.after(
      new BaseComponent({
        tag: 'div',
        textContent: `Please enter minimum of ${length} characters`,
        className: 'loginForm_info'
      })
    );
}

function checkInputs() {
  const lName = document.getElementById('lname');
  const fName = document.getElementById('fname');
  firstNameInput.removeSiblings();
  lastNameInput.removeSiblings();
  let lNameValue = '';
  let fNameValue = '';
  if (lName instanceof HTMLInputElement) {
    lNameValue = lName.value;
    checkValues(lNameValue, lastNameInput, 4);
  }
  if (fName instanceof HTMLInputElement) {
    fNameValue = fName.value;
    checkValues(fNameValue, firstNameInput, 3);
  }
  if (markInvalidInput()) store.setUserData({ firstName: fNameValue, lastName: lNameValue });
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
