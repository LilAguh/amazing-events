/*-------VARIABLES----------------------------------------------------- */
// BUTTON MENU
let navMenuContainer = document.querySelector('.navMenuContainer')
let navMenuButton = document.querySelector('.navMenuButton')
// BUTTON CATEGORIES
let checkboxsForm = document.querySelector('.checkboxsForm')
let checkboxButton = document.querySelector('.checkboxButton')
// DATA OF CARDS
let allsCardData = data.events
// CHECKBOX
let checkboxs = document.getElementById('checkboxsImput');
// SEARCH BAR
let verifySearchbox = document.getElementById('searchBoxInput')
let searchBoxButton = document.getElementById('searchBoxButton')
// PRINT CARD 
let cardContainer = document.getElementById('cardContainer')
// DATE
let currentDay = data.currentDate

/*-------NAV BUTTON---------------------------------------------------- */

navMenuButton.addEventListener('click', () => {
    navMenuContainer.classList.toggle('navMenuAction')
})

/*-------CATEGORIES BUTTON--------------------------------------------- */

checkboxButton.addEventListener('click', () => {
    checkboxsForm.classList.toggle('checkboxButtonAction')
})



/*-------CHECKBOXS----------------------------------------------------- */
function printCheckboxes(cardsToShow, container) {

    let arrayCategory = []; // here all the categories of the data.js are saved
    for (let i = 0; i < cardsToShow.length; i++) {
        arrayCategory.push(cardsToShow[i].category)
    }
    let filterCategory = arrayCategory.filter((item, index) => {    //
        return arrayCategory.indexOf(item) === index                // <--- repeated categories are filtered here
    })                                                              //
    // console.log(filterCategory)
    filterCategory.forEach((categories) => {
        let checkboxItem = document.createElement('div')
        checkboxItem.className = `checkboxItem`
        checkboxItem.innerHTML =
            `
    <input class="checkInput" type="checkbox"  value="${categories}" name="checkbox" id="${categories}" />
    <label class="check" for="${categories}">${categories}</label>
    `
        container.appendChild(checkboxItem)
    })
}


/*-------FILTERING FROM CHECKBOXS-------------------------------------- */
function verifyCheckboxs(cardsToShow) {
    let checkboxSelected = []
    let allCheckbox = document.querySelectorAll("input[type='checkbox']")
    let checkbox = Array.from(allCheckbox)
    let selected = checkbox.filter(box => box.checked).map(check => check.value)
    checkboxSelected = cardsToShow.filter(e => selected.includes(e.category))
    if (checkboxSelected.length == 0) {
        return cardsToShow
    }
    else {
        return checkboxSelected
    }
}

/*-------FILTERING FROM SEARCHBAR-------------------------------------- */
// let searchBar = ''

function searchBoxFilter(cardsToShow, info) {
    let filtered = cardsToShow.filter(e => e.name.toLowerCase().includes(info.toLowerCase()))
    return filtered
}



/*-------PRINT-CARD---------------------------------------------------- */


function createCard(cardsToShow, container) {
    container.innerHTML = ''
    if (cardsToShow.length > 0) {
        cardsToShow.forEach(cardInformation => {
            let card = document.createElement('div')
            card.className = `card`
            card.innerHTML =
                `<div class="imageContainer">
            <img class="imageCard" src="${cardInformation.image}" alt="${cardInformation.name} image">
            </div>
            <div class="textContainer">
            <h3>${cardInformation.name}</h3>
            <p>${cardInformation.description}</p>
            <div class="buttonContainer">
            <p>Price $${cardInformation.price}</p>
            <a href="../pages/detail.html?id=${cardInformation._id}" class="buttonCard">View More</a>
            </div>
            </div>`
            container.appendChild(card)
        })
    }
    else {
        container.innerHTML =
            `
            <p class="notEvent">No events found</p>
            `
    }
}


/*-------DATE FILTERS-------------------------------------------------- */
function dateFilter(cardsToShow, currentDay) {
    upcomingEvent = cardsToShow
        .filter(e => e.date > currentDay);
    return upcomingEvent
}
console.log(dateFilter(allsCardData, currentDay))

/*-------CHEACKING THE DATA OF FILTERS--------------------------------- */
searchBoxButton.addEventListener('click', () => {
    let searchData = searchBoxFilter(allsCardData, verifySearchbox.value)
    let filteredData = verifyCheckboxs(searchData)
    createCard(filteredData, cardContainer)
})

checkboxs.addEventListener('change', () => {
    let checkboxSelectedFilter = verifyCheckboxs(allsCardData)
    let textFilter = searchBoxFilter(checkboxSelectedFilter, verifySearchbox.value)
    createCard(textFilter, cardContainer)
})



printCheckboxes(dateFilter(allsCardData, currentDay), checkboxs)

createCard(dateFilter(allsCardData, currentDay), cardContainer)