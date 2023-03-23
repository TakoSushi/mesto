import balmoralCastleBallaterUK from '../images/Balmoral_Castle_Ballater_UK.jpg';
import kyotoJapan from '../images/Kyoto_Japan.jpg';
import oneVanderbiltNewYork from '../images/One_Vanderbilt_New-York_US.jpg';
import sanFrancisco from '../images/San-Francisco.jpg';
import santoriniGreece from '../images/Santorini_Greece.jpg';
import tokyoTower from '../images/Tokyo_Tower.jpg';

export const initialCards = [
  {
    name: 'Шотландские горы',
    link: balmoralCastleBallaterUK
  },
  {
    name: 'Бамбуковый лес',
    link: kyotoJapan
  },
  {
    name: 'Небоскреб Уан-Вандербильт',
    link: oneVanderbiltNewYork
  },
  {
    name: 'Сан-Франциско',
    link: sanFrancisco
  },
  {
    name: 'Санторини',
    link: santoriniGreece
  },
  {
    name: 'Башня Токио',
    link: tokyoTower
  }
];

export const popupProfile = document.querySelector('.popup_user-input'),
      inputProfileName = document.querySelector('.popup__input-data_user-name'),
      inputProfileProfession = document.querySelector('.popup__input-data_user-profession'),
      buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');

export const popupAddNewCard = document.querySelector('.popup_item-input'),
      inputImageName = document.querySelector('.popup__input-data_img-name'),
      inputImageUrl = document.querySelector('.popup__input-data_img-url'),
      buttonOpenPopupCard = document.querySelector('.profile__add-button');
      
export const popupShowLargeImage = document.querySelector('.popup_img-large');

export const userInfoSelectors = {
      userName: '.profile__name',
      userProfession: '.profile__profession',
};

export const popupWithImageSelectors = {
      imagePopupWithImage: '.popup__full-img',
      titlePopupWithImage: '.popup__title-full-img',
};

export const config = {
  inputSelector: '.popup__input-data',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-data_error',
  errorClass: 'popup__error-message_visible',
  errorMessageSelector: '.popup__error-message',
};

export const cardSelectors = {
  cardImage: '.photo-grid__img',
  cardTitleName: '.photo-grid__title-name',
  cardTrashButton: '.photo-grid__trash-button',
  cardLikeButton: '.photo-grid__heart',
  cardTemplate: '.card-template',
  photoGridCard: '.photo-grid__card',
  cardLikeButtonActive: 'photo-grid__heart_active',
}
