import { createListHtml } from '../public/functions'

describe("Create the html code for the trips list", () => {

    test('No trips found', () => {
        const list = createListHtml([])
        expect(list).toEqual("<h2>No trips found :(</h2>")
    })

    test('At least one trip is found', () => {
        const tripsArray = [
            {
                "link": "https://www.blablacar.co.uk/trip?source=CARPOOLING&id=2316732524-paris-lyon",
                "waypoints": [
                    {
                        "date_time": "2021-11-02T01:00:00",
                        "place": {
                            "city": "Paris",
                            "address": "4 Pl. de l'Hôtel de Ville, Paris",
                            "latitude": 48.856472,
                            "longitude": 2.35245,
                            "country_code": "FR"
                        }
                    },
                    {
                        "date_time": "2021-11-02T06:00:00",
                        "place": {
                            "city": "Lyon",
                            "address": "44 Rue Raoul Servant, Lyon",
                            "latitude": 45.746408,
                            "longitude": 4.841385,
                            "country_code": "FR"
                        }
                    }
                ],
                "price": {
                    "amount": "26.00",
                    "currency": "EUR"
                },
                "vehicle": {
                    "make": "VOLKSWAGEN",
                    "model": "PASSAT VARIANT"
                },
                "distance_in_meters": 462991,
                "duration_in_seconds": 18000
            },
            {
                "link": "https://www.blablacar.co.uk/trip?source=CARPOOLING&id=2316717469-fr-fr",
                "waypoints": [
                    {
                        "date_time": "2021-11-02T03:00:00",
                        "place": {
                            "city": "Paris",
                            "address": "Porte de Versailles, Paris",
                            "latitude": 48.832978,
                            "longitude": 2.287025,
                            "country_code": "FR"
                        }
                    },
                    {
                        "date_time": "2021-11-02T07:50:00",
                        "place": {
                            "city": "Lyon",
                            "address": "58 Rue Pré-Gaudry, Lyon",
                            "latitude": 45.737509,
                            "longitude": 4.839353,
                            "country_code": "FR"
                        }
                    }
                ],
                "price": {
                    "amount": "30.00",
                    "currency": "EUR"
                },
                "vehicle": {
                    "make": "MERCEDES-BENZ",
                    "model": "C 220"
                },
                "distance_in_meters": 461840,
                "duration_in_seconds": 17400
            }
        ]
        const expectedOutput = `<div class='trip-card'>
                    Paris -> Lyon <br>
                    11/2/2021, 1:00:00 AM - 11/2/2021, 6:00:00 AM (05:00) <br>
                    <b>26.00 EUR</b>
                </div><div class='trip-card'>
                    Paris -> Lyon <br>
                    11/2/2021, 3:00:00 AM - 11/2/2021, 7:50:00 AM (04:50) <br>
                    <b>30.00 EUR</b>
                </div>`
        const list = createListHtml(tripsArray)
        expect(encodeURIComponent(list)).toEqual(encodeURIComponent(expectedOutput))
    })
})