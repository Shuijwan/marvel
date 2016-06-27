/**
* @flow
*/

'use strict';
var Realm = require('realm');

const ComicSchema = {
  name: 'Comic',
  properties: {
    resourceURI: 'string',
    name: 'string',
  }
}

const SeriesSchema = {
  name: 'Series',
  properties: {
    resourceURI: 'string',
    name: 'string',
  }
}

const StorySchema = {
  name: 'Story',
  properties: {
    resourceURI: 'string',
    name: 'string',
    type: 'string',
  }
}

const EventSchema = {
  name: 'Event',
  properties: {
    resourceURI: 'string',
    name: 'string',
  }
}

const UrlSchema = {
  name: 'Url',
  properties: {
    type: 'string',
    url: 'string',
  }
}

const CharacterSchema = {
  name: 'Character',
  properties: {
    id: 'int',
    name: 'string',
    description: 'string',
    wiki: 'string',
    thumbnail: 'string',
    portraitImg: 'string',
    comics: {type: 'list', objectType: 'Comic'},
    series: {type: 'list', objectType: 'Series'},
    stories: {type: 'list', objectType: 'Story'},
    events: {type: 'list', objectType: 'Event'},
    urls: {type: 'list', objectType: 'Url'},
  }
}

let realm = new Realm({schema:[ComicSchema, SeriesSchema, StorySchema, EventSchema, UrlSchema, CharacterSchema]});

function writeToRealm(character: Character) {
  realm.write(() => {
    let realmobject = realm.create('Character', {
      id: character.id,
      name: character.name,
      description: character.description,
      wiki: character.wiki,
      thumbnail: character.thumbnail,
      portraitImg: character.portraitImg,
    });
    character.comics.map((item, index) => {
      realmobject.comics.push(item);
    });

    character.series.map((item, index) => {
      realmobject.series.push(item);
    });

    character.stories.map((item, index) => {
      realmobject.stories.push(item);
    });

    character.events.map((item, index) => {
      realmobject.events.push(item);
    });

    character.urls.map((item, index) => {
      realmobject.urls.push(item);
    });
  });
}

function getCharacterFromRealm(name: string): Character {

  var query = `name = "${name}"`;
  let character = realm.objects('Character').filtered(query);
  if(character && character.length > 0) {
    global.LOG(character[0].comics);
    var comics = [];
    for(var index=0; index < character[0].comics.length; index++) {
      comics.push(character[0].comics[index]);
    }

    var series = [];
    for(var index=0; index < character[0].series.length; index++) {
      series.push(character[0].series[index]);
    }

    var stories = [];
    for(var index=0; index < character[0].stories.length; index++) {
      stories.push(character[0].stories[index]);
    }

    var events = [];
    for(var index=0; index < character[0].events.length; index++) {
      events.push(character[0].events[index]);
    }

    var urls = [];
    for(var index=0; index < character[0].urls.length; index++) {
      urls.push(character[0].urls[index]);
    }
    return {
      id: character[0].id,
      name: character[0].name,
      description: character[0].description,
      wiki: character[0].wiki,
      thumbnail: character[0].thumbnail,
      portraitImg: character[0].portraitImg,
      comics: comics,
      series: series,
      stories: stories,
      events: events,
      urls: urls,
    };
  }

  return null;
}

module.exports = {writeToRealm, getCharacterFromRealm};
