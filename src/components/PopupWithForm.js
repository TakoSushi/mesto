import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, {handleFormSubmit, currentFormName, inputsSelector, buttonSelector}) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
    this._handleFormSubmit = this._handleFormSubmit.bind(this);

    this._form = document.forms[currentFormName];
    this._inputList = this._form.querySelectorAll(inputsSelector);
    this._saveButton = this._form.querySelector(buttonSelector);
    this._saveButtonText = this._saveButton.textContent;
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

  loadingRender(isLoading) {
    if(isLoading) {
      this._saveButton.textContent = 'Сохранение...';
    } else {
      this._saveButton.textContent = this._saveButtonText;
    }
  }

  setEventListeners({closeBtnSelector}) {
    super.setEventListeners(closeBtnSelector);

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
      this.loadingRender(true);

      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}