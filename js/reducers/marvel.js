/**
* @flow
*/

'use strict';

import type {Action} from '../actions/types';
import type {Character} from '../marvelapi/model';

export type State = {
  popularcharacters: ?Array<Character>;
  searchResult: ?Array<Character>;
  detailUrl: ?string;
};

const initialState: State = {popularcharacters: null, searchResult: null, detailUrl: null};

function marvel(state: State = initialState, action: Action): State {
  if (action.type === 'GET_POPULAR_CHARACTERS') {
    return {...state, popularcharacters: action.data};
  }
  if(action.type === 'SEARCH_CHARACTER_BY_NAME') {
    return {...state, searchResult: action.data};
  }

  if(action.type === 'GET_CHARACTER_DETAIL') {
    return {...state, detailUrl: action.data};
  }

  return state;
}

module.exports = marvel;
