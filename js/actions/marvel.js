/**
* @flow
*/
'use strict';

import type {Action} from './types';
import MarvelAPI from '../marvelapi/MarvelAPI';

const marvel = new MarvelAPI();

async function getPopularCharacters(): Action {
  const result = await marvel.getPopularCharacters();
  return {
    type: 'GET_POPULAR_CHARACTERS',
    data: result
  };
}

async function searchCharacterByName(name: string) {
  const result = await marvel.searchCharacterByName(name);
  return {
    type: 'SEARCH_CHARACTER_BY_NAME',
    data: result
  };
}

function clearSearchResult() {
  return {
    type: 'SEARCH_CHARACTER_BY_NAME',
    data: null
  }
}

async function getCharacterDetail(url: string) {
  const result = await marvel.getCharacterDetail(url);
  return {
    type: 'GET_CHARACTER_DETAIL',
    data: result
  };
}



module.exports = { getPopularCharacters, searchCharacterByName, getCharacterDetail, clearSearchResult };
