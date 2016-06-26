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

  async getPopularCharacters(): Array<Character> {
    var result = new Array();
    var populars = new Array('Spider-Man','Hulk', 'Captain America','Iron Man','Avengers','X-Men', 'Deadpool', 'Guardians of the Galaxy');
    for(var index=0; index<populars.length; index++) {
      var data = await this.getCharacterByName(populars[index]);
      result.push(data);
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
        var name = results.name;
        var id = results.id;
        var description = results.description;
        var thumbnail = `${results.thumbnail.path}/standard_medium.${results.thumbnail.extension}`;
        var portraitImg = `${results.thumbnail.path}/portrait_xlarge.${results.thumbnail.extension}`;

        var comics = new Array();
        var comicsitems = results.comics.items;
        comicsitems.map((item, index) => {
          comics.push(item);
        });

        var events = new Array();
        var eventsitems = results.events.items;
        eventsitems.map((item, index) => {
          events.push(item);
        });

        var stories = new Array();
        var storiesitems = results.stories.items;
        storiesitems.map((item, index) => {
          stories.push(item);
        });

        var urls = new Array();
        var urlsitems = results.urls;
        var wiki;
        urlsitems.map((item, index) => {
          if(item.type === 'detail') {
            wiki = item.url;
          }
          urls.push(item);
        });

        var series = new Array();
        var seriesitems = results.series.items;
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

    } catch(error) {
      global.LOG(error);
    }

    return null;
  }
}

module.exports = MarvelAPI;
