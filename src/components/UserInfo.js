'use strict';

export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
    this._myId = "";
  };

  getUserInfo() {
    //console.log(`myId: ${this._myId}`);
    return {
      profileName: this._profileName.textContent,
      profileAbout: this._profileAbout.textContent,
      myId: this._myId,
    };
  };

  setUserInfo({ name, about, myId = "" }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    if (!this._myId) { this._myId = myId };
  };
};
