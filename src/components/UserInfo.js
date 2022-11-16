'use strict';

export default class UserInfo {
  constructor(profileNameSelector, profileAboutSelector) {
    this._profileName = document.querySelector(profileNameSelector);
    this._profileAbout = document.querySelector(profileAboutSelector);
  };

  getUserInfo() {
return {
  profileName: this._profileName.textContent,
  profileAbout: this._profileAbout.textContent
};
  };

  setUserInfo(data) {
    this._profileName.textContent = data.inputProfileName;
    this._profileAbout.textContent = data.inputProfileAbout;
  };
};