// Set Constants for mopbile menu dropdown
const menu = document.querySelector('#mobile-menu');
const menuLinks= document.querySelector('.navbar-menu');

// Click event for triggering the opening and closing of the menu
menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});
