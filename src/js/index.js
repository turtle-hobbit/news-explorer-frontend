import {
  ERROR_MESSAGES, API_KEY, PERIOD, PAGE_SIZE, IMAGE_NOT_FOUND, FIRST_INDEX,
  LIMIT_CARDS, SECTION_INACTIVE, POPUP_IS_OPENED, HOMEPAGE, SAVED_ARTICLES_PAGE
} from "./constants/constants";
import {
  addClass, removeClass, getStartDate, renderHeadersDependingOnSignup,
  cleanContainer, isLogged, errorMessageHandling
} from "./utils/utils";
import Popup from "./components/Popup";
import MenuPopup from "./components/MenuPopup";
import Cookie from "./components/Cookie";
import SigninPopup from "./components/SigninPopup";
import SignupPopup from "./components/SignupPopup";
import Header from "./components/Header";
import MainApi from "./api/MainApi";
import NewsApi from "./api/NewsApi";
import FormValidator from "./components/FormValidator";
import SearchForm from "./components/SearchForm";
import NewsCard from "./components/NewsCard";
import NewsCardList from "./components/NewsCardList";
import "../pages/index.css";

(function () {
  'use strict';

  const popupSignin = document.querySelector('#popupSignin');
  const popupSignup = document.querySelector('#popupSignup');
  const popupMenu = document.querySelector('#popupMenu');
  const popupSuccess = document.querySelector('#popupSuccess');

  const openMenuButton = document.querySelector('.menu__logo');
  const closeMenuButton = popupMenu.querySelector('#popupMenuClose');

  const openFormSigninButtons = document.querySelectorAll('.popup__signin');
  const closeFormSigninButton = popupSignin.querySelector('#popupSigninClose');
  const authErrorSignin = popupSignin.querySelector('#auth-error');
  const formSignin = document.forms.signin;
  const { emailSignin, passwordSignin, signinButton } = formSignin.elements;

  const openFormSignupButton = popupSignin.querySelector('#popupSignupOpen');
  const closeFormSignupButton = popupSignup.querySelector('#popupSignupClose');
  const authErrorSignup = popupSignup.querySelector('#signupButton-error');
  const formSignup = document.forms.signup;
  const { emailSignup, passwordSignup, nameSignup, signupButton } = formSignup.elements;

  const closeFormSuccessButton = popupSuccess.querySelector('#popupSuccessClose');

  const header = document.querySelector('.header');
  const headerItemSaved = header.querySelector('#headerItemSaved');
  const headerItemName = header.querySelector('#headerItemName');
  const headerButtonName = header.querySelector('#headerButtonName');
  const headerItemAuth = header.querySelector('#headerItemAuth');

  const headerMenuPopup = document.querySelector('.menu__list_type_popup');
  const headerMenuPopupItemSaved = headerMenuPopup.querySelector('#headerMenuPopupItemSaved');
  const headerMenuPopupItemName = headerMenuPopup.querySelector('#headerMenuPopupItemName');
  const headerMenuPopupButtonName = headerMenuPopup.querySelector('#headerMenuPopupButtonName');
  const headerMenuPopupItemAuth = headerMenuPopup.querySelector('#headerMenuPopupItemAuth');

  const formSearch = document.forms.searchForm;
  const searchFormError = formSearch.querySelector('#searchFormError');
  const { searchFormInput } = formSearch.elements;

  const articles = document.querySelector('.articles');
  const articlesContainer = articles.querySelector('.articles__container');
  const articlesButton = articles.querySelector('.articles__button');

  const results = document.querySelector('.results');
  const resultsSearch = results.querySelector('#resultsSearch');
  const resultsNotFound = results.querySelector('#resultsNotFound');
  const resultsNotFoundSubtitle = resultsNotFound.querySelector('.results__subtitle');
  const resultsNotFoundTitle = resultsNotFound.querySelector('.results__title');

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
  const newsCardList = new NewsCardList({ articlesContainer, articlesButton, createCard, cleanContainer, FIRST_INDEX, LIMIT_CARDS });
  const formSigninValidator = new FormValidator(formSignin, ERROR_MESSAGES);
  const formSignupValidator = new FormValidator(formSignup, ERROR_MESSAGES);

  new SearchForm({
    formSearch, searchFormError, searchFormInput, newsApi, ERROR_MESSAGES,
    resultsSearch, resultsNotFound, resultsNotFoundTitle, resultsNotFoundSubtitle, articles,
    addClass, removeClass, newsCardList, FIRST_INDEX, LIMIT_CARDS, SECTION_INACTIVE,
  });

  new Popup(popupSuccess, closeFormSuccessButton, addClass, removeClass, POPUP_IS_OPENED);
  new MenuPopup({ popupMenu, closeMenuButton, openMenuButton, addClass, removeClass, POPUP_IS_OPENED });
  new SignupPopup({
    popupSignup, formSignup, emailSignup, passwordSignup,
    nameSignup, closeFormSignupButton, openFormSignupButton,
    popupMenu, popupSignin, popupSuccess, addClass, removeClass,
    formSignupValidator, signupButton, mainApi, authErrorSignup,
    errorMessageHandling, POPUP_IS_OPENED,
  });

  function createSigninPopups() {
    openFormSigninButtons.forEach((openButton) => {
      new SigninPopup({
        popupSignin, formSignin, emailSignin, passwordSignin,
        closeFormSigninButton, openButton, popupMenu, popupSignup,
        popupSuccess, addClass, removeClass, formSigninValidator, signinButton,
        mainApi, renderHeaders, authErrorSignin, cookie,
        POPUP_IS_OPENED, errorMessageHandling,
      });
    });
  }

  function renderHeaders(props) {
    headerSection.render(props, {
      headerItemAuth: headerItemAuth,
      headerItemSaved: headerItemSaved,
      headerButtonName: headerButtonName,
    });
    headerMenuPopupSection.render(props, {
      headerItemAuth: headerMenuPopupItemAuth,
      headerItemSaved: headerMenuPopupItemSaved,
      headerButtonName: headerMenuPopupButtonName,
    });
  }

  function createCard(keyword, title, text, date, source, link, image, id) {
    const card = new NewsCard({ mainApi, isLogged, HOMEPAGE, SAVED_ARTICLES_PAGE });
    return card.render({ keyword, title, text, date, source, link, image, id, IMAGE_NOT_FOUND });
  }

  renderHeadersDependingOnSignup(mainApi, renderHeaders);
  createSigninPopups();
})();