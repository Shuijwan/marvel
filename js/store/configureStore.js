/**
* @flow
*/

'use strict';

var {applyMiddleware, createStore} = require('redux');
var reducers = require('../reducers');
var createLogger = require('redux-logger');
var {persistStore, autoRehydrate} = require('redux-persist');
var {AsyncStorage} = require('react-native');
import promise from './promise';

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
  predicate: () => isDebuggingInChrome,
  collapsed: true,
  duration: true,
});

var createMarvelStore = applyMiddleware(promise, logger)(createStore);

function configureStore(onComplete: ?() => void) {
  //TODO: should not persist store mainentry.inSplash
  const store = createMarvelStore(reducers);
  // const store = autoRehydrate()(createMarvelStore)(reducers);
  persistStore(store, {storage: AsyncStorage}, onComplete);
  if(isDebuggingInChrome) {
    window.store = store;
  }

  return store;
}

module.exports = configureStore;
