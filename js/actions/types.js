/**
* @flow
*/

'use strict';

import type {Character} from '../marvelapi/model';

export type Action =
  { type: 'SWITCH_TAB', tab: 'characters' | 'search' | 'about' }
| { type: 'MAIN_ENTRY' }
| { type: 'GET_POPULAR_CHARACTERS', data: Array<Character> }
| { type: 'SEARCH_CHARACTER_BY_NAME', data: ?Array<Character> }
| { type: 'GET_CHARACTER_DETAIL', data: string }
  ;
