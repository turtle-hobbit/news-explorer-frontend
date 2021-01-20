import "../pages/index.css";
import MenuPopup from "./MenuPopup.js";

(function() {
  'use strict';

  const popupMenu = document.querySelector('#popupMenu');
  const openMenuButton = document.querySelector('.menu__logo');
  const closeMenuButton = popupMenu.querySelector('#popupMenuClose');

  new MenuPopup(popupMenu, closeMenuButton, openMenuButton);
})();