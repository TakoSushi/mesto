const popup = document.querySelector('.popup'),
      editButton = document.querySelector('.profile__edit-button'),
      popupClose = document.querySelector('.popup__close'),
      inputTitle = document.querySelector('#input_user-name'),
      inputProfession = document.querySelector('#input_user-profession'),
      profileName = document.querySelector('.profile__name'),
      profileProfession = document.querySelector('.profile__profession'),
      popupForm = document.querySelector('.popup__form');

editButton.addEventListener('click', function() {
  inputTitle.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
  popup.classList.add('popup_opened');
});

function closePopupForm() {
  popup.classList.remove('popup_opened');
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

popupClose.addEventListener('click', closePopupForm);

popupForm.addEventListener('submit', handleFormSubmit);