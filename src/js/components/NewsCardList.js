export default class NewsCardList {
  constructor({ articlesContainer, createCard, articlesButton, cleanContainer, FIRST_INDEX, LIMIT_CARDS }) {
    this._container = articlesContainer;
    this._articlesButton = articlesButton;
    this._createCard = createCard;
    this._cleanContainer = cleanContainer;
    this._LIMIT_CARDS = LIMIT_CARDS;

    this.currentLimit = this._LIMIT_CARDS;
    this.currentIndex = FIRST_INDEX;

    this._setListeners();
  }

  _addCard(keyword, title, text, date, source, link, image, id) {
    const card = this._createCard(keyword, title, text, date, source, link, image, id);
    this._container.append(card);
  }

  renderResults(array, keyword) {
    this.array = array;
    this.keyword = keyword;
    for (this.currentIndex; this.currentIndex < this.currentLimit && this.currentIndex < this.array.length; this.currentIndex++) {
      this._addCard(
        this.keyword,
        this.array[this.currentIndex].title,
        this.array[this.currentIndex].description,
        this.array[this.currentIndex].publishedAt,
        this.array[this.currentIndex].source.name,
        this.array[this.currentIndex].url,
        this.array[this.currentIndex].urlToImage,
      );
    };
    this.currentLimit += this._LIMIT_CARDS;
  }

  renderResultsSavedArticles(array) {
    array.forEach((card) => {
      this._addCard(
        card.keyword,
        card.title,
        card.text,
        card.date,
        card.source,
        card.link,
        card.image,
        card._id,
      );
    });
  }

  remove() {
    this._cleanContainer(this._container);
  }

  _showMore() {
    this.renderResults(this.array, this.keyword);
  }

  _setListeners() {
    if (this._articlesButton) {
      this._articlesButton.addEventListener('click', () => this._showMore());
    }
  }
}