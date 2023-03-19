import initialCards from './initialCard.js';
import Card from './Card.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';
import FormValidator from './FormValidator.js';


const popupProfile = document.querySelector('.popup_user-input'),
      popupAddNewCard = document.querySelector('.popup_item-input'),
      popupShowLargeImage = document.querySelector('.popup_img-large'),
      formEditProfile = document.forms['user-data'],
      formAddNewCard = document.forms['new-card'],
      buttonsClosePopups = document.querySelectorAll('.popup__close');

const inputProfileName = document.querySelector('.popup__input-data_user-name'),
      inputProfileProfession = document.querySelector('.popup__input-data_user-profession'),
      titleProfileName = document.querySelector('.profile__name'),
      titleProfileProfession = document.querySelector('.profile__profession'),
      buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');

const inputImageName = document.querySelector('.popup__input-data_img-name'),
      inputImageUrl = document.querySelector('.popup__input-data_img-url'),
      buttonOpenPopupCard = document.querySelector('.profile__add-button');

const photoGrid = document.querySelector('.photo-grid__list');
      
const userInfoSelectors = {
      userName: '.profile__name',
      userProfession: '.profile__profession',
};

const popupWithImageSelectors = {
      imagePopupWithImage: '.popup__full-img',
      titlePopupWithImage: '.popup__title-full-img',
};

const config = {
  inputSelector: '.popup__input-data',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-data_error',
  errorClass: 'popup__error-message_visible',
  errorMessageSelector: '.popup__error-message',
};

const cardSelectors = {
  cardImage: '.photo-grid__img',
  cardTitleName: '.photo-grid__title-name',
  cardTrashButton: '.photo-grid__trash-button',
  cardLikeButton: '.photo-grid__heart',
  cardTemplate: '.card-template',
  photoGridCard: '.photo-grid__card',
  cardLikeButtonActive: 'photo-grid__heart_active',
}

const userInfo = new UserInfo (userInfoSelectors);

const popupWithProfile = new PopupWithForm (
  '.popup_user-input',
  { 
    handleFormSubmit: (newUserData) => {
    userInfo.setUserInfo(newUserData.firstInputValue, newUserData.secondInputValue)
    },
    currentFormName: 'user-data',
    firstInput: '.popup__input-data_user-name',
    secondInput: '.popup__input-data_user-profession',
  }
);

popupWithProfile.setEventListeners({closeBtnSelector: '.popup__close'});

const popupWithCardAdd = new PopupWithForm (
  '.popup_item-input',
  {
    handleFormSubmit: (newCardData) => {
      const card = new Card (
        {
          name: newCardData.firstInputValue,
          link: newCardData.secondInputValue,
        },
        { renderPopupWithImage: handleCardClick },
        cardSelectors,
        popupShowLargeImage);
    
      photoGrid.prepend(card.getCard());
    },
    currentFormName: 'new-card',
    firstInput: '.popup__input-data_img-name',
    secondInput: '.popup__input-data_img-url',
  }
);

popupWithCardAdd.setEventListeners({closeBtnSelector: '.popup__close'});

const popupWithImage = new PopupWithImage ('.popup_img-large', popupWithImageSelectors);
popupWithImage.setEventListeners('.popup__close');

function handleCardClick({name, link}) {
  popupWithImage.open({name, link});
}

const photoGridRender = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card (
      item,
      { renderPopupWithImage: handleCardClick },
      cardSelectors,
      popupShowLargeImage,
    );

    const cardElement = card.getCard();

    photoGridRender.addItem(cardElement);
  },
}, '.photo-grid__list');

photoGridRender.renderItems();
    
function addFocusHandler(...inputs) {
  inputs.forEach((input) => {
    input.addEventListener('focus', (event) => {
      event.target.select();
    });
  });
}

addFocusHandler(inputProfileName, inputProfileProfession, inputImageName, inputImageUrl);

buttonOpenEditProfilePopup.addEventListener('click', () => {
  const userData = userInfo.getUserInfo();
  inputProfileName.value = userData.nameValue;
  inputProfileProfession.value = userData.professionValue;

  profileEditForm.clearInputElements();
  profileEditForm.setButtonSubmitDisabled();

  popupWithProfile.open();
});

buttonOpenPopupCard.addEventListener('click', () => {
  newCardAddForm.clearInputElements();
  newCardAddForm.setButtonSubmitDisabled();
  popupWithCardAdd.open();
});

const profileEditForm = new FormValidator(config, popupProfile)
profileEditForm.enableValidation();

const newCardAddForm = new FormValidator (config, popupAddNewCard);
newCardAddForm.enableValidation();