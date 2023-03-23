export default class UserInfo {
  constructor ({userName, userProfession}) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
  }

  getUserInfo() {
    const userData = {
      'user-name': this._userName.textContent,
      'user-profession': this._userProfession.textContent
    };
    
    return userData;
  }

  setUserInfo(newUserData) {
    this._userName.textContent = newUserData['user-name'];
    this._userProfession.textContent = newUserData['user-profession'];
  }
}