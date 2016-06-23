/**
* @flow
*/

'use strict';

import type {Action} from '../actions/types';

export type Tab = 'popular' | 'characters' | 'comics' | 'events' | 'series' | 'stories';

type State = {
  tab: Tab;
};

const initialState: State = {tab: 'popular'};

function navigation(state: State = initialState, action: Action): State {
  if (action.type === 'SWITCH_TAB') {
    return {...state, tab: action.tab};
  }
  return state;
}

module.exports = navigation;
