class Auth {
  constructor() {
    this.authenticated = undefined;
    this.user = undefined;
  }
  login() {
    this.authenticated = true;
  }
  setUser(pUser) {
    this.user = pUser;
  }
  getUser() {
    return this.user;
  }
  isAuthenticated() {
    return this.authenticated;
  }
}
export default new Auth();
