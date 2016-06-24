/**
* @flow
*/

'use strict';

import type {Action} from '../actions/types';

type State = {
  result: string;
};

const initialState: State = {result: null};

function marvel(state: State = initialState, action: Action): State {
  if (action.type === 'GET_ALL_CHARACTERS') {
    return {...state, result: action.data};
  }
  return state;
}

module.exports = marvel;
