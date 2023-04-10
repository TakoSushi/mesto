import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(selector, {handleConfirm, currentFormName}) {
    super(selector);
    this._handleConfirm = handleConfirm;

    this._form = document.forms[currentFormName];
  }

  setEventListeners({closeBtnSelector}) {
    super.setEventListeners(closeBtnSelector);

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();

      this._handleConfirm(this._deleteData);
    });
  }

  getCardId(deleteData) {
    this._deleteData = deleteData;
  }
}