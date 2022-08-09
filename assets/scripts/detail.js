var link = "http://amazing-events.herokuapp.com/api/events"
/*-------NAV BUTTON---------------------------------------------------- */
let navMenuContainer = document.querySelector('.navMenuContainer');
let navMenuButton = document.querySelector('.navMenuButton');

navMenuButton.addEventListener('click', () => {
    navMenuContainer.classList.toggle('navMenuAction');
});


/*-------PRINT DETAILS------------------------------------------------- */
let info
let queryString = location.search
let params = new URLSearchParams(queryString)
let id = params.get("id")
let detailsContainer = document.getElementById('detailsContainer')

loadData(link)
function loadData(url) {
    fetch(url).then(request => request.json()).then(data => {
        info = data.events
        let detailsID = info.find(events => events._id == id)
        createDetailsCard(detailsID, detailsContainer)
    })
}


function createDetailsCard(CardID, container) {
    let card = document.createElement('div')
    card.className = `detailCard`
    card.innerHTML =
        `
    <div class="imgDetailsContainer">
        <img class="imageDetails" src="${CardID.image}" alt="${CardID.name} image">
    </div>
    <div class="textDetailsContainer">
        <h3>${CardID.name}</h3>
        <p>${CardID.description}</p>
        <p>${CardID.date}</p>
        <div class="estimatedCapacity">
            <div class="capacity">
                <p class="bond">Capacity:</p>
                <p>${CardID.capacity}</p>
            </div>
            <div class="assistance">
                <p class="bond">Assistance:</p>
                <p>${CardID.assistance}</p>
            </div>
        </div>
        <p>Place: ${CardID.place}</p>
        <div class="buttonDetailsContainer">
            <p>Price $${CardID.price}</p>
            <button  class="buttonDetails">Buy ticket</button>
        </div>
        </div>
        `
    container.appendChild(card)
}