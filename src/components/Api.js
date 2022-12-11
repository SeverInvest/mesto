'use strict';

class Api {
  constructor(connect) {
    this._connect = connect;
  }

  _onError(result) {
    if (result.ok) {
      return result.json();
    }
    return Promise.reject(`Ошибка: ${result.status}`);
  }

  _isError(error) {
    console.log(error);
  }

  getInitialCards() {
    return fetch(`${this._connect.baseUrl}/cards`, {
      method: "GET",
      headers: this._connect.headers
    })
      .then(this._onError)
      .catch(this._isError)

  }

  getUser() {
    return fetch(`${this._connect.baseUrl}/users/me`, {
      method: "GET",
      headers: this._connect.headers
    })
      .then(this._onError)
      .catch(this._isError)
  }

  renderUserAndCards() {
    return Promise.all([this.getUser(), this.getInitialCards()])
  }

  setUserInfo(info) {
    return fetch(`${this._connect.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._connect.headers,
      body: JSON.stringify(info)
    })
      .then(this._onError)
      .catch(this._isError)
  }

  setCard(info) {
    return fetch(`${this._connect.baseUrl}/cards`, {
      method: "POST",
      headers: this._connect.headers,
      body: JSON.stringify(info)
    })
      .then(this._onError)
      .catch(this._isError)
  }

  toggleLikeCard({ idCard, methodCardLike }) {
    return fetch(`${this._connect.baseUrl}/cards/${idCard}/likes`, {
      method: methodCardLike,
      headers: this._connect.headers
    })
      .then(this._onError)
      .catch(this._isError)

  }

  deleteCard(idCard) {
    return fetch(`${this._connect.baseUrl}/cards/${idCard}`, {
      method: "DELETE",
      headers: this._connect.headers
    })
      .then(this._onError)
      .catch(this._isError)
  }

  setAvatar(info) {
    // console.log(JSON.stringify(info));
    return fetch(`${this._connect.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._connect.headers,
      body: JSON.stringify(info)
    })
      .then(this._onError)
      .catch(this._isError)
  }
}





export default Api;