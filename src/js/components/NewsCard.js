export default class NewsCard {
  constructor({ mainApi, articlesContainer, showCards, cleanContainer, isLogged, HOMEPAGE, SAVED_ARTICLES_PAGE }) {
    this._mainApi = mainApi;
    this._articlesContainer = articlesContainer;
    this._showCards = showCards;
    this._cleanContainer = cleanContainer;
    this._isLogged = isLogged;
    this._HOMEPAGE = HOMEPAGE;
    this._SAVED_ARTICLES_PAGE = SAVED_ARTICLES_PAGE;

    this._remove = this._remove.bind(this);
    this._save = this._save.bind(this);
  }

  _save(evt) {
    if (this._isLogged()) {
      this._mainApi.createArticle(this.keyword, this.title, this.text, this.date, this.source, this.link, this.image)
        .then((card) => {
          evt.target.classList.remove('articles__icon_theme_saved');
          evt.target.classList.add('articles__icon_theme_saved_active');
          this.id = card._id;
        })
        .catch(err => console.log(err));
      this._listenersOfRemove();
    }
  }

  _remove(evt) {
    if (this._isLogged()) {
      if (location.pathname == this._HOMEPAGE) {
        evt.target.classList.add('articles__icon_theme_saved');
        evt.target.classList.remove('articles__icon_theme_saved_active');
        this._listenersOfSave();
      }
      this._mainApi.removeArticle(this.id)
        .then(() => {
          if (location.pathname == this._SAVED_ARTICLES_PAGE) {
            this._cleanContainer(this._articlesContainer);
            this._showCards();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  _create() {
    const markup = `
      <div class="articles__item">
        <div class="articles__icon"></div>
        <a href="" class="link" target="blanck">
        <div class="articles__keyword"></div>
          <img src="" class="articles__image" alt="">
          <div class="articles__content">
            <p class="articles__date"></p>
              <div class="articles__text">
                <h3 class="articles__item-title"></h3>
                <p class="articles__item-subtitle"></p>
              </div>
            <p class="articles__link"></p>
          </div>
        </a>
      </div>
    `;

    const element = document.createElement('div');
    element.insertAdjacentHTML('afterbegin', markup);

    return element.firstElementChild;
  }

  _getDateArticle(date) {
    let dateArticle = new Date(date);
    dateArticle = dateArticle.toLocaleDateString(
      'ru-RU',
      { day: 'numeric', month: 'long', year: 'numeric' }).slice(0, -3);

    dateArticle = [dateArticle.slice(0, -5), ',', dateArticle.slice(-5)].join('');

    return dateArticle;
  }

  render({ keyword, title, text, date, source, link, image, id, IMAGE_NOT_FOUND }) {
    this.card = this._create();
    this.iconElement = this.card.querySelector('.articles__icon');
    this.keywordElement = this.card.querySelector('.articles__keyword');
    this.keyword = keyword;
    this.title = title;
    this.text = text;
    this.date = date;
    this.source = source;
    this.link = link;
    this.id = id;

    if (image !== null) {
      this.image = image;
    } else {
      this.image = IMAGE_NOT_FOUND;
    }
    const dateArticle = this._getDateArticle(date);
    this._renderIcon(keyword);

    this.card.querySelector('.articles__item-title').textContent = this.title;
    this.card.querySelector('.articles__item-subtitle').textContent = this.text;
    this.card.querySelector('.articles__date').textContent = dateArticle;
    this.card.querySelector('.articles__link').textContent = this.source;
    this.card.querySelector('.link').setAttribute('href', this.link);
    this.card.querySelector('.articles__image').setAttribute('src', this.image);

    this._setListeners();
    return this.card;
  }

  _renderIcon(keyword) {
    if (location.pathname == this._SAVED_ARTICLES_PAGE) {
      this.iconElement.setAttribute('title', 'Убрать из сохранённых');
      this.iconElement.classList.remove('articles__icon_theme_saved');
      this.iconElement.classList.add('articles__icon_theme_trash');
      this.keywordElement.classList.remove('section_type_inactive');
      this.iconElement.style.cursor = 'pointer';
      this.keywordElement.textContent = keyword;
    } else {
      this.iconElement.classList.add('articles__icon_theme_saved');
      this.iconElement.classList.remove('articles__icon_theme_trash');
      this.keywordElement.classList.add('section_type_inactive');
      if (this._isLogged()) {
        this.iconElement.removeAttribute('disabled');
        this.iconElement.style.cursor = 'pointer';
      } else {
        this.iconElement.setAttribute('title', 'Войдите, чтобы сохранять статьи');
        this.iconElement.setAttribute('disabled', '');
        this.iconElement.style.cursor = 'default';
      }
    }
  }

  _listenersOfSave() {
    this.iconElement.removeEventListener('click', this._remove);
    this.iconElement.addEventListener('click', this._save);
  }

  _listenersOfRemove() {
    this.iconElement.removeEventListener('click', this._save);
    this.iconElement.addEventListener('click', this._remove);
  }

  _setListeners() {
    if (this.iconElement.classList.contains('articles__icon_theme_saved')) {
      this._listenersOfSave();
    } else {
      this._listenersOfRemove();
    }
  }
}
