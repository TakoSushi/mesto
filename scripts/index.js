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

const popups = document.querySelectorAll('.popup'),
      popupForms = document.querySelectorAll('.popup__form'),
      photoGrid = document.querySelector('.photo-grid__list');

const inputTitle = document.querySelector('.popup__input-data_user-name'),
      inputProfession = document.querySelector('.popup__input-data_user-profession'),
      profileName = document.querySelector('.profile__name'),
      profileProfession = document.querySelector('.profile__profession'),
      editButton = document.querySelector('.profile__edit-button');

const inputImageName = document.querySelector('.popup__input-data_img-name'),
      inputImageUrl = document.querySelector('.popup__input-data_img-url'),
      addCardButton = document.querySelector('.profile__add-button');

function renderCard (item) {
  const card = document.querySelector('.card-template').content.cloneNode(true);

  card.querySelector('.photo-grid__img').style.backgroundImage = `url('${item.link}')`;
  card.querySelector('.photo-grid__title-name').textContent = item.name;
  
  return card;
}

photoGrid.append(...initialCards.map(renderCard));

function openPopup(target) {
  target.classList.add('popup_opened');
}

function closePopup(target) {
  target.classList.remove('popup_opened');
}

function addCloseEventOnPopup(currentPopup) {
  currentPopup.querySelector('.popup__close').addEventListener('click', function() {
    closePopup(currentPopup);
  });
}

editButton.addEventListener('click', function() {
  const currentPopup = document.querySelector('.popup_user-input');

  inputTitle.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;

  openPopup(currentPopup);

  addCloseEventOnPopup(currentPopup);
});

addCardButton.addEventListener('click', function() {
  const currentPopup = document.querySelector('.popup_item-input');

  inputImageName.value = '';
  inputImageUrl.value = '';

  openPopup(currentPopup);

  addCloseEventOnPopup(currentPopup);
});

function handleFormSubmit (event) {
  event.preventDefault();

  if (inputTitle.value && inputProfession.value) {
    profileName.textContent = inputTitle.value;
    profileProfession.textContent = inputProfession.value;
  } else if (inputTitle.value){
    profileName.textContent = inputTitle.value;
  } else if (inputProfession.value){
    profileProfession.textContent = inputProfession.value;
  }

  closePopup(popups[0]);
}

function addCardFormSubmit (event) {
  event.preventDefault();

  const card = {};
  card.name = inputImageName.value;
  card.link = inputImageUrl.value;

  photoGrid.prepend(renderCard (card));

  closePopup(popups[1]);
}

popupForms[0].addEventListener('submit', handleFormSubmit);

popupForms[1].addEventListener('submit', addCardFormSubmit);

function openZoomCard(event) {
  const currentCard = event.target.closest('.photo-grid__card');
  const urlImage = currentCard.querySelector('.photo-grid__img').style.backgroundImage.split('"')[1];
  const nameImage = currentCard.querySelector('.photo-grid__title-name').textContent;
  
  document.querySelector('.popup__full-img').src = urlImage;
  document.querySelector('.popup__full-img').alt = nameImage;
  document.querySelector('.popup__title-full-img').textContent = nameImage;
}

photoGrid.addEventListener('click', function (event) {
  const classList = event.target.classList;

  if (classList.contains('photo-grid__img')) {
    const currentPopup = document.querySelector('.popup_img-large');
    
    openZoomCard(event);

    openPopup(currentPopup);

    addCloseEventOnPopup(currentPopup);
  }

  if (classList.contains('photo-grid__heart')) {
    classList.toggle('photo-grid__heart_active');
  }

  if (classList.contains('photo-grid__trash-button')) {
    event.target.parentElement.parentElement.remove();
  }
});