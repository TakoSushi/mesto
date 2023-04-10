import './index.css';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  popupProfile,
  inputProfileName,
  inputProfileProfession,
  buttonOpenEditProfilePopup,
  popupAddNewCard,
  inputImageName,
  inputImageUrl,
  buttonOpenPopupCard,
  popupUpdateAvatar,
  buttonOpenUpdateAvatar,
  popupShowLargeImage,
  userInfoSelectors,
  popupWithImageSelectors,
  cardSelectors,
  config,
} from '../utils/constants.js';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'a403427d-ff14-4a62-bf09-33c59e30bcff',
    'Content-Type': 'application/json'
  }
});

const userInfo = new UserInfo (userInfoSelectors);

const popupWithProfile = new PopupWithForm (
  '.popup_user-input',
  { 
    handleFormSubmit: (newUserData) => {
    api.setUserInfo({
        name: newUserData[inputProfileName.name],
        about: newUserData[inputProfileProfession.name]
    })
    .then((userData) => {
      userInfo.setUserInfo({
        'user-name': userData.name,
        'user-profession': userData.about
      })
    })
    .then( () => popupWithProfile.close())
    .catch(err => console.warn(err))
    .finally( () => popupWithProfile.loadingRender(false) );
    },
    currentFormName: 'user-data',
    inputsSelector: '.popup__input-data',
    buttonSelector: '.popup__button-save'
  }
);

popupWithProfile.setEventListeners({closeBtnSelector: '.popup__close'});

const popupWithDeleteConfirm = new PopupWithConfirm (
  '.popup_delete-confirm',
  { 
    handleConfirm: (deleteData) => {
      api.deleteCard(deleteData.cardId)
      .then(messege => {
        deleteData.deleteCard();
        console.log(messege);
      })
      .then( () => popupWithDeleteConfirm.close())
      .catch(err => console.log(err)); 
    },
    currentFormName: 'delete-confirm',
    buttonSelector: '.popup__button-save'
  }
);

popupWithDeleteConfirm.setEventListeners({closeBtnSelector: '.popup__close'});

function createCard(item, userId) {

  const card = new Card(
    item,
    userId,
    { 
      renderPopupWithImage: ({name, link}) => {
        popupWithImage.open({name, link})
      },
      renderPopupWithForm: ( (deleteData) => {
        popupWithDeleteConfirm.open();
        popupWithDeleteConfirm.getCardId(deleteData);
      }),
      likeCard: (cardId, setLikes) => {
        api.likeCard(cardId)
        .then( (cardData) => { setLikes(cardData.likes) })
        .catch( (err) => console.log(err) );
      },
      dislikeCard: (cardId, setLikes) => {
        api.dislikeCard(cardId)
        .then( (cardData) => { setLikes(cardData.likes) })
        .catch( (err) => console.log(err) );
      }
    },
    cardSelectors,
    popupShowLargeImage
  );

  const cardElement = card.getCard();
  return cardElement;
}

const popupWithCardAdd = new PopupWithForm (
  '.popup_item-input',
  {
    handleFormSubmit: (newCardData) => {
      const item = {
        name: newCardData[inputImageName.name],
        link: newCardData[inputImageUrl.name]
      };

      const userId = userInfo.getUserId();

      api.addNewCard(item)
      .then((newCardData) => {
        
      const newCard = createCard(newCardData, userId);

      photoGridRender.addItem(newCard, false);
      })
      .then( () => popupWithCardAdd.close())
      .catch(err => console.warn(err))
      .finally( () => popupWithCardAdd.loadingRender(false) );
    },
    currentFormName: 'new-card',
    inputsSelector: '.popup__input-data',
    buttonSelector: '.popup__button-save'
  }
);

popupWithCardAdd.setEventListeners({closeBtnSelector: '.popup__close'});

const popupWithUpdateAvatar = new PopupWithForm (
  '.popup_update-avatar',
  {
    handleFormSubmit: (avatarUrl) => {
      api.setUserAvatar({avatar: avatarUrl['avatar-url']})
      .then( userData => userInfo.setUserAvatar(userData.avatar))
      .then( () => popupWithUpdateAvatar.close())
      .catch(err => console.warn(err))
      .finally( () => popupWithUpdateAvatar.loadingRender(false) );
    },
    currentFormName: 'update-avatar',
    inputsSelector: '.popup__input-data',
    buttonSelector: '.popup__button-save'
  }
);

popupWithUpdateAvatar.setEventListeners({closeBtnSelector: '.popup__close'});

const popupWithImage = new PopupWithImage ('.popup_img-large', popupWithImageSelectors);

popupWithImage.setEventListeners('.popup__close');

const photoGridRender = new Section({
  renderer: (item, userId) => {
    const newCard = createCard(item, userId);
    
    photoGridRender.addItem(newCard, true);
  },
}, '.photo-grid__list');

Promise.all([api.getInitialCards(), api.getUserInfo()])
.then(res => {
  const initialCards = res[0];
  const userData = res[1];
  
  photoGridRender.renderItems(initialCards, userData._id);

  userInfo.setUserInfo({
    'user-name': userData.name,
    'user-profession': userData.about,
    userId: userData._id
  });

  userInfo.setUserAvatar(userData.avatar);
})
.catch((err) => console.warn(err));

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

buttonOpenUpdateAvatar.addEventListener('click', () => {
  popupWithUpdateAvatarValidate.clearInputElements();
  popupWithUpdateAvatarValidate.setButtonSubmitDisabled();
  
  popupWithUpdateAvatar.open();
});

const popupWithProfileValidate = new FormValidator(config, popupProfile)
popupWithProfileValidate.enableValidation();

const popupWithImageValidate = new FormValidator (config, popupAddNewCard);
popupWithImageValidate.enableValidation();

const popupWithUpdateAvatarValidate = new FormValidator(config, popupUpdateAvatar)
popupWithUpdateAvatarValidate.enableValidation();