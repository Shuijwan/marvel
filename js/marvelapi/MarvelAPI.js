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
var {writeCharacterToRealm, getCharacterFromRealm, getPopularCharactersInRealm} = require('./realmModel');
var Platform = require('Platform');

import type {Character} from './model';

class MarvelAPI {

  async searchCharacterByName(startWith: string): Promise<Array<Character>> {
    var generalParam = getMarvelRequestParam();
    var request = `${serverUrl}characters?nameStartsWith=${startWith}&${generalParam}`;
    var result = [];
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

  async getPopularCharacters(): Promise<Array<Character>> {

    var populars = ['Spider-Man','Hulk', 'Captain America','Iron Man','Avengers','X-Men', 'Deadpool', 'Guardians of the Galaxy'];
    var charactersInRealm = await getPopularCharactersInRealm();
    if(charactersInRealm && charactersInRealm.length > 0) {
      return charactersInRealm;
    }

    var result = [];
    for(var index=0; index<populars.length; index++) {
      var data = await this.getCharacterByName(populars[index]);
      if(data) {
        result.push(data);
        writeCharacterToRealm(data);
      }
    }
    return result;
  }

  async getCharacterByName(name: string): Promise<?Character> {
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

  parseCharacter(data: Object): Character {
    var name = data.name;
    var id = data.id;
    var description = data.description;
    var serverPath = data.thumbnail.path;
    
    var thumbnail = `${serverPath}/standard_medium.${data.thumbnail.extension}`;
    var portraitImg = `${serverPath}/portrait_xlarge.${data.thumbnail.extension}`;

    var comics = [];
    var comicsitems = data.comics.items;
    comicsitems.map((item, index) => {
      comics.push(item);
    });

    var events = [];
    var eventsitems = data.events.items;
    eventsitems.map((item, index) => {
      events.push(item);
    });

    var stories = [];
    var storiesitems = data.stories.items;
    storiesitems.map((item, index) => {
      stories.push(item);
    });

    var urls = [];
    var urlsitems = data.urls;
    var wiki;
    urlsitems.map((item, index) => {
      if(item.type === 'detail') {
        wiki = item.url;
      }
      urls.push(item);
    });

    var series = [];
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

  async getDetail(url: string): Promise<string> {
    var generalParam = getMarvelRequestParam();
    var request = `${url}?${generalParam}`;
    try {
      let response = await fetch(request);
      const result = await response.json();
      if(result.code === 200) {
        var results = result.data.results[0];
        var urlsitems = results.urls;
        var detailUrl;
        urlsitems.map((item, index) => {
          if(item.type === 'detail') {
            detailUrl = item.url;
          }
        });

        return detailUrl;
      }

    } catch(error) {
      global.LOG(error, request);
    }

    return request;
  }
}

module.exports = MarvelAPI;
