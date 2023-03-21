import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit, currentFormName, firstInput, secondInput}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._form = document.forms[currentFormName];
    this._firstInput = this._form.querySelector(firstInput);
    this._secondInput = this._form.querySelector(secondInput);
  }

  _getInputValues() {
    const firstInputValue = this._firstInput.value;
    const secondInputValue = this._secondInput.value;
    return {firstInputValue, secondInputValue}
  }

  setInputValues(firstInputValue, secondInputValue) {
    this._firstInput.value = firstInputValue;
    this._secondInput.value = secondInputValue;
  }

  setEventListeners({closeBtnSelector}) {
    super.setEventListeners(closeBtnSelector);

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}