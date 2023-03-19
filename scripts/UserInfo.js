export default class UserInfo {
  constructor ({userName, userProfession}) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
  }

  getUserInfo() {
    const nameValue = this._userName.textContent;
    const professionValue = this._userProfession.textContent;
    return {nameValue, professionValue};
  }

  setUserInfo(newUserName, newUserProfession) {
    this._userName.textContent = newUserName;
    this._userProfession.textContent = newUserProfession;
  }
}