function addClass(obj, className) {
  obj.classList.add(className);
}

function removeClass(obj, className) {
  obj.classList.remove(className);
}

function getStartDate(period) {
  const today = new Date();
  const date = today.setDate(today.getDate() - period);
  const startDate = new Date(date);
  return startDate;
}

function isLogged() {
  if (document.cookie == '') {
    return false;
  }
  return true;
}

function errorMessageHandling(err) {
  const errorMessage = err.message.slice(12).slice(0, -2);
  return errorMessage;
}

// Возвращает массив с отсортированными по убыванию ключевыми словами
function getKeywords(articlesList) {
  const result = articlesList.reduce((reducer, article) => {
    if (!reducer[article.keyword]) {
      reducer[article.keyword] = 0;
    }
    reducer[article.keyword]++;
    return reducer;
  }, {});

  const articleKeywords = Object.entries(result)
    .sort((a, b) => b[1] - a[1])
    .reduce((arr, [key, value]) => {
      arr[key] = value;
      return arr;
    }, []);

  return Object.keys(articleKeywords);
}

// Отрисовывает ключевые слова
function renderKeywords(contentKeywords, articlesList) {
  const keywords = getKeywords(articlesList);
  if (keywords.length == 1) {
    contentKeywords.textContent = keywords[0];
  } else if (keywords.length == 2) {
    contentKeywords.textContent = `${keywords[0]} и ${keywords[1]}`;
  } else if (keywords.length >= 3) {
    let ending = 'ти другим';
    const length = keywords.length - 2;
    if (length < 10 || length > 20) {
      switch (length % 10) {
        case 1:
          ending = 'му другому';
          break;
        case 2:
        case 3:
        case 4:
          ending = 'м другим';
          break;
        case 0:
        case 5:
        case 6:
        case 9:
          ending = 'ти другим';
          break;
        case 7:
        case 8:
          ending = 'ми другим';
          break;
      }
    }
    contentKeywords.textContent = `${keywords[0]}, ${keywords[1]} и ${keywords.length - 2}-${ending}`
  }
}

// Отрисовывает шапку сайта
function renderHeadersDependingOnSignup(mainApi, renderHeaders) {
  if (isLogged()) {
    mainApi.getUserData()
      .then((user) => {
        renderHeaders({ isLoggedIn: true, userName: user.data.name });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    renderHeaders({ isLoggedIn: false });
  }
}

function cleanContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export {
  addClass,
  removeClass,
  getStartDate,
  isLogged,
  errorMessageHandling,
  getKeywords,
  renderKeywords,
  renderHeadersDependingOnSignup,
  cleanContainer,
}