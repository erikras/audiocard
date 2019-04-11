'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./audiocard.cjs.production.js');
} else {
  module.exports = require('./audiocard.cjs.development.js');
}