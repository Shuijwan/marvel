/**
* @flow
*/

'use strict';

import type {Action} from './types';

function enterMainPage(): Action {
  return {
    type: 'MAIN_ENTRY',
  };
}

module.exports = {enterMainPage};
