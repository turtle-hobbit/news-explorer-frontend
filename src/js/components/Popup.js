export default class Popup {
  constructor(popup, closeButton, addClass, removeClass, POPUP_IS_OPENED) {
    this.popup = popup;
    this.closeButton = closeButton;
    this.addClass = addClass;
    this.removeClass = removeClass;
    this.POPUP_IS_OPENED = POPUP_IS_OPENED;

    this._setListener();
  }

  open() {
    this.addClass(this.popup, this.POPUP_IS_OPENED);
  }

  close() {
    this.removeClass(this.popup, this.POPUP_IS_OPENED);
  }

  _setListener() {
    this.closeButton.addEventListener('click', () => this.close());
  }
}