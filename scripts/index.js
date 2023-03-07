import initialCards from './initialCard.js';
import Card from './Card.js';
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
      buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button'),

const inputImageName = document.querySelector('.popup__input-data_img-name'),
      inputImageUrl = document.querySelector('.popup__input-data_img-url'),
      buttonOpenPopupCard = document.querySelector('.profile__add-button'),

const photoGrid = document.querySelector('.photo-grid__list'),
      largeImage = document.querySelector('.popup__full-img'),
      titleLargeImage = document.querySelector('.popup__title-full-img');

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

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeydownEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeydownEscape);
  profileEditForm.clearInputElements();
  newCardAddForm.clearInputElements();
}

function closePopupKeydownEscape (event) {
  if(event.code === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);  
  }
}

function renderLargeImage({name, link}, cardTitleName) {
    largeImage.src = link;
    largeImage.alt = name;
    titleLargeImage.textContent = cardTitleName.textContent;
}

photoGrid.append(...initialCards.map((item) => {
  const card = new Card (
    item,
    {
    renderLargeImageHandler: renderLargeImage,
    openPopupHandler: openPopup,
    },
    cardSelectors,
    popupShowLargeImage);

  return card.getCard();
}));

buttonsClosePopups.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('mousedown', (event) => {
    if (event.target === event.currentTarget) closePopup(popup);
  });

});

buttonOpenEditProfilePopup.addEventListener('click', () => {
  inputProfileName.value = titleProfileName.textContent;
  inputProfileProfession.value = titleProfileProfession.textContent;

  profileEditForm.setButtonSubmitDisabled();
  openPopup(popupProfile);
});

buttonOpenPopupCard.addEventListener('click', () => {
  newCardAddForm.setButtonSubmitDisabled();
  openPopup(popupAddNewCard);
}); 

function handleformEditProfileSubmit (event) {
  event.preventDefault();

  titleProfileName.textContent = inputProfileName.value;
  titleProfileProfession.textContent = inputProfileProfession.value;

  closePopup(popupProfile);
}

function handleCardFormSubmit (event) {
  event.preventDefault();

  const card = new Card (
    {
      name: inputImageName.value,
      link: inputImageUrl.value,
    },
    {
      renderLargeImageHandler: renderLargeImage,
      openPopupHandler: openPopup,
    },
      cardSelectors,
      popupShowLargeImage);

  photoGrid.prepend(card.getCard());

  closePopup(popupAddNewCard);

  event.target.reset();
}

formEditProfile.addEventListener('submit', handleformEditProfileSubmit);
formAddNewCard.addEventListener('submit', handleCardFormSubmit);

const profileEditForm = new FormValidator(config, '.popup_user-input')
profileEditForm.enableValidation();

const newCardAddForm = new FormValidator (config, '.popup_item-input');
newCardAddForm.enableValidation();