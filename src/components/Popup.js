export default class Popup {
  constructor(selector){
    this._popup = document.querySelector(selector);

    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(event) {
    if(event.code === 'Escape') {
      this.close();
    }
  }

  setEventListeners(closeBtnSelector) {
    const closeBtn = this._popup.querySelector(closeBtnSelector);
    
    closeBtn.addEventListener('click', () => {
      this.close();
    });

    this._popup.addEventListener('mousedown', (event) => {
      if(event.target === event.currentTarget) {
          this.close();
      }
    })
  }
}