// BUTTON MENU
let navMenuContainer = document.querySelector('.navMenuContainer')
let navMenuButton = document.querySelector('.navMenuButton')

/*-------NAV BUTTON---------------------------------------------------- */

navMenuButton.addEventListener('click', () => {
    navMenuContainer.classList.toggle('navMenuAction')
})