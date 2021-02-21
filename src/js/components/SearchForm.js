export default class SearchForm {
  constructor({ formSearch, searchFormError, searchFormInput,
    newsApi, ERROR_MESSAGES, resultsSearch, resultsNotFound, resultsNotFoundTitle,
    resultsNotFoundSubtitle, articles, addClass, removeClass, newsCardList,
    FIRST_INDEX, LIMIT_CARDS, SECTION_INACTIVE, }) {
    this._formSearch = formSearch;
    this._searchFormInput = searchFormInput;
    this._searchFormError = searchFormError;
    this._newsApi = newsApi;
    this._resultsSearch = resultsSearch;
    this._resultsNotFound = resultsNotFound;
    this._resultsNotFoundTitle = resultsNotFoundTitle;
    this._resultsNotFoundSubtitle = resultsNotFoundSubtitle;
    this._articles = articles;
    this._addClass = addClass;
    this._removeClass = removeClass;
    this._newsCardList = newsCardList;
    this._ERROR_MESSAGES = ERROR_MESSAGES;
    this._FIRST_INDEX = FIRST_INDEX;
    this._LIMIT_CARDS = LIMIT_CARDS;
    this._SECTION_INACTIVE = SECTION_INACTIVE;

    this._setListener();
  }

  _submitFormHandler(evt) {
    const regexp = /.{1,}/;
    const category = this._searchFormInput.value;

    evt.preventDefault();
    this._removeClass(this._resultsSearch, this._SECTION_INACTIVE);
    this._addClass(this._resultsNotFound, this._SECTION_INACTIVE);
    this._addClass(this._articles, this._SECTION_INACTIVE);

    this._newsCardList.currentLimit = this._LIMIT_CARDS;
    this._newsCardList.currentIndex = this._FIRST_INDEX;
    this._newsCardList.remove();

    if (regexp.test(category)) {
      this._searchFormError.textContent = '';
      this._newsApi.getNews(category)
      .then((data) => {
        console.log(data);
        this._removeClass(this._articles, this._SECTION_INACTIVE);
        this._addClass(this._resultsSearch, this._SECTION_INACTIVE);

        if (data.totalResults == 0) {
          this._addClass(this._articles, this._SECTION_INACTIVE);
          this._removeClass(this._resultsNotFound, this._SECTION_INACTIVE);
          this._removeClass(this._resultsNotFoundTitle, this._SECTION_INACTIVE);
          this._resultsNotFoundSubtitle.textContent = this._ERROR_MESSAGES.resultsNotFound;
          } else {
            this._removeClass(this._articles, this._SECTION_INACTIVE);
            this._addClass(this._resultsNotFound, this._SECTION_INACTIVE);
            this._newsCardList.renderResults(data.articles, category);
          }
        })
        .catch((err) => {
          console.log(err);
          this._addClass(this._resultsNotFoundTitle, this._SECTION_INACTIVE);
          this._resultsNotFoundSubtitle.textContent = this._ERROR_MESSAGES.errorSearchServer;
        });
    } else {
      this._addClass(this._resultsSearch, this._SECTION_INACTIVE);
      this._addClass(this._resultsNotFound, this._SECTION_INACTIVE);
      this._addClass(this._articles, this._SECTION_INACTIVE);
      this._searchFormError.textContent = this._ERROR_MESSAGES.errorSearch;
    }
  }

  _setListener() {
    this._formSearch.addEventListener('submit', (evt) => this._submitFormHandler(evt));
  }
}
