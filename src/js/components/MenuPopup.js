import Popup from "./Popup.js";

export default class MenuPopup extends Popup {
  constructor({
    popupMenu: popup,
    closeMenuButton: closeButton,
    openMenuButton: openButton,
    addClass, removeClass, POPUP_IS_OPENED
  }) {
    super(popup, closeButton, addClass, removeClass, POPUP_IS_OPENED);
    this.openButton = openButton;

    this._setListeners();
  }

  _setListeners() {
    this.openButton.addEventListener('click', () => super.open());
  }
}
