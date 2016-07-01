/**
* @flow
*/

'use strict';

var {PublicKey, PrivateKey} = require('../env');
var MD5 = require('crypto-js/md5');

function md5(ts: string) {
  var value = `${ts}${PrivateKey}${PublicKey}`;
  return MD5(value);
}

export function getMarvelRequestParam() {
  var ts = new Date().getTime().toString();
  var md5value = md5(ts);
  return `ts=${ts}&apikey=${PublicKey}&hash=${md5value}`;
}
