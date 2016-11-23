var getOwnEnumSymbols = require('get-own-enumerable-property-symbols')

module.exports = ownEnumerableKeys
function ownEnumerableKeys (obj) {
  return Object.keys(obj).concat(Object.getOwnPropertySymbols ? getOwnEnumSymbols(obj) : [])
}
