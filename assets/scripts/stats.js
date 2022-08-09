var link = "http://amazing-events.herokuapp.com/api/events"
/*-------VARIABLES----------------------------------------------------- */
// BUTTON MENU
let navMenuContainer = document.querySelector('.navMenuContainer')
let navMenuButton = document.querySelector('.navMenuButton')

navMenuButton.addEventListener('click', () => {
    navMenuContainer.classList.toggle('navMenuAction');
});

// TABLES 

let highPercentage = document.getElementById('highPercentage')
let lowPersentage = document.getElementById('lowPersentage')
let largerCapacity = document.getElementById('largerCapacity')
let upcommingCategories = document.getElementById('upcommingCategories')
let pastCategories = document.getElementById('pastCategories')

let events = []
let currentDay = []
let attendance = []
let upcoming = []
let past = []

loadData(link)

function loadData(url) {
    fetch(url).then(request => request.json()).then(data => {
        events = data.events
        currentDay = data.currentDate
        upcoming = events.filter(e => e.date >= currentDay)
        past = events.filter(e => e.date <= currentDay)
        printRow(events)
        shortPercentage(events)
        incomeAndAssistance(events)
        tableStats(events, upcommingCategories)
        tableStats(past, pastCategories)
    })
}

function shortPercentage(event) {
    event.forEach(element => {
        if (element.assistance != undefined) {
            attendanceCalc = Math.round(((element.assistance) * 100) / element.capacity)
            attendance.push([element.name, attendanceCalc])
        }
    })
    attendance.sort(function (a, b) {
        return b[1] - a[1]
    })
    lowPersentage.innerText = (attendance[attendance.length - 1]) + ' %'
    highPercentage.innerText = (attendance[0]) + ' %'
}

function printRow(array) {
    array.sort(function (a, b) {
        return b.capacity - a.capacity
    })

    largerCapacity.innerText = (array[0].name) + ': ' + (array[0].capacity)
}

function incomeAndAssistance(array) {
    let categories = []
    let arrayStats = []
    array.forEach(e => {
        if (!categories.includes(e.category)) {
            categories.push(e.category)
        }
    })

    categories.forEach(category => {
        let eventosFilteredTable = array.filter(e => e.category == category)
        let incomes = eventosFilteredTable.map(e => ((e.assistance ? e.assistance : e.estimate) * e.price))
        let totalIncomes = incomes.reduce((actual, last) => actual = actual + last, 0)

        let percentageAssistance = eventosFilteredTable.map(e => (e.assistance ? e.assistance : e.estimate) / e.capacity)
        let averageAssistance = Math.round((percentageAssistance.reduce((actual, last) => actual = actual + last, 0) / percentageAssistance.length) * 100)
        arrayStats.push([category, totalIncomes, averageAssistance])
    })
    return arrayStats
}

function tableStats(array, container) {
    let eventStats = incomeAndAssistance(array)
    eventStats.forEach(eventStats => {
        let fila = document.createElement('tr')
        fila.innerHTML = `   
        <td>${eventStats[0]}</td>
        <td>$ ${eventStats[1]}</td>
        <td>${eventStats[2]}%</td>
        `
        container.appendChild(fila)
    })
}
