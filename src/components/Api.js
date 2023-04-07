export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }
    
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка при получении объекта ${res.status}`);
    })
  }

  setUserInfo(newUserData) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(newUserData)
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
  
        return Promise.reject(`Ошибка при получении объекта ${res.status}`);
      })
  }
  
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка при получении объекта ${res.status}`);
    })
  }

  addNewCard(newCardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(newCardData)

    })
    .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Ошибка при получении объекта ${res.status}`);
    })
  }

  setUserAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatarUrl)
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка при получении объекта ${res.status}`);
    })
  }
}