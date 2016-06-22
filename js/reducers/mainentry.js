/**
* @flow
*/
'use strict';

import type {Action} from '../actions/types' ;

export type State = {
  inSplash: boolean;
};

const initialState = {
  inSplash: true,
};

function mainentry(state: State=initialState, action: Action):State {
  if(action.type === 'MAIN_ENTRY') {
    return {
      ...state,
      inSplash: false,
    };
  }

  return state;
}

module.exports = mainentry;
