class Card {
  constructor({name, link}, {renderLargeImageHandler, openPopupHandler}, cardSelectors, popupShowLargeImage) {
    this.name = name;
    this.link = link;
    this._renderLargeImageHandler = renderLargeImageHandler;
    this._openPopupHandler = openPopupHandler;
    this._cardSelectors = cardSelectors;
    this._popupShowLargeImage = popupShowLargeImage;
  }

  getCard() {
    this._card = document
      .querySelector(this._cardSelectors.cardTemplate)
      .content
      .cloneNode(true);
      
    const cardImage = this._card.querySelector(this._cardSelectors.cardImage),
          cardTitleName = this._card.querySelector(this._cardSelectors.cardTitleName),
          cardTrashButton = this._card.querySelector(this._cardSelectors.cardTrashButton),
          cardLikeButton = this._card.querySelector(this._cardSelectors.cardLikeButton);

    cardImage.style.backgroundImage = `url('${this.link}')`;
    cardTitleName.textContent = this.name;

    this._setEventListeners(cardImage, cardTitleName, cardLikeButton, cardTrashButton);
      
    return this._card;
  }

  _setEventListeners(cardImage, cardTitleName, cardLikeButton, cardTrashButton) {

    cardImage.addEventListener('click', () => {
      this._renderLargeImageHandler({name: this.name, link: this.link}, cardTitleName);
      this._openPopupHandler(this._popupShowLargeImage);
    });

    cardLikeButton.addEventListener('click', (event) => {
      event.target.classList.toggle(this._cardSelectors.cardLikeButtonActive);
    });

    cardTrashButton.addEventListener('click', (event) => {
      event.stopPropagation();
      event.target.closest(this._cardSelectors.photoGridCard).remove();        
    });
  }
}

export default Card;