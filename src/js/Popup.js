class Popup {
  constructor(popup, closeButton, openButton) {
    this.popup = popup;
    this.closeButton = closeButton;
    this.openButton = openButton;

    this.setEventListeners();
  }

  open() {
    this.popup.classList.add('popup_is-opened');
  }

  close() {
    this.popup.classList.remove('popup_is-opened');
  }

  setEventListeners() {
    this.openButton.addEventListener('click', () => this.open());
    this.closeButton.addEventListener('click', () => this.close());
  }
}