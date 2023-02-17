// import enableValidation from './validate.js'; 

const initialCards = [
  {
    name: 'Шотландские горы',
    link: './images/Balmoral_Castle_Ballater_UK.jfif'
  },
  {
    name: 'Бамбуковый лес',
    link: './images/Kyoto_Japan.jfif'
  },
  {
    name: 'Небоскреб Уан-Вандербильт',
    link: './images/One_Vanderbilt_New-York_US.jfif'
  },
  {
    name: 'Сан-Франциско',
    link: './images/San-Francisco.jfif'
  },
  {
    name: 'Санторини',
    link: './images/Santorini_Greece.jfif'
  },
  {
    name: 'Башня Токио',
    link: './images/Tokyo_Tower.jfif'
  }
];

const popupsList = document.querySelectorAll('.popup'),
      popupProfile = document.querySelector('.popup_user-input'),
      cardAddPopup = document.querySelector('.popup_item-input'),
      largeImagePopup = document.querySelector('.popup_img-large'),
      profileForm = document.forms['user-data'],
      cardForm = document.forms['new-card'],
      popupCloseButtons = document.querySelectorAll('.popup__close');

const inputProfileName = document.querySelector('.popup__input-data_user-name'),
      inputProfileProfession = document.querySelector('.popup__input-data_user-profession'),
      profileName = document.querySelector('.profile__name'),
      profileProfession = document.querySelector('.profile__profession'),
      profileEditButton = document.querySelector('.profile__edit-button');

const inputImageName = document.querySelector('.popup__input-data_img-name'),
      inputImageUrl = document.querySelector('.popup__input-data_img-url'),
      addCardButton = document.querySelector('.profile__add-button');

const cardTemplate = document.querySelector('.card-template'),
      photoGrid = document.querySelector('.photo-grid__list'),
      largeImage = document.querySelector('.popup__full-img'),
      largeImageTitle = document.querySelector('.popup__title-full-img');

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function renderLargeImage(event) {
  const currentCard = event.target.closest('.photo-grid__card'),
        urlImage = currentCard.querySelector('.photo-grid__img').style.backgroundImage.split('"')[1],
        nameImage = currentCard.querySelector('.photo-grid__title-name').textContent;

  largeImage.src = urlImage;
  largeImage.alt = nameImage;
  largeImageTitle.textContent = nameImage;
}

function renderCard (item) {
  const card = cardTemplate.content.cloneNode(true),
        cardImage = card.querySelector('.photo-grid__img'),
        cardTitleName = card.querySelector('.photo-grid__title-name'),
        cardTrashButton = card.querySelector('.photo-grid__trash-button'),
        cardLikeButton = card.querySelector('.photo-grid__heart');

  cardImage.style.backgroundImage = `url('${item.link}')`;
  cardTitleName.textContent = item.name;

  cardImage.addEventListener('click', function (event) {
    renderLargeImage(event);
    openPopup(largeImagePopup);
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

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');

  button.addEventListener('click', () => closePopup(popup));

  popup.addEventListener('click', (event) => {
    if (event.target === event.currentTarget) closePopup(popup);
  });

});

document.addEventListener('keydown', (event) => {
  
  if(event.code === 'Escape') {
    popupsList.forEach(popup => {
      if (popup.classList.contains('popup_opened')){
        closePopup(popup);
      }
    });
  }
});

inputProfileName.value = profileName.textContent;
inputProfileProfession.value = profileProfession.textContent;

profileEditButton.addEventListener('click', function() {
  inputProfileName.value = profileName.textContent;
  inputProfileProfession.value = profileProfession.textContent;

  openPopup(popupProfile);
});

addCardButton.addEventListener('click', function() {
  openPopup(cardAddPopup);
});

function handleProfileFormSubmit (event) {
  event.preventDefault();

  profileName.textContent = inputProfileName.value;
  profileProfession.textContent = inputProfileProfession.value;

  closePopup(popupProfile);
}

function handleCardFormSubmit (event) {
  event.preventDefault();

  const card = {};
  card.name = inputImageName.value;
  card.link = inputImageUrl.value;

  photoGrid.prepend(renderCard (card));

  event.target.reset();

  closePopup(cardAddPopup);
}

profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardFormSubmit);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-data',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input-data_error',
  errorClass: 'popup__error-message_visible',
}); 