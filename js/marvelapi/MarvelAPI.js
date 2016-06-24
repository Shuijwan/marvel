/**
* @flow
*/
'use strict';

// For example, a user with a public key of "1234" and a private key of "abcd"
// could construct a valid call as follows:
// http://gateway.marvel.com/v1/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
// (the hash value is the md5 digest of 1abcd1234)

var {PublicKey, serverUrl} = require('../env');
var {md5} = require('./Util');

class MarvelAPI {
  async getAllCharacters(offset: number, limit: number) {
      var ts = new Date().getTime();
      var md5value = md5(ts);
      var request = `${serverUrl}characters?ts=${ts}&apikey=${PublicKey}&hash=${md5value}`;
      try {
        let response = await fetch(request);
        const result = await response.json();

        global.LOG('aaaaa',result);
      } catch(error) {
        global.LOG(error);
      }
  }
}

module.exports = MarvelAPI;
