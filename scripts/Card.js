class Card {
  constructor({name, link}, {renderPopupWithImage}, cardSelectors, popupShowLargeImage) {
    this.name = name;
    this.link = link;
    this._renderPopupWithImage = renderPopupWithImage;
    this._popupShowLargeImage = popupShowLargeImage;
    this._cardLikeButtonActive = cardSelectors.cardLikeButtonActive;

    this._template = document.querySelector(cardSelectors.cardTemplate).content;
    this._card = this._template.querySelector(cardSelectors.photoGridCard).cloneNode(true);
    this._cardImage = this._card.querySelector(cardSelectors.cardImage);
    this._cardTitleName = this._card.querySelector(cardSelectors.cardTitleName);
    this._cardTrashButton = this._card.querySelector(cardSelectors.cardTrashButton);
    this._cardLikeButton = this._card.querySelector(cardSelectors.cardLikeButton);
  
    this._openLargeImage = this._openLargeImage.bind(this);
    this._toogleLikeButton = this._toogleLikeButton.bind(this);
    this._deleteCard = this._deleteCard.bind(this);
  }

  getCard() {
    this._cardImage.style.backgroundImage = `url('${this.link}')`;
    this._cardTitleName.textContent = this.name;

    this._setEventListeners();
    return this._card;
  }
  
  _openLargeImage() {
    this._renderPopupWithImage({name: this.name, link: this.link});
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

    this._cardImage.addEventListener('click', this._openLargeImage);

    this._cardLikeButton.addEventListener('click', this._toogleLikeButton);

    this._cardTrashButton.addEventListener('click', this._deleteCard)
  }
}

export default Card;