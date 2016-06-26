/**
* @flow
*/

'use strict';

import type {Action} from '../actions/types';
import type {Character} from '../marvelapi/model';

export type State = {
  popularcharacters: Array<Character>;
  character: Character;
  characterDetail: string;
};

const initialState: State = {result: null};

function marvel(state: State = initialState, action: Action): State {
  if (action.type === 'GET_POPULAR_CHARACTERS') {
    return {...state, popularcharacters: action.data};
  }
  if(action.type === 'GET_CHARACTER_BY_NAME') {
    return {...state, character: action.data};
  }

  if(action.type === 'GET_CHARACTER_DETAIL') {
    return {...state, characterDetail: action.data};
  }
  return state;
}

module.exports = marvel;
