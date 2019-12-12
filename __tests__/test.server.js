const request = require('supertest')

const app = require('../app/app')

var regex = /.*/g
const billObject = { error: expect.stringMatching(regex) }

describe('API TEST', () => {
  test('GET /ident should respond with a 200 with { id : it340-2019-carpaccio-LucDomingo }', () => {
    return request(app)
      .get('/ident')
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({ id: 'it340-2019-carpaccio-LucDomingo' })
      })
  })

  test('POST /bill with STANDARD discount should respond with a 200 with { total : 66759 }', () => {
    return request(app)
      .post('/bill')
      .send({ prices: [15000, 17000], quantities: [1, 3], country: 'ES', discount: 'STANDARD', currency: 'EU' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({ total: 66759 })
      })
  })

  test('POST /bill with FULL_PRICE discount should respond with a 200 with { total : 78540 }', () => {
    return request(app)
      .post('/bill')
      .send({ prices: [15000, 17000], quantities: [1, 3], country: 'ES', discount: 'FULL_PRICE', currency: 'EU' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({ total: 78540 })
      })
  })

  test('POST /bill with SALE discount should respond with a 200 with {total : 54978}', () => {
    return request(app)
      .post('/bill')
      .send({ prices: [15000, 17000], quantities: [1, 3], country: 'ES', discount: 'SALE', currency: 'EU' })
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        expect(response.body).toEqual({ total: 54978 })
      })
  })

  test('POST /bill with negative price should respond with an error', () => {
    return request(app)
      .post('/bill')
      .send({ prices: [-15000, 17000], quantities: [1, 3], country: 'ES', discount: 'STANDARD', currency: 'EU' })
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toMatchObject(billObject)
      })
  })

  test('POST /bill with negative quantities should respond with an error', () => {
    return request(app)
      .post('/bill')
      .send({ prices: [15000, 17000], quantities: [-1, 3], country: 'ES', discount: 'STANDARD', currency: 'EU' })
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toMatchObject(billObject)
      })
  })

  test('POST /bill with bad quantities array should respond with an error', () => {
    return request(app)
      .post('/bill')
      .send({ prices: [15000, 17000], quantities: [1], country: 'ES', discount: 'STANDARD', currency: 'EU' })
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toMatchObject(billObject)
      })
  })
  /*
test('POST /bill with bad discount should respond with an error', () => {
  return request(app)
    .post('/bill')
    .send({ "prices" : [15000,17000], "quantities" : [1,5], "country" : "ES" ,"discount" : ""})
    .expect('Content-Type', /json/)
    .then(response => {
      expect(response.body).toMatchObject(billObject);
    });
});
*/
  test('POST /bill with bad country should respond with an error', () => {
    return request(app)
      .post('/bill')
      .send({ prices: [15000, 17000], quantities: [1, 5], country: 'FRANCE', discount: 'STANDARD', currency: 'EU' })
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toMatchObject(billObject)
      })
  })

  test('POST /bill with bad prices array should respond with an error', () => {
    return request(app)
      .post('/bill')
      .send({ prices: [15000], quantities: [1, 5], country: 'FRANCE', discount: 'STANDARD', currency: 'EU' })
      .expect('Content-Type', /json/)
      .then(response => {
        expect(response.body).toMatchObject(billObject)
      })
  })
})
