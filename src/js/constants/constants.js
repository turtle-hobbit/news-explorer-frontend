const API_KEY = '0a44f12e88934aeeb02191d3c40ad421';

const ERROR_MESSAGES = {
  empty: 'Это обязательное поле',
  email: 'Неправильный формат email',
  password: 'Пароль должен содержать больше 8 символов',
  errorSearch: 'Нужно ввести ключевое слово',
  errorSearchServer: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  resultsNotFound: 'К сожалению по вашему запросу ничего не найдено',
}

const PERIOD = 7;
const PAGE_SIZE = 100;
const FIRST_INDEX = 0;
const LIMIT_CARDS = 3;
const IMAGE_NOT_FOUND = 'https://komsis.su/media/filer_public/54/cd/54cd5f63-0dd1-42cd-91ef-e995c303bd51/import_files4d4d372161-b222-11ea-9e9d-00e052c0a876_4d372164-b222-11ea-9e9d-00e052c0a876.jpeg';
const SECTION_INACTIVE = 'section_type_inactive';
const POPUP_IS_OPENED = 'popup_is-opened';
const HOMEPAGE = '/index.html';
const SAVED_ARTICLES_PAGE = '/saved-articles.html';


export {
  API_KEY,
  ERROR_MESSAGES,
  PERIOD,
  PAGE_SIZE,
  FIRST_INDEX,
  LIMIT_CARDS,
  IMAGE_NOT_FOUND,
  SECTION_INACTIVE,
  POPUP_IS_OPENED,
  HOMEPAGE,
  SAVED_ARTICLES_PAGE,
};