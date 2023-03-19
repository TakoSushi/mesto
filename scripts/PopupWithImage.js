import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(selector, {imagePopupWithImage, titlePopupWithImage}) {
    super(selector);
    this._image = this._popup.querySelector(imagePopupWithImage);
    this._imageTitle = this._popup.querySelector(titlePopupWithImage);
  }

  open({name, link}) {
    this._image.src = link;
    this._image.alt = name;
    this._imageTitle.textContent = name;
    
    super.open();
  }

}
