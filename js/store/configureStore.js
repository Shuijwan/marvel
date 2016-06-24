/**
* @flow
*/

'use strict';

var {applyMiddleware, createStore} = require('redux');
var reducers = require('../reducers');
var createLogger = require('redux-logger');

import promise from './promise';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var store = applyMiddleware(promise, logger)(createStore)(reducers);

function configureStore() {
  if(isDebuggingInChrome) {
    window.store = store;
  }

  return store;
}

module.exports = configureStore;
