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

async function getCharacterByName(name: string) {
  const result = await marvel.getCharacterByName(name);
  return {
    type: 'GET_CHARACTER_BY_NAME',
    data: result
  };
}

async function getCharacterDetail(url: string) {
  const result = await marvel.getCharacterDetail(url);
  return {
    type: 'GET_CHARACTER_DETAIL',
    data: result
  };
}



module.exports = { getPopularCharacters, getCharacterByName, getCharacterDetail };
