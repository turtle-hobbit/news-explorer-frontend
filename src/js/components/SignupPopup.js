import Popup from "./Popup.js";

export default class SignupPopup extends Popup {
  constructor({
    popupSignup: popup,
    formSignup: form,
    closeFormSignupButton: closeButton,
    openFormSignupButton: openButton,
    authErrorSignup: authError,
    emailSignup, passwordSignup, nameSignup,
    formSignupValidator, signupButton,
    popupMenu, popupSignin, popupSuccess,
    addClass, removeClass, mainApi,
    errorMessageHandling, POPUP_IS_OPENED }) {
    super(popup, closeButton, addClass, removeClass, POPUP_IS_OPENED);
    this._form = form;
    this._emailSignup = emailSignup;
    this._passwordSignup = passwordSignup;
    this._nameSignup = nameSignup;
    this._signupButton = signupButton;
    this._openButton = openButton;
    this._popupMenu = popupMenu;
    this._popupSignin = popupSignin;
    this._popupSuccess = popupSuccess;
    this._mainApi = mainApi;
    this._deleteErrorMessages = formSignupValidator.deleteErrorMessages;
    this._authError = authError;
    this._errorMessageHandling = errorMessageHandling;

    this._open = this._open.bind(this);
    this._setListeners();
  }

  _open() {
    this.removeClass(this._popupMenu, this.POPUP_IS_OPENED);
    this.removeClass(this._popupSignin, this.POPUP_IS_OPENED);
    this.removeClass(this._popupSuccess, this.POPUP_IS_OPENED);
    this._form.reset();

    this._signupButton.setAttribute('disabled', '');
    this._signupButton.classList.add('button_type_inactive');
    this._deleteErrorMessages();

    super.open();
  }

  _submitFormHandler(evt) {
    evt.preventDefault();
    this._mainApi.signup(this._emailSignup.value, this._passwordSignup.value, this._nameSignup.value)
      .then(() => {
        this.addClass(popupSuccess, this.POPUP_IS_OPENED);
        this._close();
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
