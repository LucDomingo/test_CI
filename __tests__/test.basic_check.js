const check = require('../testFunction/basic_check')

describe('checkTTC (ttc)', () => {
  test('should throw error for ttc<0', () => {
    expect(() => check.checkTTC(-5)).toThrow()
  })

  test('should throw error for ttc==undefined', () => {
    expect(() => check.checkTTC(undefined)).toThrow()
  })
})

describe('isPositive (number)', () => {
  test('should throw error for number<0', () => {
    expect(() => check.isPositive(-5)).toThrow()
  })
})

describe('isQuantities (object)', () => {
  test('should throw error for invalid Quantities array', () => {
    const object = { prices: [15000, 17000], quantities: undefined, country: 'ES', discount: 'SALE' }
    expect(() => check.isQuantities(object)).toThrow()
  })
})

describe('isPrices (body)', () => {
  test('should throw error for invalid Prices array', () => {
    const object = { prices: undefined, quantities: [1, 5], country: 'ES', discount: 'SALE' }
    expect(() => check.isPrices(object)).toThrow()
  })
})

describe('isDevise (devise)', () => {
  test('should throw error for invalid devise', () => {
    const devise = NaN
    expect(() => check.isPrices(devise)).toThrow()
  })
})
