class FormValidator {
  constructor(config, currentFormSelector){
    this._inputSelector = config.inputSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._errorMessageSelector = config.errorMessageSelector; 
    this._currentForm = document.querySelector(currentFormSelector);
    this._formInputs = Array.from(this._currentForm.querySelectorAll(this._inputSelector));
    this._buttonElement = this._currentForm.querySelector(config.submitButtonSelector);
  }

  _showInputError(inputElement, errorElement, errorMessage) {
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement, errorElement) {
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._inputErrorClass);
  }

  _isValid(inputElement, errorElement) {
    if (!inputElement.validity.valid){
      const errorMessage = inputElement.validationMessage;
      this._showInputError(inputElement, errorElement, errorMessage);
    } else {
      this._hideInputError(inputElement, errorElement);
    }
  }

  _hasInvalidInput() {
    return this._formInputs.some( (inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  setButtonSubmitDisabled() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', 'disabled');
  }

  _focusHandler({target}) {
    target.select();
  }

  clearInputElements() {
    this._formInputs.forEach((inputElement) => {
      const errorField = this._currentForm.querySelector(`${this._inputSelector}_${inputElement.name} + ${this._errorMessageSelector}`);
  
      this._hideInputError(inputElement, errorField);
    });
  }

  _toogleButtonSelector() {
    if (this._hasInvalidInput()){
      this.setButtonSubmitDisabled();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    }
  }

  _setEventListeners() {
    this._formInputs.forEach( (inputElement) => {

      const errorField = this._currentForm.querySelector(`${this._inputSelector}_${inputElement.name} + ${this._errorMessageSelector}`);
  
      inputElement.addEventListener('input', (e) => {
        const inputField = e.target;
  
        this._isValid(inputField, errorField);
  
        this._toogleButtonSelector();
      });
  
      inputElement.addEventListener('focus', this._focusHandler);
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export default FormValidator;