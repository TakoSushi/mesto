let popup = document.querySelector('.popup'),
    editButton = document.querySelector('.profile__edit-button'),
    addButton = document.querySelector('.profile__add-button'),
    popupClose = document.querySelector('.popup__close'),
    popupSaveButton = document.querySelector('.popup__button-save'),
    inputTitle = document.querySelector('.popup__input-title'),
    inputProfession = document.querySelector('.popup__input-profession'),
    profileName = document.querySelector('.profile__name'),
    profileProfession = document.querySelector('.profile__profession');

editButton.addEventListener('click', function() {
  popup.classList.add('popup_opened');
});

popupClose.addEventListener('click', function() {
  popup.classList.remove('popup_opened');
});

console.log(inputTitle.getAttribute('placeholder'));
console.log(inputTitle.setAttribute('placeholder', 'Фродо Бэгинс'));

console.log(inputProfession.placeholder); //мы рекомендуем всегда работать со свойствами объектов.
inputProfession.placeholder = 'Ringbringer, уничтожитель мордорских государств на территории средиземья'; //мы рекомендуем всегда работать со свойствами объектов.
console.log(inputProfession.placeholder); //мы рекомендуем всегда работать со свойствами объектов.
// console.log(inputProfession.removeAttribute('placeholder'));
// console.log(inputProfession.hasAttribute('placeholder'));



function handleFormSubmit (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
// formElement.addEventListener('submit', handleFormSubmit); 