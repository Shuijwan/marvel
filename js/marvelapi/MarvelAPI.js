/**
* @flow
*/
'use strict';

// For example, a user with a public key of "1234" and a private key of "abcd"
// could construct a valid call as follows:
// http://gateway.marvel.com/v1/comics?ts=1&apikey=1234&hash=ffd275c5130566a2916217b101f26150
// (the hash value is the md5 digest of 1abcd1234)
var {serverUrl} = require('../env');
var {getMarvelRequestParam} = require('./Util');
var {writeToRealm, getCharacterFromRealm} = require('./realmModel');
var Platform = require('Platform');

import type {Character} from './model';

class MarvelAPI {
  async getAllCharacters(offset: number, limit: number) {
      var param = getMarvelRequestParam();
      var request = `${serverUrl}characters?${param}`;
      try {
        let response = await fetch(request);
        const result = await response.json();
        global.LOG(result);
      } catch(error) {
        global.LOG(error);
      }
  }

  async getCharacterDetail(url: string) {
    var generalParam = getMarvelRequestParam();
    var request = `${url}?${generalParam}`;
    global.LOG(request);
    try {
      let response = await fetch(request);
      const result = await response.json();
      global.LOG(result);
    } catch(error) {
      global.LOG(error);
    }
  }

  async searchCharacterByName(startWith: string): Array<Character> {
    var generalParam = getMarvelRequestParam();
    var request = `${serverUrl}characters?nameStartsWith=${startWith}&${generalParam}`;
    var result = new Array();
    try {
      let response = await fetch(request);
      const responseJson = await response.json();

      if(responseJson.code === 200) {
        var results = responseJson.data.results;

        results.map((item, index) => {
          var character = this.parseCharacter(item);
          result.push(character);
        });

        return result;
      }
    } catch(error) {
      global.LOG(error, request);
    }

    return result;
  }

  async getPopularCharacters(): Array<Character> {
    var result = new Array();
    var populars = new Array('Spider-Man','Hulk', 'Captain America','Iron Man','Avengers','X-Men', 'Deadpool', 'Guardians of the Galaxy');
    for(var index=0; index<populars.length; index++) {
      var realmCharacter = await getCharacterFromRealm(populars[index]);
      if(realmCharacter) {
        result.push(realmCharacter);
      } else {
        var data = await this.getCharacterByName(populars[index]);
        result.push(data);
        writeToRealm(data);
      }
    }
    return result;
  }

  async getCharacterByName(name: string): Character {
    var generalParam = getMarvelRequestParam();
    var request = `${serverUrl}characters?${generalParam}&name=${name}`;
    try {
      let response = await fetch(request);
      const result = await response.json();
      if(result.code === 200) {
        var results = result.data.results[0];
        return this.parseCharacter(results);
      }

    } catch(error) {
      global.LOG(error, request);
    }

    return null;
  }

  parseCharacter(data: string): Character {
    var name = data.name;
    var id = data.id;
    var description = data.description;
    var serverPath = data.thumbnail.path;
    if(Platform.OS === 'ios') {
      serverPath = serverPath.substring(4, serverPath.length);
      serverPath = `https${serverPath}`;
    }
    var thumbnail = `${serverPath}/standard_medium.${data.thumbnail.extension}`;
    var portraitImg = `${serverPath}/portrait_xlarge.${data.thumbnail.extension}`;

    var comics = new Array();
    var comicsitems = data.comics.items;
    comicsitems.map((item, index) => {
      comics.push(item);
    });

    var events = new Array();
    var eventsitems = data.events.items;
    eventsitems.map((item, index) => {
      events.push(item);
    });

    var stories = new Array();
    var storiesitems = data.stories.items;
    storiesitems.map((item, index) => {
      stories.push(item);
    });

    var urls = new Array();
    var urlsitems = data.urls;
    var wiki;
    urlsitems.map((item, index) => {
      if(item.type === 'detail') {
        wiki = item.url;
      }
      urls.push(item);
    });

    var series = new Array();
    var seriesitems = data.series.items;
    seriesitems.map((item, index) => {
      series.push(item);
    });

    return {
      id: id,
      name: name,
      description: description,
      wiki: wiki,
      thumbnail: thumbnail,
      portraitImg: portraitImg,
      comics: comics,
      events: events,
      stories: stories,
      series: series,
      urls: urls,
    };
  }
}

module.exports = MarvelAPI;
