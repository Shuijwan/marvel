/**
* @flow
*/

'use strict';

var {PublicKey, PrivateKey} = require('../env');
var MD5 = require('crypto-js/md5');

export function md5(ts: string) {
  var value = `${ts}${PrivateKey}${PublicKey}`;
  return MD5(value);
}
