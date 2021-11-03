 //fetch trips at the specified page or the first page if no page is specified
 //returns an object with an array of trips and a next_page, which can be a string or null
 export const fetchTrips = async (page) => {
    let trips = []
    let next_page = ''
    try {
        const response = await fetch('/trips' + (page ? '?cursor=' + page : ''))
        const responseData = await response.json()
        if (response.ok) {
            next_page = responseData.next_cursor
            trips = responseData.trips
        } else {
            console.error(responseData.error || "Something went wrong")
        }
    } catch (error) {
        console.error(error)
    }
    return {trips:trips, next_page: next_page}
}

//Creates a div element for each trips, then returns everything as one string
export const createListHtml = (trips) => {
    if (!trips.length) {
        return '<h2>No trips found :(</h2>'
    }
    let tripsHtml =
        trips.map((trip) => {
            const price = trip.price.amount + ' ' + trip.price.currency
            const duration = new Date(trip.duration_in_seconds * 1000).toISOString().substr(11, 5) //to have only hours and minutes
            const from = trip.waypoints[0]
            const to = trip.waypoints[1]
            const fromCity = from.place.city
            const toCity = to.place.city
            const departureTime = new Date(from.date_time).toLocaleString('en-US')
            const arrivalTime = new Date(to.date_time).toLocaleString('en-US')

            return (
                `<div class='trip-card'>
                    ${fromCity} -> ${toCity} <br>
                    ${departureTime} - ${arrivalTime} (${duration}) <br>
                    <b>${price}</b>
                </div>`
            )
        }).join('')
        return tripsHtml
}