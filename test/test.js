var ownEnumerableKeys = require('../')
var test = require('tape')

test('gets own enumerable property names and symbols', function (t) {
  var symb = Symbol('special')
  var obj1 = {
    foo: 'blah',
    bar: 'foo'
  }
  
  obj1.__proto__ = {
    parentFoo: 'zipzap'
  }
  
  obj1.visible = true
  Object.defineProperties(obj1, {
    enumYes: {
      enumerable: true,
      value: 'foo'
    },
    enumNo: {
      enumerable: false,
      value: 'bar'
    }
  })
  
  t.equal(obj1.parentFoo, 'zipzap')
  t.deepEqual(own(obj1), ['foo', 'bar', 'visible', 'enumYes'])
  
  obj1[symb] = 'kaboom'
  // have to sort since babel Symbol polyfill is not leading
  // to a predictable output
  t.deepEqual(own(obj1).sort(), [ 'bar', 'enumYes', 'foo', 'special', 'visible' ])
  t.end()
  
  function own(obj) {
    return ownEnumerableKeys(obj)
      .map(function (e) {
        return String(e).replace(/^Symbol\((.*)\)(?:.*)?$/, '$1')
      })
  }
})
