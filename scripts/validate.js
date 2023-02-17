const showInputError = (inputElement, errorElement, {errorClass, inputErrorClass}, errorMessage) => {
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(inputErrorClass);
};
  
const hideInputError = (inputElement, errorElement, {errorClass, inputErrorClass}) => {
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(inputErrorClass);
};
  
const isValid = (inputElement, errorElement, errorModifyClasses) => {
  if (!inputElement.validity.valid){
    const errorMessage = inputElement.validationMessage;
    showInputError(inputElement, errorElement, errorModifyClasses, errorMessage);
  } else {
    hideInputError(inputElement, errorElement, errorModifyClasses);
  }
};
  
const hasInvalidInput = (formInputs) => {
  return formInputs.some( (inputElement) => {
    return !inputElement.validity.valid;
  });
};
  
const toggleButtonSelector = (formInputs, buttonElement, {inactiveButtonClass}) => {
  if (hasInvalidInput(formInputs)){
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', 'disabled');
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};

setIventlistener = (formInputs, buttonElement, errorModifyClasses) => {
  formInputs.forEach( (inputElement) => {

    const errorField = document.querySelector(`.popup__input-data_${inputElement.name} + .popup__error-message`);

    isValid(inputElement, errorField, errorModifyClasses);
      
    inputElement.addEventListener('input', (e) => {
      const inputField = e.target;

      isValid(inputField, errorField, errorModifyClasses);
    
      toggleButtonSelector(formInputs, buttonElement, errorModifyClasses);
    });
  });
};

function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
  }) {
    
  const forms = Array.from(document.querySelectorAll(formSelector));
  const errorModifyClasses = {inactiveButtonClass, inputErrorClass, errorClass};
  
  forms.forEach ( (form) => {

    formInputs = Array.from(form.querySelectorAll(inputSelector));
    buttonElement = form.querySelector(submitButtonSelector);

    toggleButtonSelector(formInputs, buttonElement, errorModifyClasses);

    setIventlistener(formInputs, buttonElement, errorModifyClasses);
  });
};