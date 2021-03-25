export default class Cookie {
  constructor(mainApi) {
    this._mainApi = mainApi;
    this._token = '';
  }

  setCookie(emailSignin, passwordSignin) {
    return this._mainApi.signin(emailSignin.value, passwordSignin.value)
      // Google Chrome иначе не видит document.cookie
      .then((cookie) => {
        this._token = cookie.data;
        document.cookie = `jwt=${this._token}`;
      })
  }

  deleteCookie() {
    document.cookie = `jwt=${this._token}; max-age=-1;`;
    return this._mainApi.signout();
  }
}