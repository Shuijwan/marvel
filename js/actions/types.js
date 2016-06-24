/**
* @flow
*/

'use strict';

export type Action =
  { type: 'SWITCH_TAB', tab: 'characters' | 'about' }
| { type: 'MAIN_ENTRY' }
| { type: 'GET_ALL_CHARACTERS', data: string }
  ;
