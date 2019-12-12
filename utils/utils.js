var tvaRates = require('../data/tvaRates')
var check = require('../testFunction/basic_check.js')
var axios = require('../httpRequest/axiosRequest.js')
var endpoints = require('../exchangeRatesAPI/ApiEndpoints')
var tvaByCounty = tvaRates.tvaByCounty

function ttcPrice (body) {
  let tot = 0
  const tva = tvaByCounty.get(body.country)
  check.isQuantities(body)
  check.isPrices(body)
  for (let i = 0; i < Math.max(body.quantities.length, body.prices.length); i++) {
    tot += check.isPositive(body.prices[i]) * check.isPositive(body.quantities[i]) * (1 + tva)
  }
  check.checkTTC(tot)
  return tot
}

function applyStandardDiscount (ttc) {
  if (ttc >= 50000) { return ttc * 0.85 } else if (ttc >= 10000) { return ttc * 0.90 } else if (ttc >= 7000) { return ttc * 0.93 } else if (ttc >= 5000) { return ttc * 0.95 } else if (ttc >= 1000) { return ttc * 0.97 }
  return ttc
}

function discount (body) {
  const ttc = ttcPrice(body)
  switch (body.discount) {
    case 'STANDARD' :
      return applyStandardDiscount(ttc)
    case 'SALE' :
      return ttc * 0.7
    case 'FULL_PRICE':
      return ttc
    default :
      throw new Error('error applying reduction')
  }
}

function getExchangeRate () {
  return axios.requestGet(endpoints.getRate)
}

function applyConversion (ttc, rate) {
  check.isDevise(rate)
  return ttc * rate
}

function finalPrice (body) {
  return new Promise((resolve, reject) => {
    const devise = body.currency
    getExchangeRate()
      .then((res) => {
        const ttcWithDiscount = discount(body)
        if (devise === 'EU')resolve(ttcWithDiscount)
        const result = applyConversion(ttcWithDiscount, res.rates[devise])
        resolve(result)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

module.exports = {
  finalPrice: finalPrice,
  ttcPrice: ttcPrice,
  applyStandardDiscount: applyStandardDiscount,
  discount: discount,
  applyConversion: applyConversion
}
