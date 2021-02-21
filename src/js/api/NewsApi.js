export default class NewsApi {
  constructor(config, PERIOD, PAGE_SIZE, getStartDate) {
    this._url = config.url;
    this._apiKey = config.apiKey;
    this._getStartDate = getStartDate;
    this._PERIOD = PERIOD;
    this._PAGE_SIZE = PAGE_SIZE;
  }

  _processResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject();
  }

  getNews(keyword) {
    const today = new Date();
    const from = this._getStartDate(this._PERIOD).toISOString();
    const to = today.toISOString();

    return fetch(`${this._url}?q=${keyword}&from=${from}&to=${to}&pageSize=${this._PAGE_SIZE}&language=ru&apiKey=${this._apiKey}`)
      .then(this._processResult);
  }
}
