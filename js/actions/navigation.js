/**
* @flow
*/

'use strict';

import type {Action} from './types';
import type {Tab} from '../reducers';

module.exports = {
  switchTab: (tab: Tab): Action => ({
    type: 'SWITCH_TAB',
    tab,
  }),
};
