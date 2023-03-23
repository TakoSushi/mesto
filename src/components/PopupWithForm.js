import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit, currentFormName, inputsSelector}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._form = document.forms[currentFormName];
    this._inputList = this._form.querySelectorAll(inputsSelector);
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach( (input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(userData) {
    this._inputList.forEach((input) => {
      input.value = userData[input.name];
    });
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