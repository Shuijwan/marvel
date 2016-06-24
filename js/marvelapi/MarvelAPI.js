/**
* @flow
*/
'use strict';

// For example, a user with a public key of "1234" and a private key of "abcd"
// could construct a valid call as follows:
// http://gateway.marvel.com/v1/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
// (the hash value is the md5 digest of 1abcd1234)

var {getMarvelRequestParam} = require('./Util');

class MarvelAPI {
  async getAllCharacters(offset: number, limit: number) {
      var param = getMarvelRequestParam();
      var request = `${serverUrl}characters?${param}`;
      try {
        let response = await fetch(request);
        const result = await response.json();
      } catch(error) {
        global.LOG(error);
      }
  }

  async getCharacterByName(name: string) {
    var generalParam = getMarvelRequestParam();
    var request = `${serverUrl}characters?${param}&name=${name}`;
    try {
      let response = await fetch(request);
      const result = await response.json();
    } catch(error) {
      global.LOG(error);
    }
  }
}

module.exports = MarvelAPI;
