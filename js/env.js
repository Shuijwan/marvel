/**
* @flow
*/

'use strict';
var Platform = require('Platform');

var serverUrl = Platform.OS === 'android' ? 'http://gateway.marvel.com:80/v1/public/' : 'https://gateway.marvel.com:443/v1/public/';

module.exports = {
  PublicKey: 'd128928f89eab7dca3a7f3c003c48f80',
  PrivateKey: 'cd4ff2b15d809de5f84e369e03a7d399c52e4772',
  serverUrl: serverUrl,
};
