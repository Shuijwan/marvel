/**
* @flow
*/
'use strict';

import type {Action} from './types';
import MarvelAPI from '../marvelapi/MarvelAPI';
import {writeCharacterToRealm, removePopularCharacter} from '../marvelapi/realmModel';
import type {Character} from '../marvelapi/model';

const marvel = new MarvelAPI();

async function getPopularCharacters(): Promise<Action> {
  const result = await marvel.getPopularCharacters();
  return {
    type: 'GET_POPULAR_CHARACTERS',
    data: result
  };
}

async function searchCharacterByName(name: string): Promise<Action> {
  const result = await marvel.searchCharacterByName(name);
  return {
    type: 'SEARCH_CHARACTER_BY_NAME',
    data: result
  };
}

function clearSearchResult(): Action {
  return {
    type: 'SEARCH_CHARACTER_BY_NAME',
    data: null
  };
}

async function getCharacterDetail(url: string): Promise<Action> {
  const result = await marvel.getDetail(url);
  return {
    type: 'GET_CHARACTER_DETAIL',
    data: result
  };
}

async function markAsPopularCharacter(character: Character, mark: boolean): Promise<Action> {
  if(mark) {
    writeCharacterToRealm(character);
  } else {
    removePopularCharacter(character);
  }

  const result = await marvel.getPopularCharacters();
  return {
    type: 'GET_POPULAR_CHARACTERS',
    data: result
  };
}


module.exports = { getPopularCharacters, searchCharacterByName, getCharacterDetail, clearSearchResult, markAsPopularCharacter };
