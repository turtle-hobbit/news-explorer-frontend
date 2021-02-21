export default class Header {
  constructor(headerItemName, cookie, HOMEPAGE) {
    this._headerItemName = headerItemName;
    this._cookie = cookie;
    this._HOMEPAGE = HOMEPAGE;

    this._setListeners();
  }

  _deleteCookie() {
    this._cookie.deleteCookie()
      .then(() => {
        this.render({ isLoggedIn: false }, {
          headerItemAuth: this.headerItemAuth,
          headerItemSaved: this.headerItemSaved,
          headerButtonName: this.headerButtonName,
        })
        location.href = this._HOMEPAGE;
      })
      .catch(err => console.log(err));
  }

  render(props, auth) {
    this.headerItemAuth = auth.headerItemAuth;
    this.headerItemSaved = auth.headerItemSaved;
    this.headerButtonName = auth.headerButtonName;

    if (props.isLoggedIn) {
      this.headerItemSaved.classList.remove('menu__item_type_inactive');
      this._headerItemName.classList.remove('menu__item_type_inactive');
      if (this.headerItemAuth !== '') {
        this.headerItemAuth.classList.add('menu__item_type_inactive');
      }
      this.headerButtonName.textContent = props.userName;
    } else {
      if (this.headerItemAuth !== '') {
        this.headerItemSaved.classList.add('menu__item_type_inactive');
        this._headerItemName.classList.add('menu__item_type_inactive');
        this.headerItemAuth.classList.remove('menu__item_type_inactive');
      }
    }
  }

  _setListeners() {
    this._headerItemName.addEventListener('click', () => this._deleteCookie());
  }
}
