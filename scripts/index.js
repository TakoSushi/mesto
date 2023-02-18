const popupsList = document.querySelectorAll('.popup'),
      popupProfile = document.querySelector('.popup_user-input'),
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
      buttonSubmitPopupProfile = popupProfile.querySelector('.popup__button-save');

const inputImageName = document.querySelector('.popup__input-data_img-name'),
      inputImageUrl = document.querySelector('.popup__input-data_img-url'),
      buttonOpenPopupCard = document.querySelector('.profile__add-button');
      buttonSubmitAddPopupNewCard = popupAddNewCard.querySelector('.popup__button-save');

const cardTemplate = document.querySelector('.card-template'),
      photoGrid = document.querySelector('.photo-grid__list'),
      largeImage = document.querySelector('.popup__full-img'),
      titleLargeImage = document.querySelector('.popup__title-full-img');

const validatePreferens = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input-data',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-data_error',
  errorClass: 'popup__error-message_visible',
};

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupKeydownEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupKeydownEscape);
  clearInputElements(popup, validatePreferens);
}

function closePopupKeydownEscape (event) {
  if(event.code === 'Escape') {
    popupsList.forEach(popup => {
      if (popup.classList.contains('popup_opened')){
        closePopup(popup);
      }
    });
  }
}

function renderLargeImage({name, link}, cardTitleName) {
    largeImage.src = link;
    largeImage.alt = name;
    titleLargeImage.textContent = cardTitleName.textContent;
}

function renderCard (item) {
  const card = cardTemplate.content.cloneNode(true),
        cardImage = card.querySelector('.photo-grid__img'),
        cardTitleName = card.querySelector('.photo-grid__title-name'),
        cardTrashButton = card.querySelector('.photo-grid__trash-button'),
        cardLikeButton = card.querySelector('.photo-grid__heart');

  cardImage.style.backgroundImage = `url('${item.link}')`;
  cardTitleName.textContent = item.name;

  cardImage.addEventListener('click', () => {
    renderLargeImage(item, cardTitleName);
    openPopup(popupShowLargeImage);
  });

  cardLikeButton.addEventListener('click', function (event) {
    event.target.classList.toggle('photo-grid__heart_active');
  });

  cardTrashButton.addEventListener('click', function (event) {
    event.stopPropagation();
    event.target.closest('.photo-grid__card').remove();
  });

  return card;
}

photoGrid.append(...initialCards.map(renderCard));

buttonsClosePopups.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closePopup(popup);
  });

});

buttonOpenEditProfilePopup.addEventListener('click', function() {
  inputProfileName.value = titleProfileName.textContent;
  inputProfileProfession.value = titleProfileProfession.textContent;

  setButtonSubmitDisabled(buttonSubmitPopupProfile, 'popup__button-save_disabled');
  openPopup(popupProfile);
});

buttonOpenPopupCard.addEventListener('click', function() {
  setButtonSubmitDisabled(buttonSubmitAddPopupNewCard, 'popup__button-save_disabled');
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

  const card = {};
  card.name = inputImageName.value;
  card.link = inputImageUrl.value;

  photoGrid.prepend(renderCard (card));

  closePopup(popupAddNewCard);

  event.target.reset();
}

formEditProfile.addEventListener('submit', handleformEditProfileSubmit);
formAddNewCard.addEventListener('submit', handleCardFormSubmit);

enableValidation(validatePreferens);
