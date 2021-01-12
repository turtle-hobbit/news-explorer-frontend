(function() {
  'use strict';

  const popupSignin = document.querySelector('#popupSignin');
  const openFormSigninButton = document.querySelector('#popupSigninOpen');
  const closeFormSigninButton = popupSignin.querySelector('#popupSigninClose');

  const popupSignup = document.querySelector('#popupSignup');
  const openFormSignupButton = document.querySelector('#popupSignupOpen');
  const closeFormSignupButton = popupSignup.querySelector('#popupSignupClose');

  const popupSuccess = document.querySelector('#popupSuccess');
  const openFormSuccessButton = document.querySelector('#popupSuccessOpen');
  const closeFormSuccessButton = popupSuccess.querySelector('#popupSuccessClose');

  const popupMenu = document.querySelector('#popupMenu');
  const openMenuButton = document.querySelector('.menu__logo');
  const closeMenuButton = popupMenu.querySelector('#popupMenuClose');

  new MenuPopup(popupMenu, closeMenuButton, openMenuButton);
  new Popup(popupSignin, closeFormSigninButton, openFormSigninButton);
  new Popup(popupSignup, closeFormSignupButton, openFormSignupButton);
  new Popup(popupSuccess, closeFormSuccessButton, openFormSuccessButton);
})();