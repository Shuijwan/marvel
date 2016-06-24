/**
* @flow
*/
'use strict';

import type {Action} from './types';
import MarvelAPI from '../marvelapi/MarvelAPI';

const marvel = new MarvelAPI();

async function getAllCharacters(offset: number, limit:number): Action {
  const result = await marvel.getAllCharacters(offset, limit);
  return {
    type: 'GET_ALL_CHARACTERS',
    data: result
  };
}

module.exports = { getAllCharacters };
