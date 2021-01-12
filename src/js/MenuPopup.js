export default class MenuPopup {
  constructor(popup, closeButton, openButton) {
    this.popup = popup;
    this.closeButton = closeButton;
    this.openButton = openButton;

    this.setEventListeners();
  }

  open() {
    this.popup.classList.add('section_type_active');
  }

  close() {
    this.popup.classList.remove('section_type_active');
  }

  setEventListeners() {
    this.openButton.addEventListener('click', () => this.open());
    this.closeButton.addEventListener('click', () => this.close());
  }
}
