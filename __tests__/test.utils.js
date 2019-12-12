const utils = require('../utils/utils')

describe('finalPrice (url)', () => {
  test('should return final price for valid object', () => {
    const object = { prices: [15000, 17000], quantities: [1, 1], country: 'ES', discount: 'SALE', currency: 'EU' }
    utils.finalPrice(object).then(res => { expect(res).toBe(26656) })
  })

  test('should return final price for valid object and another devise', () => {
    const object = { prices: [15000, 17000], quantities: [1, 1], country: 'ES', discount: 'SALE', currency: 'CAD' }
    utils.finalPrice(object).then(res => { expect(res).toBe(39080.3616) })
  })

  test('should throw error for invalid discount', () => {
    const object = { prices: [15000, 17000], quantities: [1, 1], country: 'ES', discount: '' }
    return expect(new Promise((resolve, reject) => { utils.finalPrice(object).catch((error) => { reject(new Error(error)) }) })).rejects.toThrow()
  })

  test('should throw error for invalid prices array', () => {
    const object = { prices: [15000], quantities: [1, 1], country: 'ES', discount: 'SALE', currency: 'EU' }
    return expect(new Promise((resolve, reject) => { utils.finalPrice(object).catch((error) => { reject(new Error(error)) }) })).rejects.toThrow()
  })

  test('should throw error for invalid quantities array', () => {
    const object = { prices: [15000, 17000], quantities: [1], country: 'ES', discount: 'SALE', currency: 'EU' }
    return expect(new Promise((resolve, reject) => { utils.finalPrice(object).catch((error) => { reject(new Error(error)) }) })).rejects.toThrow()
  })

  test('should throw error for invalid negative quantities', () => {
    const object = { prices: [15000, 17000], quantities: [1, -1], country: 'ES', discount: 'SALE', currency: 'EU' }
    return expect(new Promise((resolve, reject) => { utils.finalPrice(object).catch((error) => { reject(new Error(error)) }) })).rejects.toThrow()
  })

  test('should throw error for object without correct country', () => {
    const object = { prices: [15000, 17000], quantities: [1, 2], country: 'ESP', discount: 'SALE', currency: 'EU' }
    return expect(new Promise((resolve, reject) => { utils.finalPrice(object).catch((error) => { reject(new Error(error)) }) })).rejects.toThrow()
  })

  test('should throw error for object without correct discount', () => {
    const object = { prices: [15000, 17000], quantities: [1, 2], country: 'ESP', discount: 'SAL', currency: 'EU' }
    return expect(new Promise((resolve, reject) => { utils.finalPrice(object).catch((error) => { reject(new Error(error)) }) })).rejects.toThrow()
  })
})

describe('ttcPrice(object)', () => {
  test('should return TTC price for valid object', () => {
    const object = { prices: [15000, 17000], quantities: [1, 1], country: 'ES', discount: 'SALE', currency: 'EU' }
    expect(utils.ttcPrice(object)).toBe(38080)
  })

  test('should throw error for object without correct prices array', () => {
    const object = { prices: [15000], quantities: [1, 1], country: 'ES', discount: 'SALE', currency: 'EU' }
    expect(() => utils.ttcPrice(object)).toThrow()
  })

  test('should throw error for object without correct quantities array', () => {
    const object = { prices: [15000, 17000], quantities: [1], country: 'ES', discount: 'SALE', currency: 'EU' }
    expect(() => utils.ttcPrice(object)).toThrow()
  })
})

describe('applyStandardDiscount(ttc)', () => {
  test('should return price for ( ttc price < 1000 )', () => {
    const ttcPrice = 500
    expect(utils.applyStandardDiscount(ttcPrice)).toBe(500)
  })

  test('should return 0.97*price for ( 1000<= ttc price < 5000 )', () => {
    const ttcPrice = 2000
    expect(utils.applyStandardDiscount(ttcPrice)).toBe(2000 * 0.97)
  })

  test('should return 0.95*price for ( 5000<= ttc price < 7000 )', () => {
    const ttcPrice = 6000
    expect(utils.applyStandardDiscount(ttcPrice)).toBe(6000 * 0.95)
  })

  test('should return 0.93*price for ( 7000<= ttc price < 10000 )', () => {
    const ttcPrice = 8000
    expect(utils.applyStandardDiscount(ttcPrice)).toBe(8000 * 0.93)
  })

  test('should return 0.90*price for ( 10000<= ttc price < 50000 )', () => {
    const ttcPrice = 49999
    expect(utils.applyStandardDiscount(ttcPrice)).toBe(49999 * 0.90)
  })

  test('should return 0.85*price for ( 50000<= ttc price )', () => {
    const ttcPrice = 100000
    expect(utils.applyStandardDiscount(ttcPrice)).toBe(100000 * 0.85)
  })
})

describe('discount(object)', () => {
  test('should return TTC discount price for valid object with SALE discount', () => {
    const object = { prices: [15000, 17000], quantities: [1, 1], country: 'ES', discount: 'SALE', currency: 'EU' }
    expect(utils.discount(object)).toBe(26656)
  })

  test('should return TTC discount price for valid object with STANDARD discount', () => {
    const object = { prices: [15000, 17000], quantities: [1, 2], country: 'ES', discount: 'STANDARD', currency: 'EU' }
    expect(utils.discount(object)).toBe(49563.5)
  })

  test('should return TTC discount price for valid object with FULL_PRICE discount', () => {
    const object = { prices: [15000], quantities: [1], country: 'ES', discount: 'FULL_PRICE', currency: 'EU' }
    expect(utils.discount(object)).toBe(17850)
  })

  test('should throw error for invalid TTC price', () => {
    const object = { prices: [15000, 17000], quantities: [1], country: 'ES', discount: 'FULL_PRICE', currency: 'EU' }
    expect(() => utils.discount(object)).toThrow()
  })

  test('should throw error for negative TTC price', () => {
    const object = { prices: [-15000], quantities: [1], country: 'ES', discount: 'FULL_PRICE', currency: 'EU' }
    expect(() => utils.discount(object)).toThrow()
  })

  test('should throw error for invalid discount', () => {
    const object = { prices: [15000], quantities: [1], country: 'ES', discount: 'FULL_PR', currency: 'EU' }
    expect(() => utils.discount(object)).toThrow()
  })
})

describe('applyConversion(ttc,rate)', () => {
  test('should return TTC discount price convert into devise thanks to rate', () => {
    expect(utils.applyConversion(15000, 1.4661)).toBe(15000 * 1.4661)
  })
  test('should throw error for invalid rate', () => {
    expect(() => utils.applyConversion(15000, NaN)).toThrow()
  })
  test('should throw error for negative rate', () => {
    expect(() => utils.applyConversion(15000, -4)).toThrow()
  })
})
