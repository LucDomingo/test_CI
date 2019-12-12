function checkTTC (ttc) {
  if (!ttc || ttc < 0) { throw new Error('error calculing ttc price') }
}

function isPositive (number) {
  if (number < 0) { throw new Error('error negative value') }
  return number
}

function isQuantities (body) {
  if (!body.quantities) { throw new Error('error please enter quantities') }
}

function isPrices (body) {
  if (!body.prices) { throw new Error('error please enter prices') }
}

function isDevise (devise) {
  if (!devise || devise < 0) { throw new Error('error unknow devise') }
}

module.exports = {
  isPositive: isPositive,
  checkTTC: checkTTC,
  isQuantities: isQuantities,
  isPrices: isPrices,
  isDevise: isDevise
}
