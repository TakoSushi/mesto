class Card {
  constructor(card, {renderPopupWithImage, renderPopupWithForm, likeCard, dislikeCard}, cardSelectors, popupShowLargeImage, userId) {
    this._name = card.name;
    this._link = card.link;
    this._id = card._id;
    this._likes = card.likes;
    this._owner = card.owner;
    this._userId = userId;
    this._renderPopupWithImage = renderPopupWithImage;
    this._renderPopupWithForm = renderPopupWithForm;
    this._likeCard = likeCard;
    this._dislikeCard = dislikeCard;
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

  _setLikesCount(likes) {
    this._cardLikeCount.textContent = likes.length;
  }

  _setLikes(likes) {
    likes.forEach( (likeData) => {
      if(likeData._id === this._userId) {
        this._cardLikeButton.classList.add(this._cardLikeButtonActive);
        this._isLiked = true;
      };
    });
    this._setLikesCount(likes);
  }

  _toogleLikeButton() {
    if(!this._isLiked) {
      this._likeCard(this._id)
      .then( (cardData) => { this._setLikes(cardData.likes) })
      .catch( (err) => console.log(err) );
      this._isLiked = true;
    } else {
      this._dislikeCard(this._id)
      .then( (cardData) => { 
          this._cardLikeButton.classList.remove(this._cardLikeButtonActive);
          this._setLikesCount(cardData.likes);
       })
      .catch( (err) => console.log(err) );
      this._isLiked = false;
    };
  }

  getCard() {
    this._cardImage.style.backgroundImage = `url('${this._link}')`;
    this._cardTitleName.textContent = this._name;
    this._setLikes(this._likes);

    this._setEventListeners();
    return this._card;
  }
  
  _openLargeImage() {
    this._renderPopupWithImage({name: this._name, link: this._link});
  }
  
  _setTrashButton() {
    if(this._owner._id === this._userId){
      this._cardTrashButton.addEventListener('click', () => {
        this._renderPopupWithForm({
          cardId: this._id,
          deleteCard: this._deleteCard,
        });
      });
    } else {
      this._cardTrashButton.classList.add(this._cardTrashButtonDisabled);
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', (evt) => {
      if(evt.target === evt.currentTarget) {
        this._openLargeImage();
      };
    });

    this._cardLikeButton.addEventListener('click', this._toogleLikeButton);

    this._setTrashButton();
  }

  _deleteCard() {
    this._card.remove();
    this._template = null;
  }
}

export default Card;