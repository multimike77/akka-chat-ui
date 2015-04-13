export class Auth {

  constructor() {
    this.userName = null;
  }

  login(user) {
    if (this.userName === null) {
      this.userName = user;
    }
  }

  isLoggedIn() {
    return this.userName !== null;
  }

}
