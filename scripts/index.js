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

const popup = document.querySelectorAll('.popup'),
      popupForms = document.querySelectorAll('.popup__form'),
      photoGrid = document.querySelector('.photo-grid__list');

const inputTitle = document.querySelector('#input_user-name'),
      inputProfession = document.querySelector('#input_user-profession'),
      profileName = document.querySelector('.profile__name'),
      profileProfession = document.querySelector('.profile__profession'),
      editButton = document.querySelector('.profile__edit-button');

const inputImageName = document.querySelector('#input_img-name'),
      inputImageUrl = document.querySelector('#input_img-url'),
      addCardButton = document.querySelector('.profile__add-button');
      

const cardTemplate = document.querySelector('.card-template').querySelector('.photo-grid__card');

function renderCard (item) {
  const card = cardTemplate.cloneNode(true);

  card.querySelector('.photo-grid__img').style.backgroundImage = `url('${item.link}')`;
  card.querySelector('.photo-grid__title-name').textContent = item.name;
  
  return card;
}

document.querySelector('.photo-grid__list').append(...initialCards.map(renderCard));

function openPopup(target) {
  target.classList.add('popup_opened');
}

function closePopup(target) {
  target.classList.remove('popup_opened');
}

editButton.addEventListener('click', function() {
  const currentPopup = document.querySelector('.popup_user-input');

  inputTitle.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;

  openPopup(currentPopup);

  currentPopup.querySelector('.popup__close').addEventListener('click', function() {
    closePopup(currentPopup);
  });
});

addCardButton.addEventListener('click', function() {
  const currentPopup = document.querySelector('.popup_item-input');

  inputImageName.value = '';
  inputImageUrl.value = '';

  openPopup(currentPopup);

  currentPopup.querySelector('.popup__close').addEventListener('click', function() {
    closePopup(currentPopup);
  });
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

  closePopup(popup[0]);
}

function addCardFormSubmit (event) {
  event.preventDefault();

  const card = {};
  card.name = inputImageName.value;
  card.link = inputImageUrl.value;

  document.querySelector('.photo-grid__list').prepend(renderCard (card));

  closePopup(popup[1]);
}

popupForms[0].addEventListener('submit', handleFormSubmit);

popupForms[1].addEventListener('submit', addCardFormSubmit);

photoGrid.addEventListener('click', function (event) {

    if (event.target.classList.contains('photo-grid__img')) {
      const currentPopup = document.querySelector('.popup_img-large');
      const currentCard = event.target.closest('.photo-grid__card');
      const urlImage = currentCard.querySelector('.photo-grid__img').style.backgroundImage.split('"')[1];
      const nameImage = currentCard.querySelector('.photo-grid__title-name').textContent;
      
      currentPopup.querySelector('.popup__full-img').src = urlImage;
      currentPopup.querySelector('.popup__title-img').textContent = nameImage;
      
      openPopup(currentPopup);

      currentPopup.querySelector('.popup__close').addEventListener('click', function() {
      closePopup(currentPopup);
      });
    }

    if (event.target.classList.contains('photo-grid__heart')) {
      event.target.classList.toggle('photo-grid__heart_active');
    }

    if (event.target.classList.contains('photo-grid__trash-button')) {
      event.target.parentElement.parentElement.remove();
    }
});