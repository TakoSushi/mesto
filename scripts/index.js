let popup = document.querySelector('.popup'),
    editButton = document.querySelector('.profile__edit-button'),
    popupClose = document.querySelector('.popup__close'),
    // inputTitle = document.querySelector('.popup__input-title'),
    // inputProfession = document.querySelector('.popup__input-profession'),
    profileName = document.querySelector('.profile__name'),
    profileProfession = document.querySelector('.profile__profession'),
    popupForm = document.querySelector('.popup__form');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', closePopupForm);

popupForm.addEventListener('submit', handleFormSubmit);

function closePopupForm() {
  popup.classList.remove('popup_opened');
  popupForm.reset();
  inputTitle.placeholder = profileName.textContent;
  inputProfession.placeholder = profileProfession.textContent;
}

function handleFormSubmit (evt) {
  evt.preventDefault();

  if (inputTitle.value && inputProfession.value) {
    profileName.textContent = inputTitle.value;
    profileProfession.textContent = inputProfession.value;
  } else if (inputTitle.value){
    profileName.textContent = inputTitle.value;
  } else if (inputProfession.value){
    profileProfession.textContent = inputProfession.value;
  }

  closePopupForm();
}