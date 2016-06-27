/**
* @flow
*/

'use strict';

var MarvelApp = require('MarvelApp');
var React = require('react');
var {Provider} = require('react-redux');
var configureStore = require('./store/configureStore');
var {PublicKey} = require('./env');

function setup() : React.Component {
  class Root extends React.Component {
    constructor() {
      super();
      this.state = {
        store: configureStore(),
      };
    }

    render() {
      return (
      <Provider store={this.state.store}>
          <MarvelApp />
      </Provider>
      );
    }
  }

  return Root;
}

global.LOG = (...args) => {
  console.warn('/---------------------\\');
  console.warn(...args);
  console.warn('\\---------------------/');

  return args[args.length-1];
};


module.exports = setup;
