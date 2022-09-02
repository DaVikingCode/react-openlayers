
'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-openlayers.cjs.production.min.js')
} else {
  module.exports = require('./react-openlayers.cjs.development.js')
}
