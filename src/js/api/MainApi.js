export default class MainApi {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _processResult(res) {
    if (res.ok) {
      return res.json();
    }
    return res.text().then(text => { throw new Error(text) })
  }

  signup(email, password, name) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
      })
    })
      .then(this._processResult);
  }

  signin(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      credentials: "include",
      withCredentials: true,
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then(this._processResult);
  }

  signout() {
    return fetch(`${this._url}/signout`, {
      withCredentials: true,
      credentials: "include",
      headers: this._headers
    })
      .then(this._processResult);
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      withCredentials: true,
      credentials: "include",
      headers: this._headers
    })
      .then(this._processResult);
  }

  getArticles() {
    return fetch(`${this._url}/articles`, {
      withCredentials: true,
      credentials: "include",
      headers: this._headers
    })
      .then(this._processResult);
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this._url}/articles`, {
      method: 'POST',
      withCredentials: true,
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        keyword: keyword,
        title: title,
        text: text,
        date: date,
        source: source,
        link: link,
        image: image,
      })
    })
      .then(this._processResult);
  }

  removeArticle(id) {
    return fetch(`${this._url}/articles/${id}`, {
      method: 'DELETE',
      withCredentials: true,
      credentials: "include",
      headers: this._headers,
    })
      .then(this._processResult);
  }
}