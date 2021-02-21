import Popup from "./Popup.js";

export default class SigninPopup extends Popup {
  constructor({
    popupSignin: popup,
    closeFormSigninButton: closeButton, openButton,
    formSignin: form, emailSignin, passwordSignin,
    authErrorSignin: authError, errorMessageHandling,
    popupMenu, popupSignup, popupSuccess,
    addClass, removeClass, formSigninValidator, signinButton,
    mainApi, cookie, renderHeaders, POPUP_IS_OPENED }) {
    super(popup, closeButton, addClass, removeClass, POPUP_IS_OPENED);
    this._form = form;
    this._emailSignin = emailSignin;
    this._passwordSignin = passwordSignin;
    this._signinButton = signinButton;
    this._openButton = openButton;
    this._popupMenu = popupMenu;
    this._popupSignup = popupSignup;
    this._popupSuccess = popupSuccess;
    this._deleteErrorMessages = formSigninValidator.deleteErrorMessages;
    this._mainApi = mainApi;
    this._authError = authError;
    this._cookie = cookie;
    this._renderHeaders = renderHeaders;
    this._errorMessageHandling = errorMessageHandling;

    this._open = this._open.bind(this);
    this._setListeners();
  }

  _open() {
    this.removeClass(this._popupMenu, this.POPUP_IS_OPENED);
    this.removeClass(this._popupSignup, this.POPUP_IS_OPENED);
    this.removeClass(this._popupSuccess, this.POPUP_IS_OPENED);
    this._form.reset();

    this._signinButton.setAttribute('disabled', '');
    this._signinButton.classList.add('button_type_inactive');
    this._deleteErrorMessages();

    super.open();
  }

  _submitFormHandler(evt) {
    evt.preventDefault();
    this._cookie.setCookie(this._emailSignin, this._passwordSignin)
      .then(() => {
        this._mainApi.getUserData()
          .then((user) => {
            this._renderHeaders({ isLoggedIn: true, userName: user.data.name });
            this._close();
          })
          .catch(err => { throw err; });
      })
      .catch(err => {
        this._authError.textContent = this._errorMessageHandling(err);
        console.log(err);
      });
  }

  _close() {
    this._authError.textContent = '';
    super.close();
  }

  _setListeners() {
    this._openButton.addEventListener('click', this._open);
    this._form.addEventListener('submit', (evt) => this._submitFormHandler(evt));
  }
}
