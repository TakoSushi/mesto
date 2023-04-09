export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    
  _handlePromise(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка при получении объекта ${res.status}`);
  }
  
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._handlePromise(res);
    })
  }

  setUserInfo(newUserData) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(newUserData)
      })
      .then((res) => {
        return this._handlePromise(res);
      })
  }

  setUserAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatarUrl)
    })
    .then((res) => {
      return this._handlePromise(res);
    })
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      return this._handlePromise(res);
    })
  }

  addNewCard(newCardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newCardData)

    })
    .then((res) => {
      return this._handlePromise(res);
    })
  }
  
  deleteCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'delete',
      headers: this._headers,
    })
    .then((res) => {
      return this._handlePromise(res);
    })
  }

  likeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'put',
      headers: this._headers,
    })
    .then((res) => {
      return this._handlePromise(res);
    })
  }

  dislikeCard(cardId){
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'delete',
      headers: this._headers,
    })
    .then((res) => {
      return this._handlePromise(res);
    })
  }
}