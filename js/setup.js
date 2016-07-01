/**
* @flow
*/

'use strict';

var MarvelApp = require('MarvelApp');
var React = require('react');
var {Provider} = require('react-redux');
var configureStore = require('./store/configureStore');

function setup() : React.Component {
  class Root extends React.Component {
    state: {
      store: ?any;
    };


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
  console.log('/---------------------\\');
  console.log(...args);
  console.log('\\---------------------/');

  return args[args.length-1];
};


module.exports = setup;
