class Api {
  constructor(connect) {
    this._connect = connect;
  }

  _onError(result, ...args) {
    console.log(result.ok, result.json(), args.length);
    if (result.ok) {
      if (args.length>0) {
        //console.log(result.json(), args);
        return result.json(), args;
      }
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

  toggleLikeCard({ idCard, methodCardLike, setLike }) {
    return fetch(`${this._connect.baseUrl}/cards/${idCard}/likes`, {
      method: methodCardLike,
      headers: this._connect.headers
    }), setLike
      .then(this._onError, setLike)
      .catch(this._isError)

  }
}





export default Api;