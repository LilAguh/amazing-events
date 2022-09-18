var link = "../../JSON-data.json"
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

let eventsData
let currentDay
let attendance
let upcomingEvent
let pastEvent
let dataOfAssitance = []


loadData(link)
function loadData(url) {
    fetch(url)
        .then(request => request.json())
        .then(data => {
            eventsData = data.events
            currentDay = data.currentDate
            dateFilter(eventsData, currentDay)
            largerCapacityEvent(eventsData)
            assistancePercentage(pastEvent)
            // rowData(eventsData)
            // shortPercentage(eventsData)
            printTables(upcomingEvent, upcommingCategories)
            printTables(pastEvent, pastCategories)
        })
}

function dateFilter(arrayEvents, currentDay) {
    pastEvent = arrayEvents.filter(e => e.date < currentDay)
    upcomingEvent = arrayEvents.filter(e => e.date >= currentDay)
}

function assistancePercentage(arrayEvents) {
    arrayEvents.forEach(e => {
        assistanceCalc = (e.assistance * 100) / e.capacity
        roundAssistance = (Math.round(assistanceCalc))
        dataOfAssitance.push({ "roundAssistance": roundAssistance, "name": e.name })
    })
    dataOfAssitance.sort((prevEvent, nextEvent) => nextEvent.roundAssistance - prevEvent.roundAssistance)
    lowPersentage.innerText = dataOfAssitance[dataOfAssitance.length - 1].name + ": " + dataOfAssitance[dataOfAssitance.length - 1].roundAssistance + "%"
    highPercentage.innerText = dataOfAssitance[0].name + ": " + dataOfAssitance[0].roundAssistance + "%"
}

function largerCapacityEvent(arrayEvents) {
    arrayEvents.sort((prevEvent, nextEvent) => nextEvent.capacity - prevEvent.capacity)
    largerCapacity.innerText = (arrayEvents[0].name) + ': ' + (arrayEvents[0].capacity)
}

function rowData(arrayEvents) {
    let categories = []
    let rowInformation = []
    /* here filtering all events */
    arrayEvents.map(events => {
        if (!categories.includes(events.category)) {
            categories.push(events.category)
        }
    })
    categories.map(category => {
        /* here filtering all events with categories, we multiply the assistance (or estimate) by the price, plus this prices and return one value */
        let eventsFiltredByCategory = arrayEvents.filter(event => event.category === category) //<-- here filter the events by category 
        let renueves = eventsFiltredByCategory.map(event => (event.assistance ? event.assistance : event.estimate) * event.price) // <-- once filtered, here we multiply the attendance (or estimate, in case it is a future event) by the price
        let totalRenueves = renueves.reduce((actualValue, lastValue) => actualValue = actualValue + lastValue, 0)
        /* */
        let percentageOfTotalAssistance = eventsFiltredByCategory.map(event => (event.assistance ? event.assistance : event.estimate) / event.capacity)
        let totalAssistance = ((percentageOfTotalAssistance.reduce((actualValue, lastValue) => actualValue = actualValue + lastValue, 0) / percentageOfTotalAssistance.length) * 100).toFixed(2)
        rowInformation.push([category, "$" + totalRenueves, totalAssistance + "%"])
    })
    return rowInformation
}

function printTables(arrayEvents, container) {
    let eventStats = rowData(arrayEvents)
    console.log(eventStats)
    eventStats?.forEach(event => {
        let row = document.createElement('tr')
        row.innerHTML = `
        <td>${event[0]}</td>
        <td>${event[1]}</td>
        <td>${event[2]}</td>
        `
        container.appendChild(row)
    })
}