/*
 * @flow
 */

'use strict';

var { combineReducers } = require('redux');

module.exports = combineReducers({
  mainentry: require('./mainentry'),
  navigation: require('./navigation'),
  marvel: require('./marvel'),
});
