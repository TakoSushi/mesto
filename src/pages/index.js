import './index.css';
import initialCards from '../components/initialCard.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import {
  popupProfile,
  inputProfileName,
  inputProfileProfession,
  buttonOpenEditProfilePopup,
  popupAddNewCard,
  inputImageName,
  inputImageUrl,
  buttonOpenPopupCard,
  popupShowLargeImage,
  photoGrid,
  userInfoSelectors,
  popupWithImageSelectors,
  cardSelectors,
  config,
} from '../utils/constants.js';


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
      
        photoGridRender.addItem(card.getCard(), false);
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

    photoGridRender.addItem(cardElement, true);
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
  popupWithProfile.setInputValues(userData.nameValue, userData.professionValue);
  popupWithProfileValidate.clearInputElements();
  popupWithProfileValidate.setButtonSubmitDisabled();

  popupWithProfile.open();
});

buttonOpenPopupCard.addEventListener('click', () => {
  popupWithImageValidate.clearInputElements();
  popupWithImageValidate.setButtonSubmitDisabled();
  popupWithCardAdd.open();
});

const popupWithProfileValidate = new FormValidator(config, popupProfile)
popupWithProfileValidate.enableValidation();

const popupWithImageValidate = new FormValidator (config, popupAddNewCard);
popupWithImageValidate.enableValidation();