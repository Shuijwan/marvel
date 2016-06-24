/**
* @flow
*/

'use strict';

export type Action =
  { type: 'SWITCH_TAB', tab: 'schedule' | 'my-schedule' | 'map' | 'notifications' | 'info' }
| { type: 'MAIN_ENTRY' }
| { type: 'GET_ALL_CHARACTERS', data: string }
  ;
