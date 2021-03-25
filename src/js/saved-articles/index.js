import {
  API_KEY, PERIOD, PAGE_SIZE, POPUP_IS_OPENED, HOMEPAGE,
  SECTION_INACTIVE, SAVED_ARTICLES_PAGE
} from "../constants/constants";
import {
  getStartDate, isLogged, errorMessageHandling, renderKeywords,
  renderHeadersDependingOnSignup, cleanContainer, addClass, removeClass
} from "../utils/utils";
import Cookie from "../components/Cookie";
import MenuPopup from "../components/MenuPopup";
import Header from "../components/Header";
import MainApi from "../api/MainApi";
import NewsApi from "../api/NewsApi";
import NewsCard from "../components/NewsCard";
import NewsCardList from "../components/NewsCardList";
import "../../pages/index.css";

(function () {
  'use strict';
  const popupMenu = document.querySelector('#popupMenu');
  const openMenuButton = document.querySelector('.menu__logo');
  const closeMenuButton = popupMenu.querySelector('#popupMenuClose');

  const header = document.querySelector('.header');
  const headerItemSaved = header.querySelector('#headerItemSaved');
  const headerItemName = header.querySelector('#headerItemName');
  const headerButtonName = header.querySelector('#headerButtonName');

  const headerMenuPopup = document.querySelector('.menu__list_type_popup');
  const headerMenuPopupItemSaved = headerMenuPopup.querySelector('#headerMenuPopupItemSaved');
  const headerMenuPopupItemName = headerMenuPopup.querySelector('#headerMenuPopupItemName');
  const headerMenuPopupButtonName = headerMenuPopup.querySelector('#headerMenuPopupButtonName');

  const articles = document.querySelector('.articles');
  const articlesContainer = articles.querySelector('.articles__container');

  const content = document.querySelector('.content');
  const numberOfCards = content.querySelector('#numberOfCards');
  const username = content.querySelector('#username');
  const contentSubtitle = content.querySelector('.content__subtitle');
  const contentKeywords = content.querySelector('.content__keyword');

  const mainApi = new MainApi({
    url: [
      'https://www.api.search-news.students.nomoreparties.space',
      // 'http://localhost:3000',
    ],
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const newsApi = new NewsApi({
    url: 'https://nomoreparties.co/news/v2/everything',
    // url: 'https://newsapi.org/v2/everything',
    apiKey: API_KEY,
  }, PERIOD, PAGE_SIZE, getStartDate);


  const cookie = new Cookie(mainApi);
  const headerSection = new Header(headerItemName, cookie, HOMEPAGE);
  const headerMenuPopupSection = new Header(headerMenuPopupItemName, cookie, HOMEPAGE);
  const newsCardList = new NewsCardList({ articlesContainer, createCard });
  new MenuPopup({ popupMenu, closeMenuButton, openMenuButton, addClass, removeClass, POPUP_IS_OPENED });

  function renderHeaders(props) {
    headerSection.render(props, {
      headerItemAuth: '',
      headerItemSaved: headerItemSaved,
      headerButtonName: headerButtonName,
    });
    headerMenuPopupSection.render(props, {
      headerItemAuth: '',
      headerItemSaved: headerMenuPopupItemSaved,
      headerButtonName: headerMenuPopupButtonName,
    });
  }

  function createCard(keyword, title, text, date, source, link, image, id) {
    const card = new NewsCard({
      mainApi, articlesContainer, showCards, cleanContainer, isLogged,
      HOMEPAGE, SAVED_ARTICLES_PAGE
    });
    return card.render({ keyword, title, text, date, source, link, image, id });
  }

  function showCards() {
    mainApi.getArticles()
      .then(promise => {
        const arrayArticles = promise.data;
        newsCardList.renderResultsSavedArticles(arrayArticles)
        username.textContent = headerButtonName.textContent;
        numberOfCards.textContent = arrayArticles.length;
        removeClass(contentSubtitle, SECTION_INACTIVE);
        renderKeywords(contentKeywords, arrayArticles);
      })
      .catch(err => {
        username.textContent = headerButtonName.textContent;
        numberOfCards.textContent = '0';
        addClass(contentSubtitle, SECTION_INACTIVE);
        console.log(err);
      });
  }

  function isNotLogged() {
    if (!isLogged()) {
      location.href = HOMEPAGE;
    }
  }

  renderHeadersDependingOnSignup(mainApi, renderHeaders);
  isNotLogged();
  showCards();
})();