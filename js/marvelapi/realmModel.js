/**
* @flow
*/

'use strict';
import type {Character} from './model';

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

function writeCharacterToRealm(character: Character) {
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

function getCharacterFromRealm(name: string): ?Character {

  var query = `name = "${name}"`;
  let character = realm.objects('Character').filtered(query);
  if(character && character.length > 0) {
      return parseRealmObject(character[0]);
  }

  return null;
}

function parseRealmObject(character: any): Character {
  var comics = [];
  for(var index=0; index < character.comics.length; index++) {
    comics.push(character.comics[index]);
  }

  var series = [];
  for(var index=0; index < character.series.length; index++) {
    series.push(character.series[index]);
  }

  var stories = [];
  for(var index=0; index < character.stories.length; index++) {
    stories.push(character.stories[index]);
  }

  var events = [];
  for(var index=0; index < character.events.length; index++) {
    events.push(character.events[index]);
  }

  var urls = [];
  for(var index=0; index < character.urls.length; index++) {
    urls.push(character.urls[index]);
  }
  return {
    id: character.id,
    name: character.name,
    description: character.description,
    wiki: character.wiki,
    thumbnail: character.thumbnail,
    portraitImg: character.portraitImg,
    comics: comics,
    series: series,
    stories: stories,
    events: events,
    urls: urls,
  };
}

function isPopularCharacter(char: Character) {
  var query = `id = "${char.id}"`;
  let character = realm.objects('Character').filtered(query);
  return character && character.length > 0;
}

function removePopularCharacter(char: Character) {
  realm.write(() => {
    var query = `id = "${char.id}"`;
    let character = realm.objects('Character').filtered(query);
    realm.delete(character);
  });
}

function getPopularCharactersInRealm(): Array<Character> {
  var result = [];
  let characters = realm.objects('Character');
  for(var index=0; index<characters.length; index++) {
    result.push(parseRealmObject(characters[index]));
  }
  return result;
}

module.exports = {writeCharacterToRealm, getCharacterFromRealm, isPopularCharacter, removePopularCharacter, getPopularCharactersInRealm};
