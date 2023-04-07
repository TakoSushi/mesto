class Card {
  constructor(card, {renderPopupWithImage, renderPopupWithForm}, cardSelectors, popupShowLargeImage, userCard) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._likes = card.likes;
    this._owner = card.owner;
    this._userCard = userCard;
    this._renderPopupWithImage = renderPopupWithImage;
    this._renderPopupWithForm = renderPopupWithForm;
    this._popupShowLargeImage = popupShowLargeImage;
    this._cardLikeButtonActive = cardSelectors.cardLikeButtonActive;
    this._cardTrashButtonDisabled = cardSelectors.cardTrashButtonDisabled;

    this._template = document.querySelector(cardSelectors.cardTemplate).content;
    this._card = this._template.querySelector(cardSelectors.photoGridCard).cloneNode(true);
    this._cardImage = this._card.querySelector(cardSelectors.cardImage);
    this._cardTitleName = this._card.querySelector(cardSelectors.cardTitleName);
    this._cardTrashButton = this._card.querySelector(cardSelectors.cardTrashButton);
    this._cardLikeButton = this._card.querySelector(cardSelectors.cardLikeButton);
    this._cardLikeCount = this._card.querySelector(cardSelectors.cardLikeCount);
  
    this._openLargeImage = this._openLargeImage.bind(this);
    this._toogleLikeButton = this._toogleLikeButton.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
  }

  getCard() {
    this._cardImage.style.backgroundImage = `url('${this._link}')`;
    this._cardTitleName.textContent = this._name;
    this._cardLikeCount.textContent = this._likes.length;

    this._setEventListeners();
    return this._card;
  }
  
  _openLargeImage() {
    this._renderPopupWithImage({name: this._name, link: this._link});
  }

  _toogleLikeButton() {
    this._cardLikeButton.classList.toggle(this._cardLikeButtonActive);
  }

  _deleteCard(event) {
    event.stopPropagation();
    this._card.remove();
    this._template = null;
  }

  _setEventListeners() {

    this._cardImage.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this._openLargeImage();
      }
    });

    this._cardLikeButton.addEventListener('click', this._toogleLikeButton);

    this._isUserCard();
  }

  _isUserCard() {
    if(this._userCard){
      this._cardTrashButton.addEventListener('click', this._renderPopupWithForm);
    } else {
      this._cardTrashButton.classList.add(this._cardTrashButtonDisabled);
    }
  }

}

export default Card;