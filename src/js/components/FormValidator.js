export default class FormValidator {
  constructor(form, errorMessages) {
    this._form = form;
    this._errorMessages = errorMessages;

    this._checkInputValidity = this._checkInputValidity.bind(this);
    this._checkFormValidity = this._checkFormValidity.bind(this);
    this.deleteErrorMessages = this.deleteErrorMessages.bind(this);
    this._init();
  }

  // Проверяет input на валидность
  _checkInputValidity(input) {
    input.setCustomValidity("");

    if (input.validity.valueMissing) {
      input.setCustomValidity(this._errorMessages.empty);
    }

    if (input.type === 'password' && input.validity.tooShort) {
      input.setCustomValidity(this._errorMessages.password);
    }

    if (input.type === 'email' && input.validity.typeMismatch) {
      input.setCustomValidity(this._errorMessages.email);
    }

    return input.checkValidity();
  }

  _errorSearch(input) {
    return this._form.querySelector(`#${input.id}-error`);
  }

  // Выводит сообщения об ошибках
  displayErrorMessages(input) {
    const valid = this._checkInputValidity(input);
    this._errorSearch(input).textContent = input.validationMessage;
    return valid;
  }

  // Удаляет сообщения об ошибках
  deleteErrorMessages() {
    this.inputs.forEach((input) => {
      const errorElem = this._errorSearch(input);
      errorElem.textContent = '';
    });
  }

  // Проверяет форму на валидность
  _checkFormValidity() {
    return !this.inputs.some(input => !this._checkInputValidity(input));
  }

  // Активирует и деактивирует кнопки
  _setSubmitButtonState(state) {
    if (state) {
      this.submit.removeAttribute('disabled');
      this.submit.classList.remove('button_type_inactive');
    } else {
      this.submit.setAttribute('disabled', '');
      this.submit.classList.add('button_type_inactive');
    }
  }

  _inputFormHandler(evt) {
    this.displayErrorMessages(evt.target);

    if (this.inputs.every(this._checkInputValidity)) {
      this._setSubmitButtonState(true);
    } else {
      this._setSubmitButtonState(false);
    }
  }

  _setListeners() {
    this._form.addEventListener('input', (evt) => this._inputFormHandler(evt), true);
  }

  _init() {
    const inputs = [...this._form.elements].filter((item) => item.classList.contains('popup__input'));
    const submit = this._form.querySelector('.button');

    this.inputs = inputs;
    this.submit = submit;
    this._setListeners();
  }
}
