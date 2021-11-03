import dotenv from "dotenv"
import express from "express"
import fetch from "node-fetch"

dotenv.config()
const app = express()

const KEY = process.env.APIKEY
const DATE = new Date()

app.use('/', express.static('public'));

app.get('/trips', async (req, res) => {
  const cursor = req.query.cursor
  let URL = `https://public-api.blablacar.com/api/v3/trips?key=${KEY}&count=20&from_coordinate=48.8566%2C2.3522&to_coordinate=45.764043%2C4.835659&from_country=FR&to_country=FR&locale=en-GB&start_date_local=${DATE.toISOString()}&currency=EUR`
  if (cursor) URL += '&from_cursor=' + cursor
  try {
    const response = await fetch(URL)
    const data = await response.json()
    const next_cursor = data.next_cursor || null
    res.status(200).send({
      trips: data.trips,
      next_cursor: next_cursor
    })

  } catch (error) {
    res.status(500).send({ error: error.message })
  }

})

export default app