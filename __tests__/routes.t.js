import request from 'supertest'
import app from '../app.js'

//add custom matcher to check is value is string or null
expect.extend({
    toBeStringOrNull(received) {
        return received === null || typeof received === 'string' ? {
            message: () => `expected ${received} to be string or null`,
            pass: true
        } : {
            message: () => `expected ${received} to be string or null`,
            pass: false
        };
    }
});

describe("Test /", ()=>{
    test('Should respond to GET', async () => {
        const response = await request(app).get('/')
        expect(response.statusCode).toBe(200)
    })
})

describe("Test /trips", ()=>{
    test('Should respond to GET', async() => {
        const response = await request(app).get('/trips')
        expect(response.statusCode).toBe(200)
    })
    
    test('Should receive a json object containing an array of trips and a string to request the next page, if any ', async() => {
        const response = await request(app).get('/trips')
        expect(response.type).toEqual('application/json')
        expect(response.body).toHaveProperty('trips')
        expect(response.body).toHaveProperty('next_cursor')
        expect(response.body).toEqual(expect.objectContaining({
            trips: expect.any(Array),
            next_cursor: expect.toBeStringOrNull()
        }))
    })
})
