'use strict';

export default class Card {
  constructor(objCard, templateCardSelector, handleCardClick, handleToggleLike, myId) {
    this._likes = objCard.likes; //массив объектов пользователей, поставивших лайк
    //this._likesCount = this.countLikes(this._likes); //количество лайков
    this._idOwner = objCard.owner._id; //id собственника фото
    this._idCard = objCard._id;// id карточки
    this._name = objCard.name;// наименование фото
    this._link = objCard.link;//ссылка на фото
    this._myId = myId; //мой id
    this._handleCardClick = handleCardClick;
    this._handleToggleLike = handleToggleLike;
    this._templateCardSelector = templateCardSelector;
    this._cardElement = this._getTemplate();
    this._photo = this._cardElement.querySelector('.card__photo');
    this._heart = this._cardElement.querySelector('.card__heart');
    this._count_likes = this._cardElement.querySelector('.card__count-likes');
    this._description = this._cardElement.querySelector('.card__description');
    this._remove_button = this._cardElement.querySelector('.card__remove-button');

    //this._myLike = this.isMyLike(this._likes); //если есть мой лайк - true, иначе - false 
  };

  countLikes() {
    return Object.keys(this._likes).length;
  };

  isMyLike() {
    if (this._likes.length === 0) {
      return false;
    }
    return this._likes.some(item => item._id === this._myId)
  };

  setLike() {

    if (this.isMyLike()) {
      this._heart.classList.add('card__heart_active');
    } else {
      this._heart.classList.remove('card__heart_active');
    }
    this._count_likes.textContent =  this.countLikes(this._likes);
  };


  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateCardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
    return cardElement;
  };

  _toggleLike() {
    if (!this.isMyLike(this._likes)) {
      this._methodCardLike = "PUT";
    } else {
      this._methodCardLike = "DELETE";
    }
    this._handleToggleLike({
      idCard: this._idCard,
      methodCardLike: this._methodCardLike,
    })
      .then((response) => {
        this._likes = response.likes
        this.setLike();
      })
  };

  _removeCard() {

    this._cardElement.remove();
    this._cardElement = null;
  };

  _setEventListeners() {
    this._photo.addEventListener('click', () => {
      this._handleCardClick({ 'name': this._name, 'link': this._link });
    });
    this._heart.addEventListener('click', () => this._toggleLike());
    this._remove_button.addEventListener('click', () => this._removeCard());
  }

  createCard() {
    this._description.textContent = this._name;
    this._photo.src = this._link;
    this._photo.alt = this._name;
    this._count_likes.textContent = this.countLikes(this._likes);
    this.setLike(this._likes);
    this._setEventListeners();
    return this._cardElement;
  }

  getCountLikes() {
    return this._likes;
  }

};