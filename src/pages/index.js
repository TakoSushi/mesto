import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import FormValidator from '../components/FormValidator.js';
import {initialCards,
  popupProfile,
  inputProfileName,
  inputProfileProfession,
  buttonOpenEditProfilePopup,
  popupAddNewCard,
  inputImageName,
  inputImageUrl,
  buttonOpenPopupCard,
  popupShowLargeImage,
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
    userInfo.setUserInfo(newUserData)
    },
    currentFormName: 'user-data',
    inputsSelector: '.popup__input-data'
  }
);

popupWithProfile.setEventListeners({closeBtnSelector: '.popup__close'});

function createCard(item) {
  const card = new Card(
    item,
    { renderPopupWithImage: handleCardClick },
    cardSelectors,
    popupShowLargeImage,
  );

  const cardElement = card.getCard();
  return cardElement;
}

const popupWithCardAdd = new PopupWithForm (
  '.popup_item-input',
  {
    handleFormSubmit: (newUserData) => {
      const item = {
        name: newUserData[inputImageName.name],
        link: newUserData[inputImageUrl.name]
      }
      const newCard = createCard(item);

      photoGridRender.addItem(newCard, false);
    },
    currentFormName: 'new-card',
    inputsSelector: '.popup__input-data'
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
    const newCard = createCard(item);

    photoGridRender.addItem(newCard, true);
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
  popupWithProfile.setInputValues(userData);
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