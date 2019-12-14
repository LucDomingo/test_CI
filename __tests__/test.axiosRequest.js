const axios = require('../httpRequest/axiosRequest')
var endpoints = require('../exchangeRatesAPI/ApiEndpoints')

describe('finalPrice(object)', () => {
  test('should return rates for valid url', () => {
    const url = 'https://api.exchangeratesapi.io/latest'
    axios.requestGet(url).then(res => { expect(res.rates.CAD).toBe(1.4712) })
  })

  test('should return rates for valid url from ApiEnpoints', () => {
    const url = endpoints.getRate
    axios.requestGet(url).then(res => { expect(res.rates.CAD).toBe(1.4712) })
  })

  test('should reject error for invalid url', () => {
    const url = 'https://api.extesapi.io'
    // axios.requestGet(url).then(res => { expect(res).toThrow() })
    return expect(new Promise((resolve, reject) => { axios.requestGet(url).catch((error) => { reject(new Error(error)) }) })).rejects.toThrow()
  })
})
