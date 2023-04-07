export default class UserInfo {
  constructor ({userName, userProfession, userAvatar}) {
    this._userName = document.querySelector(userName);
    this._userProfession = document.querySelector(userProfession);
    this._userAvatar = document.querySelector(userAvatar);
    this._userId;
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
    this._userId = newUserData.userId;
  }

  setUserAvatar(url){
    this._userAvatar.style.backgroundImage=`url('${url}')`;
  }
  
  getUserId(){
    return this._userId;
  }
}