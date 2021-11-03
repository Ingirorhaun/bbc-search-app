import { fetchTrips, createListHtml } from '/functions.js'

var next_page = null
let isLoading = false //used to prevent the updateList function from being called again while it's still running
const tripsList = document.getElementById('tripsList')


async function updateList(page = next_page) {
    isLoading = true
    const tripsObj = await fetchTrips(page)
    let tripsHtml = createListHtml(tripsObj.trips)
    next_page = tripsObj.next_page || null
    tripsList.innerHTML += tripsHtml
    isLoading = false
}

//START
//updates the trips list once when the page is first loaded
updateList()


//listen to scroll events and update the list if the user scrolled to the bottom of the page and there are more trips to show (next_page != null)
window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;
    if ((scrollTop + clientHeight >= scrollHeight - 5) && next_page && !isLoading) {
        updateList(next_page)
    }
}, {
    passive: true
});


